/**
 * Main module to work with single note
 * creation, edit or view
 */
var NoteList = new function () {
	// for limited scopes
	var self = this;

	// component state flag
	// true  - everything is decoded
	// false - no plain data, everything is encrypted
	this.open = true;

	var hint_tag_include = 'click on this tag to include it to the search';
	var hint_tag_exclude = 'click on this tag to exclude it from the search';
	var hint_tag_missing = 'there are no tags specified for this note';

	/**
	 * Open the subscriber
	 * master password is accessible
	 * decrypt all the data and show it
	 */
	this.EventOpen = function () {
		fb('EventOpen: NoteList');
		elclear(self.dom.notes);
		// fill notes
		self.BuildTable(false);
		// component state flag
		this.open = true;
	};

	/**
	 * Close the subscriber
	 * master password is expired and cleared
	 * clear all the decrypted data
	 */
	this.EventClose = function () {
		fb('EventClose: NoteList');
		// close only if opened at the moment
		if ( this.open ) {
			// clear notes
			elclear(self.dom.notes);
			// component state flag
			this.open = false;
		}
	};

	var SetNoteIcon = function ( note ) {
		var icon = 'img/tag_note.png',
			tags = TagManager.IDs2Names(note.data.tags);
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
		var entries = note.data.entries;
		//fb(note);
		for ( var j in entries ) {
			if ( entries[j].id_type == 2 ) {
				var url = App.Decode(entries[j].data);
				if ( url.search('http://') >= 0 || url.search('https://') >= 0 ) {
					url = url.replace('http://', '');
					url = url.replace('https://', '');
					url = url.split('/');
					if ( url[0] ) {
						icon = 'http://www.getfavicon.org/?url='+url[0]+'/favicon.32.png';
						break;
					}
				}
			}
		}

		note.dom.icon.src = icon;
	};

	this.NoteVisible = function ( note ) {
		// flag to show this note or not
		var flag = true;
//		for ( var i = 0; i < this.data.filter.tinc.length; i++ ) {
//			if ( !note.data.tags.has(this.data.filter.tinc[i]) ) {flag = false;break;}
//		}
//		if ( flag ) {
//			for ( i = 0; i < this.data.filter.texc.length; i++ ) {
//				if ( note.data.tags.has(this.data.filter.texc[i]) ) {flag = false;break;}
//			}
//		}
		if ( flag ) {
			$(note).removeClass('hidden');
		} else {
			$(note).addClass('hidden');
		}
		return flag;
	};

	this.DrawNoteTags = function ( note ) {
		//elclear(note.dom.tags.exc);
		elclear(note.dom.tags.inc);
		elclear(note.dom.tags.set);

		var names = [];
		note.data.tags.each(function(item){
//			if ( !self.data.filter.tinc.has(item) ) {
//				names.push(data_tags_idlist[item]);
//			}
		});
		names.sort().each(function(item){
			elchild(note.dom.tags.set, element('span',
				{className:'tag', title:'click on this tag to include it to the search', tagid:data_tags_nmlist[item]},
				item, {onclick:TagInclude}));
		});

//		self.data.filter.tinc.each(function(item){
//			if ( item ) {
//				elchild(note.dom.tags.inc, element('span',
//					{className:'tag include', title:"click on this tag to exclude it from the filtering", tagid:item},
//					data_tags_idlist[item], {onclick:TagExclude}));
//			}
//		});
	};

	var NoteActive = function ( note ) {
		if ( self.dom.notes.active ) $(self.dom.notes.active).removeClass('active');
		$(note).addClass('active');
		self.dom.notes.active = note;
	};

	var NoteDelete = function ( data ) {
		$.post('/note/delete', {ids:[data.id]}, function(data){
			if ( !data.error ) {
				fb(data);
			} else {
				self.InfoSet('The request was not successful this time. The response from the server: ' + data.error, 'error');
			}
		});
	};

	var NoteBody = function ( data ) {
		var result = [element('div', {className:'bold'}, 'id:' + data.id)];
		for ( var i = 0; i < data.entries.length; i++ ) {
			var entry = data.entries[i];
			if ( entry.id_type != 4 ) {
				var text = App.Decode(entry.data);
				if ( text ) {
					text = text.slice(0, 100);
					if ( entry.id_type == 6 ) {
						result.push(element('div', {className:'entry'}, [
							element('span', {className:'name'}, App.Decode(entry.name) + ': '),
							element('span', {className:'data bold'}, text)
						]));
					} else {
						result.push(element('span', {className:'entry'}, [
							element('span', {className:'name'}, App.Decode(entry.name) + ': '),
							element('span', {className:'data bold'}, text)
						]));
					}
				}
			}
		}
		return result;
	};

	var NotePrepare = function ( data ) {
		var tbl  = element('table', {});
		var icon = element('img', {width:32, height:32, className:'hidden'}, null, {onload:function(){/*$(this).fadeIn();*/$(this).removeClass('hidden');}});
		var hint = element('div', {className:'hint'}, [TimestampToDateStr(data.mtime), ' ', element('a', {data:data}, 'delete', {onclick:function(e){
			if (!e ) e = window.event;e.cancelBubble = true;
			if ( e.stopPropagation ) e.stopPropagation();
			NoteDelete(this.data);
		}})]);
		var tags = element('div', {className:'tags'});
		//var note = element('div', {className:'note', data:data}, [hint, tbl, tags], {onclick:function(){
		var note = element('div', {className:'note', data:data}, tags, {onclick:function(){
			NoteActive(this);
			NoteEditor.Load(this.data);
			$('#ui-layout-east-tplist').hide();
			$('#ui-layout-east-data').show();
		}});
		note.dom = {icon:icon, hint:hint, tags:tags};
		tags.exc = element('span', {className:'exc'});
		tags.inc = element('span', {className:'inc'});
		tags.set = element('span', {className:'set'});
		//tblrow(tbl, [icon, NoteBody(data)], [{className:'icon'}, {className:'body'}]);
		elchild(note.dom.tags, [tags.exc, tags.inc, tags.set]);
		SetNoteIcon(note);
		self.DrawNoteTags(note);
		return note;
	};

	var TagHandle = function ( event ) {
		event.stopPropagation();
		if ( event.ctrlKey ) {
			NoteFilter.TagSubtract(this.tagnm);
		} else {
			if ( this.finc ) {
				NoteFilter.TagInclude(this.tagnm);
			} else {
				NoteFilter.TagExclude(this.tagnm);
			}
		}
	};

	var BuildNoteTags = function ( data ) {
		var list = [], exc = [];
		if ( data.length > 0 ) {
			// separate tags
			data.each(function(item){
				if ( !NoteFilter.data.tinc.has(item) ) exc.push(data_tags_idlist[item]);
			});
			// forms the list of tags alreade selected
			NoteFilter.data.ninc.each(function(item){
				// create html wrapper for tag
				item = element('span', {className:'tag include', tagnm:item, title:hint_tag_exclude}, item);
				// mouse click handler
				$(item).bind('click', TagHandle);
				list.push(item);
			});
			// forms the list of tags available for selection
			exc.sort().each(function(item){
				// create html wrapper for tag
				item = element('span', {className:'tag', finc:true, tagnm:item, title:hint_tag_include}, item);
				// mouse click handler
				$(item).bind('click', TagHandle);
				list.push(item);
			});
		}
		return list.length > 0 ? list : hint_tag_missing;
	}

	var GetNoteIcon = function ( data ) {
		var icon = 'img/tag_note.png',
			tags = TagManager.IDs2Names(data.tags);
		// iterate words in the tag list
		tags.each(function(item){
			if ( icon_tags.has(item) ) {
				// get the first match
				icon = 'img/tag_' + item + '.png';return;
			}
		});
		return icon;
	}

	var ShowCtrlPanel = function () {
		var i, item;
		for ( i = 0; i < self.dom.notes.childNodes.length; i++ ) {
			item = self.dom.notes.childNodes[i];
			if ( item.data.checked ) {
				self.dom.tpctrl.style.display = 'table-cell';
				return;
			}
		}
		self.dom.tpctrl.style.display = 'none';
	}

	var NoteSetActive = function ( note, range ) {
		// reset all checked notes
		NoteClearChecked();
		// flag true if the node is the same as already active
		var fsame = false;
		// last active note
		var alast = null;
		// there is already active note
		if ( self.dom.notes.active ) {
			// it's the save as already active
			fsame = ( self.dom.notes.active.data.id === note.data.id );
			if ( !fsame ) {
				// another note
				alast = self.dom.notes.active;
				$(self.dom.notes.active).removeClass('active');
				self.dom.notes.active.data.active = false;
			}
		}
		// not the same as already active
		if ( !fsame ) {
			// update attributes
			self.dom.notes.active = note;
			$(note).addClass('active');
			note.data.active = true;
			// show note details
			NoteEditor.Load(note.data);
			$('#ui-layout-east-tplist').hide();
			$('#ui-layout-east-data').show();
		}
		// holding Shift key
		if ( range ) {
			var i, item, cflag = false;
			// iterate all notes
			for ( i = 0; i < self.dom.notes.childNodes.length; i++ ) {
				// cursor
				item = self.dom.notes.childNodes[i];
				// flag showing that the cursor is inside the range
				if ( item.data.id === alast.data.id || item.data.id === note.data.id ) cflag = !cflag;
				// check inside the range or edge items
				if ( cflag || item.data.id === alast.data.id || item.data.id === note.data.id ) {
					NoteSetChecked(item);
				}
			}
		} else {
			NoteSetChecked(note);
		}
	}

	var NoteClearChecked = function () {
		// reset all
		var i, item;
		for ( i = 0; i < self.dom.notes.childNodes.length; i++ ) {
			item = self.dom.notes.childNodes[i];
			$(item).removeClass('checked');
			item.data.active  = false;
			item.data.checked = false;
		}
	}

	var NoteSetChecked = function ( note ) {
		$(note).toggleClass('checked');
		note.data.checked = note.data.checked ? false : true;
	}

	this.BuildNote = function ( data ) {
		// note html wrapper
		var note = element('div', {className:'note', data:data, dom:{}});
		elchild(note, [
			element('div', {className:'icon'}, [
				note.dom.icon = element('img', {className:'icon', src:GetNoteIcon(data)}),
				note.dom.tick = element('div', {className:'tick'})
			]),
			element('div', {className:'body'}, [
				note.dom.info = element('div', {className:'info'}, data.id),
				note.dom.time = element('div', {className:'time'}, TimestampToDateStr(data.mtime)),
				note.dom.tags = element('div', {className:'tags'}, BuildNoteTags(data.tags))
			])
		]);
		// whole note ckick
		$(note).bind('click', function(event){
			//fb(event);
			if ( event.ctrlKey ) {
				NoteSetChecked(this);
			} else {
				NoteSetActive(this, event.shiftKey);
			}
			ShowCtrlPanel();
		});
		// checkbox click
		$(note.dom.tick).bind('click', function(event){
			event.stopPropagation();
			NoteSetChecked(note);
			ShowCtrlPanel();
		});
		return note;
	}

	this.NoteCreate = function ( data ) {
		// update latest and current note lists
		data_notes_latest.splice(0,0,data);
		this.data.notes.splice(0,0,data);
		// build note and add it to the list top
		var note = this.dom.notes.insertBefore(this.BuildNote(data), this.dom.notes.childNodes[0]);
		NoteSetActive(note);
	};

	this.NoteUpdate = function ( data ) {
		// remove current active note
		this.dom.notes.removeChild(this.dom.notes.active);
		this.dom.notes.active = null;
		// build note and add it to the list top
		var note = this.dom.notes.insertBefore(this.BuildNote(data), this.dom.notes.childNodes[0]);
		NoteSetActive(note);
	}

	this.BuildTable = function ( data ) {
		// check input and determine mode - last or requested
		data = data instanceof Array ? (this.data.notes = data) : (data === false ? data_notes_latest : this.data.notes);
		// set mode
		//this.data.latest = !data ? true : false;
		// determine the source of the notes data
		//data = data || (self.data.latest ? data_notes_latest : self.data.notes);
		// clearing the container
		elclear(self.dom.notes);
		// clear selection
		//delete self.dom.notes.active;

		if ( data.length > 0 ) {
			//document.getElementById('search_help').style.display = 'none';
			// determine the note beeing edited at the moment
			var neid = NoteEditor.data && NoteEditor.data.id ? NoteEditor.data.id : null;
			// iterate all notes
			data.each(function(item){
				var note = self.BuildNote(item);
//				var note = NotePrepare(data[i]);
//				note.raw = '' + data[i].id;
//				if ( neid == data[i].id ) NoteActive(note);
				elchild(self.dom.notes, note);
			});
			// add notes
//			for ( var i = 0; i < data.length; i++ ) {
//
//			}
		}
	};

	this.Filter = function ( text ) {
		text = text.toLowerCase();
		for ( var i = 0; i < self.dom.notes.childNodes.length; i++ ) {
			// prepare
			var item = self.dom.notes.childNodes[i];
			// search substring and show/hide
			$(item).toggle(item.raw.indexOf(text) >= 0);
		}
	};

//	var SetFilterTags = function ( data ) {
//		data = data || self.dom.search.input.value;
//		self.data.filter = TagManager.ParseStr(data);
//	};



	var BuildSearchStr = function () {
		var words = [];
		// prepare all words for concatenation
		//self.data.filter.texc.each(function(item){if ( item ) words.push('-'+data_tags_idlist[item]);});
		//self.data.filter.tinc.each(function(item){if ( item ) words.push(    data_tags_idlist[item]);});
		// replace the search string by the reformatted one
		self.dom.search.input.value = words.join(' ');
	};

//	var TagExclude = function ( e ) {
//		if (!e ) e = window.event;e.cancelBubble = true;
//		if ( e.stopPropagation ) e.stopPropagation();
//
//		NoteFilter.TagExclude(this.tagnm);
//		//var texc  = self.data.filter.texc,
//		//	tinc  = self.data.filter.tinc;
//		// locate
////		var iexc = texc.indexOf(this.tagid);
////		var iinc = tinc.indexOf(this.tagid);
////		// and clear
////		if ( iexc >= 0 ) texc.splice(iexc, 1);
////		if ( iinc >= 0 ) tinc.splice(iinc, 1);
////		// remove current tag
////		this.parentNode.removeChild(this);
////		BuildSearchStr();
////		// send request
////		Filter();
//	};

	var FilterTags = function () {
		elclear(self.dom.tags.exc);
		elclear(self.dom.tags.inc);

//		if ( !self.data.filter.texc.empty() || !self.data.filter.tinc.empty() ) {
//			self.dom.tags.style.display = 'block';
//
//			self.data.filter.texc.each(function(item){
//				if ( item ) {
//					elchild(self.dom.tags.exc, element('span',
//						{className:'tag exclude', title:'click on this tag to exclude it from the filtering', tagid:item},
//						data_tags_idlist[item], {onclick:TagExclude}));
//				}
//			});
//		} else {
//			self.dom.tags.style.display = 'none';
//		}
	};

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
			latest :true, // show only the last 20 notes
			notes  :[]   // all requested notes data array
			//checked:[]    // list of checked notes id
			//filter :TagManager.ParseStr()
		};

		// build all blocks together
		elchild(this.dom.handle, [
			//this.dom.search = element('div', {className:'search'}),
			//this.dom.tags   = element('div', {className:'tags hidden'}),
			//this.dom.info   = element('div', {className:'info'}),
			//this.dom.help   = element('div', {className:'help hidden'}),
			this.dom.tpbar = element('div', {className:'tpbar'}, [
				this.dom.tpinfo = element('div', {className:'info'}, 'info'),
				this.dom.tpctrl = element('div', {className:'ctrl'}, 'control panel')
			]),
			this.dom.notes = element('div', {className:'notes', active:null}),
			this.dom.btbar = element('div', {className:'btbar'})
		]);

		this.dom.notes.onselectstart = function () {return false;} // ie
		this.dom.notes.onmousedown   = function () {return false;} // mozilla

//		elchild(this.dom.search, [
//			this.dom.search.icon    = element('img', {className:'icon', src:'img/search.png'}),
//			this.dom.search.input   = element('input', {type:'text', className:'line'}),
//			this.dom.search.suggest = element('div', {className:'suggest'}),
//			this.dom.search.control = element('div', {className:'control'}, [element('span', {}, 'clear', {onclick:function(){
//				self.dom.search.input.value = '';
//				self.dom.search.input.focus();
//			}})])
//		]);

//		elchild(this.dom.tags, [
//			this.dom.tags.title = element('span', {className:'title'}, 'tags'),
//			this.dom.tags.exc   = element('span', {className:'exc'}),
//			this.dom.tags.inc   = element('span', {className:'inc'}),
//			this.dom.tags.hint  = element('span', {className:'hint'}, 'click on a tag to exclude it from the search')
//		]);
	};
};