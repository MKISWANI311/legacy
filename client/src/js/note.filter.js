/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var //autocomplete = require('autocompleter'),
    //app = require('./app'),
    api = require('./api'),
    NoteList = require('./note.list'),
    TagManager = require('./tag.manager');


/**
 * Main module to work with user tags and words input
 * sends ajax request to the server side, helps to render results, shows messages
 */
var NoteFilter = new function () {
    // for limited scopes
    var self = this;

    // component state flag
    // true  - everything is decoded
    // false - no plain data, everything is encrypted
    //this.open = false;

    // hints
    var hint_wexclude = 'click on this word to remove it from the filtering';
    var hint_home = 'reset all search parameters and filters and request the latest active notes';

    // autocompleter commands hints
    var hint_cmd = {
        ':day': 'notes modified during the last 24 hours',
        ':week': 'notes modified during the last week',
        ':month': 'notes modified during the last month',
        ':notags': 'notes without tags',
        ':deleted': 'deleted notes'
    };

    // message texts
    var msg_info_no_data = 'There are no records to meet the given search options. You can change these options or see your ';
    var msg_fail_server_error = 'The request was not successful. The response from the server: ';


    /**
     * Open the subscriber
     * master password is accessible
     * decrypt all the data and show it
     */
    // this.EventOpen = function () {
    //     // decrypt input data if not the first time
    //     if ( this.dom.input.data.length ) {
    //         this.dom.input.data = JSON.parse(app.decode(this.dom.input.data));
    //     }
    //     // restore backuped value
    //     this.dom.input.value = this.dom.input.data.encval;
    //     // inner parsed data
    //     this.data = TagManager.StrParse(this.dom.input.value);
    //     this.post = TagManager.StrParse();
    //     // build notes
    //     PerformSearch();
    //     // show/hide info and controls
    //     NoteList.UpdateCtrlBlock(true);
    //     // component state flag
    //     this.open = true;
    // };

    /**
     * Close the subscriber
     * master password is expired and cleared
     * clear all the decrypted data
     */
    // this.EventClose = function () {
    //     // close only if opened at the moment
    //     if ( this.open ) {
    //         // delete messages
    //         self.MsgClear();
    //         // backup and clear search string
    //         this.dom.input.data.encval = this.dom.input.value;
    //         // encrypt input data
    //         this.dom.input.data = app.encode(JSON.stringify(this.dom.input.data));
    //         // hide current value
    //         this.dom.input.value = '[encrypted data]';
    //         // inner parsed data
    //         this.data = {};
    //         this.post = {};
    //         // clear autocompleter
    //         $(this.dom.input).data('autocompleter').options.data = [true];
    //         // component state flag
    //         this.open = false;
    //     }
    // };


    /**
     * Removes all the messages
     */
    this.MsgClear = function () {
        elclear(this.dom.messages);
    };


    /**
     * Appends the given message
     * @param text string message to add
     * @param type string message type: info (default), warn, fail
     */
    this.MsgAdd = function ( text, type ) {
        elchild(this.dom.messages, element('div', {className: type || 'info'}, text));
    };


    /**
     * Set focus to tag search field
     */
    this.SetFocus = function () {
        this.dom.input.focus();
    };


    /**
     * Visual flags
     */
    var LoadingStart = function () {
        self.dom.icon.className = 'icon loading';
        self.dom.messages.className = 'messages loading';
    };


    /**
     * Visual flags
     */
    var LoadingStop = function () {
        self.dom.icon.className = 'icon';
        self.dom.messages.className = 'messages';
    };


    /**
     * Resets the current search options
     * and get the lates notes
     */
    this.RequestLatest = function () {
        this.Reset();
        this.NotesRequest();
    };


    /**
     * Resets the current search options
     * and get the deleted notes using :deleted tag
     */
    this.RequestDeleted = function () {
        //this.Reset();
        this.MsgClear();
        // update user input
        this.dom.input.value = ':deleted';
        // prepare inner data
        this.UpdateParsedInput();
        // get data and build note list
        this.NotesRequest();
    };


    /**
     * Sends ajax request to receive notes by tags and
     * makes a note list using the received data
     */
    this.NotesRequest = function ( isall ) {
        // show loading progress
        LoadingStart();
        // clone current data to post data
        for ( var item in this.data ) this.post[item] = this.data[item].slice();

        api.post('note/search', {
            tinc: this.post.tinc,
            texc: this.post.texc,
            wcmd: this.post.wcmd,
            all: isall
        }, function ( error, data ) {
            if ( error ) {
                console.error(error);
            }

            console.log('note search', data);

            if ( !data.error ) {
                // make note list using the received data
                NoteList.BuildTable(data.notes, data.total);
                // check if no data but show message only if there were some search options uses
                if ( data.total === 0 && (self.data.tinc.length || self.data.texc.length || self.data.wcmd.length) )
                // no data, need to inform and suggest to see for example the latest notes
                    self.MsgAdd([msg_info_no_data, element('a', {className: 'bold'}, 'latest notes', {
                        onclick: function () {
                            self.RequestLatest();
                        }
                    })]);
            } else {
                // server error
                self.MsgAdd(msg_fail_server_error + data.error, 'fail');
            }

            // hide loading progress
            LoadingStop();
        });
    };


    /**
     * Updates inner data from user input if changed since last time
     */
    this.UpdateParsedInput = function () {
        // check if old and current values match
        if ( this.dom.input.value.trim() !== this.dom.input.data.oldval.trim() ) {
            // updating parsed data
            this.data = TagManager.StrParse(this.dom.input.value);
            // save current values
            this.dom.input.data.oldval = this.dom.input.value;
        }
    };


    /**
     * Search handler
     * updates the inner parsed data, saves the history and do the search
     * Ctrl+Enter does the search and reformats the search string
     * @param ctrl bool flag for Ctrl key holding
     */
    this.DoSearch = function ( ctrl ) {
        var data = this.dom.input.data;

        // prepare inner data
        this.UpdateParsedInput();
        // history
        //with ( self.dom.input ) {
        // first record or not the same as the last one
        if ( data.history.length === 0 || data.history[data.history.length - 1] !== this.dom.input.value ) {
            // fill history and reset cursor
            data.history.push(this.dom.input.value);
            data.histpos = data.history.length;
        }
        //}
        // update user input if necessary
        if ( ctrl ) this.dom.input.data.oldval = this.dom.input.value = TagManager.StrBuild(this.data);
        // do search
        PerformSearch();
    };


    /**
     * Keyboard input handler for tag search
     */
    var PerformSearch = function () {
        // delete old messages
        self.MsgClear();
        // not empty input
//        if ( self.dom.input.value.trim() != '' ) {
        // parsed tags and already posted don't match
        if ( self.data.tinc.sort().join() != self.post.tinc.sort().join() ||
            self.data.texc.sort().join() != self.post.texc.sort().join() ||
            self.data.wcmd.sort().join() != self.post.wcmd.sort().join() ||
            self.dom.input.value.trim() == '' ) {
            // there are changes
            self.NotesRequest();
        } else {
            // manual filtering all the table as it was not recreated
            NoteList.SetNotesVisibility();
        }
        // check input for wrong tags
        if ( self.data.winc.length > 0 || self.data.wexc.length > 0 ) {
            var list = []; // shows them comma-separated
            self.data.winc.sort().forEach(function ( item ) {
                list.push(element('a', {title: hint_wexclude, word: item, fexc: false}, item, {onclick: WordExclude}));
            });
            self.data.wexc.sort().forEach(function ( item ) {
                list.push(element('a', {
                    title: hint_wexclude,
                    word: item,
                    fexc: true
                }, '-' + item, {onclick: WordExclude}));
            });
            self.MsgAdd(['Here is the list of words used which are not your tags:', list, '. It was used for text filtering.']);
        }
//        } else {
//            // show latest
//            NoteList.BuildTable(false);
//            // reset inner data
//            self.data = TagManager.StrParse();
//            self.post = TagManager.StrParse();
//        }
    };


    /**
     * Adds the given tag to the search
     * @param tagnm string tag name to be processed
     */
    this.TagInclude = function ( tagnm ) {
        // determine tag id
        var tagid = TagManager.dataNmlist[tagnm];
        // not added already and valid id
        if ( tagid && !this.data.tinc.has(tagid) ) {
            // prepare inner parsed data
            this.data.tinc.push(tagid);
            this.data.ninc.push(tagnm);
            // reforman input
            this.dom.input.data.oldval = this.dom.input.value = TagManager.StrBuild(this.data);
        }
        // execute
        PerformSearch();
    };


    /**
     * Removes the given tag from the search
     * @param tagnm string tag name to be processed
     */
    this.TagExclude = function ( tagnm ) {
        // determine tag id
        var tagid = TagManager.dataNmlist[tagnm];
        // exists in the search line and valid id
        if ( tagid && this.data.tinc.has(tagid) ) {
            // locate tag name and id in the inner parsed data
            var tinci = this.data.tinc.indexOf(tagid);
            var ninci = this.data.ninc.indexOf(tagnm);
            // and clear
            if ( tinci >= 0 ) this.data.tinc.splice(tinci, 1);
            if ( ninci >= 0 ) this.data.ninc.splice(ninci, 1);
            // reforman input
            this.dom.input.data.oldval = this.dom.input.value = TagManager.StrBuild(this.data);
            //ReworkSearchStr();
        }
        // execute
        PerformSearch();
    };


    /**
     * Subtracts the given tag in the search
     * @param tagnm string tag name to be processed
     */
    this.TagSubtract = function ( tagnm ) {
        // determine tag id
        var tagid = TagManager.dataNmlist[tagnm];
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
            this.dom.input.data.oldval = this.dom.input.value = TagManager.StrBuild(this.data);
            //ReworkSearchStr();
        }
        // execute
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
            if ( self.data.winc.length === 0 && self.data.wexc.length === 0 ) {
                self.MsgClear();
            }
            // reforman input
            self.dom.input.data.oldval = self.dom.input.value = TagManager.StrBuild(self.data);
            // filtering all the table
            NoteList.SetNotesVisibility();
        }
    };


    /**
     * Set default search hints and remove messages
     */
    this.Reset = function () {
        // clear search string and set focus
        this.dom.input.data.oldval = this.dom.input.value = '';
        self.dom.input.focus();
        // clear tags data
        this.data = TagManager.StrParse();
        this.post = TagManager.StrParse();
        // delete all messages
        self.MsgClear();
    };


    /**
     * Main init method
     * @param params list of configuration parameters
     */
    this.Init = function ( params ) {
        // check input
        if ( !params.handle ) return;
        // html parent object
        this.dom = {handle: params.handle};

        // parsed input data and its copy on post
        this.data = TagManager.StrParse();
        this.post = TagManager.StrParse();

        // build all blocks together
        elchild(this.dom.handle, [
            // main block
            element('div', {className: 'search'}, [
                // home button and tags search input
                this.dom.home = element('div', {className: 'home'}, element('div', {title: hint_home}, null, {
                    onclick: function () {
                        self.RequestLatest();
                    }
                })),
                this.dom.input = element('input', {
                    className: 'line',
                    placeholder: 'search by tags or content ...',
                    type: 'text',
                    data: {encval: '', oldval: '', history: [], histpos: 0}
                }),
                this.dom.icon = element('div', {className: 'icon'})
            ]),
            // hidden messages
            this.dom.messages = element('div', {className: 'messages'})
        ]);

        /*autocomplete({
            minLength: 1,
            input: this.dom.input,
            fetch: function ( text, update ) {
                var tags = text.toLowerCase().match(/(\S+)/g);

                console.log('input', text, tags);

                // only if there should be some results
                //if ( data.length > 0 ) {
                // prepare inner parsed data
                self.UpdateParsedInput();
                // preparing
                var data = [];
                // commands
                if ( !self.data.wcmd.has('deleted') ) {
                    data.push({item: [':deleted', 0]});
                }
                if ( !self.data.wcmd.has('notags') ) {
                    data.push({item: [':notags', 0]});
                }
                if ( !self.data.wcmd.has('day') && !self.data.wcmd.has('week') && !self.data.wcmd.has('month') )
                    data.push({item: [':day', 0]}, {item: [':week', 0]}, {item: [':month', 0]});
                // if notags mode than no tags suggesting
                if ( !self.data.wcmd.has('notags') ) {
                    var lnids = [];
                    // get linked tags to already selected
                    if ( self.data.tinc.length > 0 ) lnids = TagManager.Linked(self.data.tinc);
                    // iterate all tags
                    for ( var tnm in window.dataTagsNmlist ) {
                        // get tag id
                        var tid = window.dataTagsNmlist[tnm];
                        // there are no including tags selected or it's one of the linked tag
                        if ( self.data.tinc.length === 0 || lnids.has(tid) ) {
                            // was not added so add it
                            if ( !self.data.tinc.has(tid) && !self.data.texc.has(tid) ) {
                                data.push({item: [tnm, tid]}, {item: ['-' + tnm, tid]});
                            }
                        }
                    }
                }
                console.log('data', data);
                //}

                update(data);
                //update(data.filter(function ( item ) {
                //    return item.item[0].startsWith(text.toLowerCase());
                //}));
            },
            render: function ( item ) {
                var type  = 'tag',
                    $body = document.createElement('div'),
                    $hint;

                $body.textContent = item.item[0];

                if ( item.item[0][0] === ':' ) {
                    // command
                    type  = 'cmd';
                    $hint = document.createElement('div');
                    $hint.textContent = hint_cmd[item.item[0]];
                    $body.appendChild($hint);
                } else {
                    // tag

                }

                $body.className = type;

                return $body;
            },
            onSelect: function ( item ) {
                console.log(item);
                self.dom.input.value = item[0];
            }
        });/**/


        // autocompleter init
        $(this.dom.input).autocomplete({
            matchInside: false,
            selectFirst: true,
            useDelimiter: true,
            delimiterChar: ' ',
            delimiterKeyCode: 32,
            minChars: 1,
            autoWidth: 'width',
            delay: 200,
            data: [true],
            showResult: function ( tag ) {
                // degradation fix
                return tag;

                /*var hint = '', fcmd = tag.charAt(0) == ':';
                if ( fcmd ) {
                    hint = '<div class="hint">' + hint_cmd[tag] + '</div>';
                }
                // wrap to div with icon
                return '<div class="' + (fcmd ? 'cmd' : 'tag') + '">' + tag + hint + '</div>';*/
            },
            processData: function ( data ) {
                // only if there should be some results
                if ( data.length > 0 ) {
                    // prepare inner parsed data
                    self.UpdateParsedInput();
                    // preparing
                    data = [];
                    // commands
                    if ( !self.data.wcmd.has('deleted') ) data.push([':deleted', 0]);
                    if ( !self.data.wcmd.has('notags') ) data.push([':notags', 0]);
                    if ( !self.data.wcmd.has('day') && !self.data.wcmd.has('week') && !self.data.wcmd.has('month') )
                        data.push([':day', 0], [':week', 0], [':month', 0]);
                    // if notags mode than no tags suggesting
                    if ( !self.data.wcmd.has('notags') ) {
                        var lnids = [];
                        // get linked tags to already selected
                        if ( self.data.tinc.length > 0 ) lnids = TagManager.Linked(self.data.tinc);
                        // iterate all tags
                        for ( var tnm in TagManager.dataNmlist ) {
                            // get tag id
                            var tid = TagManager.dataNmlist[tnm];
                            // there are no including tags selected or it's one of the linked tag
                            if ( self.data.tinc.length === 0 || lnids.has(tid) )
                            // was not added so add it
                                if ( !self.data.tinc.has(tid) && !self.data.texc.has(tid) ) data.push([tnm, tid], ['-' + tnm, tid]);
                        }
                    }
                }
                return data;
            }
        });

        // autocompleter for global access
        this.ac = $(this.dom.input).data('autocompleter');
        /**/

        // search input handler
        //$(this.dom.input).bind('keydown', function(event) {
        this.dom.input.addEventListener('keydown', function ( event ) {
            // enter
            if ( event.keyCode === 13 ) {
                self.DoSearch(event.ctrlKey);
            }

            // up
            if ( event.keyCode === 38 ) {
                // no autocompleter and valid history cursor
                if ( !self.ac.active_ && this.data.histpos > 0 ) {
                    // move up cursor position to the first non-duplicate item in the history
                    while ( this.data.history[--this.data.histpos] && this.data.history[this.data.histpos].trim() === this.value.trim() ) {
                    }
                    // valid position found
                    if ( this.data.histpos >= 0 ) this.value = this.data.history[this.data.histpos];
                }
            }

            // down
            if ( event.keyCode === 40 ) {
                // no autocompleter and valid history cursor
                if ( !self.ac.active_ && this.data.histpos < this.data.history.length - 1 ) {
                    // move down cursor position to the first non-duplicate item in the history
                    while ( this.data.history[++this.data.histpos] && this.data.history[this.data.histpos].trim() === this.value.trim() ) {
                    }
                    // valid position found
                    if ( this.data.histpos < this.data.history.length ) this.value = this.data.history[this.data.histpos];
                }
            }

            // ctrl + space
            if ( event.ctrlKey && event.keyCode === 32 ) {
                // show autocompleter if possible
                self.ac.activate();
            }
        });

        // build notes
        PerformSearch();
        // show/hide info and controls
        NoteList.UpdateCtrlBlock(true);
    };
};

window.NoteFilter = NoteFilter;


// public
module.exports = NoteFilter;
