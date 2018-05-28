/**
 * Main module to work with single note
 * creation, edit or view
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var //autocomplete = require('autocompleter'),
    app = require('./app'),
    api = require('./api'),
    //NoteFilter   = require('./app.note.filter'),
    NoteList = require('./note.list'),
    TemplateList = require('./template.list'),
    TagManager = require('./tag.manager'),
    entryTypes = require('./data.entry.types');


window.NoteEditor = new function () {
    // for limited scopes
    var self = this;

    // input data length limit
    var maxlengthTags = 1024,  // total length of all tags in the input field
        maxlengthTitle = 256;   // entry name max length

    // flag to indicate if there are some changes
    // note entries was moved or type is changed
    // entry added or deleted
    var changed = false;

    // messages
    var msgHasChanges = 'The current note has unsaved changes. Do you really want to continue and lost these changes?';

    // hover hints
    var hint_back = 'Will discard all your current changes and show the template list.';
    var hint_new = 'Will create a new note based on the current one.';
    var hint_clone = 'Will save the current note as a copy.';
    var hint_save = 'Will save all your changes. You can also press Ctrl+Enter';

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
        // open if there is a note
        if ( this.data ) {
            // iterate all entries
            for ( var i = 0; i < this.dom.entries.childNodes.length; i++ ) {
                var entry = this.dom.entries.childNodes[i];
                //with ( this.dom.entries.childNodes[i] ) {

                // set post data
                entry.post.name_dec = app.decode(entry.post.name);
                entry.post.data_dec = app.decode(entry.post.data);
                // set current data (taking either from post or decrypt)
                entry.data.name_dec = (entry.post.name === entry.data.name) ? entry.post.name_dec : app.decode(entry.data.name);
                entry.data.data_dec = (entry.post.data === entry.data.data) ? entry.post.data_dec : app.decode(entry.data.data);
                // enable all inputs
                entry.dom.name.disabled = entry.dom.data.disabled = false;
                // change input to decrypted values
                entry.dom.name.value = entry.data.name_dec;
                entry.dom.data.value = entry.data.data_dec;
                // update counter value
                entry.dom.data.onkeyup();
                //}
            }
            EnableControls(true);
            // tags block
            this.dom.tags.input.disabled = false;
            this.dom.tags.input.value = TagManager.IDs2Str(this.data.tags).toLowerCase();
            // fill autocompleter
            var data = [];
            // prepare all tags
            for ( var tid in window.dataTagsIdlist ) data.push([window.dataTagsIdlist[tid], tid]);
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
        // close only if opened at the moment and there is a note
        if ( this.data && this.open ) {
            // iterate all entries
            for ( var i = 0; i < this.dom.entries.childNodes.length; i++ ) {
                var entry = this.dom.entries.childNodes[i];
                //with ( this.dom.entries.childNodes[i] ) {
                // if data changed than reassing (taking either from post or encrypt)
                if ( entry.data.name_dec !== entry.dom.name.value ) entry.data.name = (entry.post.name_dec === entry.dom.name.value) ? entry.post.name : app.encode(entry.dom.name.value);
                if ( entry.data.data_dec !== entry.dom.data.value ) entry.data.data = (entry.post.data_dec === entry.dom.data.value) ? entry.post.data : app.encode(entry.dom.data.value);
                // clear post and current data
                entry.post.name_dec = entry.data.name_dec = null;
                entry.post.data_dec = entry.data.data_dec = null;
                // disable all inputs
                entry.dom.name.disabled = entry.dom.data.disabled = true;
                // change input to default hidden values
                entry.dom.name.value = '********';
                entry.dom.data.value = '[encrypted data]';
                // hide counter value
                entry.dom.counter.innerHTML = '';
                // hide history block and clear content
                entry.dom.history.style.display = 'none';
                elclear(entry.dom.history);
                delete entry.data.history;
                //}
            }
            EnableControls(false);
            // tags block
            this.dom.tags.input.disabled = true;
            this.data.tags = TagManager.Str2IDs(this.dom.tags.input.value.toLowerCase());
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
        if ( data.length !== post.length ) return true;
        // check parsed string
        for ( var id = null, i = 0; i < data.length; i++ ) {
            id = window.dataTagsNmlist[data[i]];
            // new tag not posted to the server
            if ( !id ) return true;
            // posted tags not include this id
            if ( !post.has(id) ) return true;
        }
        return false;
    };

    /**
     * Collect all the note and entries data
     */
    var GetData = function () {
        // local vars
        var i = 0, entry = null, deleted = [], ids = [];

        // get the list of tags ids and names
        self.data.tags = TagManager.Str2IDs(self.dom.tags.input.value.toLowerCase());
        // tags changed since the last post
        if ( self.data.tags.join() !== self.post.tags.join() ) {
            // drop flag or copy of tags
            self.post.tags = (self.data.tags.length === 0) ? 0 : self.data.tags.slice();
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
            if ( entry.post.id_type !== entry.data.id_type || entry.data.id === undefined )
                post.id_type = entry.data.id_type;
            // entry name changed or new mode
            if ( entry.post.name_dec !== entry.dom.name.value || entry.data.id === undefined ) {
                entry.data.name = post.name = (entry.data.name_dec === entry.dom.name.value) ? entry.data.name : app.encode(entry.dom.name.value);
                entry.data.name_dec = entry.dom.name.value;
            }
            // entry value changed or new mode
            if ( entry.post.data_dec !== entry.dom.data.value || entry.data.id === undefined ) {
                entry.data.data = post.data = (entry.data.data_dec === entry.dom.data.value) ? entry.data.data : app.encode(entry.dom.data.value);
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

        console.log('note data to post', self.post);

        return self.post;
    };

    /**
     * Saves all note changes
     * 1. collects note and entries data
     * 2. does ajax request to save
     * 3. processing the response
     */
    this.Save = function () {
        // do nothing if there are no modifications
        if ( !this.HasChanges() ) {
            return;
        }

        // disable controls to prevent double posting
        EnableControls(false);
        //SetTitleIcon('img/message.loading.gif');

        api.post('note/save/' + (this.data.id || ''), GetData(), function ( error, data ) {
            if ( error ) {
                console.error(error);
            }

            console.log('note save', data);

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
                    entry.data.id = data.entries[i].id;
                    entry.post.name = entry.data.name;
                    entry.post.name_dec = entry.data.name_dec;
                    entry.post.data = entry.data.data;
                    entry.post.data_dec = entry.data.data_dec;
                    entry.post.id_type = entry.data.id_type;
                    // clear color from inputs
                    //$(entry.dom.name).removeClass('changed');
                    entry.dom.name.classList.remove('changed');
                    //$(entry.dom.data).removeClass('changed');
                    entry.dom.data.classList.remove('changed');
                    //$(self.dom.tags.input).removeClass('changed');
                    self.dom.tags.input.classList.remove('changed');

                    // change icons according to status
                    if ( data.entries[i].changed ) entry.dom.icon.src = 'img/field_flag_ok.png';
                    if ( data.entries[i].added ) entry.dom.icon.src = 'img/field_flag_add.png';

                    // rebuild global data in case some items deleted or added
                    entries.push(entry.data);
                }
                self.data.entries = entries;
                // tags processed
                if ( data.tags ) {
                    // there are tags in response and correspond with sent ones
                    if ( data.tags instanceof Array && self.data.tags.length === data.tags.length ) {
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
                self.dom.tags.input.value = TagManager.IDs2Str(self.data.tags).toLowerCase();
                // confirm posted tags
                self.post.tags = self.data.tags.slice();
                // clear deleted entries list
                delete self.post.deleted;
                // timer to set default images
                setTimeout(function () {
                    // iterate all entries
                    for ( var i = 0; i < self.dom.entries.childNodes.length; i++ ) {
                        //with ( self.dom.entries.childNodes[i] )
                        var child = self.dom.entries.childNodes[i];
                        //child.dom.icon.src = 'img/field_' + window.dataEntryTypes.data[child.data.id_type][window.dataEntryTypes.defn.name] + '.png';
                        child.dom.icon.src = 'img/field_' + entryTypes.hash[child.data.id_type].name + '.png';
                    }
                    self.dom.tags.icon.src = 'img/field_tag.png';
                }, 2000);

                // flag reset
                changed = false;

                NoteFilter.NotesRequest();
//                if ( is_new ) {
//                    self.data.ctime = Math.round(new Date().getTime() / 1000);
//                    NoteList.NoteCreate(self.data);
//                } else {
//                    self.data.mtime = Math.round(new Date().getTime() / 1000);
//                    //NoteList.dom.notes.removeChild(NoteList.dom.notes.active);
//                    NoteList.NoteUpdate(self.data);
//                }

//                if ( NoteList.dom.notes.active ) {
//                    var note = NoteList.dom.notes.active;
//                    if ( NoteList.NoteVisible(note) ) NoteList.DrawNoteTags(note);
//                }
            } else {
                // invalid response from the server
            }
            // enable controls
            EnableControls(true);
            //$(self.dom.controls).removeClass('loading');
            // change icon if necessary
            SetTitleIcon();
            //self.Escape();
        });
    };

    /**
     * Control button change type
     * @param entry pointer to the entry data
     */
    var EntryBtnConfig = function ( entry ) {
        // crete list if not exist
        if ( entry.dom.type.childNodes.length === 0 ) {
            var list = table(1, 0, {className: 'list'}, {
                // set old desc
                onmouseout: function () {
                    entry.dom.desc.innerHTML = entry.dom.desc.value;
                }
            });

            var cell = null;
            // build type list
            //for ( var id in window.dataEntryTypes.data ) {
            for ( var id in entryTypes.hash ) {
                id = parseInt(id, 10);
                //cell = element('td', {className: entry.data.id_type === id ? 'current' : 'item'}, window.dataEntryTypes.data[id][window.dataEntryTypes.defn.name], {
                cell = element('td', {className: entry.data.id_type === id ? 'current' : 'item'}, entryTypes.hash[id].name, {
                    // set desc on mouse over action
                    onmouseover: function () {
                        entry.dom.desc.innerHTML = this.desc;
                    },
                    onclick: function () {
                        if ( this.className == 'item' ) {
                            // change name if default
                            //if ( entry.dom.name.value == window.dataEntryTypes.data[entry.data.id_type][window.dataEntryTypes.defn.name] ) {
                            //entry.dom.name.value = window.dataEntryTypes.data[this.type][window.dataEntryTypes.defn.name];
                            entry.dom.name.value = entryTypes.hash[this.type].name;
                            //}
                            // prepare type, name and value
                            entry.data.id_type = this.type;
                            entry.data.name = app.encode(entry.dom.name.value);
                            entry.data.name_dec = entry.dom.name.value;
                            entry.data.data = app.encode(entry.dom.data.value);
                            entry.data.data_dec = entry.dom.data.value;
                            // clone entry and do some sync
                            var entry_new = EntryCreate(entry.data);
                            entry_new.post = entry.post;
                            entry_new.dom.name.onchange();
                            entry_new.dom.data.onchange();
                            // insert and remove
                            self.dom.entries.insertBefore(entry_new, entry);
                            self.dom.entries.removeChild(entry);
                            // set flag
                            changed = true;
                        }
                    }
                });
                cell.type = id;
                //cell.name = window.dataEntryTypes.data[id][window.dataEntryTypes.defn.name];
                cell.name = entryTypes.hash[id].name;
                //cell.desc = window.dataEntryTypes.data[id][window.dataEntryTypes.defn.description];
                cell.desc = entryTypes.hash[id].description;
                elchild(list, cell);
            }
            elchild(entry.dom.type, list);
        }
        // show/hide block
        entry.dom.type.style.display = (entry.dom.type.style.display !== 'block' ? 'block' : 'none');
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
                elchild(elclear(entry.dom.history), element('div', {className: 'info'}, 'loading ...'));

                api.get('note/history/' + self.data.id + '/' + entry.data.id, function ( error, history ) {
                    if ( error ) {
                        console.error(error);
                        return;
                    }

                    console.log('note history', history);

                    elclear(entry.dom.history);
                    entry.data.history = history;
                    var tbl = element('table', {className: 'maxw'});
                    if ( history.data.length ) {
                        for ( var i = 0; i < history.data.length; i++ ) {
                            var name = history.data[i][history.defn.name] ? app.decode(history.data[i][history.defn.name]) : '';
                            var data = history.data[i][history.defn.data] ? app.decode(history.data[i][history.defn.data]) : '';
                            tblrow(tbl, [
                                // name and data
                                element('span', {title: name}, (name.length > 20) ? name.slice(0, 15) + '...' : name),
                                element('span', {title: data}, (data.length > 30) ? data.slice(0, 25) + '...' : data),
                                // link to use
                                element('a', {name: name, data: data}, 'use', {
                                    onclick: function () {
                                        entry.dom.name.value = this.name;
                                        entry.dom.data.value = this.data;
                                        entry.dom.name.onchange();
                                        entry.dom.data.onchange();
                                        entry.dom.history.style.display = 'none';
                                    }
                                })
                            ], [{className: 'name'}, {className: 'data'}, {className: 'ctrl'}]);
                        }
                        elchild(elclear(entry.dom.history), tbl);
                    } else {
                        // no history on the server
                        elchild(elclear(entry.dom.history), element('div', {className: 'info'},
                            'there are no history records for this entry'));
                    }
                });
            } else {
                // new entry
                entry.data.history = [];
                elchild(elclear(entry.dom.history), element('div', {className: 'info'},
                    'there are no history records for this entry'));
            }
        }
        // show/hide block
        entry.dom.history.style.display = (entry.dom.history.style.display !== 'block' ? 'block' : 'none');
    };

    /**
     * Control button add new
     * @param entry pointer to the entry data
     */
    var EntryBtnAdd = function ( entry ) {
        // prepare name and value
        //var name = window.dataEntryTypes.data[entry.data.id_type][window.dataEntryTypes.defn.name];
        var name = entryTypes.hash[entry.data.id_type].name;
        // generate some password if pass type
        var data = (entry.data.id_type == 4) ? pwdgen(20) : '';
        // clone
        var entry_new = EntryCreate({
            id_type: entry.data.id_type,
            name: app.encode(name),
            name_dec: name,
            data: app.encode(data),
            data_dec: data
        });
        self.dom.entries.insertBefore(entry_new, entry);
        //$(entry_new.dom.name).addClass('changed');
        entry_new.dom.name.classList.add('changed');
        //$(entry_new.dom.data).addClass('changed');
        entry_new.dom.data.classList.add('changed');
        changed = true;
    };

    /**
     * Control button move up
     * @param entry pointer to the entry data
     */
    var EntryBtnUp = function ( entry ) {
        // can be moved
        if ( entry.previousSibling ) {
            self.dom.entries.insertBefore(entry, entry.previousSibling);
            changed = true;
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
            changed = true;
        }
    };

    /**
     * Control button delete
     * @param entry pointer to the entry data
     */
    var EntryBtnDelete = function ( entry ) {
        if ( self.dom.entries.childNodes.length > 1 ) {
            // hide entry
            //$(entry.dom.undo).toggleClass('hidden');
            entry.dom.undo.classList.toggle('hidden');
            //$(entry.dom.body).toggleClass('hidden');
            entry.dom.body.classList.toggle('hidden');
            // set flag
            entry.deleted = true;
            changed = true;
        }
    };

    /**
     * Block of note entry title name input with controls
     * @param entry pointer to the entry data
     */
    var EntryBlockTitle = function ( entry ) {
        // editable name
        entry.dom.name = element('input', {
            type: 'text',
            maxLength: maxlengthTitle,
            disabled: !self.open,
            value: entry.data.name_dec
        }, '', {
            onchange: function () {
                this.value = this.value.trim();
                // only for edit mode
                if ( self.data.id ) {
                    if ( entry.post.name_dec !== null && entry.post.name_dec !== this.value ) {
                        //$(this).addClass('changed');
                        this.classList.add('changed');
                    } else {
                        //$(this).removeClass('changed');
                        this.classList.remove('changed');
                    }
                }
            }
        });

        //$(entry.dom.name).keydown(function(event) {
        entry.dom.name.addEventListener('keydown', function ( event ) {
            // up
            if ( event.keyCode === 38 && entry.previousSibling ) {
                entry.previousSibling.dom.name.focus();
            }
            // down
            if ( event.keyCode === 40 && entry.nextSibling ) {
                entry.nextSibling.dom.name.focus();
            }
        });

        // icon image
        entry.dom.icon = element('img', {
            //src: 'img/field_' + window.dataEntryTypes.data[entry.data.id_type][window.dataEntryTypes.defn.name] + '.png'
            src: 'img/field_' + entryTypes.hash[entry.data.id_type].name + '.png'
            //title: 'drag and drop to change the entries order'
        });
        // top title line with name and controls
        entry.dom.title = tblrow(element('table', {className: 'title'}), [entry.dom.icon, entry.dom.name, entry.dom.controls], [{className: 'icon'}, {className: 'name'}, {className: 'controls'}]);
    };

    /**
     * Block of note entry data input
     * @param entry pointer to the entry data
     */
    var EntryBlockInput = function ( entry ) {
        // types
        entry.dom.type = element('div', {className: 'type'});
        // get the input data max length
        //var limit = window.dataEntryTypes.data[entry.data.id_type][window.dataEntryTypes.defn.max];
        var limit = entryTypes.hash[entry.data.id_type].max;
        // create input depending on entry type
        if ( entry.data.id_type === 6 || entry.data.id_type === 7 ) {
            entry.dom.data = element('textarea', {
                className: 'text',
                maxLength: limit,
                disabled: !self.open
            }, entry.data.data_dec);

            // keyboard navigation
            //$(entry.dom.data).keydown(function(event) {
            entry.dom.data.addEventListener('keydown', function ( event ) {
                //TODO: selectionStart is not cross-browser
                // up
                if ( event.keyCode === 38 && entry.previousSibling && this.selectionStart === 0 ) {
                    entry.previousSibling.dom.data.focus();
                }
                // down
                if ( event.keyCode === 40 && entry.nextSibling && this.selectionStart === this.value.length ) {
                    entry.nextSibling.dom.data.focus();
                }
            });
        } else {
            entry.dom.data = element('input', {
                type: entry.data.id_type === 5 ? 'email' : 'text',
                maxLength: limit,
                className: entry.data.id_type === 5 ? 'email' : 'line',
                disabled: !self.open,
                value: entry.data.data_dec
            });

            // email
            // if ( entry.data.id_type === 5 ) {
            //     entry.dom.data.autocomplete = 'email';
            // }

            // keyboard navigation
            //$(entry.dom.data).keydown(function(event) {
            entry.dom.data.addEventListener('keydown', function ( event ) {
                // up
                if ( event.keyCode === 38 ) if ( entry.previousSibling ) {
                    entry.previousSibling.dom.data.focus();
                }
                // down
                if ( event.keyCode === 40 ) if ( entry.nextSibling ) {
                    entry.nextSibling.dom.data.focus();
                }
            });
        }

        entry.dom.data.autocomplete = 'off';

        // change color if changed in edit mode
        entry.dom.data.onchange = function () {
            this.value = this.value.trim();
            // only for edit mode
            if ( self.data.id ) {
                if ( entry.post.data_dec != null && entry.post.data_dec != this.value )
                //$(this).addClass('changed');
                    this.classList.add('changed');
                else
                //$(this).removeClass('changed');
                    this.classList.remove('changed');
            }
            // in case this is url entry type
            // if ( entry.data.id_type == 2 ) {
            //     RequestUrlTitle(this.value);
            // }
        };

        // values history
        entry.dom.history = element('div', {className: 'history'});

        // set chars count
        entry.dom.data.onkeyup = function () {
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

    // var RequestUrlTitle = function ( url ) {
    //     //delete this.data.comment;
    //     var comment = null;
    //     // get an empty comment block
    //     for ( var i = 0; i < self.dom.entries.childNodes.length; i++ ) {
    //         var entry = self.dom.entries.childNodes[i];
    //         // plain text type
    //         if ( entry.data.id_type == 6 && entry.dom.data.value.trim() == '' ) {
    //             comment = entry.dom.data;
    //             break;
    //         }
    //     }
    //     // send request only if there is an empty comment entry
    //     if ( comment ) {
    //         url = 'http://query.yahooapis.com/v1/public/yql?q=' +
    //             'select * from html where url="' + encodeURIComponent(url) + '" and xpath="/html/head/title"&format=json';
    //         $.ajax(url, {crossDomain:true, dataType:'json',
    //             success: function(data){
    //                 if ( data && data.query && data.query.results && data.query.results.title ) {
    //                     comment.value = data.query.results.title;
    //                     comment.onkeyup();
    //                     comment.onchange();
    //                 }
    //             }
    //         });
    //     }
    // };

    /**
     * Parse data and fill the select list
     */
    this.ProceedUrlIcon = function ( data ) {
        if ( data && data.query && data.query.results ) {
            console.log(data);
        }
    };

    /**
     * Block of note entry hint
     * @param entry pointer to the entry data
     */
    var EntryBlockHint = function ( entry ) {
        // entry description
        //entry.dom.desc = element('span', {}, window.dataEntryTypes.data[entry.data.id_type][window.dataEntryTypes.defn.description]);
        entry.dom.desc = element('span', {}, entryTypes.hash[entry.data.id_type].description);
        //entry.dom.desc.value = window.dataEntryTypes.data[entry.data.id_type][window.dataEntryTypes.defn.description];
        entry.dom.desc.value = entryTypes.hash[entry.data.id_type].description;
        // letters counter with max length check
        entry.dom.counter = element('span', {className: entry.dom.data.value.length === entry.dom.data.maxLength ? 'limit' : ''}, !self.open ? '' : entry.dom.data.value.length);
        // bottom entry description and counter
        entry.dom.hint = tblrow(element('table', {className: 'hint'}), [entry.dom.desc, entry.dom.counter], [{className: 'text'}, {className: 'counter'}]);
    };

    /**
     * Block of note entry floating controls
     * @param entry pointer to the entry data
     */
    var EntryBlockControls = function ( entry ) {
        entry.dom.btn_config = element('img', {
            src: 'img/settings.svg',
            className: 'button',
            title: 'change entry type'
        }, null, {
            onclick: function () {
                EntryBtnConfig(entry);
            }
        });
        entry.dom.btn_history = element('img', {
            src: 'img/history.svg',
            className: 'button',
            title: 'show/hide entry hisory values'
        }, null, {
            onclick: function () {
                EntryBtnHistory(entry);
            }
        });
        entry.dom.btn_add = element('img', {
            src: 'img/add.svg',
            className: 'button',
            title: 'add new entry after this one'
        }, null, {
            onclick: function () {
                EntryBtnAdd(entry);
            }
        });
        entry.dom.btn_up = element('img', {
            src: 'img/arrow_up.svg',
            className: 'button',
            title: 'move this entry one row up'
        }, null, {
            onclick: function () {
                EntryBtnUp(entry);
            }
        });
        entry.dom.btn_down = element('img', {
            src: 'img/arrow_down.svg',
            className: 'button',
            title: 'move this entry one row down'
        }, null, {
            onclick: function () {
                EntryBtnDown(entry);
            }
        });
        entry.dom.btn_delete = element('img', {
            src: 'img/clear.svg',
            className: 'button',
            title: 'delete this entry'
        }, null, {
            onclick: function () {
                EntryBtnDelete(entry);
            }
        });

        var buttons = [];
        // this is a password entry
        if ( entry.data.id_type === 4 ) {
            //alert(entry.dom.data.type);
            entry.dom.btn_pwdgen = element('img', {
                src: 'img/refresh.svg',
                className: 'button',
                title: 'generate a new password'
            }, null, {
                onclick: function () {
                    entry.dom.data.value = pwdgen(20);
                    entry.dom.data.onchange();
                }
            });
            entry.dom.btn_maskpwd = element('img', {
                src: 'img/visibility_off.svg',
                className: 'button',
                title: 'Show password'
            }, null, {
                onclick: function () {
                    if ( entry.dom.data.type === 'text' ) {
                        this.title = 'Show password';
                        this.src = 'img/visibility_off.svg';
                        entry.dom.data.type = 'password';
                    } else {
                        this.src = 'img/visibility.svg';
                        this.title = 'Hide password';
                        entry.dom.data.type = 'text';
                    }
                }
            });
            entry.dom.data.type = 'password';
            //entry.dom.data.autocomplete = 'off';
            buttons.push(entry.dom.btn_maskpwd);
            buttons.push(entry.dom.btn_pwdgen);
        }
        // all other buttons
        buttons.push(entry.dom.btn_config, entry.dom.btn_history, entry.dom.btn_add, entry.dom.btn_up, entry.dom.btn_down, entry.dom.btn_delete);
        // add entry control buttons
        return entry.dom.controls = element('div', {className: 'hidden'}, buttons);
    };

    /**
     * Single entry creation
     * @param data entry details
     */
    var EntryCreate = function ( data ) {
        // body of the entry
        var entry = element('div', {className: 'entry'});
        // entry dom elements
        entry.dom = {
            undo: element('div', {className: 'undo hidden'}),
            body: element('div', {className: 'body'})
        };
        // entry db data
        entry.data = data || {};
        // entry type, name and value after each saving
        entry.post = {
            id_type: data.id_type,
            name: data.name,
            name_dec: data.name_dec,
            data: data.data,
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
        elchild(entry.dom.undo, element('a', {}, 'restore deleted entry', {
            onclick: function () {
                //$(entry.dom.undo).toggleClass('hidden');
                entry.dom.undo.classList.toggle('hidden');
                //$(entry.dom.body).toggleClass('hidden');
                entry.dom.body.classList.toggle('hidden');
                entry.deleted = false;
            }
        }));

        // events
        //$(entry).mouseenter(function(){
        entry.addEventListener('mouseenter', function () {
            // only if not closed
            if ( self.open ) {
                if ( !entry.previousSibling ) {
                    entry.dom.btn_up.className = 'disabled';
                } else {
                    entry.dom.btn_up.className = 'button';
                }
                if ( !entry.nextSibling ) {
                    entry.dom.btn_down.className = 'disabled';
                } else {
                    entry.dom.btn_down.className = 'button';
                }
                //TODO: add real entries check (there are hidden entries so failure here)
                if ( self.dom.entries.childNodes.length === 1 ) {
                    entry.dom.btn_delete.className = 'disabled';
                } else {
                    entry.dom.btn_delete.className = 'button';
                }
                //$(entry.dom.controls).fadeIn();
                entry.dom.controls.classList.remove('hidden');
            }
        });
        //$(entry).mouseleave(function(){
        entry.addEventListener('mouseleave', function () {
            // only if not closed
            if ( self.open ) {
                //$(entry.dom.controls).fadeOut();
                entry.dom.controls.classList.add('hidden');
            }
        });
        //$(entry).click(function(){
        // iterate all entries
//            for ( var i = 0; i < self.dom.entries.childNodes.length; i++ ) {
//                entry = self.dom.entries.childNodes[i];
//                $(entry.dom.body).removeClass('active');
//            }
//            $(this.dom.body).addClass('active');
        //});
        return entry;
    };

    /**
     * Block of note title
     */
    var BlockTitle = function () {
        self.dom.title = element('div', {className: 'caption'});
        self.dom.title.icon = element('img', {width: 32, height: 32});
        elchild(self.dom.title, tblrow(element('table', {className: 'maxw'}), [
                self.dom.title.icon,
                [element('div', {className: 'main'}, 'Note')/*, element('div',{className:'hint'},'creation, edit or view')*/],
                [self.data.ctime ? element('div', {}, 'created: ' + TimestampToDateStr(self.data.ctime)) : '',
                    self.data.mtime ? element('div', {}, 'edited: ' + TimestampToDateStr(self.data.mtime)) : '']
            ], [{className: 'icon'}, {className: 'name'}, {className: 'info'}])
        );
    };

    /**
     * Block of note entries
     */
    var BlockEntries = function () {
        // list of all entries
        self.dom.entries = element('div', {className: 'entries'});

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
        var input = element('input', {
            type: 'text',
            maxLength: maxlengthTags,
            disabled: !self.open,
            className: 'line',
            value: ''
        });
        // icon
        var icon = element('img', {src: 'img/field_tag.png'});
        // tags container
        self.dom.tags = element('div', {className: 'tags'}, [
            tblrow(element('table', {className: 'title'}), [icon, 'tags'], [{className: 'icon'}, {className: 'name'}]),
            input,
            element('div', {className: 'hint'}, 'list of associated tags separated by space')
        ]);
        // pointers
        self.dom.tags.input = input;
        self.dom.tags.icon = icon;
        // change color if changed in edit mode
        input.onchange = function () {
            // only for edit mode
            if ( self.data.id ) {
                // tags changed since the last post
                if ( TagsChanged(this.value, self.post.tags) ) {
                    //$(this).addClass('changed');
                    this.classList.add('changed');
                } else {
                    //$(this).removeClass('changed');
                    this.classList.remove('changed');
                }
            }
            // change icon if necessary
            //SetTitleIcon();
        };

        var data = [];
        // prepare all tags
        for ( var tid in window.dataTagsIdlist ) {
            data.push([window.dataTagsIdlist[tid], tid]);
        }

        /*autocomplete({
            minLength: 1,
            input: self.dom.tags.input,
            fetch: function ( text, update ) {
                console.log('data', data);
                // get tags array
                var result = [],
                    tags = self.dom.tags.input.value.toLowerCase().match(/(\S+)/g);

                console.log('tags', tags);

                // truncate available suggestion options
                data.forEach(function ( item ) {
                    if ( !tags.has(item[0]) ) {
                        result.push({item: item});
                    }
                });

                console.log('result', result);
                update(result);
            },
            render: function ( item ) {
                var $body = document.createElement('div');

                $body.textContent = item.item[0];

                return $body;
            },
            onSelect: function ( item ) {
                console.log(item);
                //self.dom.input.value = item[0];
            }
        });/**/

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
            showResult: function ( tag ) {
                // degradation fix
                return tag;

                // wrap to div with icon
                //return '<div class="tag">' + tag + '</div>';
            },
            processData: function ( data ) {
                //console.log('data', data);
                // get tags array
                var result = [],
                    tags = self.dom.tags.input.value.toLowerCase().match(/(\S+)/g);

                //console.log('tags', tags);

                // truncate available suggestion options
                data.forEach(function ( item ) {
                    if ( !tags.has(item[0]) ) {
                        result.push(item);
                    }
                });

                //console.log('result', result);
                return result;
            }
        });/**/

        // var timer = null;
        // input.onkeydown = function() {
        //    // only for edit mode
        //    if ( self.data.id ) {
        //        if ( timer ) clearTimeout(timer);
        //        timer = setTimeout(function(){self.dom.tags.input.onchange();}, 300);
        //    }
        // }

        // return container
        return self.dom.tags;
    };

    /**
     * Block of button controls
     */
    var BlockControls = function () {
        // container
        self.dom.tcontrols = element('div', {className: 'tbuttons'}, [
            element('input', {
                type: 'button',
                value: 'Back',
                className: 'button left',
                title: hint_back
            }, null, {
                onclick: function () {
                    self.Escape();
                }
            }),
            element('input', {
                type: 'button',
                value: 'New',
                className: 'button left',
                title: hint_new
            }, null, {
                onclick: function () {
                    self.New();
                }
            }),
            element('input', {
                type: 'button',
                value: 'Duplicate',
                className: 'button left',
                title: hint_clone
            }, null, {
                onclick: function () {
                    self.Clone();
                }
            }),
            element('input', {
                type: 'button',
                value: 'Save',
                className: 'button bold',
                title: hint_save
            }, null, {
                onclick: function () {
                    self.Save();
                }
            })
        ]);

        self.dom.bcontrols = element('div', {className: 'bbuttons'}, [
            //element('input', {type:'button', value:'Back', className:'button'}, null, {onclick:function(){self.Escape();}}),
            element('input', {
                type: 'button',
                value: 'Save',
                className: 'button bold',
                title: hint_save
            }, null, {
                onclick: function () {
                    self.Save();
                }
            })
        ]);
    };

    /**
     * Event management
     */
    var SetEvents = function () {
        // save
        //$(self.dom.handle).bind('keypress', function(event) {
        self.dom.handle.addEventListener('keypress', function ( event ) {
            if ( event.keyCode === 13 ) {
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
        //$(self.dom.handle).bind('keydown', function(event) {
        self.dom.handle.addEventListener('keydown', function ( event ) {
            if ( event.keyCode === 27 ) {
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
        if ( self.dom.bcontrols ) {
            var controls = self.dom.bcontrols.childNodes;
            for ( var i = 0; i < controls.length; i++ ) {
                controls[i].disabled = !state;
            }
        }
    };

    /**
     * Asks user about modifications
     */
    this.ConfirmExit = function () {
        return confirm(msgHasChanges);
    }

    /**
     * Saves the current note as new
     */
    this.Clone = function () {
        // clear note and entries ids
        delete this.data.id;
        this.data.entries.forEach(function ( entry ) {
            delete entry.id;
        });
        // reset tags
        this.post.tags = [];
        // set flag
        changed = true;
        // saving
        this.Save();
        // focus to the first input
        this.dom.entries.childNodes[0].dom.data.focus();
    }

    /**
     * Prepares a new note with the same set of entries as the current note has
     */
    this.New = function () {
        var name, data, entries = [];
        // iterate the current entry list
        this.data.entries.forEach(function ( entry ) {
            // prepare name and data
            //name = window.dataEntryTypes.data[entry.id_type][window.dataEntryTypes.defn.name];
            name = entryTypes.hash[entry.id_type].name;
            // generate some password if pass type
            data = (entry.id_type == 4) ? pwdgen(20) : '';
            // append the entry list
            entries.push({
                id_type: entry.id_type,
                name: app.encode(name),
                name_dec: name,
                data: app.encode(data),
                data_dec: data
            });
        });
        // if user confirmed the exit
        if ( this.Escape(true) ) {
            // replace the entry list with the new one
            this.data.entries = entries;
            // compile all blocks together
            Build();
            // update the icon
            SetTitleIcon();
            // set flag
            changed = true;
            // focus to the first input
            this.dom.entries.childNodes[0].dom.data.focus();
        }
    }

    /**
     * Leaves the current note editing
     * asks user about modifications if present
     * @param noswitch bool flag to not return back to the template list
     * @return bool true if the note was escaped
     */
    this.Escape = function ( noswitch ) {
        // check current note modifications
        var has_changes = NoteEditor.HasChanges();
        // not changed or user confirmed his wish
        if ( !has_changes || (has_changes && this.ConfirmExit()) ) {
            // get note from the list using current id
            var note = NoteList.GetNoteByID(self.data.id);
            // found
            if ( note !== false ) {
                // remove acitve cursor
                NoteList.SetNotesState([note], 'active', false);
            }
            // clear previous content
            elclear(this.dom.handle);
            // set data
            this.data = {tags: [], entries: []};
            // data to be send on save
            this.post = {tags: []};
            //this.open = true;
            changed = false;
            // not full escape
            if ( !noswitch ) {
                self.Show(false);
                TemplateList.Show(true);
            }
            return true;
        }
        return false;
    };

    /**
     * Creates a new note
     */
    this.Create = function ( template ) {
        console.time('entry create');
        // set data
        this.data = {tags: [], entries: []};
        // data to be send on save
        this.post = {tags: []};
        // local vars
        //var id_template = template[window.dataTemplates.defn.id],
        var //id_template = template[window.dataTemplates.defn.id],
            self = this,
            id_type, name, data, tag;

        // template is given
        if ( template ) {
            // fill the list of entries
            //for ( var i = 0; i < window.dataTemplateEntries.data[id_template].length; i++ ) {
            template.entries.forEach(function ( entry ) {
                //for ( var i in window.dataTemplateEntries.data[id_template] ) {
                // get the entry type
                //id_type = window.dataTemplateEntries.data[id_template][i][window.dataTemplateEntries.defn.id_type];
                // prepare name and data
                //name = window.dataTemplateEntries.data[id_template][i][window.dataTemplateEntries.defn.name];
                // generate some password if pass type
                data = (entry.id === 4) ? pwdgen(20) : '';
                // adding
                self.data.entries.push({
                    id_type: entry.id,
                    name: app.encode(entry.name),
                    name_dec: entry.name,
                    data: app.encode(data),
                    data_dec: data
                });
            });

            // default tag
            tag = template.name;
            this.data.tags = TagManager.Str2IDs(tag);
            // no templates selected so just add one simple entry
        } else {
            //name = window.dataEntryTypes.data[1][window.dataEntryTypes.defn.name];
            name = entryTypes.hash[1].name;
            data = tag = '';
            // adding
            this.data.entries = [{
                id_type: 1,
                name: app.encode(name),
                name_dec: name,
                data: app.encode(data),
                data_dec: data
            }];
        }
        // compile all blocks together
        Build();
        // tags plain string
        this.dom.tags.input.value = tag.toLowerCase();
        SetTitleIcon();
        // focus to the first input
        this.dom.entries.childNodes[0].dom.data.focus();
        console.timeEnd('entry create');
    };

    /**
     * Loads the existing note
     * @param data note details
     */
    this.Load = function ( data ) {
        console.time('entry load');
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
                entry.name_dec = app.decode(entry.name);
                entry.data_dec = app.decode(entry.data);
            }
        } else {
            // invalid input so switch to new mode
            this.Create();
        }
        // compile all blocks together
        Build();
        // tags plain string
        this.dom.tags.input.value = TagManager.IDs2Str(this.data.tags).toLowerCase();
        SetTitleIcon();
        console.timeEnd('entry load');
    };

    /**
     * Returns the open at the moment note id
     */
    this.GetNoteID = function () {
        return (this.data && this.data.id ? this.data.id : null);
    };

    var SetTitleIcon = function ( icon ) {
        if ( !icon ) {
            icon = 'img/tags/note.svg';
            var tags = self.dom.tags.input.value.toLowerCase().match(/(\S+)/g);
            // check parsed string
            if ( tags && tags instanceof Array ) {
                // iterate words in the input string
                for ( var i = 0; i < tags.length; i++ ) {
                    if ( window.iconTags.has(tags[i]) ) {
                        icon = 'img/tags/' + tags[i] + '.svg';
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
        //with ( self ) {
        changed = false;
        // all blocks
        BlockTitle();
        BlockEntries();
        BlockTags();
        BlockControls();

        // clear previous handle content
        elclear(self.dom.handle);

        // build all blocks together
        elchild(self.dom.handle, [
            self.dom.title,
            self.dom.tcontrols,
            self.dom.entries,
            element('div', {className: 'divider'}),
            self.dom.tags,
            element('div', {className: 'divider'}),
            self.dom.bcontrols
        ]);
        //}
        TemplateList.Show(false);
        self.Show(true);

    };

    /**
     * Shows/hides the component
     * @param state visibility flag: true - show, false - hide
     */
    this.Show = function ( state ) {
        this.dom.handle.style.display = state ? 'block' : 'none';
    };

    /**
     * Checks if there are any unsaved modificatons
     * @return bool flag
     */
    this.HasChanges = function () {
        var i, entry, flag = changed;
        // note is opened
        if ( this.data && this.data.entries && this.data.entries.length > 0 ) {
            // not sure if has changes already
            if ( !changed ) {
                // iterate all entries
                for ( i = 0; i < this.dom.entries.childNodes.length; i++ ) {
                    entry = this.dom.entries.childNodes[i];
                    //fb(i, entry.post.data_dec, entry.dom.data.value);
                    //fb(i, entry.post.name_dec, entry.dom.name.value);
                    //fb(i, entry.post.id_type, entry.data.id_type);
                    if ( (entry.post.data_dec != null && entry.post.data_dec != entry.dom.data.value) ||
                        (entry.post.name_dec != null && entry.post.name_dec != entry.dom.name.value) ||
                        (entry.post.id_type != entry.data.id_type) ) {
                        // change flag and skip all the rest checks
                        flag = true;
                        break;
                    }
                }
                // still no changes so check tags
                if ( !flag && TagsChanged(this.dom.tags.input.value.toLowerCase(), this.post.tags) ) flag = true;
            }
        }
        return flag;
    };

    /**
     * Main init method
     * @param params list of configuration parameters
     */
    this.Init = function ( params ) {
        // check input
        if ( !params.handle ) {
            return;
        }

        // html parent object
        this.dom = {handle: params.handle};
        // handler on note save
        this.onsave = params.onsave || null;
        // handler on cancel note adding or edit
        this.oncancel = params.oncancel || null;

        // event handlers
        SetEvents();
    };
};


// public
//module.exports = NoteEditor;
