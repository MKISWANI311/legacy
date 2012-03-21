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
		// fill autocompleter
//		var data = [];
//		//data.push([':all', 0]);
//		//data.push([':active', 0]);
//		data.push([':deleted', 0]);
//		data.push([':notags', 0]);
//		data.push([':day', 0]);
//		data.push([':week', 0]);
//		data.push([':month', 0]);
//		data.push([':last1m', 0]);
//		for ( var tid in data_tags_idlist ) {
//			fb(data_tags_idlist[tid], tid);
//			data.push([data_tags_idlist[tid], tid]);
//			//data.push(['-' + data_tags_idlist[tid], tid]);
//		}
//		this.ac.options.data = data;
		// build notes
		//PerformSearch();
		//NoteList.BuildTable(false);
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
			//TODO: encrypt/decrypt history
			// clear autocompleter
			$(this.dom.tinput).data('autocompleter').options.data = [];
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
		if ( self.data.winc.length > 0 || self.data.wexc.length > 0 ) {
			// merging
			var words = self.data.winc.concat(self.data.wexc);
			self.MsgSet(['Here is the list of words used which are not your tags: ', element('span', {className:'bold'}, words.join(', ')), '. They were omitted.'], 'warn');
		}
	};

	/**
	 * Sends ajax request to receive notes by tags
	 */
	this.NotesRequest = function ( tinc, texc ) {
		LoadingStart();
		// clone current data to post
		this.post = {};
		for ( var item in this.data ) {
			this.post[item] = this.data[item].slice();
		}
		// ajax post request
		$.post('/note/search/', {tinc:this.post.tinc, texc:this.post.texc, wcmd:this.post.wcmd}, function(data){
			if ( !data.error ) {
				NoteList.BuildTable(data);
				// no data, need to inform
				if ( data.length == 0 ) self.MsgSet([msg_info_no_data, element('a', {className:'bold'}, 'latest notes', {onclick:function(){
					self.Reset();
					//NoteList.SetData([]);
					NoteList.BuildTable(false);
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
	 * Prepares inner data from user input if changed since last time
	 * @param text string to parse
	 */
	var ParseSearchStr = function ( text ) {
		text = text || self.dom.tinput.value;
		// check if old and current values match
		if ( text !== self.dom.tinput.oldval ) {
			// new data so updating
			self.data = TagManager.ParseStr(text !== hint_filter_tags ? text : '');
			self.dom.tinput.oldval = text;
		}
	}

	/**
	 * Rebuilds the user input
	 */
	var ReworkSearchStr = function ( ctrl ) {
		// fill history if not duplicate
		if ( self.dom.tinput.value &&
			(self.dom.tinput.history.length === 0 || self.dom.tinput.history[self.dom.tinput.history.length-1].trim() !== self.dom.tinput.value.trim()) )
		{
			self.dom.tinput.history.push(self.dom.tinput.value);
			self.dom.tinput.histpos = self.dom.tinput.history.length;
		}
		// prepare
		var list = [],
			tinc = TagManager.IDs2Names(self.data.tinc).join(' '),
			texc = TagManager.IDs2Names(self.data.texc).join(' -'),
			winc = self.data.winc.join(' '),
			wexc = self.data.wexc.join(' -'),
			wcmd = self.data.wcmd.join(' :');
		// fill temp data
		if ( wcmd ) list.push(':'+wcmd);
		if ( texc ) list.push('-'+texc);
		if ( tinc ) list.push(tinc);
		// reset input
		self.dom.tinput.value = '';
		// there was some data entered
		if ( list.length > 0 ) {
			self.dom.tinput.value = list.join(' ') + ' ';
			// just in case style correction
			self.dom.tinput.style.color = '#000';
		}
		// synchronyze the previous value with the current
		self.dom.tinput.oldval = self.dom.tinput.value;
		// filter field
		if ( winc || wexc ) {
			list = [];
			if ( winc ) list.push(winc);
			if ( wexc ) list.push('-'+wexc);
			self.dom.winput.value = list.join(' ');
			// style correction
			self.dom.winput.style.color = '#000';
		}
		// force filter clearing
		if ( ctrl ) {
			self.dom.winput.value = hint_filter_words;
			self.dom.winput.style.color = '#ccc';
		}
	};

	/**
	 * Keyboard input handler for tag search
	 */
	var PerformSearch = function () {
		self.MsgReset();
		// not empty input
		if ( self.dom.tinput.value !== hint_filter_tags && self.dom.tinput.value !== '' ) {
			fb('checking ...');
			// parsed tags don't match
			if ( self.data.tinc.sort().join() !== self.post.tinc.sort().join() ||
				 self.data.texc.sort().join() !== self.post.texc.sort().join() ||
				 self.data.wcmd.sort().join() !== self.post.wcmd.sort().join() )
			{
				// there are changes
				self.NotesRequest();
			}
			// there may be wrong tags
			CheckMissingTags();
		} else {
			// show latest
			NoteList.BuildTable(false);
			// reset inner data
			self.data = TagManager.ParseStr();
			self.post = TagManager.ParseStr();
		}
		self.MsgShow();
	};

	/**
	 * Adds the given tag to the search
	 * @param tagnm string tag name to be processed
	 */
	this.TagInclude = function ( tagnm ) {
		// determine tag id
		var tagid = data_tags_nmlist[tagnm];
		// not added already and valid id
		if ( tagid && !this.data.tinc.has(tagid) ) {
			// prepare inner parsed data
			this.data.tinc.push(tagid);
			this.data.ninc.push(tagnm);
			// reforman input
			ReworkSearchStr();
		}
		PerformSearch();
	};

	/**
	 * Remove the given tag from the search
	 * @param tagnm string tag name to be processed
	 */
	this.TagExclude = function ( tagnm ) {
		// determine tag id
		var tagid = data_tags_nmlist[tagnm];
		// exists in the search line and valid id
		if ( tagid && this.data.tinc.has(tagid) ) {
			// locate tag name and id in the inner parsed data
			var tinci = this.data.tinc.indexOf(tagid);
			var ninci = this.data.ninc.indexOf(tagnm);
			// and clear
			if ( tinci >= 0 ) this.data.tinc.splice(tinci, 1);
			if ( ninci >= 0 ) this.data.ninc.splice(ninci, 1);
			// reforman input
			ReworkSearchStr();
		}
		PerformSearch();
	};

	/**
	 * Subtract the given tag in the search
	 * @param tagnm string tag name to be processed
	 */
	this.TagSubtract = function ( tagnm ) {
		// determine tag id
		var tagid = data_tags_nmlist[tagnm];
		// not subtracted already and valid id
		if ( tagid && !this.data.texc.has(tagid) ) {
			// locate tag name and id in the inner parsed data
			var tinci = this.data.tinc.indexOf(tagid);
			var ninci = this.data.ninc.indexOf(tagnm);
			// and clear
			if ( tinci >= 0 ) this.data.tinc.splice(tinci, 1);
			if ( ninci >= 0 ) this.data.ninc.splice(ninci, 1);
			// prepare inner parsed data
			this.data.texc.push(tagid);
			this.data.nexc.push(tagnm);
			// reforman input
			ReworkSearchStr();
		}
		PerformSearch();
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
		this.data = TagManager.ParseStr();
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

		// parsed input data and its copy on post
		this.data = TagManager.ParseStr();
		this.post = TagManager.ParseStr();

		// build all blocks together
		elchild(this.dom.handle, [
			element('div', {className:'search'}, [
				// tags search input
				element('div', {className:'tblock'}, element('div', {className:'body'}, [
					this.dom.tinput = element('input', {type:'text', className:'line', value:hint_filter_tags, oldval:'', history:[], histpos:0}),
					this.dom.ticon  = element('div', {className:'ticon'})
				])),
				// words search input
				element('div', {className:'wblock'}, element('div', {className:'body'}, [
					this.dom.winput = element('input', {type:'text', className:'line', value:hint_filter_words}),
					this.dom.wicon  = element('div', {className:'wicon'}),
				]))
			]),

			// first line with search inputs
//			tblrow(element('table', {className:'main'}), [
//				// icon
//				element('img', {className:'', src:'img/2x2_grid.png'}),
//				// tags search input
//				element('div', {}, [
//					this.dom.tinput  = element('input', {type:'text', className:'line', value:hint_filter_tags, oldval:'', history:[], histpos:0}),
//					this.dom.ticon   = element('div', {className:'ticon'})
//					//this.dom.suggest = element('div', {className:'suggest'}, 'suggest')
//				]),
//				// words search input
//				element('div', {}, [
//					this.dom.winput  = element('input', {type:'text', className:'line', value:hint_filter_words}),
//					this.dom.wicon   = element('div', {className:'wicon'}),
//				])
//			], [{className:'switch'}, {className:'tags'}, {className:'words'}]),
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

		// autocompleter init
		$(this.dom.tinput).autocomplete({
			matchInside: false,
			selectFirst: true,
			useDelimiter: true,
			delimiterChar: ' ',
			delimiterKeyCode: 32,
			minChars: 1,
			autoWidth: 'width',
			delay: 200,
			data: [true],
			showResult: function(tag){
				// wrap to div with icon
				return '<div class="' + (tag.charAt(0) === ':' ? 'cmd' : 'tag') + '">' + tag + '</div>';
			},
			processData: function(data){
				// only if there should be some results
				if ( data.length > 0 ) {
					// prepare inner parsed data
					ParseSearchStr();
					// preparing
					data = [];
					// commands
					if ( !self.data.wcmd.has('deleted') ) data.push([':deleted', 0]);
					if ( !self.data.wcmd.has('notags') )  data.push([':notags', 0]);
					if ( !self.data.wcmd.has('day') && !self.data.wcmd.has('week') && !self.data.wcmd.has('month') )
						data.push([':day', 0], [':week', 0], [':month', 0]);
					// if notags mode than no tags suggesting
					if ( !self.data.wcmd.has('notags') ) {
						var lnids = [];
						// get linked tags to already selected
						if ( self.data.tinc.length > 0 ) lnids = TagManager.Linked(self.data.tinc);
						// iterate all tags
						for ( var tnm in data_tags_nmlist ) {
							// get tag id
							var tid = data_tags_nmlist[tnm];
							// there are no including tags selected or it's one of the linked tag
							if ( self.data.tinc.length === 0 || lnids.has(tid) )
								// was not added so add it
								if ( !self.data.tinc.has(tid) && !self.data.texc.has(tid) ) data.push([tnm, tid], ['-'+tnm, tid]);
						}
					}
				}
				return data;
			}
		});
		// autocompleter for global use
		this.ac = $(this.dom.tinput).data('autocompleter');

		// tag key input handler
		$(this.dom.tinput).bind('keydown', function(event) {
			// enter
			if ( event.which == 13 ) {
				// prepare inner parsed data
				ParseSearchStr();
				ReworkSearchStr(event.ctrlKey);
				// do search
				PerformSearch();
			}
			// up
			if ( event.which == 38 ) {
				// no autocompleter and valid history cursor
				if ( !self.ac.active_ && this.histpos > 0 ) {
					// move up cursor position to the first non-duplicate item in the history
					while ( this.history[--this.histpos] && this.history[this.histpos].trim() === this.value.trim() ) {}
					// valid position found
					if ( this.histpos >= 0 ) this.value = this.history[this.histpos];
				}
			}
			// down
			if ( event.which == 40 ) {
				// no autocompleter and valid history cursor
				if ( !self.ac.active_ && this.histpos < this.history.length-1 ) {
					// move down cursor position to the first non-duplicate item in the history
					while ( this.history[++this.histpos] && this.history[this.histpos].trim() === this.value.trim() ) {}
					// valid position found
					if ( this.histpos < this.history.length ) this.value = this.history[this.histpos];
				}
			}
			// ctrl + space
			if ( event.ctrlKey && event.which == 32 ) {
				// show autocompleter if possible
				self.ac.activate();
			}
		});

//		this.dom.tinput.onkeyup = function(){
//			// set last history line
//			this.history[this.history.length-1] = this.value;
//			fb(this.history);
//		};

		// handle input
//		var ttimer = null;
//		this.dom.tinput.onkeydown = function() {
//			if ( ttimer ) clearTimeout(ttimer);
//			ttimer = setTimeout(function(){
//				// prepare inner parsed data
//				ParseSearchStr();
//				//CheckMissingTags();
//			}, 150);
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