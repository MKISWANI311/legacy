/**
 * List of tags with managing
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var app = require('./app');


var TagManager = new function () {
    // for limited scopes
    var self = this;

    // max length of each tag, will be truncated on exceed
    var maxlength_tag = 100;

    // component state flag
    // true  - everything is decoded
    // false - no plain data, everything is encrypted
    this.open = false;

    /**
     * Open the subscriber
     * master password is accessible
     * decrypt all the data and show it
     */
    this.EventOpen = function () {
        console.time('TagManager: decrypt tags');
        // decrypt tags
        for ( var id in window.dataTags.data ) {
            var name = app.decode(window.dataTags.data[id][window.dataTags.defn.name]);
            // fill service lookup tables of tags by id and by name
            window.dataTagsNmlist[name] = id = parseInt(id, 10);
            window.dataTagsIdlist[id] = name;
        }
        console.timeEnd('TagManager: decrypt tags');
    };

    /**
     * Close the subscriber
     * master password is expired and cleared
     * clear all the decrypted data
     */
    this.EventClose = function () {
        // clear service lookup tables
        window.dataTagsNmlist = {};
        window.dataTagsIdlist = {};
    };

    /**
     * Adds new tag id and enc/dev values to the global lookup tables
     * @param id of the new tag
     * @param enc encrypted tag name value
     * @param dec optional decrypted tag name value, decrypted from enc if omitted
     */
    this.Add = function ( id, enc, dec ) {
        // decrypt name if necessary
        dec = dec || app.decode(enc, true);
        window.dataTags.data[id] = [enc, [], 1];
        window.dataTagsNmlist[dec] = id;
        window.dataTagsIdlist[id] = dec;
    };

    /**
     * Returns the sorted list of tag ids by usage
     * first ids the most used
     */
    this.SortByUses = function () {
        var result = [];
        // prepare list of id/usage
        for ( var id in window.dataTags.data ) {
            result.push({id: parseInt(id, 10), uses: window.dataTags.data[id][window.dataTags.defn.uses]});
        }
        // custom sort
        result.sort(function ( a, b ) {
            return b.uses - a.uses
        });
        // rework output, get rid of objects
        for ( var i = 0; i < result.length; i++ ) {
            result[i] = result[i].id;
        }
        return result;
    };

    /**
     * Converts the array of tags ids to tags names
     * @param data array of tags (integers or encrypted strings)
     * @param prefix string to prepend to each tag name
     * @return tags names array
     * @example [1,2,'***encrypted string***',3] -> ['ftp','note','ssh','site']
     */
    this.IDs2Names = function ( data, prefix ) {
        var name, result = [];
        // check input
        if ( data && data instanceof Array )
        // get tag names from ids
            for ( var i = 0; i < data.length; i++ ) {
                // check type
                if ( isNaN(data[i]) ) {
                    // seems this is a real-time encrypted string
                    if ( (name = app.decode(data[i], true)) !== false ) result.push((prefix ? prefix : '') + name);
                } else {
                    // seems normal tag id
                    if ( window.dataTagsIdlist[data[i]] )
                    // tag found in the global list
                        result.push((prefix ? prefix : '') + window.dataTagsIdlist[data[i]]);
                }
            }
        return result.sort();
    };

    /**
     * Returns the string of tag names from the tags ids
     * @example [1,2,3] -> "note site ftp"
     */
    this.IDs2Str = function ( data ) {
        data = this.IDs2Names(data);
        return data.length > 0 ? data.join(' ') : '';
    };

    /**
     * Converts a tags names array to array of ids or encrypted strings
     * @param data tags string
     * @param skip_new optional flag to exclude all new not encrypted values
     * @return array of tags (integers or encrypted strings)
     * @example skip_new=true  ['ftp','note','ssh','site'] -> [1,2,3]
     * @example skip_new=false ['ftp','note','ssh','site'] -> [1,2,'***encrypted string***',3]
     */
    this.Names2IDs = function ( data, skip_new ) {
        var result = [];
        // check input
        if ( data && data instanceof Array ) {
            // list of unique tag names
            var words = [], enc = null;
            // iterate words in the input string
            for ( var i = 0; i < data.length; i++ ) {
                // shorten too long lines
                var name = data[i].slice(0, maxlength_tag);
                // check if this word already processed
                if ( !words.has(name) ) {
                    if ( window.dataTagsNmlist[name] ) {
                        // tag found in the global data
                        result.push(window.dataTagsNmlist[name]);
                    } else {
                        // not found so encrypt and cache if not skipped
                        if ( !skip_new && (enc = app.encode(name, true)) !== false ) {
                            result.push(enc);
                        }
                    }
                    // add word
                    words.push(name);
                }
            }
        }
        return result;
    };

    /**
     * Converts a tags string to array of ids or encrypted strings
     * @param data tags string
     * @param skip_new optional flag to exclude all new not encrypted values
     * @return array of tags (integers or encrypted strings)
     * @example skip_new=true  "ftp note ssh site" -> [1,2,3]
     * @example skip_new=false "ftp note ssh site" -> [1,2,'***encrypted string***',3]
     */
    this.Str2IDs = function ( data, skip_new ) {
        // do convert
        return this.Names2IDs(this.Str2Names(data), skip_new);
    };

//    this.NamesMissed = function ( names, data ) {
//        var result = [];
//        // check input
//        if ( data && data.match ) {
//            // split to separate words
//            data = data.match(/(\S+)/g);
//            if ( data && data instanceof Array ) {
//                // iterate words in the input string
//                for ( var i = 0; i < data.length; i++ ) {
//                    if ( !names.has(data[i]) ) {
//                        result.push(data[i]);
//                    }
//                }
//            }
//        }
//        return result;
//    };

    /**
     * Converts a string to array of words
     * @param data input string
     * @return array of words
     * @example 'ftp -note :ssh !site' -> ["ftp","-note",":ssh","!site"]
     * @example 'ftp "my note" :ssh' -> ["ftp","my note",":ssh"]
     */
    this.Str2Names = function ( data ) {
        var result = [];
        // check input
        if ( data && data.match ) {
            // split to words
            //data = data.match(/(?:"[^"]+"|[\S]+)/g);
            data = data.match(/(\S+)/g);
            // not empty list of words
            if ( data && data instanceof Array ) {
                // iterate words in the input string
                data.forEach(function ( word ) {
                    // prevent duplication
                    if ( !result.has(word) ) result.push(word);
                });
            }
        }
        return result;
    };

    /**
     * Parses the user input into inner data lists
     * @param data string of tags input
     * @return hash of lists
     */
    this.StrParse = function ( data ) {
        var tinc = [],  // array of included tags ids
            texc = [],  // array of excluded tags ids
            ninc = [],  // array of included tags names
            nexc = [],  // array of excluded tags names
            winc = [],  // array of included words (not tags)
            wexc = [],  // array of excluded words (not tags)
            wcmd = [];  // array of command words
        // prepare sorted list of words and iterate
        this.Str2Names(data).sort().forEach(function ( word ) {
            // find out if there are special chars at the beginning of the word
            var fchar = word.charAt(0), fexc = (fchar === '-'), fcmd = (fchar === ':');
            // get the word without special chars if present
            if ( fexc || fcmd ) word = word.slice(1);
            // not empty
            if ( word ) {
                // command
                if ( fcmd ) {
                    wcmd.push(word);
                } else {
                    // just a tag
                    var tid = window.dataTagsNmlist[word];
                    // tag id found in the global data
                    if ( tid ) {
                        if ( fexc ) {
                            // excluded
                            texc.push(tid);
                            nexc.push(word);
                        } else {
                            // included
                            tinc.push(tid);
                            ninc.push(word);
                        }
                    } else {
                        // tag id not found so it's just a word
                        if ( fexc )
                            wexc.push(word);
                        else
                            winc.push(word);
                    }
                }
            }
        });
        // build result struct
        return {
            tinc: tinc, texc: texc,
            ninc: ninc, nexc: nexc,
            winc: winc, wexc: wexc,
            wcmd: wcmd
        };
    }

    /**
     * Build the user input string from the parsed inner data
     * @param data hash of lists
     * @return string of tags input
     */
    this.StrBuild = function ( data ) {
        var list = [];
        // check input and fill the list with the corresponding data
        if ( data.wcmd && data.wcmd instanceof Array ) data.wcmd.sort().forEach(function ( item ) {
            list.push(':' + item);
        });
        if ( data.ninc && data.ninc instanceof Array ) data.ninc.sort().forEach(function ( item ) {
            list.push(item);
        });
        if ( data.nexc && data.nexc instanceof Array ) data.nexc.sort().forEach(function ( item ) {
            list.push('-' + item);
        });
        if ( data.winc && data.winc instanceof Array ) data.winc.sort().forEach(function ( item ) {
            list.push(item);
        });
        if ( data.wexc && data.wexc instanceof Array ) data.wexc.sort().forEach(function ( item ) {
            list.push('-' + item);
        });
        // implode data into one line separated by spaces
        return list.join(' ');
    }

    /**
     * Splits the string with words into two lists - inc and exc
     * @param data string with words
     * @example data = "table window -chair -door" -> {winc:["table","window"],wexc:["chair","door"]}
     */
//    this.SeparateWords = function ( data ) {
//        var list = [],  // array of all parts
//            winc = [],  // array of included words (not tags)
//            wexc = [];  // array of excluded words (not tags)
//        // prepare list of words
//        list = this.Str2Names(data);
//        list.forEach(function(word){
//            // find out if there is minus at the beginning of the word
//            if ( word.charAt(0) === '-' ) {
//                // get the word without minus
//                word = word.slice(1);
//                // append excluded
//                if ( word ) wexc.push(word);
//            } else {
//                // append included
//                if ( word ) winc.push(word);
//            }
//        });
//        // build result struct
//        return { winc:winc, wexc:wexc };
//    }

//    this.StrCombine = function ( data ) {
//        var texc = [];
//        data.texc.forEach(function(id){
//            texc.push('-' + window.dataTagsIdlist[id]);
//        });
//        texc.sort();
//        return texc.join(' ') + (texc.length > 0 ? ' ' : '') + this.IDs2Str(data.tinc);
//    }

    this.Linked = function ( data ) {
        var result = [], list = {}, i;
        //data = data.slice();
        if ( data && data instanceof Array ) {
            if ( data.length === 1 ) {
                result = window.dataTags.data[data[0]][window.dataTags.defn.links];
            } else {
                data.forEach(function ( id ) {
                    var links = window.dataTags.data[id][window.dataTags.defn.links];
                    links.forEach(function ( link ) {
                        list[link] = (list[link] ? list[link] : 0) + 1;
                    });
                });
                for ( i in list ) {
                    if ( list[i] === data.length ) {
                        result.push(parseInt(i, 10));
                    }
                }
                //fb(list);
                //result = data[0].slice();
                // iterate all rest
                //            for ( var i = 1; i < data.length; i++ ) {
                //                var links = window.dataTags.data[data[i]][window.dataTags.defn.links];
                //
                //            }
                //                fb(id);
                //                fb(window.dataTags.data[id][window.dataTags.defn.links].sort());
                //});
            }
        }
        //fb(result);
        return result;
    }

};


// public
module.exports = TagManager;
