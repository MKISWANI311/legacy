/**
 * Module to work with note list
 * view all, selecting, checking, appending, filtering
 */
var NoteList = new function () {
	// for limited scopes
	var self = this;

	// component state flag
	// true  - everything is decoded
	// false - no plain data, everything is encrypted
	this.open = false;

	var hint_tag_include   = 'click on this tag to include it to the search';
	var hint_tag_exclude   = 'click on this tag to exclude it from the search';
	var hint_info_missing  = 'there is no data';
	var hint_tags_missing  = 'there are no tags';
	var hint_notes_visible = 'the limited amount of visible notes received according the search options (usually the first 20)';
	var hint_notes_total   = 'the general amount of notes satisfying the giving search options';
	var hint_notes_filtered= 'the amount of notes excluded from the note list due to the search filter';

	var msg_checked_notes_remove  = 'You are going to delete all checked notes in the note list. Do you really want to continue?';
	var msg_checked_notes_restore = 'You are going to restore all checked notes in the note list. Do you really want to continue?';

	var msg_checked_notes_removed = 'The selected notes were successfully removed ';
	var msg_checked_notes_restored= 'The selected notes were successfully restored ';

	/**
	 * Open the subscriber
	 * master password is accessible
	 * decrypt all the data and show it
	 */
	this.EventOpen = function () {
		elclear(this.dom.notes);
		// show info and controls
		this.dom.tpbar.style.display = 'block';
		// component state flag
		this.open = true;
	};

	/**
	 * Close the subscriber
	 * master password is expired and cleared
	 * clear all the decrypted data
	 */
	this.EventClose = function () {
		// close only if opened at the moment
		if ( this.open ) {
			// clear decoded entries data in the requested notes
			this.data.notes.each(function(note){
				// all note entries
				note.entries.each(function(entry){
					// remove if exist
					delete entry.name_dec;
					delete entry.data_dec;
				});
				// all data for filtering
				delete note.fulltext;
			});
			// hide info and controls
			this.dom.tpbar.style.display = 'none';
			// clear notes
			elclear(this.dom.notes);
			// component state flag
			this.open = false;
		}
	};

	/**
	 * Deletes or restores the given list of notes depending on the undo flag
	 * @param list array of note ids
	 * @param undo bool flag: true - restore notes, delete otherwise
	 */
	var NotesDelete = function ( list, undo ) {
		// check input
		if ( list.length > 0 ) {
			// send request
			$.post('/note/delete' + (undo ? '/undo' : ''), {ids:list}, function(data){
				// remove old messages
				NoteFilter.MsgClear();
				// on success
				if ( !data.error ) {
					// prepare message body
					var message = [(undo ? msg_checked_notes_restored : msg_checked_notes_removed) + '(amount:' + data.count + '). '];
					// after deletion allow to go to the deleted notes
					if ( !undo ) message.push(' It is still possible to ', element('a', {className:'bold'}, 'restore them', {onclick:function(){NoteFilter.RequestDeleted();}}));
					// close currently edited note if affected
					if ( list.has(NoteEditor.GetNoteID()) ) NoteEditor.Escape();
					// show status message
					NoteFilter.MsgAdd(message);
					// refresh note list
					NoteFilter.NotesRequest();
				} else {
					NoteFilter.MsgAdd('The request was not successful. The response from the server: ' + data.error, 'error');
				}
			});
		}
	};

	/**
	 * Makes a visualization of the given note entries details
	 * @param note array note attributes
	 * @param icon img node for note icon
	 * @return array of html nodes or hint string
	 */
	var BuildNoteInfo = function ( note, icon ) {
		var list = [], fulltext = [], url = null;
		// iterate all note entries
		note.entries.each(function(entry){
			// decrypt data
			var name = App.Decode(entry.name);
			var data = App.Decode(entry.data);
			// prepare fulltext data
			fulltext.push(name.toLowerCase());
			fulltext.push(data.toLowerCase());
			// there is data and it's not a password
			if ( entry.id_type !== 4 && data ) {
				// truncate
				var sname = name.length > 30 ? name.slice(0, 25) + '...' : name;
				var sdata = data.length > 50 ? data.slice(0, 35) + '...' : data;
				// url
				if ( entry.id_type === 2 ) {
					// http/https/ftp and have point
					if ( (data.search('http://') >= 0 || data.search('https://') >= 0 || data.search('ftp://') >= 0) && data.search('.') >= 0 ) {
						sdata = element('a', {target:'_blank', href:data}, sdata);
						// the first available url
						if ( !url ) url = data;
					} else {
						// just server name
						sdata = element('b', {}, sdata);
					}
				}
				list.push(element('span', {className:'name'}, sname + ':'));
				list.push(element('span', {className:'data'}, sdata));
			}
		});
		// has valid url (the first one)
		if ( url ) {
			// get rid of all unnecessary parts
			url = url.split('/');
			// parts are valid
			if ( url[2] && url[2] != 'localhost' ) {
				// try to get image, won't repclace the current one if no icon found
				element('img', {className:'icon', src:'https://getfavicon.appspot.com/' + url[0] + '//' + url[2] + '?defaulticon=none'}, null, {onload:function(){
					// icon loaded so get current icon parent
					var parent = icon.parentNode;
					// and replace the current one
					parent.removeChild(icon);
					// with new
					elchild(parent, this);
					//self.dom.entries.insertBefore(entry, entry.previousSibling);
				}})
			}
		}
		// build search full text data
		note.fulltext = fulltext.join("\n");
		// warning if no data
		return list.length > 0 ? list : element('div', {className:'warn'}, hint_info_missing);
	}

	/**
	 * Tag button click handler
	 * include, exclude and subtract
	 */
	var TagClickHandler = function ( event ) {
		// ctrl holding
		if ( event.ctrlKey ) {
			NoteFilter.TagSubtract(this.tagnm);
		} else {
			if ( this.finc ) {
				// available for selection
				NoteFilter.TagInclude(this.tagnm);
			} else {
				// already selected
				NoteFilter.TagExclude(this.tagnm);
			}
		}
		// prevent bubbling
		return false;
	};

	/**
	 * Makes a list of note tags buttons with handlers
	 * @param note array note attributes
	 * @return array of html tag nodes or hint string
	 */
	var BuildNoteTags = function ( note ) {
		var list = [], exc = [], inc = [];
		// there is some data
		if ( note.tags.length > 0 ) {
			// separate tags
			note.tags.each(function(item){
				if ( !NoteFilter.data.tinc.has(item) ) exc.push(data_tags_idlist[item]); else inc.push(data_tags_idlist[item]);
			});
			// forms the list of tags already selected
			inc.sort().each(function(item){
				// create html wrapper for tag
				item = element('span', {className:'tag include', tagnm:item, title:hint_tag_exclude}, item);
				// mouse click handler
				$(item).bind('click', TagClickHandler);
				list.push(item);
			});
			// forms the list of tags available for selection
			exc.sort().each(function(item){
				// create html wrapper for tag
				item = element('span', {className:'tag', finc:true, tagnm:item, title:hint_tag_include}, item);
				// mouse click handler
				$(item).bind('click', TagClickHandler);
				list.push(item);
			});
		}
		// list of tags or missing hint
		return list.length > 0 ? list : hint_tags_missing;
	}

	/**
	 * Returns the corresponding note icon image address
	 * @param note array note attributes
	 * @return url string
	 */
	var GetNoteIcon = function ( note ) {
		// prepare
		var icon = 'img/tag_note.png',
			tags = TagManager.IDs2Names(note.tags);
		// iterate words in the tag list
		tags.each(function(item){
			// it's a tag from the global set
			if ( icon_tags.has(item) ) {
				// get the first match
				icon = 'img/tag_' + item + '.png';return;
			}
		});
		return icon;
	}

	/**
	 * Shows/hides checked notes controls and general notes info
	 * @param ctrlonly flag to skip or not the control buttons
	 */
	this.UpdateCtrlBlock = function ( ctrlonly ) {
		//var total = self.dom.notes.childNodes.length;
		if ( !ctrlonly ) {
			// list of visible notes
			var visible = this.GetNotesVisible();
			// clear and fill
			elchild(elclear(self.dom.tpinfo), [
				// block with amount
				element('span', {}, [
					// title
					element('p', {}, 'notes '),
					// amount of visible notes
					element('b', {title:hint_notes_visible}, visible.length), ' of ', element('b', {title:hint_notes_total}, this.data.total),
					// total amount of notes
					( visible.length < this.data.notes.length ? [element('p', {className:'div'}, '|'), element('b', {title:hint_notes_filtered}, this.data.notes.length - visible.length), ' filtered'] : null),
					// link to load all available notes
					( this.data.notes.length < this.data.total ? [element('p', {className:'div'}, '|'), element('a', {className:'bold'}, 'load all', {onclick:function(){
						NoteFilter.NotesRequest(true);
					}})] : null)
				]),
				// block with selection
				element('span', {}, [
					// title
					element('p', {}, 'select '),
					// link to select all notes
					element('a', {}, 'all', {onclick:function(){
						self.SetNotesState(visible, 'marked', true);
						self.UpdateCtrlBlock(true);
					}}),
					element('p', {className:'div'}, '|'),
					// link to remove selection from all notes
					element('a', {}, 'none', {onclick:function(){
						self.SetNotesState(visible, 'marked', false);
						self.UpdateCtrlBlock(true);
					}}),
					element('p', {className:'div'}, '|'),
					// link to invert selection
					element('a', {}, 'invert', {onclick:function(){
						self.SetNotesState(visible, 'marked');
						self.UpdateCtrlBlock(true);
					}})
				]),
			]);
		}
		// get the list of checked notes
		var checked = this.GetNotesByState('marked');
		// hide all buttons
		this.dom.btndelete.style.display  = 'none';
		this.dom.btnrestore.style.display = 'none';
		// show only the corresponding one
		if ( checked.length > 0 ) (NoteFilter.data.wcmd.has('deleted') ? this.dom.btnrestore : this.dom.btndelete).style.display = 'block';
		// show/hide block depending on notes amount
		this.dom.tpbar.style.display = this.data.total == 0 ? 'none' : 'block';
	}

	/**
	 * Set the default note state, removes additional classes and resets the state flags
	 * @param notes if given than it's the only note list to be reset
	 */
	this.ClearNotesState = function ( notes ) {
		// all notes or the given one/ones
		var i, list = notes || self.dom.notes.childNodes;
		// iterate formed list
		for ( i = 0; i < list.length; i++ ) {
			// reset class
			list[i].className = 'note';
			// reset state flags
			list[i].state.active = list[i].state.marked = false;
		}
	}

	/**
	 * Sets the flag and clall to the given note/notes
	 * @param notes to be processed
	 * @param type string name active | marked
	 * @param state optional bool flag, if set true - set, false - unset
	 */
	this.SetNotesState = function ( notes, type, state ) {
		// check input
		if ( notes.length > 0 ) {
			notes.each(function(note){
				// determine the state to switch to
				note.state[type] = state !== undefined ? state : (note.state[type] ? false : true);
				// invert class
				$(note).toggleClass(type, note.state[type]);
			});
		}
	}

	/**
	 * Returns the list of notes with the given state
	 * @param type string state name active | marked
	 * @return array of nodes
	 */
	this.GetNotesByState = function ( type ) {
		// all notes or only the given one
		var i, result = [], list = self.dom.notes.childNodes;
		// iterate formed list
		for ( i = 0; i < list.length; i++ ) {
			if ( list[i].state[type] === true ) result.push(list[i]);
		}
		return result;
	}

	/**
	 * Returns the html note block by id if found or false otherwise
	 * @param id int note attribute
	 * @return node with data or false on failure
	 */
	this.GetNoteByID = function ( id ) {
		// iterate note list
		for ( var i = 0, list = this.dom.notes.childNodes; i < list.length; i++ ) {
			// return if matched
			if ( list[i].data.id === id ) return list[i];
		}
		return false;
	}

	/**
	 * Returns the list of visible notes
	 * @return array of nodes
	 */
	this.GetNotesVisible = function () {
		// iterate note list
		for ( var i = 0, result = [], list = this.dom.notes.childNodes; i < list.length; i++ ) {
			// fill the visible notes list
			if ( !list[i].style.display ) result.push(list[i]);
		}
		return result;
	}

	/**
	 * Whole note ckick handler
	 * highlights the active note or note range
	 * holding Ctrl checks/unchecks the selected notes
	 * holding Shift selects all the notes between old and new selected notes
	 * @param event jquery event object
	 */
	var NoteClickHandler = function ( event ) {
		// holding Ctrl key
		if ( event.ctrlKey ) {
			self.SetNotesState([this], 'marked');
		// simple mouse click
		} else {
			// currently active note list
			var alast = self.GetNotesByState('active');
			// flag true if the clicked note is the same as already active
			var fsame = alast.length > 0 && alast[0].data.id === this.data.id;
			// check current note modifications
			var has_changes = NoteEditor.HasChanges();
			// not changed or user confirmed his wish
			if ( !has_changes || fsame || (has_changes && NoteEditor.ConfirmExit()) ) {
				// reset all notes states
				self.ClearNotesState();
					// check if the edited note is not already active
				if ( NoteEditor.GetNoteID() !== this.data.id ) {
					// show note details
					NoteEditor.Load(this.data);
				}
				// make active
				self.SetNotesState([this], 'active');
				// holding Shift key
				if ( event.shiftKey ) {
					var i, item, cflag = false;
					// iterate all notes
					for ( i = 0; i < self.dom.notes.childNodes.length; i++ ) {
						// cursor
						item = self.dom.notes.childNodes[i];
						// flag showing that the cursor is inside the range
						if ( item.data.id === alast[0].data.id || item.data.id === this.data.id ) cflag = !cflag;
						// check inside the range or edge items
						if ( cflag || item.data.id === alast[0].data.id || item.data.id === this.data.id ) {
							self.SetNotesState([item], 'marked');
						}
					}
				} else {
					// check the only clicked note
					self.SetNotesState([this], 'marked');
				}
			}
		}
		// show/hide checked notes controls
		self.UpdateCtrlBlock();
		// prevent bubbling
		//return false;
	}

	/**
	 * Note checkbox ckick handler
	 */
	var NoteTickClickHandler = function () {
		// check/uncheck
		self.SetNotesState([this.note], 'marked');
		// show/hide checked notes controls
		self.UpdateCtrlBlock();
		// prevent bubbling
		return false;
	}

	/**
	 * Forms the note wrapper
	 * @param data array of note parameters
	 * @return formed node with data
	 */
	this.BuildNote = function ( data ) {
		// note body
		var note = element('div', {className:'note', data:data, dom:{}, state:{}});
		// note content
		elchild(note, [
			element('div', {className:'icon'}, [
				note.dom.icon = element('img', {className:'icon', src:GetNoteIcon(data)}),
				//note.dom.icon = BuildNoteIcon(data),
				note.dom.tick = element('div', {className:'tick', note:note})
			]),
			element('div', {className:'body'}, [
				note.dom.info = element('div', {className:'info'}, BuildNoteInfo(data, note.dom.icon)),
				note.dom.time = element('div', {className:'time'}, TimestampToDateStr(data.mtime)),
				note.dom.tags = element('div', {className:'tags'}, BuildNoteTags(data))
			])
		]);
		// whole note ckick
		$(note).bind('click', NoteClickHandler);
		// checkbox click
		$(note.dom.tick).bind('click', NoteTickClickHandler);
		// note html body
		return note;
	}

	/**
	 * Shows/hides notes according to the filter
	 * @param notes array of notes that should be processed, all if not given
	 */
	this.SetNotesVisibility = function ( notes ) {
		// all notes or the given one/ones
		notes = notes || this.dom.notes.childNodes;
		var i, visible,  // flag for visibility
			hlist = [];  // list of the notes that should be hidden
		// iterate formed list
		for ( i = 0; i < notes.length; i++ ) {
			// by default is visible
			visible = true;
			// check by tags
			//TODO:???
			// check by filter string if still visible
			if ( visible ) {
				// check included words
				NoteFilter.data.winc.each(function(word){
					// not found in fulltext so exit
					if ( notes[i].data.fulltext.indexOf(word.toLowerCase()) < 0 ) {visible = false;return;}
				});
				// still visible
				if ( visible ) {
					// check excluded words
					NoteFilter.data.wexc.each(function(word){
						// found in fulltext so exit
						if ( notes[i].data.fulltext.indexOf(word.toLowerCase()) >= 0 ) {visible = false;return;}
					});
				}
			}
			// apply visibility flag
			notes[i].style.display = visible ? '' : 'none';
			// fill the list of notes to be hidden
			if ( !visible ) hlist.push(notes[i]);
		}
		// clear inner state for hidden notes
		this.ClearNotesState(hlist);
		this.UpdateCtrlBlock();
	}

	/**
	 * Fills the note list with generated notes
	 * @param notes array of notes or false if gloabal latest list should be used
	 * @param total int general amount of notes
	 */
	this.BuildTable = function ( notes, total ) {
		// check input
		notes = notes instanceof Array ? notes : [];
		// set global data
		this.data.notes = notes;
		this.data.total = total;
		// clearing the container
		elclear(this.dom.notes);
		// there are some notes
		if ( total > 0 ) {
			// determine the note id beeing edited at the moment
			var note, neid = NoteEditor.GetNoteID();
			// iterate all notes
			notes.each(function(item){
				// append the created note to the list
				note = self.BuildNote(item);
				self.SetNotesVisibility([note]);
				elchild(self.dom.notes, note);
				// highlight the edited at the moment note
				if ( neid === item.id ) self.SetNotesState([note], 'active');
			});
		}
		// show/hide control panel
		this.UpdateCtrlBlock();
		// adsense
		elchild(elclear(this.dom.btbar), element('span', {}, '[Google ADs here]'));
	};

	/**
	 * Deletes or restore selected notes depending on undo flag
	 */
	var BtnDeleteHandler = function () {
		// ask user
		if ( confirm(this.undo ? msg_checked_notes_restore : msg_checked_notes_remove) ) {
			var list = [];
			// iterate all checked notes
			self.GetNotesByState('marked').each(function(note){
				// fill id list
				if ( note.data.id ) list.push(note.data.id);
			});
			// send request
			NotesDelete(list, this.undo);
		}
	}

	/**
	 * Main init method
	 * @param params list of configuration parameters
	 */
	this.Init = function ( params ) {
		// check input
		if ( !params.handle ) return;
		// html parent object
		this.dom = {handle:params.handle};

		this.data = {
			total : 0,  // total amount on notes
			notes : []  // all requested notes data array
		};

		// build all blocks together
		elchild(this.dom.handle, [
			// top panel
			this.dom.tpbar = element('div', {className:'tpbar'}, [
				// controls
				this.dom.tpctrl = element('div', {className:'ctrl'}, [
					this.dom.btndelete  = element('input', {type:'button', value:'Delete', undo:false, className:'button hidden'}, null, {onclick:BtnDeleteHandler}),
					this.dom.btnrestore = element('input', {type:'button', value:'Restore', undo:true, className:'button hidden'}, null, {onclick:BtnDeleteHandler})
				]),
				// general info, load all, select all/none/invert
				this.dom.tpinfo = element('div', {className:'info'})
			]),
			// note list
			this.dom.notes = element('div', {className:'notes'}),
			// bottom panel
			this.dom.btbar = element('div', {className:'btbar'})
		]);

		// disable selection
		this.dom.notes.onselectstart = function () {return false;} // ie
		this.dom.notes.onmousedown   = function () {return false;} // mozilla
	};
};