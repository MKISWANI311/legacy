<?php

/**
 * Main cacher class
 * @author DarkPark
 */
class cache {

	/**
	 * Get/set variable using session
	 * if value set then setting otherwise - requesting
	 * @param string $name var name to get/set
	 * @param mixed $value var value to set
	 * @return mixed
	 */
	public static function sess ( $name, $value = null ) {
		if ( $value === null ) {
			// obtaining data
			if ( isset($_SESSION['cache'][$name]) )
				$value = $_SESSION['cache'][$name];
		} else {
			// setting
			$_SESSION['cache'][$name] = $value;
			fb($name, 'sess init store');
		}
		return $value;
	}

	/**
	 * Clears given session variable or all cached data
	 * if $name is not set then clears everything
	 * @param string $name var name to clear
	 */
	public static function sess_clear ( $name = null ) {
		if ( $name === null ) {
			// clearing all
			$_SESSION['cache'] = array();
		} else if ( $name && isset($_SESSION['cache'][$name]) ) {
			// delete single value
			unset($_SESSION['cache'][$name]);
		}
	}

	/**
	 * Get/set variable using apc cache
	 * if value set then setting otherwise - requesting
	 * @param string $name var name to get/set
	 * @param mixed $value var value to set
	 * @param int $ttl time in seconds to store (0 - infinite)
	 * @return mixed
	 */
	public static function apc ( $name, $value = null, $ttl = 0 ) {
		$name = $_SERVER['SERVER_NAME'] . ':' . $name;
		if ( $value === null ) {
			// obtaining data
			$success = true;
			$value   = apc_fetch($name, $success);
			// fail to get
			if ( !$success ) $value = null;
		} else {
			// setting
			apc_store($name, $value, $ttl);
			fb($name, 'apc init store');
		}
		return $value;
	}

	/**
	 * Get/set variable using files in the cache directory
	 * if value set then setting otherwise - requesting
	 * @param string $file full file name
	 * @param mixed $value var value to set
	 * @return mixed cached value
	 */
	public static function file ( $file, $value = null ) {
		if ( $value === null && file_exists($file) ) {
			// obtaining data
			$value = file_get_contents($file);
		} else if ( $value !== null ) {
			// setting
			file_put_contents($file, $value);
			fb($file, 'file init store');
		}
		return $value;
	}

	/**
	 * Removes the given file or given dir and its content
	 * @param string $file full file name
	 */
	public static function file_clear ( $file ) {
		if ( is_dir($file) ) {
			fb($file, 'clear path');
			// delete all files in the directory
			array_map('unlink', glob($file . DIRECTORY_SEPARATOR . '*'));
			// delete the directory itself
			rmdir($file);
		} else if ( file_exists($file) ) {
			fb($file, 'clear file');
			unlink($file);
		}
	}

	/**
	 * Get/set the given user data using files in the cache directory
	 * if value set then setting otherwise - requesting
	 * file name is based on user id and is like PATH_CACHE/$path/0000000128
	 * @param string $path relative path to the data file
	 * @param mixed $value var value to set
	 * @param int $id_user user id if it's different from the session
	 * @return mixed
	 */
	public static function user ( $path = null, $value = null, $id_user = null ) {
		// get user either from parameter or from session
		if ( !$id_user ) $id_user = $_SESSION['user']['id'];
		$file = PATH_CACHE . ($path ? $path . DIRECTORY_SEPARATOR : '') . sprintf('%010s', $id_user);
		return self::file($file, $value);
	}

	/**
	 * Removes the given user data file or dir with its content
	 * @param string $path relative path to the data file
	 * @param int $id_user user id if it's different from the session
	 * @return mixed
	 */
	public static function user_clear ( $path = null, $id_user = null ) {
		// get user either from parameter or from session
		if ( !$id_user ) $id_user = $_SESSION['user']['id'];
		if ( $path ) {
			// single file should be cleared
    		self::file_clear(PATH_CACHE . $path . DIRECTORY_SEPARATOR . sprintf('%010s', $id_user));
		} else {
			// all user files should be cleared
			foreach (glob(PATH_CACHE . '*', GLOB_ONLYDIR) as $file) {
				self::file_clear($file . DIRECTORY_SEPARATOR . sprintf('%010s', $id_user));
			}
		}
	}


	public static function clear ( $list ) {
		foreach ( $list as $name ) {
			apc_delete($name);
			unset($_SESSION['cache'][$name]);
			//self::clear_file($name);
		}
	}

	/**
	 * List of entry types
	 * @return string json
	 */
	public static function db_entry_types () {
		if ( null === ($data = self::apc('lookup_entry_types')) ) {
			// cache is empty, filling
			$data = db::query('select * from entry_types');
			// saving json packed data
			$data = self::apc('lookup_entry_types', json_encode(array_pack(matrix_order($data, 'id')), JSON_NUMERIC_CHECK));
		}
		return $data;
	}

	/**
	 * List of note templates for given user + common
	 * @param int $id_user link to user otherwise taken from session
	 * @return string json
	 */
	public static function db_templates ( $id_user = null ) {
		if ( null === ($data_common = self::apc('lookup_note_templates')) ) {
			// cache is empty, filling
			$data_common = db::query('select id,1 as sys,name,tag,description from templates where id_user = 0 order by place');
			//$data_common = self::apc('lookup_note_templates', matrix_order($data_common, 'id'));
			$data_common = self::apc('lookup_note_templates', json_encode(array_pack($data_common), JSON_NUMERIC_CHECK));
		}
		return $data_common;

		// !!! not used till the templates will be user dependent
		// get user either from parameter or from session
//		if ( !$id_user ) $id_user = $_SESSION['user']['id'];
//		// obtaining data
//		if ( null === ($data = self::user('templates')) ) {
//			// common
//			if ( null === ($data_common = self::apc('lookup_note_templates')) ) {
//				// cache is empty, filling
//				$data_common = db::query('select id,1 as sys,name,tag,description from templates where id_user = 0 order by place');
//				//$data_common = self::apc('lookup_note_templates', matrix_order($data_common, 'id'));
//				$data_common = self::apc('lookup_note_templates', $data_common);
//			}
//			// user defined
//			$data_user = db::query('select id,0 as sys,name,tag,description from templates where id_user = @i order by place', $id_user);
//			//$data_user = matrix_order($data_user, 'id');
//			// saving merged json packed data
//			//fb($data_common + $data_user);
//			//fb(array_merge($data_common, $data_user));
//			//$data = self::user('templates', json_encode(array_pack($data_common + $data_user), JSON_NUMERIC_CHECK));
//			$data = self::user('templates', json_encode(array_pack(array_merge($data_common, $data_user)), JSON_NUMERIC_CHECK));
//		}
//		return $data ? $data : '{}';
	}

	/**
	 * List of template entries for given user + common
	 * @param int $id_user link to user otherwise taken from session
	 * @return string json
	 */
	public static function db_template_entries ( $id_user = null ) {
		if ( null === ($data_common = self::apc('lookup_template_entries')) ) {
			// cache is empty, filling
			$sql = 'select te.id_template,te.id_type,te.name from template_entries te, templates t where
				te.id_template = t.id and t.id_user = @i order by te.id_template,te.place';
			$data_common = db::query($sql, 0);
			$data_common = self::apc('lookup_template_entries', json_encode(array_pack(matrix_group($data_common, 'id_template')), JSON_NUMERIC_CHECK));
		}
		return $data_common;

		// !!! not used till the templates will be user dependent
		// get user either from parameter or from session
//		if ( !$id_user ) $id_user = $_SESSION['user']['id'];
//		// obtaining data
//		if ( null === ($data = self::user('template_entries')) ) {
//			$sql = 'select te.id_template,te.id_type,te.name from template_entries te, templates t where
//				te.id_template = t.id and t.id_user = @i order by te.id_template,te.place';
//			// common
//			if ( null === ($data_common = self::apc('lookup_template_entries')) ) {
//				// cache is empty, filling
//				$data_common = db::query($sql, 0);
//				$data_common = self::apc('lookup_template_entries', matrix_group($data_common, 'id_template'));
//			}
//			// user defined
//			$data_user = db::query($sql, $id_user);
//			$data_user = matrix_group($data_user, 'id_template');
//			// saving merged json packed data
//			$data = self::user('template_entries', json_encode(array_pack($data_common + $data_user), JSON_NUMERIC_CHECK));
//		}
//		return $data ? $data : '{}';
	}

	/**
	 * List of the given user tags with connections to other tags and uses amount
	 * @param int $id_user link to user otherwise taken from session
	 * @return string json
	 */
	public static function db_tags ( $id_user = null ) {
		// get user either from parameter or from session
		if ( !$id_user ) $id_user = $_SESSION['user']['id'];
		// obtaining data
		if ( null === ($data = self::user('tags')) ) {
			// cache is empty, filling
			if ( ($data = matrix_order(db::query('select id,name from tags where id_user = @i', $id_user), 'id')) ) {
				// expand each tag
				foreach ( $data as & $tag ) {
					$tag['links'] = array();
					$tag['uses']  = 0;
				}
				// get note tags connections
				$note_tags = matrix_group(db::query('select nt.id_note,nt.id_tag from note_tags nt, notes n where
					nt.id_note = n.id and n.id_user = @i and n.is_active = 1', $id_user), 'id_note');
				// determine links
				foreach ( $note_tags as $links )
					foreach ( $links as $lkey ) {
						$data[$lkey]['uses']++;
						foreach ( $links as $lval )
							if ( $lkey != $lval && !in_array($lval, $data[$lkey]['links']) ) $data[$lkey]['links'][] = $lval;
					}
			}
			// saving the json packed data
			$data = self::user('tags', json_encode(array_pack($data), JSON_NUMERIC_CHECK));
		}
		return $data ? $data : '{}';
	}

}
