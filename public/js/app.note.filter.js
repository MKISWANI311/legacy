/**
 * Main module to work with single note
 * creation, edit or view
 */
var NoteFilter = new function () {
	// for limited scopes
	var self = this;

	// component state flag
	// true  - everything is decoded
	// false - no plain data, everything is encrypted
	this.open = true;

	var hint_filter_tags  = 'searching notes with tags separated by space';
	var hint_filter_words = 'filtering the found notes';

	var msg_info_no_data      = 'There are no records with given tags. You can use some other tags or see your ';
	var msg_fail_server_error = 'The request was not successful. The response from the server: ';

	/**
	 * Open the subscriber
	 * master password is accessible
	 * decrypt all the data and show it
	 */
	this.EventOpen = function () {
		fb('EventOpen: NoteFilter');
		// fill search string
		if ( this.dom.tinput.encval ) this.dom.tinput.value = App.Decode(this.dom.tinput.encval);
		if ( this.dom.winput.encval ) this.dom.winput.value = App.Decode(this.dom.winput.encval);
		// build notes
		//TagsProceed();
		// component state flag
		this.open = true;
	};

	/**
	 * Close the subscriber
	 * master password is expired and cleared
	 * clear all the decrypted data
	 */
	this.EventClose = function () {
		fb('EventClose: NoteFilter');
		// close only if opened at the moment
		if ( this.open ) {
			// delete messages
			self.MsgReset();
			self.MsgShow();
			// clear search string
			this.dom.tinput.encval = App.Encode(this.dom.tinput.value);
			this.dom.tinput.value  = '[encrypted data]';
			this.dom.winput.encval = App.Encode(this.dom.winput.value);
			this.dom.winput.value  = '[encrypted data]';
			// component state flag
			this.open = false;
		}
	};

	this.MsgReset = function ( msg ) {
		msg = msg || false;
		if ( msg ) {
			this.dom[msg].ok = false;
		} else {
			for ( var i = 0; i < this.dom.messages.childNodes.length; i++ ) {
				this.dom.messages.childNodes[i].ok = false;
			}
		}
	}

	/**
	 * Removes all messages
	 */
	this.MsgShow = function ( msg ) {
		msg = msg || false;
		if ( msg ) {
			this.dom[msg].display = this.dom[msg].ok ? 'block' : 'none';
		} else {
			for ( var i = 0; i < this.dom.messages.childNodes.length; i++ ) {
				var item = this.dom.messages.childNodes[i];
				item.style.display = item.ok ? 'block' : 'none';
			}
		}
		//elclear(this.dom.messages);

//		this.dom.info.style.display = 'none';
//		this.dom.warn.style.display = 'none';
//		this.dom.fail.style.display = 'none';
	};

	/**
	 * Append the given message
	 */
	this.MsgSet = function ( text, type ) {
		type = type || 'info';
		this.dom[type].ok = true;
		//this.dom[type].style.display = 'block';
		elchild(elclear(this.dom[type]), text);
	};

	/**
	 * Set focus to tag search field
	 */
	this.SetFocus = function () {
		this.dom.tinput.focus();
	};

	/**
	 * Visual flags
	 */
	var LoadingStart = function () {
		self.dom.ticon.className = 'ticon loading';
		self.dom.messages.className = 'messages loading';
	}

	/**
	 * Visual flags
	 */
	var LoadingStop = function () {
		self.dom.ticon.className = 'ticon';
		self.dom.messages.className = 'messages';
	}

	/**
	 * Checks input for wrong tags
	 * shows them comma-separated
	 */
	var CheckMissingTags = function () {
		// check
		if ( self.data.tags.winc.length > 0 || self.data.tags.wexc.length > 0 ) {
			// merging
			var words = self.data.tags.winc.concat(self.data.tags.wexc);
			self.MsgSet(['Here is the list of words used which are not your tags: ', element('span', {className:'bold'}, words.join(', ')), '. They were omitted.'], 'warn');
		}
	};

	/**
	 * Sends ajax request to receive notes by tags
	 */
	this.NotesRequest = function ( tinc, texc ) {
		LoadingStart();
		$.post('/note/search/', {tinc:tinc, texc:texc}, function(data){
			if ( !data.error ) {
				NoteList.RenderTable(data);
				// no data, need to inform
				if ( data.length == 0 ) self.MsgSet([msg_info_no_data, element('a', {className:'bold'}, 'latest notes', {onclick:function(){
					self.Reset();
					//NoteList.SetData([]);
					NoteList.RenderTable(false);
				}})]);
			} else {
				// server error
				self.MsgSet(msg_fail_server_error + data.error, 'fail');
			}
			// there may be wrong tags
			CheckMissingTags();
			self.MsgShow();
			LoadingStop();
		});
	}

	/**
	 * Keyboard input handler for tag search
	 */
	var TagsProceed = function () {
		self.MsgReset();
		// prepare input
		var text = (self.dom.tinput.value !== hint_filter_tags ? self.dom.tinput.value : '');
		if ( text ) {
			fb('checking ...');
			var tags = TagManager.ParseStr(text);
			var tinc = tags.tinc.sort().join();
			var texc = tags.texc.sort().join();
			// parsed tags don't match
			if ( self.data.tags.tinc.sort().join() != tinc || self.data.tags.texc.sort().join() != texc ) {
				// there are changes
				fb('!!!');
				self.NotesRequest(tags.tinc, tags.texc);
			}
			self.data.tags = tags;
			// there may be wrong tags
			CheckMissingTags();
		} else {
			NoteList.RenderTable(false);
		}
		self.MsgShow();
	};

	/**
	 * Adds the given tag to the search
	 */
	this.TagInclude = function ( tag_id ) {
		// not added already and exists
		if ( !this.data.tags.tinc.has(tag_id) && data_tags_idlist[tag_id] ) {
			// prepare
			var text = (self.dom.tinput.value !== hint_filter_tags ? self.dom.tinput.value.trim() : '');
			// concatenation
			this.dom.tinput.value = (text.length > 0 ? text + ' ' : '') + data_tags_idlist[tag_id];
			// style correction
			this.dom.tinput.style.color = '#000';
		}
		TagsProceed();
	};

	/**
	 * Adds the given tag to the search
	 */
	this.TagExclude = function ( tag_id ) {
		// not added already and exists
		if ( !this.data.tags.texc.has(tag_id) && data_tags_idlist[tag_id] ) {
			// prepare
			var text = (self.dom.tinput.value !== hint_filter_tags ? self.dom.tinput.value.trim() : '');
			// concatenation
			this.dom.tinput.value = (text.length > 0 ? text + ' ' : '') + '-' + data_tags_idlist[tag_id];
			// style correction
			this.dom.tinput.style.color = '#000';
		}
		TagsProceed();
	};

	/**
	 * Removes the given tag to the search
	 */
	this.TagRemove = function ( tag ) {

	};

	/**
	 * Set default search hints and remove messages
	 */
	this.Reset = function () {
		// clear search string and set focus
		self.dom.winput.value = hint_filter_words;
		self.dom.tinput.value  = hint_filter_tags;
		self.dom.tinput.focus();
		// clear tags data
		this.data.tags = TagManager.ParseStr();
		// delete all messages
		self.MsgReset();
		self.MsgShow();
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
			tags : TagManager.ParseStr()
		};

		// build all blocks together
		elchild(this.dom.handle, [
			// first line with search inputs
			tblrow(element('table', {className:'main'}), [
				// icon
				element('img', {className:'', src:'img/2x2_grid.png'}),
				// tags search input
				element('div', {}, [
					this.dom.tinput  = element('input', {type:'text', className:'line', value:hint_filter_tags}),
					this.dom.ticon   = element('div', {className:'ticon'}),
					this.dom.suggest = element('div', {className:'suggest'}, 'suggest')
				]),
				// words search input
				element('div', {}, [
					this.dom.winput  = element('input', {type:'text', className:'line', value:hint_filter_words}),
					this.dom.wicon   = element('div', {className:'wicon'}),
				])
			], [{className:'switch'}, {className:'tags'}, {className:'words'}]),
			// hidden messages
			this.dom.messages = element('div', {className:'messages'}, [
				this.dom.fail = element('div', {className:'fail'}, 'test 3'),
				this.dom.warn = element('div', {className:'warn'}, 'test 2'),
				this.dom.info = element('div', {className:'info'}, 'test 1')
			])
		]);

		// input hints
		watermark(this.dom.tinput, hint_filter_tags,  '#000');
		watermark(this.dom.winput, hint_filter_words, '#000');

		$(this.dom.tinput).bind('keypress', function(event) {
			if ( event.which == 13 ) {
				TagsProceed();
			}
		});

		// handle input
//		var ttimer = null;
//		this.dom.tinput.onkeydown = function() {
//			if ( ttimer ) clearTimeout(ttimer);
//			ttimer = setTimeout(function(){
//				self.data.tags = TagManager.ParseStr(self.dom.tinput.value !== hint_filter_tags ? self.dom.tinput.value : '');
//				CheckMissingTags();
//			}, 300);
//		}
//
//		// handle input
//		var wtimer = null;
//		this.dom.winput.onkeydown = function() {
//			if ( wtimer ) clearTimeout(wtimer);
//			wtimer = setTimeout(function(){
//				NoteList.Filter(self.dom.winput.value);
//			}, 300);
//		}
	};
};