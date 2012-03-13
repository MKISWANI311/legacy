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
		if ( this.dom.tags.encval  ) this.dom.tags.value  = App.Decode(this.dom.tags.encval);
		if ( this.dom.words.encval ) this.dom.words.value = App.Decode(this.dom.words.encval);
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
			this.dom.tags.encval  = App.Encode(this.dom.tags.value);
			this.dom.tags.value   = '[encrypted data]';
			this.dom.words.encval = App.Encode(this.dom.words.value);
			this.dom.words.value  = '[encrypted data]';
			// component state flag
			this.open = false;
		}
	};

	this.MsgReset = function () {
		for ( var i = 0; i < this.dom.messages.childNodes.length; i++ ) {
			this.dom.messages.childNodes[i].ok = false;
		}
	}

	/**
	 * Removes all messages
	 */
	this.MsgShow = function () {
		//elclear(this.dom.messages);
		for ( var i = 0; i < this.dom.messages.childNodes.length; i++ ) {
			var item = this.dom.messages.childNodes[i];
			item.style.display = item.ok ? 'block' : 'none';
		}
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
		this.dom.tags.focus();
	};

	/**
	 * Visual flags
	 */
	var LoadingStart = function () {
		self.dom.loading.style.display = 'block';
		self.dom.messages.className = 'messages loading';
	}

	/**
	 * Visual flags
	 */
	var LoadingStop = function () {
		self.dom.loading.style.display = 'none';
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
					NoteList.SetData([]);
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
		var text = (self.dom.tags.value !== hint_filter_tags ? self.dom.tags.value : '');
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
			var text = (self.dom.tags.value !== hint_filter_tags ? self.dom.tags.value.trim() : '');
			// concatenation
			this.dom.tags.value = (text.length > 0 ? text + ' ' : '') + data_tags_idlist[tag_id];
			// style correction
			this.dom.tags.style.color = '#000';
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
			var text = (self.dom.tags.value !== hint_filter_tags ? self.dom.tags.value.trim() : '');
			// concatenation
			this.dom.tags.value = (text.length > 0 ? text + ' ' : '') + '-' + data_tags_idlist[tag_id];
			// style correction
			this.dom.tags.style.color = '#000';
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
		self.dom.words.value = hint_filter_words;
		self.dom.tags.value  = hint_filter_tags;
		self.dom.tags.focus();
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
			tblrow(element('table', {className:'main'}), [
				element('img', {className:'', src:'img/2x2_grid.png'}),
				element('div', {className:'block'}, [
					this.dom.tags    = element('input', {type:'text', className:'line', value:hint_filter_tags}),
					this.dom.suggest = element('div', {className:'suggest'}, 'suggest'),
					this.dom.loading = element('img', {className:'loading', src:'img/loading.16.gif'}),
				]),
				this.dom.words = element('input', {type:'text', className:'line', value:hint_filter_words})
			], [{className:'switch'}, {className:'tags'}, {className:'words'}]),
			this.dom.messages = element('div', {className:'messages'}, [
				this.dom.fail = element('div', {className:'fail'}, 'test 3'),
				this.dom.warn = element('div', {className:'warn'}, 'test 2'),
				this.dom.info = element('div', {className:'info'}, 'test 1')
			])
		]);

		// watermarks
		$(this.dom.tags)
			.focus(function(){if(this.value==hint_filter_tags)$(this).val('').css({color:'#000'});})
			.focusout(function(){if(!this.value)$(this).val(hint_filter_tags).css({color:''});})
			.keyup(function(){
				//self.dom.suggest.style.display = 'block';
				self.dom.suggest.style.width = self.dom.tags.offsetWidth-2;
			});

		// watermarks
		$(this.dom.words)
			.focus(function(){if(this.value==hint_filter_words)$(this).val('').css({color:'#000'});})
			.focusout(function(){if(!this.value)$(this).val(hint_filter_words).css({color:''});})
			.keyup(function(){  });

		// handle input
		var ttimer = null;
		this.dom.tags.onkeydown = function() {
			if ( ttimer ) clearTimeout(ttimer);
			ttimer = setTimeout(TagsProceed, 300);
		}

		// handle input
		var wtimer = null;
		this.dom.words.onkeydown = function() {
			if ( wtimer ) clearTimeout(wtimer);
			wtimer = setTimeout(function(){
				NoteList.Filter(self.dom.words.value);
			}, 300);
		}
	};
};