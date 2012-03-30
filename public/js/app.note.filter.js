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
	this.open = false;

	// watermarks input hints
	var hint_tinput   = 'searching notes with tags separated by space';
	var hint_wexclude = 'click on this word to remove it from the filtering';
	//var hint_winput = 'filtering the found notes';
	// autocompleter command hints
	var hint_cmd = {
		':day'     : 'allows to get notes modified during the last 24 hours',
		':week'    : 'allows to get notes modified during the last week',
		':month'   : 'allows to get notes modified during the last month',
		':notags'  : 'shows the notes without tags',
		':deleted' : 'shows the previously deleted notes'
	};

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
		// inner parsed data
		this.data = TagManager.StrParse(this.dom.tinput.value);
		this.post = TagManager.StrParse();
		// build notes
		PerformSearch();
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
			self.MsgClear();
			//self.MsgShow();
			// clear search string
			this.dom.tinput.encval = App.Encode(this.dom.tinput.value);
			this.dom.tinput.value  = '[encrypted data]';
			// inner parsed data
			this.data = {};
			this.post = {};
			//this.dom.winput.encval = App.Encode(this.dom.winput.value);
			//this.dom.winput.value  = '[encrypted data]';
			//TODO: encrypt/decrypt history
			// clear autocompleter
			$(this.dom.tinput).data('autocompleter').options.data = [];
			// component state flag
			this.open = false;
		}
	};

	this.MsgClear = function () {
		elclear(this.dom.messages);
//		msg = msg || false;
//		if ( msg ) {
//			this.dom[msg].ok = false;
//		} else {
//			for ( var i = 0; i < this.dom.messages.childNodes.length; i++ ) {
//				this.dom.messages.childNodes[i].ok = false;
//			}
//		}
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
	this.MsgAdd = function ( text, type ) {
		type = type || 'info';
		elchild(this.dom.messages, element('div', {className:type}, text));
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
	 * Sends ajax request to receive notes by tags
	 */
	this.NotesRequest = function ( tinc, texc ) {
		LoadingStart();
		this.post = {};
		// clone current data to post
		for ( var item in this.data ) this.post[item] = this.data[item].slice();
		// ajax post request
		$.post('/note/search/', {tinc:this.post.tinc, texc:this.post.texc, wcmd:this.post.wcmd}, function(data){
			if ( !data.error ) {
				NoteList.BuildTable(data);
				// no data, need to inform
				if ( data.length == 0 ) self.MsgAdd([msg_info_no_data, element('a', {className:'bold'}, 'latest notes', {onclick:function(){
					self.Reset();
					//NoteList.SetData([]);
					NoteList.BuildTable(false);
				}})]);
			} else {
				// server error
				self.MsgAdd(msg_fail_server_error + data.error, 'fail');
			}
			// there may be wrong tags
			//CheckMissingTags();
			//self.MsgShow();
			LoadingStop();
		});
	}

	/**
	 * Updates inner data from user input if changed since last time
	 * @return string current input truncated value
	 */
	this.UpdateParsedInput = function () {
		// watermark check and clearing, truncating
		//var tval = this.dom.tinput.value !== hint_tinput ? this.dom.tinput.value.trim() : '';
		var tval = this.dom.tinput.value.trim();
		//var wval = this.dom.winput.value !== hint_winput ? this.dom.winput.value.trim() : '';
		// check if old and current values match
		if ( tval !== this.dom.tinput.oldval //||
			 //wval !== this.dom.winput.oldval
		 )
		 {
			// updating parsed data
			this.data = TagManager.StrParse(tval);
			// save current values
			this.dom.tinput.oldval = tval;
			//this.dom.winput.oldval = wval;
		}
		return tval;
	}



	/**
	 * Rebuilds the user input
	 * @param ctrl bool flag clear word filter if true
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
		// there was some data entered
		if ( list.length > 0 ) {
			self.dom.tinput.value = list.join(' ') + ' ';
			// style correction
			self.dom.tinput.style.color = '#000';
		} else {
			// reset input
			self.dom.tinput.value = hint_tinput;
			// style correction
			self.dom.tinput.style.color = '#ccc';
		}
		// watermark correction
		//self.dom.tinput.;
		// synchronyze the previous value with the current
		self.dom.tinput.oldval = self.dom.tinput.value;
		// filter field
		if ( winc || wexc ) {
			list = [];
			if ( wexc ) list.push('-'+wexc);
			if ( winc ) list.push(winc);
			//self.dom.winput.value = list.join(' ');
			// style correction
			//self.dom.winput.style.color = '#000';
		}
		// force filter clearing
		if ( ctrl ) {
			// clear lists
			self.data.winc = [];
			self.data.wexc = [];
			// update input
			//self.dom.winput.value = hint_winput;
			//self.dom.winput.style.color = '#ccc';
		}
	};

	this.DoSearch = function ( ctrl ) {
		// prepare
		var tval = this.UpdateParsedInput();
		// fill history if not empty and not duplicate
		if ( tval && (self.dom.tinput.history.length === 0 || self.dom.tinput.history[self.dom.tinput.history.length-1].trim() !== tval) ) {
			self.dom.tinput.history.push(self.dom.tinput.value);
			self.dom.tinput.histpos = self.dom.tinput.history.length;
		}
		// update user input if necessary
		if ( ctrl ) this.dom.tinput.value = TagManager.StrBuild(this.data);
		//ReworkSearchStr(ctrl);
		// do search
		PerformSearch();
	}

	/**
	 * Keyboard input handler for tag search
	 */
	var PerformSearch = function () {
		// delete old messages
		self.MsgClear();
		// not empty input
		if ( self.dom.tinput.value.trim() !== '' ) {
			// parsed tags and already posted don't match
			if ( self.data.tinc.sort().join() !== self.post.tinc.sort().join() ||
				 self.data.texc.sort().join() !== self.post.texc.sort().join() ||
				 self.data.wcmd.sort().join() !== self.post.wcmd.sort().join() )
			{
				// there are changes
				self.NotesRequest();
			} else {
				// manual filtering all the table as it was not recreated
				NoteList.SetNotesVisibility();
			}
			// check input for wrong tags
			if ( self.data.winc.length > 0 || self.data.wexc.length > 0 ) {
				var list = []; // shows them comma-separated
				self.data.winc.sort().each(function(item){list.push(element('a', {title:hint_wexclude, word:item, fexc:false},    item, {onclick:WordExclude}));});
				self.data.wexc.sort().each(function(item){list.push(element('a', {title:hint_wexclude, word:item, fexc:true}, '-'+item, {onclick:WordExclude}));});
				self.MsgAdd(['Here is the list of words used which are not your tags:', list, '. It was used for text filtering.']);
			}
		} else {
			// show latest
			NoteList.BuildTable(false);
			// reset inner data
			self.data = TagManager.StrParse();
			self.post = TagManager.StrParse();
		}
	};

	/**
	 * Keyboard input handler for found notes filtering
	 */
//	var PerformFilter = function () {
//		NoteList.SetNotesVisibility(null, self.dom.winput.value);
//	}

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
			this.dom.tinput.value = TagManager.StrBuild(this.data);
			//ReworkSearchStr();
		}
		//this.SetInputStyle();
		PerformSearch();
	};

	/**
	 * Removes the given tag from the search
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
			this.dom.tinput.value = TagManager.StrBuild(this.data);
			//ReworkSearchStr();
		}
		//this.SetInputStyle();
		PerformSearch();
	};

	/**
	 * Subtracts the given tag in the search
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
			this.dom.tinput.value = TagManager.StrBuild(this.data);
			//ReworkSearchStr();
		}
		//this.SetInputStyle();
		PerformSearch();
	};

	/**
	 * Removes the clicked word from the search
	 */
	var WordExclude = function () {
		var list = this.fexc ? self.data.wexc : self.data.winc,
			wind = list.indexOf(this.word);
		if ( wind >= 0 ) {
			// delete word from inner data
			list.splice(wind, 1);
			// remove html element
			this.parentNode.removeChild(this);
			// remove message if there are no more words
			if ( self.data.winc.length == 0 && self.data.wexc.length == 0 ) {
				self.MsgClear();
			}
			// reforman input
			self.dom.tinput.value = TagManager.StrBuild(self.data);
			// filtering all the table
			NoteList.SetNotesVisibility();
		}
	};

//	this.SetInputStyle = function () {
//		var fhint = true;
//		if ( this.dom.tinput.value.trim() ) {
//			// style correction
//			this.dom.tinput.style.color = '#000';
//		} else {
//			// style correction
//			this.dom.tinput.style.color = '#ccc';
//			// set hint
//			this.dom.tinput.value = hint_tinput;
//		}
//	}

	/**
	 * Set default search hints and remove messages
	 */
	this.Reset = function () {
		// clear search string and set focus
		self.dom.tinput.value = '';
		//self.dom.winput.value = hint_winput;
		self.dom.tinput.focus();
		// clear tags data
		this.data = TagManager.StrParse();
		this.post = TagManager.StrParse();
		// delete all messages
		self.MsgClear();
		//self.MsgShow();
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
		this.data = TagManager.StrParse();
		this.post = TagManager.StrParse();

		// build all blocks together
		elchild(this.dom.handle, [
			// main block
			element('div', {className:'search'}, [
				// tags search input
				this.dom.tinput = element('input', {type:'text', className:'line', value:'', oldval:'', history:[], histpos:0}),
				this.dom.ticon  = element('div', {className:'ticon'})
//,
//				// words search input
//				element('div', {className:'wblock'}, element('div', {className:'body'}, [
//					this.dom.winput = element('input', {type:'text', className:'line', value:hint_winput, oldval:''}),
//					this.dom.wicon  = element('div', {className:'wicon'}),
//				]))
			]),
			// hidden messages
			this.dom.messages = element('div', {className:'messages'}, [
//				this.dom.fail = element('div', {className:'fail'}, 'test 3'),
//				this.dom.warn = element('div', {className:'warn'}, 'test 2'),
//				this.dom.info = element('div', {className:'info'}, 'test 1')
			])
		]);

		// input hints
		//watermark(this.dom.tinput, hint_tinput, '#000');
		//watermark(this.dom.winput, hint_winput, '#000');

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
				var hint = '', fcmd = tag.charAt(0) === ':';
				if ( fcmd ) {
					hint = '<div class="hint">' + hint_cmd[tag] + '</div>';
				}
				// wrap to div with icon
				return '<div class="' + (fcmd ? 'cmd' : 'tag') + '">' + tag + hint + '</div>';
			},
			processData: function(data){
				// only if there should be some results
				if ( data.length > 0 ) {
					// prepare inner parsed data
					self.UpdateParsedInput();
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
				self.DoSearch(event.ctrlKey);
				// prepare inner parsed data
//				UpdateParsedInput();
//				ReworkSearchStr(event.ctrlKey);
//				// do search
//				PerformSearch();
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
//				UpdateParsedInput();
//				//CheckMissingTags();
//			}, 150);
//		}
//
		// handle input
//		var wtimer = null;
//		this.dom.winput.onkeydown = function() {
//			if ( wtimer ) clearTimeout(wtimer);
//			wtimer = setTimeout(function(){
//
//			}, 300);
//		}

//		// tag key input handler
//		$(this.dom.winput).bind('keydown', function(event) {
//			// enter
//			if ( event.which == 13 ) self.DoSearch(false);
//		});
	};
};