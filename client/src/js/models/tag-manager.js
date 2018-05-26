/**
 * List of tags with managing
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var Emitter = require('cjs-emitter'),
    api     = require('../api'),
    // max length of each tag, will be truncated on exceed
    maxLength = 100;


function TagManager ( crypto ) {
    // parent constructor call
    Emitter.call(this);

    this.crypto = crypto;

    // from server
    this.data = {};
    //this.defn = {};

    // decoded to these two lists
    this.dataTagsNmlist = {};  // {note: 1, site: 2, email: 3}
    this.dataTagsIdlist = {};  // {1: note, 2: site, 3: email}
}


// inheritance
TagManager.prototype = Object.create(Emitter.prototype);
TagManager.prototype.constructor = TagManager;


TagManager.prototype.init = function () {
    var self = this;

    api.get('user/tags', function ( error, data ) {
        error && console.error(error);

        //console.log('user tags', data);

        if ( !error ) {
            // valid reply
            if ( data ) {
                // apply
                self.fill(data);
            } else {
                // status
                error = true;
            }
        }

        self.emit('data', error, data);
    });
};


TagManager.prototype.fill = function ( data ) {
    var id, name;

    console.time('decrypt tags');

    this.data = data;
    //this.defn = data.defn;

    // decrypt tags
    for ( id in data ) {
        name = data[id].name = this.crypto.decrypt(data[id].name);

        // fill service lookup tables of tags by id and by name
        this.dataTagsNmlist[name] = id = parseInt(id, 10);
        this.dataTagsIdlist[id] = name;
    }

    console.timeEnd('decrypt tags');
};


/**
 * Adds new tag id and enc/dev values to the global lookup tables
 * @param {number} id of the new tag
 * @param {string} enc encrypted tag name value
 * @param {string} dec optional decrypted tag name value, decrypted from enc if omitted
 */
TagManager.prototype.add = function ( id, enc, dec ) {
    // decrypt name if necessary
    dec = dec || this.crypto.decrypt(enc, true);
    this.data[id] = [enc, [], 1];
    this.dataTagsNmlist[dec] = id;
    this.dataTagsIdlist[id] = dec;
};


/**
 * Returns the sorted list of tag ids by usage
 * first ids the most used
 */
TagManager.prototype.sortByUses = function () {
    var result = [],
        id, index;

    // prepare list of id/usage
    for ( id in this.data ) {
        result.push({id: parseInt(id, 10), uses: this.data[id].uses});
    }

    // custom sort
    result.sort(function ( a, b ) {
        return b.uses - a.uses;
    });

    // rework output, get rid of objects
    for ( index = 0; index < result.length; index++ ) {
        result[index] = result[index].id;
    }

    return result;
};


/**
 * Converts the array of tags ids to tags names
 * @param data array of tags (integers or encrypted strings)
 * @param prefix string to prepend to each tag name
 * @return {Array} tags names array
 * @example [1,2,'***encrypted string***',3] -> ['ftp','note','ssh','site']
 */
TagManager.prototype.ids2names = function ( data, prefix ) {
    var result = [],
        name, index;

    // check input
    if ( data && data instanceof Array ) {
        // get tag names from ids
        for ( index = 0; index < data.length; index++ ) {
            // check type
            if ( isNaN(data[index]) ) {
                // seems this is a real-time encrypted string
                if ( (name = this.crypto.decrypt(data[index], true)) !== false ) {
                    result.push((prefix ? prefix : '') + name);
                }
            } else {
                // seems normal tag id
                if ( this.dataTagsIdlist[data[index]] ) {
                    // tag found in the global list
                    result.push((prefix ? prefix : '') + this.dataTagsIdlist[data[index]]);
                }
            }
        }
    }

    return result.sort();
};


/**
 * Returns the string of tag names from the tags ids
 * @example [1,2,3] -> "note site ftp"
 */
TagManager.prototype.ids2str = function ( data ) {
    data = this.ids2names(data);

    return data.length > 0 ? data.join(' ') : '';
};


/**
 * Converts a tags names array to array of ids or encrypted strings
 * @param data tags string
 * @param skipNew optional flag to exclude all new not encrypted values
 * @return array of tags (integers or encrypted strings)
 * @example skipNew=true  ['ftp','note','ssh','site'] -> [1,2,3]
 * @example skipNew=false ['ftp','note','ssh','site'] -> [1,2,'***encrypted string***',3]
 */
TagManager.prototype.names2ids = function ( data, skipNew ) {
    var result = [],
        words, enc, index, name;

    // check input
    if ( data instanceof Array ) {
        // list of unique tag names
        words = [];
        enc = null;

        // iterate words in the input string
        for ( index = 0; index < data.length; index++ ) {
            // shorten too long lines
            name = data[index].slice(0, maxLength);
            // check if this word already processed
            if ( !words.includes(name) ) {
                if ( this.dataTagsNmlist[name] ) {
                    // tag found in the global data
                    result.push(this.dataTagsNmlist[name]);
                } else {
                    // not found so encrypt and cache if not skipped
                    if ( !skipNew && (enc = this.crypto.encrypt(name, true)) !== false ) {
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
 * @param skipNew optional flag to exclude all new not encrypted values
 * @return array of tags (integers or encrypted strings)
 * @example skipNew=true  "ftp note ssh site" -> [1,2,3]
 * @example skipNew=false "ftp note ssh site" -> [1,2,'***encrypted string***',3]
 */
TagManager.prototype.str2ids = function ( data, skipNew ) {
    // do convert
    return this.names2ids(this.str2names(data), skipNew);
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
//                    if ( !names.includes(data[i]) ) {
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
TagManager.prototype.str2names = function ( data ) {
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
                if ( !result.includes(word) ) {
                    result.push(word);
                }
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
TagManager.prototype.strParse = function ( data ) {
    var self = this,
        tinc = [],  // included tags ids
        texc = [],  // excluded tags ids
        ninc = [],  // included tags names
        nexc = [],  // excluded tags names
        winc = [],  // included words (not tags)
        wexc = [],  // excluded words (not tags)
        wcmd = [];  // command words

    // prepare sorted list of words and iterate
    this.str2names(data).sort().forEach(function ( word ) {
        // find out if there are special chars at the beginning of the word
        var fchar = word.charAt(0),
            fexc  = (fchar === '-'),
            fcmd  = (fchar === ':'),
            tid;

        // get the word without special chars if present
        if ( fexc || fcmd ) {
            word = word.slice(1);
        }
        // not empty
        if ( word ) {
            // command
            if ( fcmd ) {
                wcmd.push(word);
            } else {
                // just a tag
                tid = self.dataTagsNmlist[word];

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
                    if ( fexc ) {
                        wexc.push(word);
                    } else {
                        winc.push(word);
                    }
                }
            }
        }
    });

    // build result struct
    return {
        tinc: tinc,
        texc: texc,
        ninc: ninc,
        nexc: nexc,
        winc: winc,
        wexc: wexc,
        wcmd: wcmd
    };
};


/**
 * Build the user input string from the parsed inner data
 * @param data hash of lists
 * @return string of tags input
 */
TagManager.prototype.strBuild = function ( data ) {
    var list = [];

    // check input and fill the list with the corresponding data
    if ( data.wcmd && data.wcmd instanceof Array ) {
        data.wcmd.sort().forEach(function ( item ) {
            list.push(':' + item);
        });
    }

    if ( data.ninc && data.ninc instanceof Array ) {
        data.ninc.sort().forEach(function ( item ) {
            list.push(item);
        });
    }

    if ( data.nexc && data.nexc instanceof Array ) {
        data.nexc.sort().forEach(function ( item ) {
            list.push('-' + item);
        });
    }

    if ( data.winc && data.winc instanceof Array ) {
        data.winc.sort().forEach(function ( item ) {
            list.push(item);
        });
    }

    if ( data.wexc && data.wexc instanceof Array ) {
        data.wexc.sort().forEach(function ( item ) {
            list.push('-' + item);
        });
    }

    // implode data into one line separated by spaces
    return list.join(' ');
};


TagManager.prototype.linked = function ( data ) {
    var result = [],
        list = {},
        index;

    if ( data && data instanceof Array ) {
        if ( data.length === 1 ) {
            result = this.data[data[0]].notes;
        } else {
            data.forEach(function ( id ) {
                var notes = self.data[id].notes;

                notes.forEach(function ( id ) {
                    list[id] = (list[id] ? list[id] : 0) + 1;
                });
            });

            for ( index in list ) {
                if ( list[index] === data.length ) {
                    result.push(parseInt(index, 10));
                }
            }
        }
    }

    return result;
};


// public
module.exports = TagManager;
