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

	/**
	 * Open the subscriber
	 * master password is accessible
	 * decrypt all the data and show it
	 */
	this.EventOpen = function () {
		fb('EventOpen: NoteList');
		elclear(self.dom.notes);
		// fill notes
		self.RenderTable();
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
		self.DrawNoteTags(note);
		return note;
	};

	/**
	 * Set the notes data to build note list
	 */
	this.SetData = function ( data ) {
		self.data.notes = data instanceof Array ? data : [];
	}

	this.RenderTable = function ( data ) {
		data = data instanceof Array ? (this.data.notes = data) : (data === false ? data_notes_latest : this.data.notes);
		// set mode
		//this.data.latest = !data ? true : false;
		// determine the source of the notes data
		//data = data || (self.data.latest ? data_notes_latest : self.data.notes);
		// clearing the container
		elclear(self.dom.notes);
		// clear selection
		delete self.dom.notes.active;

		if ( data.length != 0 ) {
			document.getElementById('search_help').style.display = 'none';
			// determine the note beeing edited at the moment
			var neid = NoteEditor.data && NoteEditor.data.id ? NoteEditor.data.id : null;
			// add notes
			for ( var i = 0; i < data.length; i++ ) {
				var note = NotePrepare(data[i]);
				note.raw = '' + data[i].id;
				if ( neid == data[i].id ) NoteActive(note);
				elchild(self.dom.notes, note);
			}
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
	};
};