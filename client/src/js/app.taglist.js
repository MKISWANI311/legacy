/**
 * List of tags with managing
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var App = require('./app');


function TagList ( params ) {
    // for limited scopes
    var self = this;

    var maxlength_tag = 9;

    // html parent object
    this.dom = {
        handle: params.handle || null,
        input: params.input || null
    };

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
        //var text_tag_list = document.getElementById('text_tag_list');
        //text_tag_list.value = '';
        console.time('decode tags');
        // decode tags
        for ( var id in window.dataTags.data ) {
            var name = App.Decode(window.dataTags.data[id][window.dataTags.defn.name]);
            window.dataTagsNmlist[name] = id = parseInt(id, 10);
            window.dataTagsIdlist[id] = name;
        }
        // clear to minimaze memory
        //delete window.dataTags.data;
        console.timeEnd('decode tags');

        var uses = [];
        for ( id in window.dataTags.data ) {
            uses.push({id: parseInt(id, 10), uses: window.dataTags.data[id][window.dataTags.defn.uses]});
        }
        uses.sort(function ( a, b ) {
            return b.uses - a.uses;
        });
        //fb(uses);
        for ( var i = 0; i < uses.length; i++ ) {
            TagDraw(uses[i].id, window.dataTagsIdlist[uses[i].id]);
        }
//        for ( name in window.dataTagsNmlist ) {
//            TagDraw(window.dataTagsNmlist[name], name);
//        }
    };

    /**
     * Close the subscriber
     * master password is expired and cleared
     * clear all the decrypted data
     */
    this.EventClose = function () {
        window.dataTagsNmlist = {};
        window.dataTagsIdlist = {};

        elclear(self.dom.tags);
    };

    this.IDs2Names = function ( data ) {
        var result = [];
        // check input
        if ( data && data instanceof Array ) {
            // get tag names from ids
            for ( var i = 0; i < data.length; i++ ) {
                // seems normal tag id
                if ( window.dataTagsIdlist[data[i]] )
                // tag found in the global list
                    result.push(window.dataTagsIdlist[data[i]]);
            }
        }
        return result;
    };
    this.IDs2Str = function ( data ) {
        var result = '';
        // check input
        if ( data && data instanceof Array ) {
            var i, list = [];
            // get tag names from ids and join them in line separated by spaces
            for ( i = 0; i < data.length; i++ ) {
                // seems normal tag id
                if ( window.dataTagsIdlist[data[i]] )
                // tag found in the global list
                    list.push(window.dataTagsIdlist[data[i]]);
            }
            // there are some tags
            if ( list.length > 0 ) result = list.join(' ');
        }
        return result;
    };

    /**
     * Converts a tags string to array of ids
     * @param data tags string
     * @return array of tags (integers or encrypted strings)
     * @example [1,2,3] -> "email work important"
     */
    this.TagsStr2IDs = function ( data ) {
        var result = [];
        // check input
        if ( data ) {
            data = data.match(/(\S+)/g);
            var i, words = [];
            // check parsed string
            if ( data && data instanceof Array ) {
                // sort data by name
                data = data.sort();
                // iterate words in the input string
                for ( i = 0; i < data.length; i++ ) {
                    // shorten too long lines
                    data[i] = data[i].slice(0, maxlength_tag);
                    // check if this word already processed
                    if ( words.indexOf(data[i]) < 0 ) {
                        if ( window.dataTagsNmlist[data[i]] ) {
                            // tag found in the global data
                            result.push(window.dataTagsNmlist[data[i]]);
//                        } else {
//                            // not found so encrypt
//                            result.push(App.Encode(data[i]));
                        }
                        // add word
                        words.push(data[i]);
                    }
                }
            }
        }
        return result;
    };

    var TagDraw = function ( id, name ) {
        //fb('id', id);
        var i, tag = element('span', {
                className: 'tag',
                tagid: id,
                tagnm: name,
                title: id + ':' + window.dataTags.data[id][window.dataTags.defn.uses]
            },
            ((name.length > maxlength_tag) ? name.slice(0, maxlength_tag) + '...' : name), {
                onclick: function () {
                    //if ( $(this).hasClass('inactive') ) return;
                    if ( this.classList.contains('inactive') ) {
                        return;
                    }
                    //$(this).toggleClass('select');
                    this.classList.toggle('select');
                    //if ( $(this).hasClass('select') ) {
                    if ( this.classList.contains('select') ) {
                        var text = self.dom.input.value.trim();
                        self.dom.input.value = text + (text ? ' ' : '') + this.tagnm;
                        for ( i = 0; i < self.dom.tags.childNodes.length; i++ ) {
                            if ( !window.dataTags.data[id][window.dataTags.defn.links].has(self.dom.tags.childNodes[i].tagid) && self.dom.tags.childNodes[i].tagid != id ) {
                                //$(self.dom.tags.childNodes[i]).addClass('inactive');
                                self.dom.tags.childNodes[i].classList.add('inactive');
                            }
                        }
                    } else {
                        self.dom.input.value = self.dom.input.value.replace(this.tagnm, '').replace('  ', ' ').trim();
                        for ( i = 0; i < self.dom.tags.childNodes.length; i++ ) {
                            //if ( !window.dataTags.data[id][window.dataTags.defn.links].has(self.dom.tags.childNodes[i].tagid) && self.dom.tags.childNodes[i].tagid != id ) {
                            //$(self.dom.tags.childNodes[i]).removeClass('inactive');
                            self.dom.tags.childNodes[i].classList.remove('inactive');
                            //}
                        }
                    }
                    self.dom.input.focus();
                    self.dom.input.selectionStart = self.dom.input.value.length;
                    NoteTableFilter(self.dom.input.value);

                }
            });
        elchild(self.dom.tags, [tag, ' ']);
    };

    /**
     * Main init method
     */
    var Init = function () {
        // check input
        if ( !self.dom.handle ) return;
        // set class for container
        self.dom.handle.className = 'taglist';

        elchild(self.dom.handle, self.dom.tags = element('div', {className: 'tags'}));
    };
    // call on creation
    Init();
}



