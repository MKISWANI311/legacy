/**
 * Main module to work with single note
 * creation, edit or view
 */
var NoteManager = new function () {
	// for limited scopes
	var self = this;

	// component state flag
	// true  - everything is decoded
	// false - no plain data, everything is encrypted
	this.open = true;

	/**
	 * Open the subscriber
	 * master password is accessible
	 * decrypt all the data and show it
	 */
	this.EventOpen = function () {
		fb('NoteManager: EventOpen');
		elclear(self.dom.notes);
		// fill notes
		RenderTable();
		// fill search string
		if ( self.dom.search.input.encval ) {
			self.dom.search.input.value = App.Decode(self.dom.search.input.encval);
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
		fb('NoteManager: EventClose');
		// close only if opened at the moment
		if ( this.open ) {
			this.InfoClear();
			// clear notes
			elclear(self.dom.notes);
			// clear search string
			self.dom.search.input.encval = App.Encode(self.dom.search.input.value);
			self.dom.search.input.value  = '[encrypted data]';
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

		//fb(self.dom.title.icon.src, icon);
		//if ( self.dom.title.icon.src.search(icon) < 0 ) {
			//fb(note.dom.icon, icon);
			note.dom.icon.src = icon;
		//}
	};

//	var TagSetClick = function ( e ) {
//		//fb(e);
//		//fb(this);
//		if (!e ) e = window.event; e.cancelBubble = true;
//		if ( e.stopPropagation ) e.stopPropagation();
//		var tags = self.dom.search.input.value.match(/(\S+)/g) || [];
//		if ( tags.has(this.tagnm) ) {
//			delete tags[tags.indexOf(this.tagnm)];
//			self.dom.search.input.value = tags.sort().join(' ').trim();
//			SetFilterTags();
//			Filter(self.dom.search.input.value);
//		}
//	};
	var TagSetClick = function ( e ) {
		//fb(e);
		//fb(this);
//		if (!e ) e = window.event; e.cancelBubble = true;
//		if ( e.stopPropagation ) e.stopPropagation();
//		var tags = self.dom.search.input.value.match(/(\S+)/g) || [];
//		if ( tags.length == 0 || !tags.has(this.tagnm) ) {
//			tags.push(this.tagnm);
//			self.dom.search.input.value = tags.sort().join(' ').trim();
//			SetFilterTags();
//
//			if ( self.data.latest ) {
//				Filter(self.dom.search.input.value);
//			} else {
//				var ids = TagManager.Str2IDs(self.dom.search.input.value, true);
//				//fb('ids', ids);
//				//Filter(self.dom.search.input.value);
//				// iterate all notes
//				for ( var i = 0; i < self.dom.notes.childNodes.length; i++ ) {
//					var note = self.dom.notes.childNodes[i];
//					if ( self.NoteVisible(note) ) self.DrawNoteTags(note);
//				}
//			}
//		}
	};

	this.NoteVisible = function ( note ) {
		// flag to show this note or not
		var flag = true;
		for ( var i = 0; i < this.data.filter.tinc.length; i++ ) {
			if ( !note.data.tags.has(this.data.filter.tinc[i]) ) {flag = false;break;}
		}
		if ( flag ) {
			for ( i = 0; i < this.data.filter.texc.length; i++ ) {
				if ( note.data.tags.has(this.data.filter.texc[i]) ) {flag = false;break;}
			}
		}
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

		//var list_set = [], name = null;

		//texc = self.data.filter.texc;
		//tinc = self.data.filter.tinc;

		var names = [];
		note.data.tags.each(function(item){
			if ( !self.data.filter.tinc.has(item) ) {
				names.push(data_tags_idlist[item]);
			}
		});
		names.sort().each(function(item){
			elchild(note.dom.tags.set, element('span',
				{className:'tag', title:'click on this tag to include it to the search', tagid:data_tags_nmlist[item]},
				item, {onclick:TagInclude}));
		});

		self.data.filter.tinc.each(function(item){
			if ( item ) {
				elchild(note.dom.tags.inc, element('span',
					{className:'tag include', title:"click on this tag to exclude it from the filtering", tagid:item},
					data_tags_idlist[item], {onclick:TagExclude}));
			}
		});

//		for ( var i = 0; i < note.data.tags.length; i++ ) {
//			name = data_tags_idlist[note.data.tags[i]];
//			if ( !self.data.filter.tinc.has(note.data.tags[i]) && !self.data.filter.texc.has(note.data.tags[i]) ) {
//				list_set.push(name);
//			}
//		}
//		for ( i = 0; i < texc.length; i++ ) {
//			name = data_tags_idlist[texc[i]];
//			elchild(note.dom.tags.exc, element('span',
//				{className:'tag exclude', title:'click on this tag to exclude it from the filtering', tagnm:name},
//					name, {onclick:TagSetClick}));
//		}
//		//tinc.sort();
//		for ( i = 0; i < tinc.length; i++ ) {
//			name = data_tags_idlist[tinc[i]];
//			elchild(note.dom.tags.inc, element('span',
//				{className:'tag include', title:'click on this tag to exclude it from the filtering', tagnm:name},
//					name, {onclick:TagSetClick}));
//		}
//		list_set.sort();
//		for ( i = 0; i < list_set.length; i++ ) {
//			elchild(note.dom.tags.set, element('span',
//				{className:'tag', title:'click on this tag to include it to the search', tagnm:list_set[i]},
//					list_set[i], {onclick:TagInclude}));
//		}
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
	this.NoteAdd = function ( data, topmost ) {
		data_notes_latest.splice(0,0,data);
		this.data.notes.push(data);
		var note = NotePrepare(data);
		if ( topmost && this.dom.notes.childNodes.length > 0 ) {
			this.dom.notes.insertBefore(note, this.dom.notes.childNodes[0]);
		} else {
			elchild(this.dom.notes, note);
		}
		NoteActive(note);
	};

//	this.NoteMoveTop = function ( data ) {
//		this.data.notes.push(data);
//		var note = NotePrepare(data);
//		if ( topmost && this.dom.notes.childNodes.length > 0 ) {
//			this.dom.notes.insertBefore(note, this.dom.notes.childNodes[0]);
//		} else {
//			elchild(this.dom.notes, note);
//		}
//		NoteActive(note);
//	}

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
		var note = element('div', {className:'note', data:data}, [hint, tbl, tags], {onclick:function(){
			NoteActive(this);
			NoteEditor.Load(this.data);
			$('#ui-layout-east-tplist').hide();
			$('#ui-layout-east-data').show();
		}});
		note.dom = {icon:icon, hint:hint, tags:tags};
		tags.exc = element('span', {className:'exc'});
		tags.inc = element('span', {className:'inc'});
		tags.set = element('span', {className:'set'});
		tblrow(tbl, [icon, NoteBody(data)], [{className:'icon'}, {className:'body'}]);
		elchild(note.dom.tags, [tags.exc, tags.inc, tags.set]);
		SetNoteIcon(note);

		//var tag_names = TagManager.IDs2Names(data.tags);
		//var list_set = [], list_set = [];
		//for ( var t = 0; t < tag_names.length; t++ ) {
			self.DrawNoteTags(note);
		//}
		return note;
	};

	var RenderTable = function ( data ) {
		// determine the source of the notes data
		data = data || (self.data.latest ? data_notes_latest : self.data.notes);
		// clearing the container
		elclear(self.dom.notes);
		// clear selection
		delete self.dom.notes.active;

		if ( data.length != 0 ) {
			document.getElementById('search_help').style.display = 'none';
			self.InfoClear();
			// determine the note beeing edited at the moment
			var neid = NoteEditor.data && NoteEditor.data.id ? NoteEditor.data.id : null;
			// add notes
			for ( var i = 0; i < data.length; i++ ) {
				var note = NotePrepare(data[i]);
				if ( neid == data[i].id ) NoteActive(note);
				elchild(self.dom.notes, note);
			}
		} else {

			self.InfoSet([
				'There are no records with given tags.', element('br'),
				'You can use some other tags or see your ',
				element('a', {className:'bold'}, 'latest notes', {onclick:function(){
					// clear search string and set focus
					self.dom.search.input.value = '';
					self.dom.search.input.focus();
					SetFilterTags();
					// switch mode
					self.data.latest = true;
					RenderTable();
				}
			})]);
			//ShowSearchHint();
			document.getElementById('search_help').style.display = 'block';
		}
		CheckMissingTags();
	};

	var ShowSearchHint = function () {
		//self.InfoSet('how to search', 'hint', self.dom.help);
		//self.dom.help.className = 'help';
		//$(self.dom.help).fadeIn();
		//document.getElementById('search_help').style.display = 'none';

	};

	var CheckMissingTags = function () {
		if ( self.data.filter.winc.length > 0 || self.data.filter.wexc.length > 0 ) {
			var words = self.data.filter.winc.concat(self.data.filter.wexc);
			self.InfoAdd([
				'There are words used which are not your tags: ', element('span', {className:'bold'}, words.join(', ')), element('br'),
				'They were omitted.'], 'warning');
			return true;
		}
		return false;
	};

	var Filter = function () {
		//SetFilterTags();

		// clearing all notes
		elclear(self.dom.notes);

		self.dom.help.style.display = 'none';

		if ( self.data.filter.tinc.length > 0 || self.data.filter.texc.length > 0 ) {
			// turn off the mode "only the last 20"
			self.data.latest = false;

			self.InfoSet('Searching notes by the given tags ...', 'loading');

			$.post('/note/search/', {tinc:self.data.filter.tinc, texc:self.data.filter.texc}, function(data){
				if ( !data.error ) {
					self.data.notes = data;
					RenderTable();
				} else {
					self.InfoSet('The request was not successful this time. The response from the server: ' + data.error, 'error');
				}
			});
		} else {
//			if ( self.data.latest ) {
//				if ( !CheckMissingTags() ) {
//					self.InfoSet('There are no tags specified for search.');
//				}
//			} else {
				self.InfoSet([
					'There are no tags specified for search.', element('br'),
					'You can enter some tags or see your ',
					element('a', {className:'bold'}, 'latest notes', {onclick:function(){
						// clear search string and set focus
						self.dom.search.input.value = '';
						self.dom.search.input.focus();
						SetFilterTags();
						// switch mode
						self.data.latest = true;
						RenderTable();
					}
				})]);
			CheckMissingTags();
			//ShowSearchHint();
			document.getElementById('search_help').style.display = 'block';
//			}
		}


	};

	this.InfoClear = function ( holder ) {
		holder = holder || this.dom.info;
		elclear(holder);
	};
	this.InfoAdd = function ( message, type, holder ) {
		holder = holder || this.dom.info;
		elchild(holder, element('div', {className:'message ' + (type || 'info')}, message));
	};
	this.InfoSet = function ( message, type, holder ) {
		this.InfoClear(holder);
		this.InfoAdd(message, type, holder);
	};

	this.FocusFilter = function () {
		this.dom.search.input.focus();
	};

	var SetFilterTags = function ( data ) {
		data = data || self.dom.search.input.value;
		self.data.filter = TagManager.ParseStr(data);
	};

	var TagInclude = function ( e ) {
		if (!e ) e = window.event;e.cancelBubble = true;
		if ( e.stopPropagation ) e.stopPropagation();

		if ( !self.data.filter.tinc.has(this.tagid) ) self.data.filter.tinc.push(this.tagid);
		self.dom.search.input.focus();
		BuildSearchStr();
		FilterTags();
		Filter();
	};
	var BuildSearchStr = function () {
		var words = [];
		// prepare all words for concatenation
		self.data.filter.texc.each(function(item){if ( item ) words.push('-'+data_tags_idlist[item]);});
		self.data.filter.tinc.each(function(item){if ( item ) words.push(    data_tags_idlist[item]);});
		// replace the search string by the reformatted one
		self.dom.search.input.value = words.join(' ');
	};
	var TagExclude = function () {
		var texc  = self.data.filter.texc,
			tinc  = self.data.filter.tinc;
		// locate
		var iexc = texc.indexOf(this.tagid);
		var iinc = tinc.indexOf(this.tagid);
		// and clear
		if ( iexc >= 0 ) texc.splice(iexc, 1);
		if ( iinc >= 0 ) tinc.splice(iinc, 1);
		// remove current tag
		this.parentNode.removeChild(this);
		BuildSearchStr();
		// send request
		Filter();
	};

	var FilterTags = function () {
		elclear(self.dom.tags.exc);
		elclear(self.dom.tags.inc);

		if ( !self.data.filter.texc.empty() || !self.data.filter.tinc.empty() ) {
			self.dom.tags.style.display = 'block';

			self.data.filter.texc.each(function(item){
				if ( item ) {
					elchild(self.dom.tags.exc, element('span',
						{className:'tag exclude', title:'click on this tag to exclude it from the filtering', tagid:item},
						data_tags_idlist[item], {onclick:TagExclude}));
				}
			});
//			self.data.filter.tinc.each(function(item){
//				if ( item ) {
//					elchild(self.dom.tags.inc, element('span',
//						{className:'tag include', title:'click on this tag to exclude it from the filtering', tagid:item},
//						data_tags_idlist[item], {onclick:TagExclude}));
//				}
//			});
		} else {
			self.dom.tags.style.display = 'none';
		}
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
		// set class for container
		this.dom.handle.className = 'notemanager';

		this.data = {
			latest :true, // show only the last 20 notes
			notes  :[],   // all notes data array
			filter :TagManager.ParseStr()
		};

		// build all blocks together
		elchild(this.dom.handle, [
			this.dom.search = element('div', {className:'search'}),
			this.dom.tags   = element('div', {className:'tags hidden'}),
			this.dom.info   = element('div', {className:'info'}),
			this.dom.help   = element('div', {className:'help hidden'}),
			this.dom.notes  = element('div', {className:'notes'})
		]);

		elchild(this.dom.search, [
			this.dom.search.icon    = element('img', {className:'icon', src:'img/search.png'}),
			this.dom.search.input   = element('input', {type:'text', className:'line'}),
			this.dom.search.suggest = element('div', {className:'suggest'}),
			this.dom.search.control = element('div', {className:'control'}, [element('span', {}, 'clear', {onclick:function(){
				self.dom.search.input.value = '';
				self.dom.search.input.focus();
			}})])
		]);

		elchild(this.dom.tags, [
			this.dom.tags.title = element('span', {className:'title'}, 'tags'),
			this.dom.tags.exc   = element('span', {className:'exc'}),
			this.dom.tags.inc   = element('span', {className:'inc'}),
			this.dom.tags.hint  = element('span', {className:'hint'}, 'click on a tag to exclude it from the search')
		]);

		$(this.dom.search.input).bind('keypress', function(event) {
			if ( event.which == 13 ) {
				self.InfoClear();
				SetFilterTags();
				FilterTags();
				Filter();
			}
		});

		var timer = null;
		this.dom.search.input.onkeydown = function() {
			if ( timer ) clearTimeout(timer);
			timer = setTimeout(function(){
				fb('checking ...');
				var pstr = TagManager.ParseStr(self.dom.search.input.value);
				var tinc = pstr.tinc.sort().join();
				var texc = pstr.texc.sort().join();
				// parsed tags don't match
				if ( self.data.filter.tinc.sort().join() != tinc || self.data.filter.texc.sort().join() != texc ) {
					self.data.filter = pstr;
					fb('!!!');
					self.InfoClear();
					//SetFilterTags();
					FilterTags();
					Filter();
				}
				var linked = TagManager.Linked(pstr.tinc);
				elclear(self.dom.search.suggest);
				linked.each(function(id){
					elchild(self.dom.search.suggest, element('span', {}, data_tags_idlist[id]));
					fb(data_tags_idlist[id]);
				});
			}, 300);
		}

		$(this.dom.notes).bind('keydown', function(event) {
			fb('*');
			// up
			if ( event.which == 38 ) fb('up');
			// down
			if ( event.which == 40 ) fb('down');
		});

		this.dom.info.onclick = function(){
			//self.InfoClear();
		};

		//this.dom.search.input.focus();
	};
};