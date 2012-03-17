<?php
/**
 * Note management
 */
class note extends controller {
//	const
//		note_unchanged = 0,
//		note_added = 1,
//		note_changed = 2,
//		note_moved = 3,
//		note_added = 4;

//	private $response = array();
//
//	public function __construct () {
//		parent::__construct();
//
//		// check authorization
//		if ( empty($_SESSION['user']['id']) ) {
//			$this->response['error'] = 'not authorized';
//		}
//		return false;
//	}

	/**
	 * Loads the note with entries
	 * @param int $id_note link to the note
	 */
	public function load ( $id_note = null ) {
		$result = array();

		// check if logged in
		if ( !empty($_SESSION['user']['id']) && ($id_user = $_SESSION['user']['id']) ) {
			// check note id in request
			if ( $id_note && ($id_note = intval($id_note)) ) {
				if ( ($result = db::queryFirstRow('select id,is_active,ctime,mtime,atime from notes where id = @i and id_user = @i limit 1', $id_note, $id_user)) ) {
					// list of existig active note entries and values
					$result['entries'] = db::query('select id,id_type,time,name,data from note_entries where is_active = 1 and id_note = @i order by place', $id_note);
					$result['tags'] = db::queryFirstCol('select id_tag from note_tags where id_note = @i', $id_note);
				} else {
					$result['error'] = 'not found';
				}
			} else {
				$result['error'] = 'invalid id';
			}
		} else {
			$result['error'] = 'not authorized';
		}
		fb($result, 'load');
		response::json($result);
	}

	/**
	 * Saves the note
	 * post data:
	 *   deleted - array of deleted entry ids
	 *   entries - array of entry (id_entry,id_type,name,data)
	 *   tags    - array of existing tag ids and new tag encoded data
	 * @param int $id_note link to the note if updating
	 */
	function save ( $id_note = null ) {
		$result = array();

		// check if logged in
		if ( !empty($_SESSION['user']['id']) && ($id_user = $_SESSION['user']['id']) ) {
			// check entries in request
			if ( !empty($_REQUEST['entries']) && is_array($entries = $_REQUEST['entries']) ) {
				// transaction
				db::begin();
					// if new entry or existed (check note id in request)
					if ( $id_note && ($id_note = intval($id_note)) ) {
						$result = $this->note_update($id_user, $entries, $id_note);
					} else {
						$result = $this->note_insert($id_user, $entries);
					}
					// clear cache
					cache::user_clear('notes_latest');
					// tags return only if there are changes
					if ( ($tags = $this->tags_save($id_user, $result['id'])) )
						$result['tags'] = $tags;
				// finish
				db::commit();
			} else {
				$result['error'] = 'no entries';
			}
		} else {
			$result['error'] = 'not authorized';
		}
		fb($result, 'save');
		response::json($result);
	}

	/**
	 * Deletes the note
	 * @param int $id_note link to the note
	 */
	function delete () {
		$result = array();
		// check if logged in
		if ( !empty($_SESSION['user']['id']) && ($id_user = $_SESSION['user']['id']) ) {
			// check notes in request
			if ( !empty($_REQUEST['ids']) && is_array($ids = $_REQUEST['ids']) ) {
				// there are some affected notes
				if ( db::update('notes', array('is_active'=>0, 'mtime'=>INIT_TIMESTAMP),
						'id_user = @i and id in @li and is_active = 1', $id_user, $ids) )
				{
					// should clear cache
					cache::user_clear('notes_latest');
					$result['deleted'] = db::affected();
					// compare actually deleted with requested
					if ( $result['deleted'] != count($ids) ) {
						$result['error'] = 'different number of notes deleted and requested';
					}
				} else {
					$result['error'] = 'no active notes found, nothing deleted';
				}
			} else {
				$result['error'] = 'no notes';
			}
		} else {
			$result['error'] = 'not authorized';
		}
		fb($result, 'delete');
		response::json($result);
	}

	/**
	 * Searches notes by tags
	 */
	function search () {
		//sleep(20);
		$result = array();
		// check if logged in
		if ( !empty($_SESSION['user']['id']) && ($id_user = $_SESSION['user']['id']) ) {
			// check tags and commands in request, remove duplicates
			if ( ($tinc = value($_REQUEST['tinc'], array())) && is_array($tinc) ) $tinc = array_unique($tinc);
			if ( ($texc = value($_REQUEST['texc'], array())) && is_array($texc) ) $texc = array_unique($texc);
			if ( ($wcmd = value($_REQUEST['wcmd'], array())) && is_array($wcmd) ) $wcmd = array_unique($wcmd);
			// no intersection
			if ( !array_intersect($tinc, $texc) ) {
				// flags
				$is_active = in_array('deleted', $wcmd) ? 0 : 1;
				$is_notags = in_array('notags',  $wcmd);
				// modification time
				$mtime = 'mtime > 0';
				if ( in_array('day',   $wcmd) ) $mtime = 'mtime > ' . (INIT_TIMESTAMP - 86400);
				if ( in_array('week',  $wcmd) ) $mtime = 'mtime > ' . (INIT_TIMESTAMP - 604800);
				if ( in_array('month', $wcmd) ) $mtime = 'mtime > ' . (INIT_TIMESTAMP - 2592000);
				// condition building
				$where = array('id_user = '.$id_user, 'is_active = '.$is_active, $mtime);
				// tagless
				if ( $is_notags ) {
					$where[] = 'id not in (select id_note from note_tags)';
				} else {
					// there are really some tags
					if ( $tinc ) $where[] = db::sql('id in (select id_note from note_tags where id_tag in @li group by id_note having count(id_tag) = @i)', $tinc, count($tinc))->scalar;
					if ( $texc ) $where[] = db::sql('id not in (select distinct id_note from note_tags where id_tag in @li)', $texc)->scalar;
				}
				// building all together
				$sql = 'select id,ctime,mtime,atime from notes where ' . implode(' and ', $where) . ' order by mtime desc';
				if ( ($result = db::query($sql)) ) {
					// extract note ids
					$note_idlist = matrix_column($result, 'id');
					// find tags for found notes if there are some
					$tags = !$is_notags ? matrix_group(db::query('select id_tag,id_note from note_tags where id_note in @li', $note_idlist) ,'id_note') : array();
					// find entries for found notes
					$entries = matrix_group(db::query('select id,id_note,id_type,time,name,data from note_entries where is_active = 1 and id_note in @li order by place', $note_idlist), 'id_note');
					// extent found notes with tags and entries
					foreach ( $result as & $note ) {
						$note['tags'] = value($tags[$note['id']], array());
						$note['entries'] = array_values($entries[$note['id']]);
					}
				}
				//fb(hash('sha256', implode(',', $tags)));
			} else {
				$result['error'] = 'intersection of include and exclude tags';
			}
		} else {
			$result['error'] = 'not authorized';
		}
		fb($result, 'search');
		response::json($result);
	}

	/**
	 * Loads the last 10 note entry history values ordered by time
	 * @param int $id_note link to the note
	 * @param int $id_entry link to the note entry
	 */
	public function history ( $id_note = null, $id_entry = null ) {
		$result = array();

		// check if logged in
		if ( !empty($_SESSION['user']['id']) && ($id_user = $_SESSION['user']['id']) ) {
			// check note and entry ids in request
			if ( $id_note && ($id_note = intval($id_note)) && $id_entry && ($id_entry = intval($id_entry)) ) {
				// note found and valid
				if ( ($note = db::queryFirstRow('select id from notes where id = @i and id_user = @i limit 1', $id_note, $id_user)) ) {
					if ( ($entry = db::queryFirstRow('select id from note_entries where id = @i and id_note = @i limit 1', $id_entry, $id_note)) ) {
						$result = array_pack(db::query('select id_type,time,name,data from entry_values where id_entry = @i order by time desc limit 10', $id_entry));
					} else {
						$result['error'] = 'entry not found';
					}
				} else {
					$result['error'] = 'note not found';
				}
			} else {
				$result['error'] = 'invalid id';
			}
		} else {
			$result['error'] = 'not authorized';
		}
		fb($result, 'history');
		response::json($result);
	}

	/**
	 * Checks entry and removes keys not existing in the note_entries column list
	 * @param array $entry list of fields to be check (better not to pass by reference)
	 */
	private function entry_validate ( $entry ) {
		// get table column list
//		$columns = cache::db_table_columns('note_entries');
//		// iterate all entry fields
//		foreach ( array_keys($entry) as $ekey ) {
//			// remove not existing fields
//			if ( !in_array($ekey, $columns) ) unset($entry[$ekey]);
//		}
		// check entry type and reassign or remove
		if ( isset($entry['id_type']) && ($id_type = intval($entry['id_type'])) ) $entry['id_type'] = $id_type;
		else unset($entry['id_type']);
		// set time
		$entry['time'] = INIT_TIMESTAMP;

		return $entry;
	}

	/**
	 * Adds new entry for given note
	 * @param int $id_note link to the note
	 * @param array $data entry data values
	 * @return array status data
	 */
	private function entry_insert ( $id_note, $data ) {
		$data['id_note'] = $id_note;
		// validate and add entry
		$id = db::insert('note_entries', $this->entry_validate($data));
		// prepare response
		return array('id'=>$id, 'added'=>(db::affected()>0));
	}

	/**
	 * Updates the entry for given note and add record to the history
	 * @param int $id_note link to the note
	 * @param int $id_entry link to the entry
	 * @param array $data entry data values
	 * @param array $prev entry data values from the previous saving
	 * @return array status data
	 */
	private function entry_update ( $id_note, $id_entry, $data, $prev ) {
		$result = array('id'=>$id_entry);
		if ( $data ) {
			// validate and update entry
			if ( db::update('note_entries', $this->entry_validate($data), 'id_note=@i and id=@i', $id_note, $id_entry) ) {
				// moved or edited
				if ( isset($data['place']) ) $result['moved'] = true;
				// changed name, data or type
				// empty name means it is standard
				if ( isset($data['name']) || !empty($data['data']) || !empty($data['id_type']) ) {
					$result['changed'] = true;
					// add the previous record to the history
					db::insert('entry_values', array('id_entry'=>$id_entry) + $prev);
				}
			}
		}
		return $result;
	}

	/**
	 * Sets the given entry list as inactive
	 * @param int $id_note link to the note
	 * @param array $idlist list of entry ids
	 * @return int number of entries set to inactive
	 */
	private function entry_delete ( $id_note, $idlist ) {
		// reassemble id list to remove invalid values
		$idlist = array_filter($idlist, function($item){return $item and intval($item);});
		// update and return the number of actually deleted records
		return db::update('note_entries', array('is_active'=>0, 'time'=>INIT_TIMESTAMP),
			'id_note=@i and id in @li', $id_note, $idlist);
	}

	/**
	 * Creates a new note
	 * @param int $id_user link to the owner
	 * @param array $entries list of note entries
	 * @return array status data
	 */
	private function note_insert ( $id_user, $entries ) {
		// prepare return data
		$result = array('id'=>null, 'entries'=>array());
		// add note
		$result['id'] = $id_note = db::insert('notes', array(
			'id_user' => $id_user,
			'ctime'   => INIT_TIMESTAMP,
			'mtime'   => INIT_TIMESTAMP
		));
		// process all entries
		foreach ( $entries as $place => $entry ) {
			// insert entry
			$result['entries'][$place] = $this->entry_insert($id_note, array('place'=>$place) + $entry);
		}
		return $result;
	}

	/**
	 * Creates a new note
	 * @param int $id_user link to the owner
	 * @param array $entries list of note entries
	 * @param int $id_note link to note
	 * @return array status data
	 */
	private function note_update ( $id_user, $entries, $id_note ) {
		$result = array('id'=>$id_note);
		// note found and valid
		if ( db::update('notes', array('mtime'=>INIT_TIMESTAMP), 'id = @i and id_user = @i', $id_note, $id_user) ) {
			//$result['id'] = $id_note;

			// check deleted and set inactive if necessary
			if ( !empty($_REQUEST['deleted']) && is_array($_REQUEST['deleted']) ) {
				$result['deleted'] = $this->entry_delete($id_note, $_REQUEST['deleted']);
			}

			// list of existig active note entries and values
			$note_entries = matrix_order(db::query("select id,id_type,place,time,name,data from note_entries where is_active = 1 and id_note = $id_note"), 'id');

			// process all entries
			foreach ( $entries as $place => $entry ) {
				if ( !empty($entry['id']) && ($id_entry = intval($entry['id'])) ) {
					// update entry
					unset($entry['id']);
					// position changed
					if ( $place != $note_entries[$id_entry]['place'] ) $entry['place'] = $place;
					// actual work
					$result['entries'][$place] = $this->entry_update($id_note, $id_entry, $entry, $note_entries[$id_entry]);
				} else {
					// insert entry
					$result['entries'][$place] = $this->entry_insert($id_note, array('place'=>$place) + $entry);
				}

			}
		}
		return $result;
	}

	/**
	 * Saves the notes tags
	 * 1. clears all the tag-note links for the given note
	 * 2. prepares the list of ids creating new if an encrypted string is given
	 * 3. does bulk ids insert and clears user tags cache if necessary
	 * @param int $id_user link to the owner
	 * @param array $entries list of note entries
	 * @param int $id_note link to note
	 * @return array list of tag ids
	 */
	private function tags_save ( $id_user, $id_note ) {
		$result = array();
		// check input
		if ( $id_user && $id_note && isset($_REQUEST['tags']) ) {
			// start update clearing all previous tags
			// some tags were removed so tags cache should be cleared
			if ( db::delete('note_tags', 'id_note = @i', $id_note) ) $flag_clear_cache = true;
			// there are some tags
			if ( ($tags = $_REQUEST['tags']) && is_array($tags) ) {
				// list of params for bulk insert to note_tags table
				$data = array();
				// is necessary to clear user tags cache
				$flag_clear_cache = false;
				// iterate all
				foreach ( $tags as $tag ) {
					// check tag
					if ( ($id = intval($tag)) ) {
						// plain id integer
						$data[] = array('id_note'=>$id_note, 'id_tag'=>$id, 'time'=>INIT_TIMESTAMP);
					} else {
						// ecrypted tag name so need to add to the tags table
						if ( ($id = db::insert('tags', array('id_user'=>$id_user, 'name'=>$tag, 'ctime'=>INIT_TIMESTAMP))) )
							$data[] = array('id_note'=>$id_note, 'id_tag'=>$id, 'time'=>INIT_TIMESTAMP);
						$flag_clear_cache = true;
					}
					// report id back to the client
					$result[] = $id;
				}
				// bulk insert
				// some tags were changed so tags cache should be cleared
				if ( db::insert('note_tags', $data) ) $flag_clear_cache = true;
			} else {
				// flag for the client that tags were deleted
				$result = true;
			}
			// clear user tags cache
			if ( $flag_clear_cache ) cache::user_clear('tags');
		}
		return $result;
	}

}

?>