/**
 * Main module to work with single note
 * creation, edit or view
 */
var NoteEditor = new function () {
	// for limited scopes
	var self = this;

	// input data length limit
	var maxlength_tags  = 1024,  // total length of all tags in the input field
		maxlength_title = 256;   // entry name max length

	// component state flag
	// true - everything is decoded
	// false - no plain data, everything is encrypted
	this.open = false;

	/**
	 * Open the subscriber
	 * master password is accessible
	 * decrypt all the data and show it
	 */
	this.EventOpen = function () {
		fb('EventOpen: NoteEditor');
		// open if there is a note
		if ( this.data ) {
			// iterate all entries
			for ( var i = 0; i < this.dom.entries.childNodes.length; i++ ) {
				//var entry = this.dom.entries.childNodes[i];
				with ( this.dom.entries.childNodes[i] ) {
					// set post data
					post.name_dec = App.Decode(post.name);
					post.data_dec = App.Decode(post.data);
					// set current data (taking either from post or decrypt)
					data.name_dec = ( post.name == data.name ) ? post.name_dec : App.Decode(data.name);
					data.data_dec = ( post.data == data.data ) ? post.data_dec : App.Decode(data.data);
					// enable all inputs
					dom.name.disabled = dom.data.disabled = false;
					// change input to decrypted values
					dom.name.value = data.name_dec;
					dom.data.value = data.data_dec;
					// update counter value
					dom.data.onkeyup();
				}
			}
			EnableControls(true);
			// tags block
			this.dom.tags.input.disabled = false;
			this.dom.tags.input.value = TagManager.IDs2Str(this.data.tags);
			// fill autocompleter
			var data = [];
			// prepare all tags
			for ( var tid in data_tags_idlist ) data.push([data_tags_idlist[tid], tid]);
			$(this.dom.tags.input).data('autocompleter').options.data = data;
		}
		// component state flag
		this.open = true;
	};

	/**
	 * Close the subscriber
	 * master password is expired and cleared
	 * clear all the decrypted data
	 */
	this.EventClose = function () {
		fb('EventClose: NoteEditor');
		// close only if opened at the moment and there is a note
		if ( this.data && this.open ) {
			// iterate all entries
			for ( var i = 0; i < this.dom.entries.childNodes.length; i++ ) {
				//var entry = this.dom.entries.childNodes[i];
				with ( this.dom.entries.childNodes[i] ) {
					// if data changed than reassing (taking either from post or encrypt)
					if ( data.name_dec != dom.name.value ) data.name = ( post.name_dec == dom.name.value ) ? post.name : App.Encode(dom.name.value);
					if ( data.data_dec != dom.data.value ) data.data = ( post.data_dec == dom.data.value ) ? post.data : App.Encode(dom.data.value);
					// clear post and current data
					post.name_dec = data.name_dec = null;
					post.data_dec = data.data_dec = null;
					// disable all inputs
					dom.name.disabled = dom.data.disabled = true;
					// change input to default hidden values
					dom.name.value = '********';
					dom.data.value = '[encrypted data]';
					// hide counter value
					dom.counter.innerHTML = '';
					// hide history block and clear content
					dom.history.style.display = 'none';
					elclear(dom.history);
					delete data.history;
				}
			}
			EnableControls(false);
			// tags block
			this.dom.tags.input.disabled = true;
			this.data.tags = TagManager.Str2IDs(this.dom.tags.input.value);
			this.dom.tags.input.value = '[encrypted tags]';
			// clear autocompleter
			$(this.dom.tags.input).data('autocompleter').options.data = [];
		}
		// component state flag
		this.open = false;
	};

	/**
	 * Quick check if the tag input changed since the last post
	 * @param data tags string
	 * @param post array of tag ids posted
	 * @return bool flag of change
	 */
	var TagsChanged = function ( data, post ) {
		// prepare input
		data = TagManager.Str2Names(data);
		post = post || [];
		// different size
		if ( data.length != post.length ) return true;
		// check parsed string
		for ( var i = 0; i < data.length; i++ ) {
			// new tag not posted to the server
			if ( !data_tags_nmlist[data[i]] ) return true;
			// differ from the posted tag at this index
			if ( post[i] != data_tags_nmlist[data[i]] ) return true;
		}
		return false;
	};

	/**
	 * Collect all the note and entries data
	 */
	var GetData = function () {
		// local vars
		var	i = 0, entry = null, deleted = [], ids = [];

		// get the list of tags ids and names
		self.data.tags = TagManager.Str2IDs(self.dom.tags.input.value);
		// tags changed since the last post
		if ( self.data.tags.join() != self.post.tags.join() ) {
			// drop flag or copy of tags
			self.post.tags = ( self.data.tags.length == 0 ) ? 0 : self.data.tags.slice();
		} else {
			// no changes so nothing to be sent
			delete self.post.tags;
		}

		// clear previous data
		self.post.entries = [];

		// fill the list of entries to be deleted
		for ( i = 0; i < self.dom.entries.childNodes.length; i++ )
			if ( self.dom.entries.childNodes[i].deleted ) deleted.push(self.dom.entries.childNodes[i]);

		// remove deleted entries
		for ( i = 0; i < deleted.length; i++ ) {
			// edit mode
			if ( deleted[i].data.id ) ids.push(deleted[i].data.id);
			// remove from dom
			self.dom.entries.removeChild(deleted[i]);
		}
		// there are some deleted entry ids
		if ( ids.length > 0 ) self.post.deleted = ids;

		//TODO: add real entries check (there maybe no one left)

		// iterate all entries
		for ( i = 0; i < self.dom.entries.childNodes.length; i++ ) {
			entry = self.dom.entries.childNodes[i];
			// collected data
			var post = {};
			// edit mode
			if ( entry.data.id ) post.id = entry.data.id;
			// if type changed since the last save or new mode
			if ( entry.post.id_type != entry.data.id_type || entry.data.id == undefined )
				post.id_type = entry.data.id_type;
			// entry name changed or new mode
			if ( entry.post.name_dec != entry.dom.name.value || entry.data.id == undefined ) {
				entry.data.name = post.name = ( entry.data.name_dec == entry.dom.name.value ) ? entry.data.name : App.Encode(entry.dom.name.value);
				entry.data.name_dec = entry.dom.name.value;
			}
			// entry value changed or new mode
			if ( entry.post.data_dec != entry.dom.data.value || entry.data.id == undefined ) {
				entry.data.data = post.data = ( entry.data.data_dec == entry.dom.data.value ) ? entry.data.data : App.Encode(entry.dom.data.value);
				entry.data.data_dec = entry.dom.data.value;
			}
			// type change block
			entry.dom.type.style.display = 'none';
			// hide history block
			entry.dom.history.style.display = 'none';
			// history block clear content
			elclear(entry.dom.history);
			delete entry.data.history;

			self.post.entries.push(post);
		}
		return self.post;
	};

	/**
	 * Saves all note changes
	 * 1. collects note and entries data
	 * 2. does ajax request to save
	 * 3. processing the response
	 */
	this.Save = function () {
		// disable controls to preven double posting
		EnableControls(false);
		SetTitleIcon('img/message.loading.gif');
		//$(this.dom.controls).addClass('loading');
		$.post('/note/save/' + (this.data.id || ''), GetData(), function(data){
			if ( data && data.id && data.entries ) {
				// the note is just created
				var is_new = !self.data.id ? true : false;
				// switch to edit mode if necessary
				self.data.id = data.id;
				// data container for entries
				var entries = [];
				// iterate all entries
				for ( var i = 0; i < self.dom.entries.childNodes.length; i++ ) {
					var entry = self.dom.entries.childNodes[i];
					// update data
					entry.data.id       = data.entries[i].id;
					entry.post.name     = entry.data.name;
					entry.post.name_dec = entry.data.name_dec;
					entry.post.data     = entry.data.data;
					entry.post.data_dec = entry.data.data_dec;
					entry.post.id_type  = entry.data.id_type;
					// clear color from inputs
					$(entry.dom.name).removeClass('changed');
					$(entry.dom.data).removeClass('changed');
					$(self.dom.tags.input).removeClass('changed');

					// change icons according to status
					if ( data.entries[i].changed ) entry.dom.icon.src = 'img/field_flag_ok.png';
					if ( data.entries[i].added )   entry.dom.icon.src = 'img/field_flag_add.png';

					// rebuild global data in case some items deleted or added
					entries.push(entry.data);
				}
				self.data.entries = entries;
				// tags processed
				if ( data.tags ) {
					// there are tags in response and correspond with sent ones
					if ( data.tags instanceof Array && self.data.tags.length == data.tags.length ) {
						for ( i = 0; i < data.tags.length; i++ ) {
							// check if the ecrypted string
							if ( isNaN(self.data.tags[i]) ) {
								// add new tag id and enc/dev values to the global lookup tables
								TagManager.Add(data.tags[i], self.data.tags[i]);
								// replace the ecrypted string with received id
								self.data.tags[i] = data.tags[i];
							}
						}
					}
					// show ok image
					self.dom.tags.icon.src = 'img/field_flag_ok.png';
				}
				// fill current tags data
				self.dom.tags.input.value = TagManager.IDs2Str(self.data.tags);
				// confirm posted tags
				self.post.tags = self.data.tags.slice();
				// clear deleted entries list
				delete self.post.deleted;
				// timer to set default images
				setTimeout(function(){
					// iterate all entries
					for ( var i = 0; i < self.dom.entries.childNodes.length; i++ )
						with ( self.dom.entries.childNodes[i] )
							dom.icon.src = 'img/field_' + data_entry_types.data[data.id_type][data_entry_types.defn.name] + '.png';
					self.dom.tags.icon.src = 'img/field_tag.png';
				}, 2000);

				if ( is_new ) {
					self.data.ctime = Math.round(new Date().getTime() / 1000);
					NoteList.NoteCreate(self.data);
				} else {
					self.data.mtime = Math.round(new Date().getTime() / 1000);
					//NoteList.dom.notes.removeChild(NoteList.dom.notes.active);
					NoteList.NoteUpdate(self.data);
				}
//				if ( NoteList.dom.notes.active ) {
//					var note = NoteList.dom.notes.active;
//					if ( NoteList.NoteVisible(note) ) NoteList.DrawNoteTags(note);
//				}
			} else {
				// invalid response from the server
			}
			// enable controls
			EnableControls(true);
			//$(self.dom.controls).removeClass('loading');
			// change icon if necessary
			SetTitleIcon();
		});
	};

	/**
	 * Control button change type
	 * @param entry pointer to the entry data
	 */
	var EntryBtnConfig = function ( entry ) {
		// crete list if not exist
		if ( entry.dom.type.childNodes.length == 0 ) {
			var list = table(1,0, {className:'list'}, {
				// set old desc
				onmouseout: function(){entry.dom.desc.innerHTML = entry.dom.desc.value;}
			});

			var cell = null;
			// build type list
			for ( var id in data_entry_types.data ) {
				cell = element('td', {className:entry.data.id_type == id ? 'current' : 'item'}, data_entry_types.data[id][data_entry_types.defn.name], {
					// set desc on mouse over action
					onmouseover: function(){entry.dom.desc.innerHTML = this.desc;},
					onclick: function(){
						if ( this.className == 'item' ) {
							// change name if default
							if ( entry.dom.name.value == data_entry_types.data[entry.data.id_type][data_entry_types.defn.name] ) {
								entry.dom.name.value = data_entry_types.data[this.type][data_entry_types.defn.name];
							}
							// prepare type, name and value
							entry.data.id_type  = this.type;
							entry.data.name     = App.Encode(entry.dom.name.value);
							entry.data.name_dec = entry.dom.name.value;
							entry.data.data     = App.Encode(entry.dom.data.value);
							entry.data.data_dec = entry.dom.data.value;
							// clone entry and do some sync
							var entry_new  = EntryCreate(entry.data);
							entry_new.post = entry.post;
							entry_new.dom.name.onchange();
							entry_new.dom.data.onchange();
							// insert and remove
							self.dom.entries.insertBefore(entry_new, entry);
							self.dom.entries.removeChild(entry);
						}
					}
				});
				cell.type = id;
				cell.name = data_entry_types.data[id][data_entry_types.defn.name];
				cell.desc = data_entry_types.data[id][data_entry_types.defn.description];
				elchild(list, cell);
			}
			elchild(entry.dom.type, list);
		}
		// show/hide block
		entry.dom.type.style.display = (entry.dom.type.style.display != 'block' ? 'block' : 'none' );
	};

	/**
	 * Control button to obtain and show entry history
	 * @param entry pointer to the entry data
	 */
	var EntryBtnHistory = function ( entry ) {
		// first time
		if ( !entry.data.history ) {
			// note and entry are from server
			if ( self.data.id && entry.data.id ) {
				elchild(elclear(entry.dom.history), element('div', {className:'info'}, 'loading ...'));
				$.post('/note/history/' + self.data.id + '/' + entry.data.id, function(history) {
					elclear(entry.dom.history);
					entry.data.history = history;
					var tbl = element('table', {className:'maxw'});
					if ( history.data.length ) {
						for ( var i = 0; i < history.data.length; i++ ) {
							var name = history.data[i][history.defn.name] ? App.Decode(history.data[i][history.defn.name]) : '';
							var data = history.data[i][history.defn.data] ? App.Decode(history.data[i][history.defn.data]) : '';
							tblrow(tbl,[
								// name and data
								element('span', {title:name}, ( name.length > 20) ? name.slice(0, 15) + '...' : name),
								element('span', {title:data}, ( data.length > 30) ? data.slice(0, 25) + '...' : data),
								// link to use
								element('a', {name:name, data:data}, 'use', {onclick:function(){
									entry.dom.name.value = this.name;
									entry.dom.data.value = this.data;
									entry.dom.name.onchange();
									entry.dom.data.onchange();
									entry.dom.history.style.display = 'none';
								}})
							], [{className:'name'}, {className:'data'}, {className:'ctrl'}]);
						}
						elchild(elclear(entry.dom.history), tbl);
					} else {
						// no history on the server
						elchild(elclear(entry.dom.history), element('div', {className:'info'},
							'there are no history records for this entry'));
					}
				});
			} else {
				// new entry
				entry.data.history = [];
				elchild(elclear(entry.dom.history), element('div', {className:'info'},
					'there are no history records for this entry'));
			}
		}
		// show/hide block
		entry.dom.history.style.display = (entry.dom.history.style.display != 'block' ? 'block' : 'none' );
	};

	/**
	 * Control button add new
	 * @param entry pointer to the entry data
	 */
	var EntryBtnAdd = function ( entry ) {
		// prepare name and value
		var name = data_entry_types.data[entry.data.id_type][data_entry_types.defn.name];
		// generate some password if pass type
		var data = ( entry.data.id_type == 4 ) ? pwdgen(20) : '';
		// clone
		var entry_new = EntryCreate({
			id_type : entry.data.id_type,
			name    : App.Encode(name),
			name_dec: name,
			data    : App.Encode(data),
			data_dec: data
		});
		self.dom.entries.insertBefore(entry_new, entry);
		$(entry_new.dom.name).addClass('changed');
		$(entry_new.dom.data).addClass('changed');
	};

	/**
	 * Control button move up
	 * @param entry pointer to the entry data
	 */
	var EntryBtnUp = function ( entry ) {
		// can be moved
		if ( entry.previousSibling ) {
			self.dom.entries.insertBefore(entry, entry.previousSibling);
		}
	};

	/**
	 * Control button move down
	 * @param entry pointer to the entry data
	 */
	var EntryBtnDown = function ( entry ) {
		// can be moved
		if ( entry.nextSibling ) {
			self.dom.entries.insertBefore(entry, entry.nextSibling.nextSibling);
		}
	};

	/**
	 * Control button delete
	 * @param entry pointer to the entry data
	 */
	var EntryBtnDelete = function ( entry ) {
		if ( self.dom.entries.childNodes.length > 1 ) {
			// hide entry
			$(entry.dom.undo).toggleClass('hidden');
			$(entry.dom.body).toggleClass('hidden');
			// set flag
			entry.deleted = true;
		}
	};

	/**
	 * Block of note entry title name input with controls
	 * @param entry pointer to the entry data
	 */
	var EntryBlockTitle = function ( entry ) {
		// editable name
		entry.dom.name = element('input', {type:'text', maxLength:maxlength_title, disabled:!self.open, value: entry.data.name_dec}, '', {
			onchange : function(){
				this.value = this.value.rtrim();
				// only for edit mode
				if ( self.data.id ) {
					if ( entry.post.name_dec != null && entry.post.name_dec != this.value )
						$(this).addClass('changed');
					else
						$(this).removeClass('changed');
				}
			}
		});
		$(entry.dom.name).keydown(function(event) {
			// up
			if ( event.which == 38 ) if ( entry.previousSibling ) entry.previousSibling.dom.name.focus();
			// down
			if ( event.which == 40 ) if ( entry.nextSibling ) entry.nextSibling.dom.name.focus();
		});
		// icon image
		entry.dom.icon  = element('img', {src:'img/field_' + data_entry_types.data[entry.data.id_type][data_entry_types.defn.name] + '.png', title:'drag and drop to change the entries order'});
		// top title line with name and controls
		entry.dom.title = tblrow(element('table', {className:'title'}), [entry.dom.icon, entry.dom.name, entry.dom.controls], [{className:'icon'}, {className:'name'}, {className:'controls'}]);
	};

	/**
	 * Block of note entry data input
	 * @param entry pointer to the entry data
	 */
	var EntryBlockInput = function ( entry ) {
		// types
		entry.dom.type = element('div', {className:'type'});
		// get the input data max length
		var limit = data_entry_types.data[entry.data.id_type][data_entry_types.defn.max];
		// create input depending on entry type
		if ( entry.data.id_type == 6 || entry.data.id_type == 7 ) {
			entry.dom.data = element('textarea', {className:'text', maxLength:limit, disabled:!this.open}, entry.data.data_dec);
			// keyboard navigation
			$(entry.dom.data).keydown(function(event) {
				//TODO: selectionStart is not cross-browser
				// up
				if ( event.which == 38 && entry.previousSibling && this.selectionStart == 0 ) entry.previousSibling.dom.data.focus();
				// down
				if ( event.which == 40 && entry.nextSibling && this.selectionStart == this.value.length ) entry.nextSibling.dom.data.focus();
			});
		} else {
			entry.dom.data = element('input', {type:'text', maxLength:limit, className:'line', disabled:!self.open, value: entry.data.data_dec});
			// keyboard navigation
			$(entry.dom.data).keydown(function(event) {
				// up
				if ( event.which == 38 ) if ( entry.previousSibling ) entry.previousSibling.dom.data.focus();
				// down
				if ( event.which == 40 ) if ( entry.nextSibling ) entry.nextSibling.dom.data.focus();
			});
		}
		// change color if changed in edit mode
		entry.dom.data.onchange = function() {
			this.value = this.value.rtrim();
			// only for edit mode
			if ( self.data.id ) {
				if ( entry.post.data_dec != null && entry.post.data_dec != this.value )
					$(this).addClass('changed');
				else
					$(this).removeClass('changed');
			}
			// in case this is url entry type
			if ( entry.data.id_type == 2 ) {
				RequestUrlTitle(this.value);
			}
		};

		// values history
		entry.dom.history = element('div', {className:'history'});

		// set chars count
		entry.dom.data.onkeyup = function(){
			entry.dom.counter.innerHTML = this.value.length;
			// red alert if data reached the length limit
			if ( this.value.length >= this.maxLength && entry.dom.counter.className != 'limit' ) {
				entry.dom.counter.className = 'limit';
			} else if ( this.value.length < this.maxLength && entry.dom.counter.className == 'limit' ) {
				entry.dom.counter.className = '';
			}
		};
		entry.dom.data.onkeydown = entry.dom.data.onkeyup;
	};

	var RequestUrlTitle = function ( url ) {
		//delete this.data.comment;
		var comment = null;
		// get an empty comment block
		for ( var i = 0; i < self.dom.entries.childNodes.length; i++ ) {
			var entry = self.dom.entries.childNodes[i];
			// plain text type
			if ( entry.data.id_type == 6 && entry.dom.data.value.trim() == '' ) {
				comment = entry.dom.data;
				break;
			}
		}
		// send request only if there is an empty comment entry
		if ( comment ) {
			url = 'http://query.yahooapis.com/v1/public/yql?q=' +
				'select * from html where url="' + encodeURIComponent(url) + '" and xpath="/html/head/title"&format=json';
			$.ajax(url, {crossDomain:true, dataType:'json',
				success: function(data){
					if ( data && data.query && data.query.results && data.query.results.title ) {
						comment.value = data.query.results.title;
						comment.onkeyup();
						comment.onchange();
					}
				}
			});
		}
	};

	/**
	* Parse data and fill the select list
	*/
	this.ProceedUrlIcon = function ( data ) {
		if ( data && data.query && data.query.results ) {
			fb(data);
		}
	};

	/**
	 * Block of note entry hint
	 * @param entry pointer to the entry data
	 */
	var EntryBlockHint = function ( entry ) {
		// entry description
		entry.dom.desc = element('span', {}, data_entry_types.data[entry.data.id_type][data_entry_types.defn.description]);
		entry.dom.desc.value = data_entry_types.data[entry.data.id_type][data_entry_types.defn.description];
		// letters counter with max length check
		entry.dom.counter = element('span', {className:entry.dom.data.value.length==entry.dom.data.maxLength?'limit':''}, !self.open ? '' : entry.dom.data.value.length);
		// bottom entry description and counter
		entry.dom.hint = tblrow(element('table', {className:'hint'}), [entry.dom.desc, entry.dom.counter], [{className:'text'}, {className:'counter'}]);
	};

	/**
	 * Block of note entry floating controls
	 * @param entry pointer to the entry data
	 */
	var EntryBlockControls = function ( entry ) {
		entry.dom.btn_config = element('img', {src:'img/field_btn_config.png', className:'button', title:'change entry type'}, null, {
			onclick:function(){EntryBtnConfig(entry);}
		});
		entry.dom.btn_history = element('img', {src:'img/field_btn_history.png', className:'button', title:'show/hide entry hisory values'}, null, {
			onclick:function(){EntryBtnHistory(entry);}
		});
		entry.dom.btn_add = element('img', {src:'img/field_btn_add.png', className:'button', title:'add new entry after this one'}, null, {
			onclick:function(){EntryBtnAdd(entry);}
		});
		entry.dom.btn_up = element('img', {src:'img/field_btn_up.png', className:'button', title:'move this entry one row up'}, null, {
			onclick:function(){EntryBtnUp(entry);}
		});
		entry.dom.btn_down = element('img', {src:'img/field_btn_down.png', className:'button', title:'move this entry one row down'}, null, {
			onclick:function(){EntryBtnDown(entry);}
		});
		entry.dom.btn_delete = element('img', {src:'img/field_btn_delete.png', className:'button', title:'delete this entry'}, null, {
			onclick:function(){EntryBtnDelete(entry);}
		});

		var buttons = [];
		// this is a password entry
		if ( entry.data.id_type == 4 ) {
			entry.dom.btn_pwdgen = element('img', {src:'img/field_btn_pwdgen.png', className:'button', title:'generate a new password'}, null, {
				onclick:function(){entry.dom.data.value = pwdgen(20);entry.dom.data.onchange();}
			});
			buttons.push(entry.dom.btn_pwdgen);
		}
		// all other buttons
		buttons.push(entry.dom.btn_config, entry.dom.btn_history, entry.dom.btn_add, entry.dom.btn_up, entry.dom.btn_down, entry.dom.btn_delete);
		// add entry control buttons
		return entry.dom.controls = element('div', {className:'hidden'}, buttons);
	};

	/**
	 * Single entry creation
	 * @param data entry details
	 */
	var EntryCreate = function ( data ) {
		// body of the entry
		var entry = element('div', {className:'entry'});
		// entry dom elements
		entry.dom = {
			undo: element('div', {className:'undo hidden'}),
			body: element('div', {className:'body'})
		};
		// entry db data
		entry.data = data || {};
		// entry type, name and value after each saving
		entry.post = {
			id_type : data.id_type,
			name    : data.name,
			name_dec: data.name_dec,
			data    : data.data,
			data_dec: data.data_dec
		};

		// blocks
		EntryBlockInput(entry);
		EntryBlockHint(entry);
		EntryBlockControls(entry);
		EntryBlockTitle(entry);

		// fill entry
		elchild(entry.dom.body, [entry.dom.title, entry.dom.type, entry.dom.data, entry.dom.history, entry.dom.hint]);
		elchild(entry, [entry.dom.undo, entry.dom.body]);
		// undo delete
		elchild(entry.dom.undo, element('a', {}, 'restore deleted entry', {onclick:function(){
			$(entry.dom.undo).toggleClass('hidden');
			$(entry.dom.body).toggleClass('hidden');
			entry.deleted = false;
		}}));

		// events
		$(entry).mouseenter(function(){
			// only if not closed
			if ( self.open ) {
				if ( !entry.previousSibling ) entry.dom.btn_up.className   = 'disabled'; else entry.dom.btn_up.className   = 'button';
				if ( !entry.nextSibling )     entry.dom.btn_down.className = 'disabled'; else entry.dom.btn_down.className = 'button';
				//TODO: add real entries check (there are hidden entries so failue here)
				if ( self.dom.entries.childNodes.length == 1 ) entry.dom.btn_delete.className = 'disabled'; else entry.dom.btn_delete.className = 'button';
				$(entry.dom.controls).fadeIn();
			}
		});
		$(entry).mouseleave(function(){
			// only if not closed
			if ( self.open ) {
				$(entry.dom.controls).fadeOut();
			}
		});
		$(entry).click(function(){
			// iterate all entries
//			for ( var i = 0; i < self.dom.entries.childNodes.length; i++ ) {
//				entry = self.dom.entries.childNodes[i];
//				$(entry.dom.body).removeClass('active');
//			}
//			$(this.dom.body).addClass('active');

		});
		return entry;
	};

	/**
	 * Block of note title
	 */
	var BlockTitle = function () {
		self.dom.title = element('div', {className:'caption'});
		self.dom.title.icon = element('img', {width:32, height:32, className:'hidden'}, null, {onload:function(){
			$(this).fadeIn();
		}});
		elchild(self.dom.title, tblrow(element('table', {className:'maxw'}),[
				self.dom.title.icon,
				[element('div',{className:'main'},'Note'), element('div',{className:'hint'},'creation, edit or view')],
				[self.data.ctime ? element('div',{},'created: ' + TimestampToDateStr(self.data.ctime)) : '',
				 self.data.mtime ? element('div',{},'edited: ' + TimestampToDateStr(self.data.mtime)) : '']
			], [{className:'icon'}, {className:'name'}, {className:'info'}])
		);
	};

	/**
	 * Block of note entries
	 */
	var BlockEntries = function () {
		// list of all entries
		self.dom.entries = element('div', {className:'entries'});

		// iterate all prepared entries
		for ( var i = 0; i < self.data.entries.length; i++ ) {
			// new entry creation and add to list
			elchild(self.dom.entries,
				EntryCreate(self.data.entries[i]));
		}

		// drag and drop
		//$(self.dom.entries).sortable({containment:'parent', cursor:'move', handle:'.title .icon'});

		// return container
		return self.dom.entries;
	};

	/**
	 * Block of tags work
	 */
	var BlockTags = function () {
		// tags input
		var input = element('input', {type:'text', maxLength:maxlength_tags, disabled:!self.open, className:'line', value:''});
		// icon
		var icon = element('img', {src:'img/field_tag.png'});
		// tags container
		self.dom.tags = element('div', {className:'tags'}, [
			tblrow(element('table', {className:'title'}), [icon, 'tags'], [{className:'icon'}, {className:'name'}]),
			input,
			element('div', {className:'hint'}, 'list of associated tags separated by space')
		]);
		// pointers
		self.dom.tags.input = input;
		self.dom.tags.icon  = icon;
		// change color if changed in edit mode
		input.onchange = function() {
			// only for edit mode
			if ( self.data.id ) {
				// tags changed since the last post
				if ( TagsChanged(this.value, self.post.tags) ) {
					$(this).addClass('changed');
				} else {
					$(this).removeClass('changed');
				}
			}
			// change icon if necessary
			//SetTitleIcon();
		};

		var data = [];
		// prepare all tags
		for ( var tid in data_tags_idlist ) data.push([data_tags_idlist[tid], tid]);
		// add autocompletion
		$(self.dom.tags.input).autocomplete({
			matchInside: false,
			selectFirst: true,
			useDelimiter: true,
			delimiterChar: ' ',
			delimiterKeyCode: 32,
			minChars: 1,
			autoWidth: 'width',
			delay: 200,
			data: data,
			showResult: function(tag){
				// wrap to div with icon
				return '<div class="tag">' + tag + '</div>';
			},
			processData: function(data){
				// get tags array
				var result = [], tags = self.dom.tags.input.value.match(/(\S+)/g);
				// truncate available suggestion options
				data.each(function(item){
					if ( !tags.has(item[0]) ) result.push(item);
				});
				return result;
			}
		});

//		var timer = null;
//		input.onkeydown = function() {
//			// only for edit mode
//			if ( self.data.id ) {
//				if ( timer ) clearTimeout(timer);
//				timer = setTimeout(function(){self.dom.tags.input.onchange();}, 300);
//			}
//		}
		// return container
		return self.dom.tags;
	};

	/**
	 * Block of button controls
	 */
	var BlockControls = function () {
		// return container
		return self.dom.controls = element('div', {className:'buttons'}, [
			element('input', {type:'button', value:'Back', className:'button'}, null, {onclick:function(){self.Escape();}}),
			element('input', {type:'button', value:'Save', className:'button bold', title:'press Ctrl+Enter to save'}, null, {onclick:function(){self.Save();}})
		]);
	};

	/**
	 * Event management
	 */
	var SetEvents = function () {
		// save
		$(self.dom.handle).bind('keypress', function(event) {
			if ( event.which == 13 ) {
				// save on Ctrl+Enter
				if ( event.ctrlKey ) {
					//event.preventDefault();
					//event.stopPropagation();
					self.Save();
				} else {
					// Enter pressed
				}
			}
		});
		// cancel
		$(self.dom.handle).bind('keydown', function(event) {
			if ( event.which == 27 ) {
				// exit from here
				self.Escape();
			}
		});
	};

	/**
	 * Enebles/disables the control buttons
	 * @param state bool flag
	 */
	var EnableControls = function ( state ) {
		if ( self.dom.controls ) {
			var controls = self.dom.controls.childNodes;
			for ( var i = 0;  i < controls.length; i++ ) {
				controls[i].disabled = !state;
			}
		}
	};

	this.Escape = function () {
		// get note from the list using current id
		var note = NoteList.GetNoteByID(self.data.id);
		// found
		if ( note !== false ) {
			// remove acitve cursor
			NoteList.SetNotesState([note], 'active', false);
		}
		// clear previous content
		elclear(this.dom.handle);
		delete this.data;
		delete this.post;
		//this.open = true;
		self.Show(false);
		TemplateList.Show(true);
	};

	/**
	 * Creates a new note
	 */
	this.Create = function ( template ) {
		if ( console.time ) console.time('entry create');
		// set data
		this.data = {tags:[], entries: []};
		// data to be send on save
		self.post = {tags:[]};
		// local vars
		var id_template = template[data_templates.defn.id],
			id_type, name, data, tag;
		// template is given and valid
		if ( template && data_template_entries.data[id_template] ) {
			// fill the list of entries
			for ( var i = 0; i < data_template_entries.data[id_template].length; i++ ) {
			//for ( var i in data_template_entries.data[id_template] ) {
				// get the entry type
				id_type = data_template_entries.data[id_template][i][data_template_entries.defn.id_type];
				// prepare name and data
				name = data_template_entries.data[id_template][i][data_template_entries.defn.name];
				// generate some password if pass type
				data = ( id_type == 4 ) ? pwdgen(20) : '';
				// adding
				this.data.entries.push({
					id_type : id_type,
					name    : App.Encode(name),
					name_dec: name,
					data    : App.Encode(data),
					data_dec: data
				});
			}
			// default tag
			tag = template[data_templates.defn.tag];
			this.data.tags = TagManager.Str2IDs(tag);
		// no templates selected so just add one simple entry
		} else {
			name = data_entry_types.data[1][data_entry_types.defn.name];
			data = tag = '';
			// adding
			this.data.entries = [{
				id_type : 1,
				name    : App.Encode(name),
				name_dec: name,
				data    : App.Encode(data),
				data_dec: data
			}];
		}
		// compile all blocks together
		Build();
		// tags plain string
		this.dom.tags.input.value = tag;
		SetTitleIcon();
		if ( console.timeEnd ) console.timeEnd('entry create');
	};

	/**
	 * Loads the existing note
	 * @param data note details
	 */
	this.Load = function ( data ) {
		if ( console.time ) console.time('entry load');
		// set data
		this.data = data;
		// data to be send on save
		self.post = {
			tags: data.tags ? data.tags.slice() : [] // copy of tags
		};
		// data is given and valid
		if ( data.id && data.entries && data.entries instanceof Array ) {
			// decode data in each entry and reorganize
			for ( var i = 0; i < data.entries.length; i++ ) {
				var entry = data.entries[i];
				// wrap encoded and decoded values
				entry.name_dec = App.Decode(entry.name);
				entry.data_dec = App.Decode(entry.data);
			}
		} else {
			// invalid input so switch to new mode
			this.Create();
		}
		// compile all blocks together
		Build();
		// tags plain string
		this.dom.tags.input.value = TagManager.IDs2Str(this.data.tags);
		SetTitleIcon();
		if ( console.timeEnd ) console.timeEnd('entry load');
	};

	/**
	 * Returns the open at the moment note id
	 */
	this.GetNoteID = function () {
		return ( this.data && this.data.id ? this.data.id : null );
	}

	var SetTitleIcon = function ( icon ) {
		if ( !icon ) {
			icon = 'img/tag_note.png';
			var tags = self.dom.tags.input.value.match(/(\S+)/g);
			// check parsed string
			if ( tags && tags instanceof Array ) {
				// iterate words in the input string
				for ( var i = 0; i < tags.length; i++ ) {
					if ( icon_tags.indexOf(tags[i]) >= 0 ) {
						icon = 'img/tag_' + tags[i] + '.png';
						break;
					}
				}
			}
		}
		if ( self.dom.title.icon.src.search(icon) < 0 ) {
			self.dom.title.icon.src = icon;
		}
	};

	/**
	 * Compiles all blocks together
	 */
	var Build = function () {
		with ( self ) {
			// all blocks
			BlockTitle();
			BlockEntries();
			BlockTags();
			BlockControls();

			// clear previous handle content
			elclear(dom.handle);

			// build all blocks together
			elchild(dom.handle, [
				dom.title,
					element('div', {className:'divider'}),
				dom.entries,
					element('div', {className:'divider'}),
				dom.tags,
					element('div', {className:'divider'}),
				dom.controls
			]);

			// focus to the first input
			//dom.entries.childNodes[0].dom.data.focus();
		}
		TemplateList.Show(false);
		self.Show(true);

	};

//	var BuildTemplates = function () {
//		var gr1 = TpList.AddGroup('Common templates');
//		var gr2 = TpList.AddGroup('My personal templates');
//
//		for ( var i = 0; i < data_templates.data.length; i++ ) {
//			//fb(data_templates.data[i]);
//			if ( data_templates.data[i][data_templates.defn.sys] == 1 ) {
//				TpList.AddItem(gr1, data_templates.data[i]);
//				//TpList.AddItem(gr1, data_templates.data[i][data_templates.defn.id], data_templates.data[i][data_templates.defn.name], data_templates.data[i][data_templates.defn.description]);
//			} else {
//				TpList.AddItem(gr2, data_templates.data[i]);
//				//TpList.AddItem(gr2, data_templates.data[i][data_templates.defn.id], data_templates.data[i][data_templates.defn.name], data_templates.data[i][data_templates.defn.description]);
//			}
//		}
//	}

	/**
	 * Shows/hides the component
	 * @param state visibility flag: true - show, false - hide
	 */
	this.Show = function ( state ) {
		this.dom.handle.style.display = state ? 'block' : 'none';
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
		// handler on note save
		this.onsave = params.onsave || null;
		// handler on cancel note adding or edit
		this.oncancel = params.oncancel || null;
		// event handlers
		SetEvents();
	};
};