/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/api.js":
/*!***********************!*\
  !*** ./src/js/api.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */



var defaults = {
    server: localStorage.getItem('server') || 'https://fortnotes.com/',
    mode: 'cors',
    credentials: 'include',
    headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    }
};


function status ( response ) {
    if ( response.status >= 200 && response.status < 300 ) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function json ( response ) {
    return response.json();
}


// public
module.exports = {
    defaults: defaults,

    get: function ( uri, callback ) {
        fetch(defaults.server + uri, defaults)
            .then(status)
            .then(json)
            .then(function ( data ) {
                callback(null, data);
            })
            .catch(callback);
    },

    post: function ( uri, data, callback ) {
        fetch(defaults.server + uri, Object.assign({}, defaults, {method: 'post', body: JSON.stringify(data)}))
            .then(status)
            .then(json)
            .then(function ( data ) {
                callback(null, data);
            })
            .catch(callback);
    },

    postForm: function ( uri, data, callback ) {
        var config = Object.assign({}, defaults, {
            method: 'post', body: data, headers: {
                Accept: 'application/json'
            }
        });

        fetch(defaults.server + uri, config)
            .then(status)
            .then(json)
            .then(function ( data ) {
                callback(null, data);
            })
            .catch(callback);
    }
};


/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Main application object
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */



var sjcl = __webpack_require__(/*! ./sjcl.min */ "./src/js/sjcl.min.js");


var app = new function () {
    /* @var for limited scopes */
    var self = this;

    /* @var list of vars */
    this.data = {};

    /* @var private primary password (accessed only indirectly) */
    var pass = null;

    /* @var hash of the given pass (if not set then the pass was not created) */
    var hash = null;

    /* @var time in seconds for pass caching (default 5 mins) */
    //var time = 300;

    /* @var encode/decode default configuration */
    var params = {ks: 256, ts: 128, mode: 'ccm', cipher: 'aes'};

    /* @var list of encryption core subsribers to be notified on open/close events */
    this.subscribers = [];

    /** ??????????
     * Callback function for primary password request
     * should be set on application level
     */
    this.RequestPass = null;

    // lists for cached enc/dec values
    // to prevent unnecessary encryption/decryption
    // filling optionally and clearing on master password expiration
    var cacheEnc = {};  // "plain_text":'***encoded string***' list
    var cacheDec = {};  // '***encoded string***':"plain_text" list


    /**
     * Set global variable
     * @param name the name of value to store
     * @param value the variable value
     * @param persistent flag to store in the local storage permanently
     */
    this.set = function ( name, value, persistent ) {
        if ( persistent ) {
            localStorage.setItem(name, value);
        } else {
            this.data[name] = value;
        }
    };


    /**
     * Get global variable
     * @param name the name of value to retrive
     * @param ifnull default value if variable is not set
     */
    this.get = function ( name, ifnull ) {
        return this.data[name] || localStorage.getItem(name) || ifnull;
    };


    /**
     * Calculate the hash from given value
     * algorithm: sha256
     */
    this.calcHash = function ( value ) {
        return sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(value));
    };


    /**
     * Check if hash set
     */
    this.hasHash = function () {
        return (hash != null && hash != '');
    };


    /**
     * Check if pass set
     */
    this.hasPass = function () {
        return (pass !== null && pass !== '');
    };


    /**
     * Check if pass set and matches the hash
     * @param value the master password to check
     */
    this.checkPass = function ( value ) {
        // check input
        if ( !this.hasHash() || !value ) {
            return false;
        }
        // comparing
        return (hash === this.calcHash(value));
    };


    /**
     * Set the hash of private pass var
     * @param value the master password hash value
     */
    this.setPassHash = function ( value ) {
        // check input
        if ( !value ) {
            return false;
        }

        // set and return
        return (hash = value);
    };


    /**
     * Set the time to remember the password
     * @param newtime the time in seconds for pass caching
     */
    // this.SetPassTime = function ( newtime ) {
    //     // check input
    //     newtime = parseInt(newtime, 10);
    //     if ( !newtime || newtime == NaN || newtime <= 0 ) return false;
    //     time = newtime;
    //     return true;
    // };


    /**
     * Set the private pass var and start timer for clearing it in some time
     * @param value the master password to check
     */
    this.setPass = function ( value ) {
        //console.log('SetPass', value);
        // check input
        if ( !value ) {
            return false;
        }
        // set the private password
        pass = value;
        // calculate and set hash if necessary
        if ( !this.hasHash() ) {
            this.setPassHash(this.calcHash(value));
        }
        //console.log('pass will expire in', time);
        // set clearing timer
        //setTimeout(function(){self.expirePass()}, time * 1000);
        // notify all the subscribers that we have the pass
        for ( var i in this.subscribers ) {
            if ( self.subscribers[i].EventOpen && self.subscribers[i].EventOpen instanceof Function ) {
                // open the subscriber - decrypt all the data and show it
                self.subscribers[i].EventOpen();
            }
        }

        // return password hash value
        return hash;
    };


    /**
     *
     */
    this.expirePass = function () {
        console.log('master password expire');
        // notify all the subscribers about clearing
        for ( var i in self.subscribers ) {
            if ( typeof self.subscribers[i].EventClose === 'function' ) {
                // close the subscriber - clear all the decrypted data
                self.subscribers[i].EventClose();
            }
        }
        // clear the master pass
        pass = null;
        // clear cache
        cacheEnc = {};
        cacheDec = {};
        // ask for pass
        if ( self.RequestPass && self.RequestPass instanceof Function ) {
            self.RequestPass.call();
        }
    };


    /**
     * Encrypt the given text and pass the result to callback function
     * @param data data for encryption
     * @param cache optional bool flag
     *
     */
    this.encode = function ( data, cache ) {
        // password is present and not empty input
        if ( pass && data !== false && data !== null ) {
            // try to get from cache
            if ( cache && cacheEnc[data] ) {
                return cacheEnc[data];
            }

            // protected block
            try {
                var enc = sjcl.encrypt(pass, data, params);
                // fill cache if necessary
                if ( cache ) {
                    cacheEnc[data] = enc;
                    cacheDec[enc] = data;
                }

                return enc;
            } catch ( e ) {
                console.trace();
                console.log('encrypt failure', e, data);
            }
        }

        return false;
    };

    // this.encode = function ( text, callback ) {
    //    // temporary pass storing not to loose in on timer clearing
    //    var ptmp = pass;
    //    // password is cached so do encryption immediately
    //    if ( ptmp ) {
    //        callback.call(this, sjcl.encrypt(ptmp, text, params));
    //        return true;
    //    } else {
    //        // ask for password and then do encryption
    //        if ( this.RequestPass && this.RequestPass instanceof Function ) {
    //            this.RequestPass.call(this, function(){
    //                // pass encryption to the callback
    //                callback.call(this, sjcl.encrypt(pass, text, params));
    //                return true;
    //            });
    //        }
    //        return false;
    //    }
    // }

    /**
     * Decrypt the given text and pass the result to callback function
     * @param data data to be decrypted
     * @param cache optional bool flag
     */
    this.decode = function ( data, cache ) {
        // password is present and not empty input
        if ( pass && data ) {
            // try to get from cache
            if ( cache && cacheDec[data] ) {
                return cacheDec[data];
            }

            // protected block
            try {
                var dec = sjcl.decrypt(pass, data);
                // fill cache if necessary
                if ( cache ) {
                    cacheDec[data] = dec;
                    cacheEnc[dec] = data;
                }

                return dec;
            } catch ( e ) {
                console.trace();
                console.log('decrypt failure', e, data);
            }
        }

        return false;
    };


    // this.decode = function ( text, callback ) {
    //    // temporary pass storing not to loose in on timer clearing
    //    var ptmp = pass;
    //    // password is cached so do encryption immediately
    //    if ( ptmp ) {
    //        callback.call(this, sjcl.decrypt(ptmp, text));
    //        return true;
    //    } else {
    //        // ask for password and then do encryption
    //        if ( this.RequestPass && this.RequestPass instanceof Function ) {
    //            this.RequestPass.call(this, function(){
    //                // pass decryption to the callback
    //                callback.call(this, sjcl.decrypt(pass, text));
    //                return true;
    //            });
    //        }
    //        return false;
    //    }
    // }

    this.subscribe = function ( component ) {
        this.subscribers.push(component);
    };
};


// public
module.exports = app;


/***/ }),

/***/ "./src/js/data.entry.types.js":
/*!************************************!*\
  !*** ./src/js/data.entry.types.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */



var list = [
        {
            id: 1,
            max: 1024,
            name: 'line',
            icon: 'https://image.flaticon.com/icons/svg/23/23187.svg',
            description: 'title or short one line text description'
        },
        {
            id: 2,
            max: 2048,
            name: 'uri',
            icon: 'https://image.flaticon.com/icons/svg/117/117965.svg',
            description: 'any addresses - http/https/ftp/ssh or file path'},
        {
            id: 3,
            max: 1024,
            name: 'login',
            icon: 'https://image.flaticon.com/icons/svg/149/149452.svg',
            description: 'user name, login or email in some cases'
        },
        {
            id: 4,
            max: 4096,
            name: 'password',
            icon: 'https://image.flaticon.com/icons/svg/263/263069.svg',
            description: 'any secret letters sequence'
        },
        {
            id: 5,
            max: 1024,
            name: 'email',
            icon: 'https://image.flaticon.com/icons/svg/60/60381.svg',
            description: 'email address line'
        },
        {
            id: 6,
            max: 65535,
            name: 'text',
            icon: 'https://image.flaticon.com/icons/svg/140/140952.svg',
            description: 'plain text entry for notes'
        },
        {
            id: 7,
            max: 65535,
            name: 'html',
            icon: 'https://image.flaticon.com/icons/svg/25/25252.svg',
            description: 'formatted text entry for notes'
        }
    ],
    hash = {};


list.forEach(function ( type ) {
    hash[type.id] = type;
});


// public
module.exports = {
    list: list,
    hash: hash
};


/***/ }),

/***/ "./src/js/data.templates.js":
/*!**********************************!*\
  !*** ./src/js/data.templates.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */



var list = [
    {
        name: 'note',
        description: 'simple note with title and text',
        entries: [
            {id: 1, name: 'title'},
            {id: 6, name: 'description'}
        ]
    },
    {
        name: 'site',
        description: 'regular site bookmark',
        entries: [
            {id: 2, name: 'site url'},
            {id: 5, name: 'email'},
            {id: 4, name: 'password'},
            {id: 6, name: 'comments'}
        ]
    },
    {
        name: 'email',
        description: 'email address record',
        entries: [
            {id: 2, name: 'site url'},
            {id: 5, name: 'email'},
            {id: 4, name: 'password'},
            {id: 6, name: 'comments'}
        ]
    },
    {
        name: 'messenger',
        description: 'instant messenger account information',
        entries: [
            {id: 2, name: 'site url'},
            {id: 5, name: 'email'},
            {id: 3, name: 'username'},
            {id: 4, name: 'password'},
            {id: 1, name: 'phone'},
            {id: 6, name: 'comments'}
        ]
    },
    {
        name: 'ftp',
        description: 'ftp server data',
        entries: [
            {id: 2, name: 'server address'},
            {id: 3, name: 'username'},
            {id: 4, name: 'password'},
            {id: 6, name: 'comments'}
        ]
    },
    {
        name: 'ssh',
        description: 'ssh server data',
        entries: [
            {id: 2, name: 'server address'},
            {id: 3, name: 'username'},
            {id: 4, name: 'password'},
            {id: 6, name: 'comments'}
        ]
    },
    {
        name: 'database',
        description: 'database access parameters',
        entries: [
            {id: 2, name: 'server address'},
            {id: 1, name: 'database name'},
            {id: 3, name: 'username'},
            {id: 4, name: 'password'},
            {id: 6, name: 'comments'}
        ]
    }
];


// public
module.exports = list;


/***/ }),

/***/ "./src/js/dialogs.js":
/*!***************************!*\
  !*** ./src/js/dialogs.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */



var app = __webpack_require__(/*! ./app */ "./src/js/app.js"),
    sjcl = __webpack_require__(/*! ./sjcl.min */ "./src/js/sjcl.min.js"),
    api = __webpack_require__(/*! ./api */ "./src/js/api.js"),
    DialogModal = __webpack_require__(/*! ./modal */ "./src/js/modal.js"),
    FieldList = __webpack_require__(/*! ./fldlist */ "./src/js/fldlist.js");


var DlgExport = null;
var DlgOptions = null;
var DlgPassGet = null;
var DlgUserLogin = null;
var DlgUserRegister = null;


//document.addEventListener('DOMContentLoaded', function () {
DlgExport = new DialogModal({
    width: 750,
    title: 'Data export',
    hint: 'Here you can get all your data unencrypted.',
    dom: {},

    onCreate: function () {
        this.SetContent(this.dom.text = element('textarea', {className: 'export'}));
    },

    /**
     * Open the subscriber
     * master password is accessible
     * decrypt all the data and show it
     */
    EventOpen: function () {
        if ( window.exportData ) {
            setTimeout(function () {
                DlgExport.Show();
                for ( var idNote in window.exportData.notes ) {
                    // check type
                    if ( window.exportData.notes[idNote] instanceof Array ) {
                        window.exportData.notes[idNote].forEach(function ( entry ) {
                            var name = app.decode(entry.name, true);
                            var data = app.decode(entry.data, true);
                            if ( name && data ) {
                                DlgExport.dom.text.value += name + ': ' + data + '\n';
                            }
                        });
                    }
                    // check type
                    if ( window.exportData.note_tags[idNote] instanceof Array ) {
                        var tags = [];
                        window.exportData.note_tags[idNote].forEach(function ( idTag ) {
                            if ( window.exportData.tags[idTag] ) tags.push(app.decode(window.exportData.tags[idTag], true));
                        });
                        if ( tags.length > 0 ) {
                            DlgExport.dom.text.value += 'tags: ' + tags.join(' ') + '\n';
                        }
                    }
                    DlgExport.dom.text.value += '\n';
                }
                // strip
                DlgExport.dom.text.value = DlgExport.dom.text.value.trim();
                window.exportData = null;
            }, 50);
        }
    },

    /**
     * close the subscriber
     * master password is expired and cleared
     * clear all the decrypted data
     */
    EventClose: function () {
        DlgExport.Close();
    },

    controls: {
        'Close': {
            main: true,
            onClick: function () {
                //var modal = this.modal;
                this.modal.Close();
            }
        }
    }
});


DlgOptions = new DialogModal({
    width: 650,
    title: 'Options',
    hint: 'Here you can create/restore backups and export all your data.',

    onCreate: function () {
        var file = element('input', {
            type: 'file', name: 'file', id: 'file-upload', onchange: function () {
                hint.innerHTML = this.value;
                fbtn.value = 'File selected';
            }
        });
        var fbtn = element('input', {
            type: 'button', className: 'button long', value: 'Choose file ...', onclick: function () {
                //$(file).trigger('click');
                file.click();
            }
        });
        var hint = element('div', {className: 'fhint'});

        this.SetContent([
            element('div', {className: 'desc'}, "Backup is an archived package of all your encrypted data. It can't be read by human but can be used to restore your account info or setup a copy on some other FortNotes instance."),
            element('input', {
                type: 'button', className: 'button long', value: 'Create backup', onclick: function () {
                    window.location = api.defaults.server + 'user/export/txt';
                }
            }),
            element('div', {className: 'desc'}, "Please specify your previously downloaded backup package and then press the \"Restore backup\" button. It will upload your backup to the server and replace all your current data with the data from this backup. Warning: this operation can't be reverted!"),
            element('div', {}, [
                element('input', {
                    type: 'button', className: 'button long', value: 'Restore backup', onclick: function () {
                        var btn = this;
                        btn.value = 'Uploading ...';
                        btn.disabled = true;

                        var data = new FormData();
                        data.append('file', file.files[0]);
                        console.log(data);

                        api.postForm('user/import/txt', data, function ( error, data ) {
                            if ( error ) {
                                console.error(error);
                                return;
                            }

                            console.log('user import', data);

                            btn.value = 'Restore backup';
                            btn.disabled = false;
                            if ( data && data.error ) {
                                alert('Restore from backup failed. Error: ' + data.error);
                            } else {
                                alert('The restore process has completed successfully and now the page will be reloaded to apply the restored data.');
                                // We must reload the whole page to update window.dataTags
                                window.location.reload();
                            }
                        });

                        // $.ajax({
                        //     url: 'user/import/txt',
                        //     data: data,
                        //     cache: false,
                        //     contentType: false,
                        //     processData: false,
                        //     type: 'POST',
                        //     dataType: 'json',
                        //     success: function(data) {
                        //         btn.value = 'Restore backup';
                        //         btn.disabled = false;
                        //         if ( data && data.error ) {
                        //             alert('Restore from backup failed. Error: ' + data.error);
                        //         } else {
                        //             alert('The restore process has completed successfully and now the page will be reloaded to apply the restored data.');
                        //             // We must reload the whole page to update window.dataTags
                        //             window.location.reload();
                        //         }
                        //     }
                        // });
                    }
                }), ' ',
                fbtn,
                hint
            ]),
            element('div', {className: 'desc'}, "It's possible to export all the data in a human readable form in order to print it or save in file on some storage. It'll give all the data in plain unencrypted form. The password is required."),
            element('input', {
                type: 'button', className: 'button long', value: 'Export data', onclick: function () {
                    var btn = this;

                    btn.value = 'Loading ...';
                    btn.disabled = true;

                    api.get('user/export/plain', function ( error, data ) {
                        if ( error ) {
                            console.error(error);
                            return;
                        }

                        console.log('user export', data);

                        btn.value = 'Export data';
                        btn.disabled = false;
                        window.exportData = data;
                        app.expirePass();
                    });
                }
            })
        ]);
    },

    /**
     * close the subscriber
     * master password is expired and cleared
     * clear all the decrypted data
     */
    EventClose: function () {
        DlgOptions.Close();
    },

    controls: {
        Close: {
            main: true,
            onClick: function () {
                this.modal.Close();
            }
        }
    }
});


DlgPassGet = new DialogModal({
    width: 500,
    title: 'Password',
    hint: 'Please enter your password to unlock encrypted data.',
    data: {attempts: 0},

    onCreate: function () {
        this.data.fldlist = new FieldList({
            cols: [
                {className: 'colname'},
                {className: 'colvalue'}
            ],
            attr: {}
        });
        this.data.pass = element('input', {type: 'password', autocomplete: 'current-password', className: 'line'});
        this.data.linkset = element('a', {className: 'combo', title: 'click to change the password storing time'});
        onEnterClick(this.data.pass, this.params.controls['Continue'].dom);

        this.data.fldlist.AddRow([
            [
                element('span', {className: 'fldname'}, 'password'),
                element('br'),
                element('span', {className: 'fldhint'}, 'your secret key')
            ],
            [
                element('input', {
                    type: 'text',
                    autocomplete: 'username',
                    className: 'hidden',
                    value: app.get('username_last_used', '')
                }),
                this.data.pass
            ]
        ], {});
        //this.data.fldlist.AddRow([null, ['remember password for ', this.data.linkset]], {});

        this.SetContent(element('form', {}, this.data.fldlist.dom.table));
    },

    onShow: function () {
        // new LinkSet(DlgPassGet.data.linkset, {
        //     300:   {next:1200,  title: '5 minutes'},
        //     1200:  {next:3600,  title: '20 minutes'},
        //     3600:  {next:18000, title: '1 hour'},
        //     18000: {next:86400, title: '5 hours'},
        //     86400: {next:300,   title: '1 day'}
        // }, app.get('pass_store_time', 300));
    },

    /**
     * close the subscriber
     * master password is expired and cleared
     * clear all the decrypted data
     */
    EventClose: function () {
        DlgPassGet.Show({escClose: false});
    },

    controls: {
        'Log off': {
            main: false,
            onClick: function () {
                this.modal.Close();
                Logout();
            }
        },
        Continue: {
            main: true,
            onClick: function () {
                var modal = this.modal;
                var pass = modal.data.pass.value;
                // check pass
                if ( app.checkPass(pass) ) {
                    initData(window.dataUser, pass, function () {
                        //app.set('pass_store_time', modal.data.linkset.value, true);
                        //app.setPass(pass);
                        modal.data.attempts = 0;
                        // reset value
                        modal.data.pass.value = '';
                        modal.Close();
                        //NoteFilter.SetFocus();
                    });
                    // if ( modal.data.linkset.value ) {
                    //     //fb(modal.data.linkset.value);
                    //     app.set('pass_store_time', modal.data.linkset.value, true);
                    //     app.setPassTime(modal.data.linkset.value);
                    // }
                } else {
                    modal.data.pass.focus();
                    modal.data.attempts++;
                    if ( modal.data.attempts === 1 )
                        modal.SetMessage('Password is invalid!');
                    else
                        modal.SetMessage(['Password is invalid!', element('br'), 'Logged attempts: ' + modal.data.attempts]);
                }
            }
        }
    }
});


DlgUserLogin = new DialogModal({
    width: 500,
    title: 'Authentication',
    hint: "Welcome back! Please authorize.",
    data: {attempts: 0},

    onCreate: function () {
        this.data.fldlist = new FieldList({
            cols: [
                {className: 'colname'},
                {className: 'colvalue'}],
            attr: {}
        });
        this.data.name = element('input', {
            className: 'line',
            autocomplete: 'username',
            type: 'text',
            value: app.get('username_last_used', '')
        });
        this.data.pass = element('input', {
            className: 'line',
            autocomplete: 'current-password',
            type: 'password'
        });
        this.data.serv = element('input', {
            className: 'line',
            autocomplete: 'server',
            type: 'url',
            value: app.get('server', 'https://fortnotes.com/')
        });

        //onEnterFocus(this.data.name, this.data.pass);
        onEnterClick(this.data.pass, this.params.controls['Login'].dom);

        this.data.fldlist.AddRow([
            [element('span', {className: 'fldname'}, 'username'),
                element('br'),
                element('span', {className: 'fldhint'}, 'your name or email')],
            this.data.name
        ], {});
        this.data.fldlist.AddRow([
            [element('span', {className: 'fldname'}, 'password'),
                element('br'),
                element('span', {className: 'fldhint'}, 'your secret key')],
            this.data.pass
        ], {});
        this.data.fldlist.AddRow([
            [element('span', {className: 'fldname'}, 'server'),
                element('br'),
                element('span', {className: 'fldhint'}, 'data storage')],
            this.data.serv
        ], {});
        this.SetContent(element('form', {}, this.data.fldlist.dom.table));
    },

    controls: {
        'Register': {
            onClick: function () {
                this.modal.Close();
                DlgUserRegister.Show({escClose: false});
            }
        },
        'Login': {
            main: true,
            onClick: function () {
                var modal = this.modal;
                // get name and pass
                var username = modal.data.name.value;
                var password = modal.data.pass.value;
                // verification
                if ( username && password ) {
                    // ajax request
                    username = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(username));
                    password = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(password));
                    // block all inputs and buttons
                    modal.EnableControls(false);
                    modal.data.name.disabled = true;
                    modal.data.pass.disabled = true;
                    if ( modal.data.attempts > 1 ) {
                        modal.SetLoading("Sending server request ...");
                    }

                    app.set('server', modal.data.serv.value, true);
                    api.defaults.server = modal.data.serv.value;

                    api.post('user/auth', {name: username, pass: password, mode: 'login'}, function ( error, data ) {
                        if ( error ) {
                            console.error(error);
                            modal.SetMessage('Request error.', 'error');
                            return;
                        }

                        console.log('user auth', data);

                        if ( data ) {
                            // check returned data
                            if ( data && data.id ) {
                                initData(data, modal.data.pass.value, function () {
                                    // save user name of last login
                                    app.set('username_last_used', modal.data.name.value, true);
                                    //app.setPass(modal.data.pass.value);
                                    // reset values
                                    modal.data.name.value = '';
                                    modal.data.pass.value = '';
                                    //modal.SetHint();
                                    //modal.SetContent();
                                    //$(modal.dom.footer).hide();
                                    //modal.SetMessage(['Authentication was completed successfully.', element('br'), 'Entering secure private section ...'], 'auth');
                                    // redirect to home with delay
                                    //setTimeout(function(){
                                    //window.location.href = window.location.href;
                                    modal.Close();
                                    //NoteFilter.SetFocus();

                                    //window.pageInit.style.display = 'none';
                                    //window.pageMain.style.display = 'block';
                                    //}, 500);
                                });
                                return;
                            } else {
                                modal.data.attempts++;
                                if ( modal.data.attempts === 1 ) {
                                    modal.SetMessage('Invalid user name or password.', 'error');
                                } else {
                                    modal.SetMessage(['Invalid user name or password.', element('br'), 'Logged attempts: ' + modal.data.attempts], 'error');
                                }
                            }
                        } else {
                            modal.SetMessage('Invalid response from the server.');
                        }
                        // unblock all inputs and buttons
                        modal.EnableControls(true);
                        modal.data.name.disabled = false;
                        modal.data.pass.disabled = false;
                    });
                } else {
                    modal.SetMessage('Empty user name or password.');
                }
            }
        }
    }
});


DlgUserRegister = new DialogModal({
    width: 550,
    title: 'Registration',
    hint: "You are going to register in the system. Please note that the password you are going to enter will be used not only to login but also to encrypt/decrypt your data so choose a strong and long password. Your registration data won't be sent to the server in plain unencrypted form. Only hashes are stored on the server. We don't know your password and will never ask you to send it to us but at the same time we won't be able to remind it to you so please keep that password utmost safe.",
    data: {attempts: 0},

    onShow: function () {
        var self = this;

        api.get('captcha/uri', function ( error, data ) {
            if ( error ) {
                console.error(error);
                return;
            }

            console.log('user captcha', data);

            if ( data && data.src ) {
                self.data.cimg.src = api.defaults.server + data.src;
            } else {
                self.SetHint('New accounts registration is disabled.');
                self.SetContent('');
            }
        });
    },

    onCreate: function () {
        this.data.fldlist = new FieldList({
            cols: [
                {className: 'colname'},
                {className: 'colvalue'}],
            attr: {}
        });
        this.data.name = element('input', {type: 'text', autocomplete: 'username', className: 'line'});
        this.data.pass1 = element('input', {type: 'password', autocomplete: 'new-password', className: 'line'});
        this.data.pass2 = element('input', {type: 'password', autocomplete: 'new-password', className: 'line'});
        this.data.cimg = element('img', {width: 161, height: 75});
        this.data.code = element('input', {
            type: 'text',
            autocomplete: 'off',
            className: 'line cline',
            title: 'case insensitive code above'
        });

        // onEnterFocus(this.data.name, this.data.pass1);
        // onEnterFocus(this.data.pass1, this.data.pass2);
        // onEnterFocus(this.data.pass2, this.data.code);
        onEnterClick(this.data.code, this.params.controls['Register'].dom);

        this.data.fldlist.AddRow([
            [element('span', {className: 'fldname'}, 'username'),
                element('br'),
                element('span', {className: 'fldhint'}, 'your name or email')],
            this.data.name
        ], {});
        this.data.fldlist.AddRow([
            [element('span', {className: 'fldname'}, 'password'),
                element('br'),
                element('span', {className: 'fldhint'}, 'your secret key')],
            this.data.pass1
        ], {});
        this.data.fldlist.AddRow([
            [element('span', {className: 'fldname'}, 'confirm password'),
                element('br'),
                element('span', {className: 'fldhint'}, 'your secret key once more')],
            this.data.pass2
        ], {});
        this.data.fldlist.AddRow([
            [element('span', {className: 'fldname'}, 'captcha'),
                element('br'),
                element('span', {className: 'fldwhint'}, 'enter the code on the image to make sure this is not an automated registration')],
            [this.data.cimg, element('br'), this.data.code]
        ], {});
        //console.log(this.dom.footer);
        //$(this.dom.footer).hide();
        this.dom.footer.classList.add('hidden');
        var self = this;
        this.SetContent(element('a', {}, "I understand that my password can't be restored and will keep it safe", {
            onclick: function () {
                var container = document.getElementById('simplemodal-container');

                self.SetHint('Keep your password safe - you are the only one who knows it so there is no way to restore it!');
                //$('#simplemodal-container').css('top', ($('#simplemodal-container').css('top').replace('px','') - 80) + 'px');
                container.style.top = parseInt(container.style.top, 10) - 100 + 'px';
                self.SetContent(element('form', {}, self.data.fldlist.dom.table));
                //$(self.dom.footer).show();
                self.dom.footer.classList.remove('hidden');
                self.data.name.focus();
            }
        }));
    },

    controls: {
        Cancel: {
            onClick: function () {
                this.modal.Close();
            }
        },
        Register: {
            main: true,
            onClick: function () {
                var modal = this.modal;
                // get name and pass
                var password, username = modal.data.name.value;
                var pass1 = modal.data.pass1.value;
                var pass2 = modal.data.pass2.value;
                // verification
                if ( username && pass1 && pass2 && pass1 === pass2 ) {
                    // make hash
                    username = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(username));
                    password = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(pass1));
                    // block all inputs and buttons
                    modal.EnableControls(false);
                    modal.data.name.disabled = true;
                    modal.data.pass1.disabled = true;
                    modal.data.pass2.disabled = true;
                    if ( modal.data.attempts > 1 ) {
                        modal.SetLoading("Sending server request ...");
                    }

                    api.post('user/auth', {
                        name: username,
                        pass: password,
                        code: modal.data.code.value,
                        mode: 'register'
                    }, function ( error, data ) {
                        if ( error ) {
                            console.error(error);
                            modal.SetMessage('Request error.', 'error');
                            return;
                        }

                        console.log('user auth', data);

                        if ( data ) {
                            if ( data.code !== false ) {
                                // check returned data
                                if ( data && data.id ) {
                                    initData(data, pass1, function () {
                                        // save user name for future logins
                                        app.set('username_last_used', modal.data.name.value, true);
                                        //app.setPass(password);
                                        // reset values
                                        modal.data.name.value = '';
                                        modal.data.pass1.value = '';
                                        modal.data.pass2.value = '';
                                        //modal.SetHint();
                                        //modal.SetContent();
                                        //$(modal.dom.footer).hide();
                                        //modal.dom.footer.classList.add('hidden');
                                        //modal.SetMessage(['Registration was completed successfully.', element('br'), 'Entering secure private section ...'], 'auth');
                                        // redirect to home with delay
                                        //setTimeout(function(){
                                        //window.location.href = window.location.href;
                                        modal.Close();

                                        //window.pageInit.style.display = 'none';
                                        window.pageMain.style.display = 'block';
                                        //}, 500);
                                    });
                                    return;
                                } else {
                                    modal.data.attempts++;
                                    if ( modal.data.attempts === 1 )
                                        modal.SetMessage(['Invalid user name or password.', element('br'), 'There maybe already a user with the same name or there are some technical problems on the server.'], 'error');
                                    else
                                        modal.SetMessage(['Invalid user name or password.', element('br'), 'Logged attempts: ' + modal.data.attempts], 'error');
                                }
                            } else {
                                modal.SetMessage('Invalid captcha code. Please correct it and try once again.');
                            }
                        } else {
                            modal.SetMessage('Invalid responce from the server.');
                        }
                        // unblock all inputs and buttons
                        modal.EnableControls(true);
                        modal.data.name.disabled = false;
                        modal.data.pass1.disabled = false;
                        modal.data.pass2.disabled = false;
                    });
                } else {
                    modal.SetMessage("Empty one of the required field or passwords don't match.");
                }
            }
        }
    }
});


app.subscribe(DlgExport);
app.subscribe(DlgOptions);
app.subscribe(DlgPassGet);

window.DlgExport = DlgExport;
window.DlgOptions = DlgOptions;
window.DlgPassGet = DlgPassGet;
window.DlgUserLogin = DlgUserLogin;
window.DlgUserRegister = DlgUserRegister;
//});


// public
module.exports = {
    DlgExport: DlgExport,
    DlgOptions: DlgOptions,
    DlgPassGet: DlgPassGet,
    DlgUserLogin: DlgUserLogin,
    DlgUserRegister: DlgUserRegister
};


/***/ }),

/***/ "./src/js/fldlist.js":
/*!***************************!*\
  !*** ./src/js/fldlist.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Table manager for fields
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */



/**
 * @param params list of configuration parameters
 *     cols - name of table columns (also class names for corresponding cells)
 *     attr - table attributes overwriting the default ones
 */
function FieldList ( params ) {
    this.params = params;

    // html elements
    this.dom = {};

    this.SetCols = function ( cols ) {
        this.params.cols = cols;
    };

    this.AddRow = function ( cells, attr ) {
        if ( cells && cells instanceof Array && cells.length === this.params.cols.length ) {
            var cell = null;
            var row = this.dom.table.insertRow(-1);
            elattr(row, attr);
            for ( var i = 0; i < this.params.cols.length; i++ ) {
                cell = row.insertCell(-1);
                cell.className = this.params.cols[i];
                elchild(cell, cells[i]);
                elattr(cell, this.params.cols[i]);
            }
            return row;
        }
        return false;
    };

    this.AddDivider = function ( cells, attr ) {
        var row = this.dom.table.insertRow(-1);
        var cell = row.insertCell(-1);
        elattr(cell, {colspan: this.params.cols.length});
        elchild(cell, element('div', {className: 'divider'}));
    };

    this.Init = function () {
        this.dom.table = element('table', {className: 'fldlist'});
        elattr(this.dom.table, this.params.attr);
    };
    this.Init();
}


// public
module.exports = FieldList;


/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */



var app     = __webpack_require__(/*! ./app */ "./src/js/app.js"),
    sjcl    = __webpack_require__(/*! ./sjcl.min */ "./src/js/sjcl.min.js"),
    api     = __webpack_require__(/*! ./api */ "./src/js/api.js"),
    //dialogs = require('./app.dialogs'),
    //NoteFilter   = require('./app.note.filter'),
    NoteList     = __webpack_require__(/*! ./note.list */ "./src/js/note.list.js"),
    TemplateList = __webpack_require__(/*! ./template.list */ "./src/js/template.list.js"),
    //NoteEditor   = require('./app.note.editor'),
    TagManager   = __webpack_require__(/*! ./tag.manager */ "./src/js/tag.manager.js"),
    collectTimer;


__webpack_require__(/*! ./note.filter */ "./src/js/note.filter.js");
__webpack_require__(/*! ./note.editor */ "./src/js/note.editor.js");
__webpack_require__(/*! ./tools */ "./src/js/tools.js");
__webpack_require__(/*! ./dialogs */ "./src/js/dialogs.js");


window.Logout = function SignOut () {
    api.post('user/logout', null, function ( error, data ) {
        if ( error ) {
            console.error(error);
            return;
        }

        // true or false
        console.log('logout', data);

        location.reload();
    });
};


window.initData = function initData ( user, pass, callback ) {
    app.setPass(pass);
    window.dataUser = user;

    api.get('user/tags', function ( error, tags ) {
        if ( error ) {
            console.error(error);
            //callback();

            return;
        }

        console.log('user tags', tags);

        //window.dataEntryTypes = data.entry_types;
        //window.dataTemplates = data.templates;
        //window.dataTemplateEntries = data.template_entries;

        // compacted list of all encoded tags with links and use counters
        //window.dataTags = tags;
        // need to correct type if empty
        // if ( !window.dataTags.data.length ) {
        //     window.dataTags.data = {};
        //     window.dataTags.defn = {name:0, links:1, uses:2};
        // }
        // // decoded to these two lists
        // window.dataTagsNmlist = {}; // {note:1, site:2, email:3}
        // window.dataTagsIdlist = {}; // {1:note, 2:site, 3:email}
        // // they are filling on page loading and on note creation
        // // if there are some new tags

        // main components initialization
        TagManager.Init(tags);
        NoteList.Init({handle: document.querySelector('div.notelist')});
        NoteFilter.Init({handle: document.querySelector('div.notefilter')});
        TemplateList.Init({handle: document.querySelector('div.templatelist')});
        NoteEditor.Init({handle: document.querySelector('div.noteeditor')});

        // to receive password change events
        //app.subscribe(TagManager);
        //app.subscribe(TemplateList);
        //app.subscribe(NoteList);
        //app.subscribe(NoteFilter);
        //app.subscribe(NoteEditor);

        // show
        window.pageMain.style.display = 'block';

        callback();
    });
};


// contains encrypted data for export
// if not null an export window appears
window.exportData = null;

// list of tag names with title images
//window.iconTags = ['email', 'ftp', 'ssh', 'icq', 'note', 'site', 'skype', 'jabber', 'msn', 'database'];

//window.pageInit = document.getElementById('pageInit');
window.pageMain = document.getElementById('pageMain');


// start entropy collection
sjcl.random.startCollectors();
// check each 5 sec if has enough
collectTimer = setInterval(function () {
    if ( sjcl.random.isReady() ) {
        console.log('entropy collected');
        // has enough
        sjcl.random.stopCollectors();
        // stop checking
        clearInterval(collectTimer);
    }
}, 1000);


api.get('user/info', function ( error, data ) {
    if ( error ) {
        console.error(error);
        //return;
    }

    console.log('user info', data);

    if ( data ) {
        window.dataUser = data;

        // apply current pass hash
        app.setPassHash(data.hash);
        // ask for a pass
        DlgPassGet.Show({escClose: false});
    } else {
        //window.pageInit.style.display = 'block';
        DlgUserLogin.Show({escClose: false});
    }
});


/***/ }),

/***/ "./src/js/modal.js":
/*!*************************!*\
  !*** ./src/js/modal.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Modal window wrapper
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */



function DialogModal ( params ) {
    this.params = params;
    this.data = params.data || {};

    // html elements of the dialog
    this.dom = {};

    this.SetWidth = function ( value ) {
        this.dom.body.style.width = value + 'px';
    };

    this.Show = function ( params ) {
        params = params || {};
        if ( this.params.onShow && this.params.onShow instanceof Function ) {
            this.params.onShow.call(this);
        }
        $(this.dom.main).modal(params);
    };

    this.Close = function ( delay ) {
        if ( delay ) {
            var self = this;
            setTimeout(function () {
                $.modal.close();
                self.Reset();
            }, parseInt(delay, 10));
        } else {
            $.modal.close();
            this.Reset();
        }
    };

    this.Reset = function () {
        this.SetMessage();
    };

    this.SetTitle = function ( hint ) {

    };

    this.SetHint = function ( hint ) {
        if ( hint ) {
            if ( this.dom.hint.childNodes.length === 0 ) {
                this.dom.hint.appendChild(element('div', {className: 'info'}, hint));
            }
            this.dom.hint.childNodes[0].innerHTML = hint;
            this.dom.hint.style.display = '';
        } else {
            this.dom.hint.style.display = 'none';
        }
    };

    this.SetMessage = function ( text, type ) {
        if ( text ) {
            type = type || 'warning';
            elchild(elclear(this.dom.message), element('div', {className: 'message ' + type}, text));
            this.dom.message.style.display = '';
        } else {
            this.dom.message.style.display = 'none';
        }
    };

    this.SetLoading = function ( text ) {
        this.SetMessage(text, 'loading');
    };

    this.SetContent = function ( content ) {
        if ( content ) {
            elclear(this.dom.content);
            elchild(this.dom.content, content);
        } else {
            this.dom.content.style.display = 'none';
        }
    };

    this.EnableControls = function ( state ) {
        if ( this.params.controls ) {
            for ( var cname in this.params.controls ) {
                this.params.controls[cname].dom.disabled = !state;
            }
        }
    };

    this.Init = function () {
        this.dom.body = element('div', {className: 'body'}, [
            this.dom.title = element('div', {className: 'block title'}, this.params.title),
            this.dom.hint = element('div', {className: 'block hint'}),
            this.dom.content = element('div', {className: 'block content'}),
            this.dom.message = element('div', {className: 'block info'}),
            this.dom.footer = element('div', {className: 'block footer'})
        ]);

        this.dom.main = element('div', {className: 'dialogmodal'}, this.dom.body);

        if ( this.params.width ) this.SetWidth(this.params.width);

        this.SetHint(this.params.hint);
        this.SetMessage(this.params.message);

        if ( this.params.controls ) {
            for ( var cname in this.params.controls ) {
                var cdata = this.params.controls[cname];
                cdata.dom = element('input', {type: 'button', value: cname, className: 'button'});
                // for inline indirect future use
                cdata.dom.modal = this;
                // default action
                if ( cdata.main ) cdata.dom.className += ' bold';
                // set callback
                if ( cdata.onClick && cdata.onClick instanceof Function ) {
                    cdata.dom.onclick = cdata.onClick;
                }
                this.dom.footer.appendChild(cdata.dom);
            }
        }

        if ( this.params.onCreate && this.params.onCreate instanceof Function ) {
            this.params.onCreate.call(this);
        }

        if ( this.params.EventClose && this.params.EventClose instanceof Function ) {
            this.EventClose = this.params.EventClose;
        }
        if ( this.params.EventOpen && this.params.EventOpen instanceof Function ) {
            this.EventOpen = this.params.EventOpen;
        }

        if ( this.params.content ) {
            this.params.content.style.display = '';
            this.dom.content.appendChild(this.params.content);
        }
    };
    this.Init();
}


// public
module.exports = DialogModal;


/***/ }),

/***/ "./src/js/note.editor.js":
/*!*******************************!*\
  !*** ./src/js/note.editor.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Main module to work with single note
 * creation, edit or view
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */



var //autocomplete = require('autocompleter'),
    app = __webpack_require__(/*! ./app */ "./src/js/app.js"),
    api = __webpack_require__(/*! ./api */ "./src/js/api.js"),
    //NoteFilter   = require('./app.note.filter'),
    NoteList = __webpack_require__(/*! ./note.list */ "./src/js/note.list.js"),
    TemplateList = __webpack_require__(/*! ./template.list */ "./src/js/template.list.js"),
    TagManager = __webpack_require__(/*! ./tag.manager */ "./src/js/tag.manager.js"),
    templates  = __webpack_require__(/*! ./data.templates */ "./src/js/data.templates.js"),
    entryTypes = __webpack_require__(/*! ./data.entry.types */ "./src/js/data.entry.types.js");


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
    //this.open = false;

    /**
     * Open the subscriber
     * master password is accessible
     * decrypt all the data and show it
     */
    // this.EventOpen = function () {
    //     // open if there is a note
    //     if ( this.data ) {
    //         // iterate all entries
    //         for ( var i = 0; i < this.dom.entries.childNodes.length; i++ ) {
    //             var entry = this.dom.entries.childNodes[i];
    //             //with ( this.dom.entries.childNodes[i] ) {
    //
    //             // set post data
    //             entry.post.name_dec = app.decode(entry.post.name);
    //             entry.post.data_dec = app.decode(entry.post.data);
    //             // set current data (taking either from post or decrypt)
    //             entry.data.name_dec = (entry.post.name === entry.data.name) ? entry.post.name_dec : app.decode(entry.data.name);
    //             entry.data.data_dec = (entry.post.data === entry.data.data) ? entry.post.data_dec : app.decode(entry.data.data);
    //             // enable all inputs
    //             entry.dom.name.disabled = entry.dom.data.disabled = false;
    //             // change input to decrypted values
    //             entry.dom.name.value = entry.data.name_dec;
    //             entry.dom.data.value = entry.data.data_dec;
    //             // update counter value
    //             entry.dom.data.onkeyup();
    //             //}
    //         }
    //         EnableControls(true);
    //         // tags block
    //         this.dom.tags.input.disabled = false;
    //         this.dom.tags.input.value = TagManager.IDs2Str(this.data.tags).toLowerCase();
    //         // fill autocompleter
    //         var data = [];
    //         // prepare all tags
    //         for ( var tid in TagManager.dataIdlist ) {
    //             data.push([TagManager.dataIdlist[tid], tid]);
    //         }
    //         $(this.dom.tags.input).data('autocompleter').options.data = data;
    //     }
    //     // component state flag
    //     //this.open = true;
    // };

    /**
     * Close the subscriber
     * master password is expired and cleared
     * clear all the decrypted data
     */
    // this.EventClose = function () {
    //     // close only if opened at the moment and there is a note
    //     if ( this.data && this.open ) {
    //         // iterate all entries
    //         for ( var i = 0; i < this.dom.entries.childNodes.length; i++ ) {
    //             var entry = this.dom.entries.childNodes[i];
    //             //with ( this.dom.entries.childNodes[i] ) {
    //             // if data changed than reassing (taking either from post or encrypt)
    //             if ( entry.data.name_dec !== entry.dom.name.value ) entry.data.name = (entry.post.name_dec === entry.dom.name.value) ? entry.post.name : app.encode(entry.dom.name.value);
    //             if ( entry.data.data_dec !== entry.dom.data.value ) entry.data.data = (entry.post.data_dec === entry.dom.data.value) ? entry.post.data : app.encode(entry.dom.data.value);
    //             // clear post and current data
    //             entry.post.name_dec = entry.data.name_dec = null;
    //             entry.post.data_dec = entry.data.data_dec = null;
    //             // disable all inputs
    //             entry.dom.name.disabled = entry.dom.data.disabled = true;
    //             // change input to default hidden values
    //             entry.dom.name.value = '********';
    //             entry.dom.data.value = '[encrypted data]';
    //             // hide counter value
    //             entry.dom.counter.innerHTML = '';
    //             // hide history block and clear content
    //             entry.dom.history.style.display = 'none';
    //             elclear(entry.dom.history);
    //             delete entry.data.history;
    //             //}
    //         }
    //         EnableControls(false);
    //         // tags block
    //         this.dom.tags.input.disabled = true;
    //         this.data.tags = TagManager.Str2IDs(this.dom.tags.input.value.toLowerCase());
    //         this.dom.tags.input.value = '[encrypted tags]';
    //         // clear autocompleter
    //         $(this.dom.tags.input).data('autocompleter').options.data = [];
    //     }
    //     // component state flag
    //     //this.open = false;
    // };


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
            id = TagManager.dataNmlist[data[i]];
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
            //disabled: !self.open,
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
                maxLength: limit
                //disabled: !self.open
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
                //disabled: !self.open,
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
        entry.dom.counter = element('span', {className: entry.dom.data.value.length === entry.dom.data.maxLength ? 'limit' : ''}, entry.dom.data.value.length);
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
            //if ( self.open ) {
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
            //}
        });
        //$(entry).mouseleave(function(){
        entry.addEventListener('mouseleave', function () {
            // only if not closed
            //if ( self.open ) {
            //$(entry.dom.controls).fadeOut();
            entry.dom.controls.classList.add('hidden');
            //}
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
            //disabled: !self.open,
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
        for ( var tid in TagManager.dataIdlist ) {
            data.push([TagManager.dataIdlist[tid], tid]);
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
        var tags;

        if ( !icon ) {
            icon = 'img/tags/note.svg';
            tags = self.dom.tags.input.value.toLowerCase().match(/(\S+)/g);

            // check parsed string
            if ( tags ) {
                tags.forEach(function ( tag ) {
                    var has = templates.some(function ( template ) {
                        return template.name === tag;
                    });

                    if ( has ) {
                        icon = 'img/tags/' + tag + '.svg';
                    }
                });
            }
        }

        console.log('SetTitleIcon', icon);

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


/***/ }),

/***/ "./src/js/note.filter.js":
/*!*******************************!*\
  !*** ./src/js/note.filter.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */



var //autocomplete = require('autocompleter'),
    //app = require('./app'),
    api = __webpack_require__(/*! ./api */ "./src/js/api.js"),
    NoteList = __webpack_require__(/*! ./note.list */ "./src/js/note.list.js"),
    TagManager = __webpack_require__(/*! ./tag.manager */ "./src/js/tag.manager.js");


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

                var hint = '', fcmd = tag.charAt(0) == ':';
                if ( fcmd ) {
                    hint = '<div class="hint">' + hint_cmd[tag] + '</div>';
                }
                // wrap to div with icon
                return '<div class="' + (fcmd ? 'cmd' : 'tag') + '">' + tag + hint + '</div>';
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


/***/ }),

/***/ "./src/js/note.list.js":
/*!*****************************!*\
  !*** ./src/js/note.list.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */



var app = __webpack_require__(/*! ./app */ "./src/js/app.js"),
    api = __webpack_require__(/*! ./api */ "./src/js/api.js"),
    //NoteFilter = require('./app.note.filter'),
    //NoteEditor = require('./app.note.editor'),
    templates  = __webpack_require__(/*! ./data.templates */ "./src/js/data.templates.js"),
    TagManager = __webpack_require__(/*! ./tag.manager */ "./src/js/tag.manager.js");


/**
 * Module to work with note list
 * view all, selecting, checking, appending, filtering
 */
var NoteList = new function () {
    // for limited scopes
    var self = this;

    // component state flag
    // true  - everything is decoded
    // false - no plain data, everything is encrypted
    //this.open = false;

    var hint_tag_include = 'click on this tag to include it to the search';
    var hint_tag_exclude = 'click on this tag to exclude it from the search';
    var hint_info_missing = 'there is no data';
    var hint_tags_missing = 'there are no tags';
    var hint_notes_visible = 'the limited amount of visible notes received according the search options (usually the first 20)';
    var hint_notes_total = 'the general amount of notes satisfying the giving search options';
    var hint_notes_filtered = 'the amount of notes excluded from the note list due to the search filter';

    var msg_checked_notes_remove = 'You are going to delete all checked notes in the note list. Do you really want to continue?';
    var msg_checked_notes_restore = 'You are going to restore all checked notes in the note list. Do you really want to continue?';

    var msg_checked_notes_removed = 'The selected notes were successfully removed ';
    var msg_checked_notes_restored = 'The selected notes were successfully restored ';


    /**
     * Open the subscriber
     * master password is accessible
     * decrypt all the data and show it
     */
    // this.EventOpen = function () {
    //     elclear(this.dom.notes);
    //     // show info and controls
    //     this.dom.tpbar.style.display = 'block';
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
    //         // clear decoded entries data in the requested notes
    //         this.data.notes.forEach(function ( note ) {
    //             // all note entries
    //             note.entries.forEach(function ( entry ) {
    //                 // remove if exist
    //                 delete entry.name_dec;
    //                 delete entry.data_dec;
    //             });
    //             // all data for filtering
    //             delete note.fulltext;
    //         });
    //         // hide info and controls
    //         this.dom.tpbar.style.display = 'none';
    //         // clear notes
    //         elclear(this.dom.notes);
    //         // component state flag
    //         this.open = false;
    //     }
    // };


    /**
     * Deletes or restores the given list of notes depending on the undo flag
     * @param list array of note ids
     * @param undo bool flag: true - restore notes, delete otherwise
     */
    var NotesDelete = function ( list, undo ) {
        // check input
        if ( list.length > 0 ) {
            // send request
            api.post('note/delete' + (undo ? '/undo' : ''), {ids: list}, function ( error, data ) {
                if ( error ) {
                    console.error(error);
                }

                console.log('note delete', data);

                // remove old messages
                NoteFilter.MsgClear();
                // on success
                if ( !data.error ) {
                    // prepare message body
                    var message = [(undo ? msg_checked_notes_restored : msg_checked_notes_removed) + '(amount:' + data.count + '). '];
                    // after deletion allow to go to the deleted notes
                    if ( !undo ) message.push(' It is still possible to ', element('a', {className: 'bold'}, 'restore them', {
                        onclick: function () {
                            NoteFilter.RequestDeleted();
                        }
                    }));
                    // close currently edited note if affected
                    if ( list.has(NoteEditor.GetNoteID()) ) NoteEditor.Escape();
                    // show status message
                    NoteFilter.MsgAdd(message);
                    // refresh note list
                    NoteFilter.NotesRequest();
                } else {
                    NoteFilter.MsgAdd('The request was not successful. The response from the server: ' + data.error, 'error');
                }
            });
        }
    };


    /**
     * Makes a visualization of the given note entries details
     * @param note array note attributes
     * @param icon img node for note icon
     * @return array of html nodes or hint string
     */
    var BuildNoteInfo = function ( note, icon ) {
        var list = [], fulltext = [], url = null;
        // iterate all note entries
        note.entries.forEach(function ( entry ) {
            // decrypt data
            var name = app.decode(entry.name);
            var data = app.decode(entry.data);
            // prepare fulltext data
            fulltext.push(name.toLowerCase());
            fulltext.push(data.toLowerCase());
            // there is data and it's not a password
            if ( entry.id_type !== 4 && data ) {
                // truncate
                var sname = name.length > 30 ? name.slice(0, 25) + '...' : name;
                var sdata = data.length > 50 ? data.slice(0, 35) + '...' : data;
                // url
                if ( entry.id_type === 2 ) {
                    // http/https/ftp and have point
                    if ( (data.search('http://') >= 0 || data.search('https://') >= 0 || data.search('ftp://') >= 0) && data.search('.') >= 0 ) {
                        sdata = element('a', {target: '_blank', href: data}, sdata);
                        // the first available url
                        if ( !url ) url = data;
                    } else {
                        // just server name
                        sdata = element('b', {}, sdata);
                    }
                }
                list.push(element('span', {className: 'name'}, sname + ':'));
                list.push(element('span', {className: 'data'}, sdata));
            }
        });
        // has valid url (the first one)
        if ( url ) {
            // get rid of all unnecessary parts
            url = url.split('/');
            // parts are valid
            if ( url[2] && url[2] !== 'localhost' ) {
                // try to get image, won't replace the current one if no icon found
                // https://www.google.com/s2/favicons?domain=google.com gives only 16px images
                //element('img', {className: 'icon', src: 'https://favicons.githubusercontent.com/' + url[2]}, null, {
                element('img', {className: 'icon', src: 'http://www.getfavicon.org/get.pl?url=' + url[2]}, null, {
                    onload: function () {
                        // icon loaded so get current icon parent
                        var parent = icon.parentNode;
                        // and replace the current one
                        parent.removeChild(icon);
                        // with new
                        elchild(parent, this);
                        //self.dom.entries.insertBefore(entry, entry.previousSibling);
                    }
                })
            }
        }
        // build search full text data
        note.fulltext = fulltext.join('\n');
        // warning if no data
        return list.length > 0 ? list : element('div', {className: 'warn'}, hint_info_missing);
    }


    /**
     * Tag button click handler
     * include, exclude and subtract
     */
    var TagClickHandler = function ( event ) {
        // ctrl holding
        if ( event.ctrlKey ) {
            NoteFilter.TagSubtract(this.tagnm);
        } else {
            if ( this.finc ) {
                // available for selection
                NoteFilter.TagInclude(this.tagnm);
            } else {
                // already selected
                NoteFilter.TagExclude(this.tagnm);
            }
        }
        // prevent bubbling
        return false;
    };


    /**
     * Makes a list of note tags buttons with handlers
     * @param note array note attributes
     * @return array of html tag nodes or hint string
     */
    var BuildNoteTags = function ( note ) {
        var list = [], exc = [], inc = [];
        // there is some data
        if ( note.tags.length > 0 ) {
            // separate tags
            note.tags.forEach(function ( item ) {
                if ( NoteFilter.data.tinc.has(item) ) {
                    inc.push(TagManager.dataIdlist[item]);
                } else {
                    exc.push(TagManager.dataIdlist[item]);
                }
            });
            // forms the list of tags already selected
            inc.sort().forEach(function ( item ) {
                // create html wrapper for tag
                item = element('span', {className: 'tag include', tagnm: item, title: hint_tag_exclude}, item);
                // mouse click handler
                //$(item).bind('click', TagClickHandler);
                item.addEventListener('click', TagClickHandler);
                list.push(item);
            });
            // forms the list of tags available for selection
            exc.sort().forEach(function ( item ) {
                // create html wrapper for tag
                item = element('span', {className: 'tag', finc: true, tagnm: item, title: hint_tag_include}, item);
                // mouse click handler
                //$(item).bind('click', TagClickHandler);
                item.addEventListener('click', TagClickHandler);
                list.push(item);
            });
        }
        // list of tags or missing hint
        return list.length > 0 ? list : hint_tags_missing;
    }


    /**
     * Returns the corresponding note icon image address
     * @param note array note attributes
     * @return string
     */
    var GetNoteIcon = function ( note ) {
        // prepare
        var icon = 'img/tags/note.svg',
            tags = TagManager.IDs2Names(note.tags);

        // iterate words in the tag list
        tags.forEach(function ( tag ) {
            var has = templates.some(function ( template ) {
                return template.name === tag;
            });

            // it's a tag from the global set
            if ( has ) {
                // get the first match
                icon = 'img/tags/' + tag + '.svg';
            }
        });

        return icon;
    };


    /**
     * Shows/hides checked notes controls and general notes info
     * @param ctrlonly flag to skip or not the control buttons
     */
    this.UpdateCtrlBlock = function ( ctrlonly ) {
        //var total = self.dom.notes.childNodes.length;
        if ( !ctrlonly ) {
            // list of visible notes
            var visible = this.GetNotesVisible();
            // clear and fill
            elchild(elclear(self.dom.tpinfo), [
                // block with amount
                element('span', {className: 'amount'}, [
                    // title
                    element('p', {}, 'notes '),
                    // amount of visible notes
                    element('b', {title: hint_notes_visible}, visible.length), ' of ', element('span', {title: hint_notes_total}, this.data.total),
                    // total amount of notes
                    (visible.length < this.data.notes.length ? [element('p', {className: 'div'}, '|'), element('b', {title: hint_notes_filtered}, this.data.notes.length - visible.length), ' filtered'] : null),
                    // link to load all available notes
                    (this.data.notes.length < this.data.total ? [element('p', {className: 'div'}, '|'), element('a', {}, 'load all', {
                        onclick: function () {
                            NoteFilter.NotesRequest(true);
                        }
                    })] : null)
                ]),
                // block with selection
                element('span', {}, [
                    // title
                    element('p', {}, 'select '),
                    // link to select all notes
                    element('a', {}, 'all', {
                        onclick: function () {
                            self.SetNotesState(visible, 'marked', true);
                            self.UpdateCtrlBlock(true);
                        }
                    }),
                    element('p', {className: 'div'}, '|'),
                    // link to remove selection from all notes
                    element('a', {}, 'none', {
                        onclick: function () {
                            self.SetNotesState(visible, 'marked', false);
                            self.UpdateCtrlBlock(true);
                        }
                    }),
                    element('p', {className: 'div'}, '|'),
                    // link to invert selection
                    element('a', {}, 'invert', {
                        onclick: function () {
                            self.SetNotesState(visible, 'marked');
                            self.UpdateCtrlBlock(true);
                        }
                    })
                ])
            ]);
        }
        // get the list of checked notes
        var checked = this.GetNotesByState('marked');
        // hide all buttons
        this.dom.btndelete.style.display = 'none';
        this.dom.btnrestore.style.display = 'none';
        // show only the corresponding one
        if ( checked.length > 0 ) (NoteFilter.data.wcmd.has('deleted') ? this.dom.btnrestore : this.dom.btndelete).style.display = 'block';
        // show/hide block depending on notes amount
        this.dom.tpbar.style.display = this.data.total === 0 ? 'none' : 'block';
    }


    /**
     * Set the default note state, removes additional classes and resets the state flags
     * @param notes if given than it's the only note list to be reset
     */
    this.ClearNotesState = function ( notes ) {
        // all notes or the given one/ones
        var i, list = notes || self.dom.notes.childNodes;
        // iterate formed list
        for ( i = 0; i < list.length; i++ ) {
            // reset class
            list[i].className = 'note';
            // reset state flags
            list[i].state.active = list[i].state.marked = false;
        }
    }


    /**
     * Sets the flag and clall to the given note/notes
     * @param notes to be processed
     * @param type string name active | marked
     * @param state optional bool flag, if set true - set, false - unset
     */
    this.SetNotesState = function ( notes, type, state ) {
        // check input
        if ( notes.length > 0 ) {
            notes.forEach(function ( note ) {
                // determine the state to switch to
                note.state[type] = state !== undefined ? state : (note.state[type] ? false : true);
                // invert class
                //$(note).toggleClass(type, note.state[type]);
                note.classList.toggle(type, note.state[type]);
            });
        }
    };


    /**
     * Returns the list of notes with the given state
     * @param type string state name active | marked
     * @return array of nodes
     */
    this.GetNotesByState = function ( type ) {
        // all notes or only the given one
        var i, result = [], list = self.dom.notes.childNodes;
        // iterate formed list
        for ( i = 0; i < list.length; i++ ) {
            if ( list[i].state[type] === true ) result.push(list[i]);
        }
        return result;
    }


    /**
     * Returns the html note block by id if found or false otherwise
     * @param id int note attribute
     * @return node with data or false on failure
     */
    this.GetNoteByID = function ( id ) {
        // iterate note list
        for ( var i = 0, list = this.dom.notes.childNodes; i < list.length; i++ ) {
            // return if matched
            if ( list[i].data.id === id ) return list[i];
        }
        return false;
    }


    /**
     * Returns the list of visible notes
     * @return array of nodes
     */
    this.GetNotesVisible = function () {
        // iterate note list
        for ( var i = 0, result = [], list = this.dom.notes.childNodes; i < list.length; i++ ) {
            // fill the visible notes list
            if ( !list[i].style.display ) result.push(list[i]);
        }
        return result;
    }


    /**
     * Whole note ckick handler
     * highlights the active note or note range
     * holding Ctrl checks/unchecks the selected notes
     * holding Shift selects all the notes between old and new selected notes
     * @param event event object
     */
    var NoteClickHandler = function ( event ) {
        // holding Ctrl key
        if ( event.ctrlKey ) {
            self.SetNotesState([this], 'marked');
            // simple mouse click
        } else {
            // currently active note list
            var alast = self.GetNotesByState('active');
            // flag true if the clicked note is the same as already active
            var fsame = alast.length > 0 && alast[0].data.id === this.data.id;
            // check current note modifications
            var has_changes = NoteEditor.HasChanges();
            // not changed or user confirmed his wish
            if ( !has_changes || fsame || (has_changes && NoteEditor.ConfirmExit()) ) {
                // reset all notes states
                self.ClearNotesState();
                // check if the edited note is not already active
                if ( NoteEditor.GetNoteID() !== this.data.id ) {
                    // show note details
                    NoteEditor.Load(this.data);
                }
                // make active
                self.SetNotesState([this], 'active');
                // holding Shift key
                if ( event.shiftKey ) {
                    var i, item, cflag = false;
                    // iterate all notes
                    for ( i = 0; i < self.dom.notes.childNodes.length; i++ ) {
                        // cursor
                        item = self.dom.notes.childNodes[i];
                        // flag showing that the cursor is inside the range
                        if ( item.data.id === alast[0].data.id || item.data.id === this.data.id ) cflag = !cflag;
                        // check inside the range or edge items
                        if ( cflag || item.data.id === alast[0].data.id || item.data.id === this.data.id ) {
                            self.SetNotesState([item], 'marked');
                        }
                    }
                } else {
                    // check the only clicked note
                    self.SetNotesState([this], 'marked');
                }
            }
        }
        // show/hide checked notes controls
        self.UpdateCtrlBlock();
        // prevent bubbling
        //return false;
    }


    /**
     * Note checkbox ckick handler
     */
    var NoteTickClickHandler = function () {
        // check/uncheck
        self.SetNotesState([this.note], 'marked');
        // show/hide checked notes controls
        self.UpdateCtrlBlock();
        // prevent bubbling
        return false;
    }


    /**
     * Forms the note wrapper
     * @param data array of note parameters
     * @return formed node with data
     */
    this.BuildNote = function ( data ) {
        // note body
        var note = element('div', {className: 'note', data: data, dom: {}, state: {}});
        // note content
        elchild(note, [
            element('div', {className: 'icon'}, [
                note.dom.icon = element('img', {className: 'icon', src: GetNoteIcon(data)}),
                //note.dom.icon = BuildNoteIcon(data),
                note.dom.tick = element('div', {className: 'tick', note: note})
            ]),
            element('div', {className: 'body'}, [
                note.dom.info = element('div', {className: 'info'}, BuildNoteInfo(data, note.dom.icon)),
                //note.dom.time = element('div', {className: 'time'}, TimestampToDateStr(data.mtime)),
                note.dom.tags = element('div', {className: 'tags'}, BuildNoteTags(data))
            ])
        ]);
        // whole note ckick
        //$(note).bind('click', NoteClickHandler);
        note.addEventListener('click', NoteClickHandler);
        // checkbox click
        //$(note.dom.tick).bind('click', NoteTickClickHandler);
        note.dom.tick.addEventListener('click', NoteTickClickHandler);
        // note html body
        return note;
    };


    /**
     * Shows/hides notes according to the filter
     * @param notes array of notes that should be processed, all if not given
     */
    this.SetNotesVisibility = function ( notes ) {
        // all notes or the given one/ones
        notes = notes || this.dom.notes.childNodes;
        var i, visible,  // flag for visibility
            hlist = [];  // list of the notes that should be hidden
        // iterate formed list
        for ( i = 0; i < notes.length; i++ ) {
            // by default is visible
            visible = true;
            // check by tags
            //TODO:???
            // check by filter string if still visible
            if ( visible ) {
                // check included words
                NoteFilter.data.winc.forEach(function ( word ) {
                    // not found in fulltext so exit
                    if ( notes[i].data.fulltext.indexOf(word.toLowerCase()) < 0 ) {
                        visible = false;
                        return;
                    }
                });
                // still visible
                if ( visible ) {
                    // check excluded words
                    NoteFilter.data.wexc.forEach(function ( word ) {
                        // found in fulltext so exit
                        if ( notes[i].data.fulltext.indexOf(word.toLowerCase()) >= 0 ) {
                            visible = false;
                            return;
                        }
                    });
                }
            }
            // apply visibility flag
            notes[i].style.display = visible ? '' : 'none';
            // fill the list of notes to be hidden
            if ( !visible ) hlist.push(notes[i]);
        }
        // clear inner state for hidden notes
        this.ClearNotesState(hlist);
        this.UpdateCtrlBlock();
    }


    /**
     * Fills the note list with generated notes
     * @param notes array of notes or false if gloabal latest list should be used
     * @param total int general amount of notes
     */
    this.BuildTable = function ( notes, total ) {
        // check input
        notes = notes instanceof Array ? notes : [];
        // set global data
        this.data.notes = notes;
        this.data.total = total;
        // clearing the container
        elclear(this.dom.notes);
        // there are some notes
        if ( total > 0 ) {
            // determine the note id beeing edited at the moment
            var note, neid = NoteEditor.GetNoteID();
            // iterate all notes
            notes.forEach(function ( item ) {
                // append the created note to the list
                note = self.BuildNote(item);
                self.SetNotesVisibility([note]);
                elchild(self.dom.notes, note);
                // highlight the edited at the moment note
                if ( neid === item.id ) self.SetNotesState([note], 'active');
            });
        }
        // show/hide control panel
        this.UpdateCtrlBlock();
    };


    /**
     * Deletes or restore selected notes depending on undo flag
     */
    var BtnDeleteHandler = function () {
        // ask user
        if ( confirm(this.undo ? msg_checked_notes_restore : msg_checked_notes_remove) ) {
            var list = [];
            // iterate all checked notes
            self.GetNotesByState('marked').forEach(function ( note ) {
                // fill id list
                if ( note.data.id ) list.push(note.data.id);
            });
            // send request
            NotesDelete(list, this.undo);
        }
    }


    /**
     * Main init method
     * @param params list of configuration parameters
     */
    this.Init = function ( params ) {
        // check input
        if ( !params.handle ) return;
        // html parent object
        this.dom = {handle: params.handle};

        this.data = {
            total: 0,  // total amount on notes
            notes: []  // all requested notes data array
        };

        // build all blocks together
        elchild(this.dom.handle, [
            // top panel
            this.dom.tpbar = element('div', {className: 'tpbar'}, [
                // controls
                this.dom.tpctrl = element('div', {className: 'ctrl'}, [
                    this.dom.btndelete = element('input', {
                        type: 'button',
                        value: 'Delete',
                        undo: false,
                        className: 'button hidden'
                    }, null, {onclick: BtnDeleteHandler}),
                    this.dom.btnrestore = element('input', {
                        type: 'button',
                        value: 'Restore',
                        undo: true,
                        className: 'button hidden'
                    }, null, {onclick: BtnDeleteHandler})
                ]),
                // general info, load all, select all/none/invert
                this.dom.tpinfo = element('div', {className: 'info'})
            ]),
            // note list
            this.dom.notes = element('div', {className: 'notes'})
            // bottom panel
            //this.dom.btbar = element('div', {className: 'btbar'})
        ]);

        // disable selection
        // this.dom.notes.onselectstart = function () {
        //     return false;
        // } // ie
        // this.dom.notes.onmousedown = function () {
        //     return false;
        // } // mozilla
    };
};


// public
module.exports = NoteList;


/***/ }),

/***/ "./src/js/sjcl.min.js":
/*!****************************!*\
  !*** ./src/js/sjcl.min.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var sjcl={cipher:{},hash:{},mode:{},misc:{},codec:{},exception:{corrupt:function(a){this.toString=function(){return"CORRUPT: "+this.message};this.message=a},invalid:function(a){this.toString=function(){return"INVALID: "+this.message};this.message=a},bug:function(a){this.toString=function(){return"BUG: "+this.message};this.message=a}}};
sjcl.cipher.aes=function(a){this.h[0][0][0]||this.w();var b,c,d,e,f=this.h[0][4],g=this.h[1];b=a.length;var h=1;if(b!==4&&b!==6&&b!==8)throw new sjcl.exception.invalid("invalid aes key size");this.a=[d=a.slice(0),e=[]];for(a=b;a<4*b+28;a++){c=d[a-1];if(a%b===0||b===8&&a%b===4){c=f[c>>>24]<<24^f[c>>16&255]<<16^f[c>>8&255]<<8^f[c&255];if(a%b===0){c=c<<8^c>>>24^h<<24;h=h<<1^(h>>7)*283}}d[a]=d[a-b]^c}for(b=0;a;b++,a--){c=d[b&3?a:a-4];e[b]=a<=4||b<4?c:g[0][f[c>>>24]]^g[1][f[c>>16&255]]^g[2][f[c>>8&255]]^
g[3][f[c&255]]}};
sjcl.cipher.aes.prototype={encrypt:function(a){return this.H(a,0)},decrypt:function(a){return this.H(a,1)},h:[[[],[],[],[],[]],[[],[],[],[],[]]],w:function(){var a=this.h[0],b=this.h[1],c=a[4],d=b[4],e,f,g,h=[],i=[],k,j,l,m;for(e=0;e<0x100;e++)i[(h[e]=e<<1^(e>>7)*283)^e]=e;for(f=g=0;!c[f];f^=k||1,g=i[g]||1){l=g^g<<1^g<<2^g<<3^g<<4;l=l>>8^l&255^99;c[f]=l;d[l]=f;j=h[e=h[k=h[f]]];m=j*0x1010101^e*0x10001^k*0x101^f*0x1010100;j=h[l]*0x101^l*0x1010100;for(e=0;e<4;e++){a[e][f]=j=j<<24^j>>>8;b[e][l]=m=m<<24^m>>>8}}for(e=
0;e<5;e++){a[e]=a[e].slice(0);b[e]=b[e].slice(0)}},H:function(a,b){if(a.length!==4)throw new sjcl.exception.invalid("invalid aes block size");var c=this.a[b],d=a[0]^c[0],e=a[b?3:1]^c[1],f=a[2]^c[2];a=a[b?1:3]^c[3];var g,h,i,k=c.length/4-2,j,l=4,m=[0,0,0,0];g=this.h[b];var n=g[0],o=g[1],p=g[2],q=g[3],r=g[4];for(j=0;j<k;j++){g=n[d>>>24]^o[e>>16&255]^p[f>>8&255]^q[a&255]^c[l];h=n[e>>>24]^o[f>>16&255]^p[a>>8&255]^q[d&255]^c[l+1];i=n[f>>>24]^o[a>>16&255]^p[d>>8&255]^q[e&255]^c[l+2];a=n[a>>>24]^o[d>>16&
255]^p[e>>8&255]^q[f&255]^c[l+3];l+=4;d=g;e=h;f=i}for(j=0;j<4;j++){m[b?3&-j:j]=r[d>>>24]<<24^r[e>>16&255]<<16^r[f>>8&255]<<8^r[a&255]^c[l++];g=d;d=e;e=f;f=a;a=g}return m}};
sjcl.bitArray={bitSlice:function(a,b,c){a=sjcl.bitArray.P(a.slice(b/32),32-(b&31)).slice(1);return c===undefined?a:sjcl.bitArray.clamp(a,c-b)},concat:function(a,b){if(a.length===0||b.length===0)return a.concat(b);var c=a[a.length-1],d=sjcl.bitArray.getPartial(c);return d===32?a.concat(b):sjcl.bitArray.P(b,d,c|0,a.slice(0,a.length-1))},bitLength:function(a){var b=a.length;if(b===0)return 0;return(b-1)*32+sjcl.bitArray.getPartial(a[b-1])},clamp:function(a,b){if(a.length*32<b)return a;a=a.slice(0,Math.ceil(b/
32));var c=a.length;b&=31;if(c>0&&b)a[c-1]=sjcl.bitArray.partial(b,a[c-1]&2147483648>>b-1,1);return a},partial:function(a,b,c){if(a===32)return b;return(c?b|0:b<<32-a)+a*0x10000000000},getPartial:function(a){return Math.round(a/0x10000000000)||32},equal:function(a,b){if(sjcl.bitArray.bitLength(a)!==sjcl.bitArray.bitLength(b))return false;var c=0,d;for(d=0;d<a.length;d++)c|=a[d]^b[d];return c===0},P:function(a,b,c,d){var e;e=0;if(d===undefined)d=[];for(;b>=32;b-=32){d.push(c);c=0}if(b===0)return d.concat(a);
for(e=0;e<a.length;e++){d.push(c|a[e]>>>b);c=a[e]<<32-b}e=a.length?a[a.length-1]:0;a=sjcl.bitArray.getPartial(e);d.push(sjcl.bitArray.partial(b+a&31,b+a>32?c:d.pop(),1));return d},k:function(a,b){return[a[0]^b[0],a[1]^b[1],a[2]^b[2],a[3]^b[3]]}};
sjcl.codec.utf8String={fromBits:function(a){var b="",c=sjcl.bitArray.bitLength(a),d,e;for(d=0;d<c/8;d++){if((d&3)===0)e=a[d/4];b+=String.fromCharCode(e>>>24);e<<=8}return decodeURIComponent(escape(b))},toBits:function(a){a=unescape(encodeURIComponent(a));var b=[],c,d=0;for(c=0;c<a.length;c++){d=d<<8|a.charCodeAt(c);if((c&3)===3){b.push(d);d=0}}c&3&&b.push(sjcl.bitArray.partial(8*(c&3),d));return b}};
sjcl.codec.hex={fromBits:function(a){var b="",c;for(c=0;c<a.length;c++)b+=((a[c]|0)+0xf00000000000).toString(16).substr(4);return b.substr(0,sjcl.bitArray.bitLength(a)/4)},toBits:function(a){var b,c=[],d;a=a.replace(/\s|0x/g,"");d=a.length;a+="00000000";for(b=0;b<a.length;b+=8)c.push(parseInt(a.substr(b,8),16)^0);return sjcl.bitArray.clamp(c,d*4)}};
sjcl.codec.base64={D:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(a,b){var c="",d,e=0,f=sjcl.codec.base64.D,g=0,h=sjcl.bitArray.bitLength(a);for(d=0;c.length*6<h;){c+=f.charAt((g^a[d]>>>e)>>>26);if(e<6){g=a[d]<<6-e;e+=26;d++}else{g<<=6;e-=6}}for(;c.length&3&&!b;)c+="=";return c},toBits:function(a){a=a.replace(/\s|=/g,"");var b=[],c,d=0,e=sjcl.codec.base64.D,f=0,g;for(c=0;c<a.length;c++){g=e.indexOf(a.charAt(c));if(g<0)throw new sjcl.exception.invalid("this isn't base64!");
if(d>26){d-=26;b.push(f^g>>>d);f=g<<32-d}else{d+=6;f^=g<<32-d}}d&56&&b.push(sjcl.bitArray.partial(d&56,f,1));return b}};sjcl.hash.sha256=function(a){this.a[0]||this.w();if(a){this.n=a.n.slice(0);this.i=a.i.slice(0);this.e=a.e}else this.reset()};sjcl.hash.sha256.hash=function(a){return(new sjcl.hash.sha256).update(a).finalize()};
sjcl.hash.sha256.prototype={blockSize:512,reset:function(){this.n=this.N.slice(0);this.i=[];this.e=0;return this},update:function(a){if(typeof a==="string")a=sjcl.codec.utf8String.toBits(a);var b,c=this.i=sjcl.bitArray.concat(this.i,a);b=this.e;a=this.e=b+sjcl.bitArray.bitLength(a);for(b=512+b&-512;b<=a;b+=512)this.C(c.splice(0,16));return this},finalize:function(){var a,b=this.i,c=this.n;b=sjcl.bitArray.concat(b,[sjcl.bitArray.partial(1,1)]);for(a=b.length+2;a&15;a++)b.push(0);b.push(Math.floor(this.e/
4294967296));for(b.push(this.e|0);b.length;)this.C(b.splice(0,16));this.reset();return c},N:[],a:[],w:function(){function a(e){return(e-Math.floor(e))*0x100000000|0}var b=0,c=2,d;a:for(;b<64;c++){for(d=2;d*d<=c;d++)if(c%d===0)continue a;if(b<8)this.N[b]=a(Math.pow(c,0.5));this.a[b]=a(Math.pow(c,1/3));b++}},C:function(a){var b,c,d=a.slice(0),e=this.n,f=this.a,g=e[0],h=e[1],i=e[2],k=e[3],j=e[4],l=e[5],m=e[6],n=e[7];for(a=0;a<64;a++){if(a<16)b=d[a];else{b=d[a+1&15];c=d[a+14&15];b=d[a&15]=(b>>>7^b>>>18^
b>>>3^b<<25^b<<14)+(c>>>17^c>>>19^c>>>10^c<<15^c<<13)+d[a&15]+d[a+9&15]|0}b=b+n+(j>>>6^j>>>11^j>>>25^j<<26^j<<21^j<<7)+(m^j&(l^m))+f[a];n=m;m=l;l=j;j=k+b|0;k=i;i=h;h=g;g=b+(h&i^k&(h^i))+(h>>>2^h>>>13^h>>>22^h<<30^h<<19^h<<10)|0}e[0]=e[0]+g|0;e[1]=e[1]+h|0;e[2]=e[2]+i|0;e[3]=e[3]+k|0;e[4]=e[4]+j|0;e[5]=e[5]+l|0;e[6]=e[6]+m|0;e[7]=e[7]+n|0}};
sjcl.mode.ccm={name:"ccm",encrypt:function(a,b,c,d,e){var f,g=b.slice(0),h=sjcl.bitArray,i=h.bitLength(c)/8,k=h.bitLength(g)/8;e=e||64;d=d||[];if(i<7)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for(f=2;f<4&&k>>>8*f;f++);if(f<15-i)f=15-i;c=h.clamp(c,8*(15-f));b=sjcl.mode.ccm.G(a,b,c,d,e,f);g=sjcl.mode.ccm.I(a,g,c,b,e,f);return h.concat(g.data,g.tag)},decrypt:function(a,b,c,d,e){e=e||64;d=d||[];var f=sjcl.bitArray,g=f.bitLength(c)/8,h=f.bitLength(b),i=f.clamp(b,h-e),k=f.bitSlice(b,
h-e);h=(h-e)/8;if(g<7)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for(b=2;b<4&&h>>>8*b;b++);if(b<15-g)b=15-g;c=f.clamp(c,8*(15-b));i=sjcl.mode.ccm.I(a,i,c,k,e,b);a=sjcl.mode.ccm.G(a,i.data,c,d,e,b);if(!f.equal(i.tag,a))throw new sjcl.exception.corrupt("ccm: tag doesn't match");return i.data},G:function(a,b,c,d,e,f){var g=[],h=sjcl.bitArray,i=h.k;e/=8;if(e%2||e<4||e>16)throw new sjcl.exception.invalid("ccm: invalid tag length");if(d.length>0xffffffff||b.length>0xffffffff)throw new sjcl.exception.bug("ccm: can't deal with 4GiB or more data");
f=[h.partial(8,(d.length?64:0)|e-2<<2|f-1)];f=h.concat(f,c);f[3]|=h.bitLength(b)/8;f=a.encrypt(f);if(d.length){c=h.bitLength(d)/8;if(c<=65279)g=[h.partial(16,c)];else if(c<=0xffffffff)g=h.concat([h.partial(16,65534)],[c]);g=h.concat(g,d);for(d=0;d<g.length;d+=4)f=a.encrypt(i(f,g.slice(d,d+4)))}for(d=0;d<b.length;d+=4)f=a.encrypt(i(f,b.slice(d,d+4)));return h.clamp(f,e*8)},I:function(a,b,c,d,e,f){var g,h=sjcl.bitArray;g=h.k;var i=b.length,k=h.bitLength(b);c=h.concat([h.partial(8,f-1)],c).concat([0,
0,0]).slice(0,4);d=h.bitSlice(g(d,a.encrypt(c)),0,e);if(!i)return{tag:d,data:[]};for(g=0;g<i;g+=4){c[3]++;e=a.encrypt(c);b[g]^=e[0];b[g+1]^=e[1];b[g+2]^=e[2];b[g+3]^=e[3]}return{tag:d,data:h.clamp(b,k)}}};
sjcl.mode.ocb2={name:"ocb2",encrypt:function(a,b,c,d,e,f){if(sjcl.bitArray.bitLength(c)!==128)throw new sjcl.exception.invalid("ocb iv must be 128 bits");var g,h=sjcl.mode.ocb2.A,i=sjcl.bitArray,k=i.k,j=[0,0,0,0];c=h(a.encrypt(c));var l,m=[];d=d||[];e=e||64;for(g=0;g+4<b.length;g+=4){l=b.slice(g,g+4);j=k(j,l);m=m.concat(k(c,a.encrypt(k(c,l))));c=h(c)}l=b.slice(g);b=i.bitLength(l);g=a.encrypt(k(c,[0,0,0,b]));l=i.clamp(k(l,g),b);j=k(j,k(l,g));j=a.encrypt(k(j,k(c,h(c))));if(d.length)j=k(j,f?d:sjcl.mode.ocb2.pmac(a,
d));return m.concat(i.concat(l,i.clamp(j,e)))},decrypt:function(a,b,c,d,e,f){if(sjcl.bitArray.bitLength(c)!==128)throw new sjcl.exception.invalid("ocb iv must be 128 bits");e=e||64;var g=sjcl.mode.ocb2.A,h=sjcl.bitArray,i=h.k,k=[0,0,0,0],j=g(a.encrypt(c)),l,m,n=sjcl.bitArray.bitLength(b)-e,o=[];d=d||[];for(c=0;c+4<n/32;c+=4){l=i(j,a.decrypt(i(j,b.slice(c,c+4))));k=i(k,l);o=o.concat(l);j=g(j)}m=n-c*32;l=a.encrypt(i(j,[0,0,0,m]));l=i(l,h.clamp(b.slice(c),m));k=i(k,l);k=a.encrypt(i(k,i(j,g(j))));if(d.length)k=
i(k,f?d:sjcl.mode.ocb2.pmac(a,d));if(!h.equal(h.clamp(k,e),h.bitSlice(b,n)))throw new sjcl.exception.corrupt("ocb: tag doesn't match");return o.concat(h.clamp(l,m))},pmac:function(a,b){var c,d=sjcl.mode.ocb2.A,e=sjcl.bitArray,f=e.k,g=[0,0,0,0],h=a.encrypt([0,0,0,0]);h=f(h,d(d(h)));for(c=0;c+4<b.length;c+=4){h=d(h);g=f(g,a.encrypt(f(h,b.slice(c,c+4))))}b=b.slice(c);if(e.bitLength(b)<128){h=f(h,d(h));b=e.concat(b,[2147483648|0])}g=f(g,b);return a.encrypt(f(d(f(h,d(h))),g))},A:function(a){return[a[0]<<
1^a[1]>>>31,a[1]<<1^a[2]>>>31,a[2]<<1^a[3]>>>31,a[3]<<1^(a[0]>>>31)*135]}};sjcl.misc.hmac=function(a,b){this.M=b=b||sjcl.hash.sha256;var c=[[],[]],d=b.prototype.blockSize/32;this.l=[new b,new b];if(a.length>d)a=b.hash(a);for(b=0;b<d;b++){c[0][b]=a[b]^909522486;c[1][b]=a[b]^1549556828}this.l[0].update(c[0]);this.l[1].update(c[1])};sjcl.misc.hmac.prototype.encrypt=sjcl.misc.hmac.prototype.mac=function(a,b){a=(new this.M(this.l[0])).update(a,b).finalize();return(new this.M(this.l[1])).update(a).finalize()};
sjcl.misc.pbkdf2=function(a,b,c,d,e){c=c||1E3;if(d<0||c<0)throw sjcl.exception.invalid("invalid params to pbkdf2");if(typeof a==="string")a=sjcl.codec.utf8String.toBits(a);e=e||sjcl.misc.hmac;a=new e(a);var f,g,h,i,k=[],j=sjcl.bitArray;for(i=1;32*k.length<(d||1);i++){e=f=a.encrypt(j.concat(b,[i]));for(g=1;g<c;g++){f=a.encrypt(f);for(h=0;h<f.length;h++)e[h]^=f[h]}k=k.concat(e)}if(d)k=j.clamp(k,d);return k};
sjcl.random={randomWords:function(a,b){var c=[];b=this.isReady(b);var d;if(b===0)throw new sjcl.exception.notready("generator isn't seeded");else b&2&&this.U(!(b&1));for(b=0;b<a;b+=4){(b+1)%0x10000===0&&this.L();d=this.u();c.push(d[0],d[1],d[2],d[3])}this.L();return c.slice(0,a)},setDefaultParanoia:function(a){this.t=a},addEntropy:function(a,b,c){c=c||"user";var d,e,f=(new Date).valueOf(),g=this.q[c],h=this.isReady();d=this.F[c];if(d===undefined)d=this.F[c]=this.R++;if(g===undefined)g=this.q[c]=0;this.q[c]=
(this.q[c]+1)%this.b.length;switch(typeof a){case "number":break;case "object":if(b===undefined)for(c=b=0;c<a.length;c++)for(e=a[c];e>0;){b++;e>>>=1}this.b[g].update([d,this.J++,2,b,f,a.length].concat(a));break;case "string":if(b===undefined)b=a.length;this.b[g].update([d,this.J++,3,b,f,a.length]);this.b[g].update(a);break;default:throw new sjcl.exception.bug("random: addEntropy only supports number, array or string");}this.j[g]+=b;this.f+=b;if(h===0){this.isReady()!==0&&this.K("seeded",Math.max(this.g,
this.f));this.K("progress",this.getProgress())}},isReady:function(a){a=this.B[a!==undefined?a:this.t];return this.g&&this.g>=a?this.j[0]>80&&(new Date).valueOf()>this.O?3:1:this.f>=a?2:0},getProgress:function(a){a=this.B[a?a:this.t];return this.g>=a?1["0"]:this.f>a?1["0"]:this.f/a},startCollectors:function(){if(!this.m){if(window.addEventListener){window.addEventListener("load",this.o,false);window.addEventListener("mousemove",this.p,false)}else if(document.attachEvent){document.attachEvent("onload",
this.o);document.attachEvent("onmousemove",this.p)}else throw new sjcl.exception.bug("can't attach event");this.m=true}},stopCollectors:function(){if(this.m){if(window.removeEventListener){window.removeEventListener("load",this.o);window.removeEventListener("mousemove",this.p)}else if(window.detachEvent){window.detachEvent("onload",this.o);window.detachEvent("onmousemove",this.p)}this.m=false}},addEventListener:function(a,b){this.r[a][this.Q++]=b},removeEventListener:function(a,b){var c;a=this.r[a];
var d=[];for(c in a)a.hasOwnProperty[c]&&a[c]===b&&d.push(c);for(b=0;b<d.length;b++){c=d[b];delete a[c]}},b:[new sjcl.hash.sha256],j:[0],z:0,q:{},J:0,F:{},R:0,g:0,f:0,O:0,a:[0,0,0,0,0,0,0,0],d:[0,0,0,0],s:undefined,t:6,m:false,r:{progress:{},seeded:{}},Q:0,B:[0,48,64,96,128,192,0x100,384,512,768,1024],u:function(){for(var a=0;a<4;a++){this.d[a]=this.d[a]+1|0;if(this.d[a])break}return this.s.encrypt(this.d)},L:function(){this.a=this.u().concat(this.u());this.s=new sjcl.cipher.aes(this.a)},T:function(a){this.a=
sjcl.hash.sha256.hash(this.a.concat(a));this.s=new sjcl.cipher.aes(this.a);for(a=0;a<4;a++){this.d[a]=this.d[a]+1|0;if(this.d[a])break}},U:function(a){var b=[],c=0,d;this.O=b[0]=(new Date).valueOf()+3E4;for(d=0;d<16;d++)b.push(Math.random()*0x100000000|0);for(d=0;d<this.b.length;d++){b=b.concat(this.b[d].finalize());c+=this.j[d];this.j[d]=0;if(!a&&this.z&1<<d)break}if(this.z>=1<<this.b.length){this.b.push(new sjcl.hash.sha256);this.j.push(0)}this.f-=c;if(c>this.g)this.g=c;this.z++;this.T(b)},p:function(a){sjcl.random.addEntropy([a.x||
a.clientX||a.offsetX,a.y||a.clientY||a.offsetY],2,"mouse")},o:function(){sjcl.random.addEntropy(new Date,2,"loadtime")},K:function(a,b){var c;a=sjcl.random.r[a];var d=[];for(c in a)a.hasOwnProperty(c)&&d.push(a[c]);for(c=0;c<d.length;c++)d[c](b)}};
sjcl.json={defaults:{v:1,iter:1E3,ks:128,ts:64,mode:"ccm",adata:"",cipher:"aes"},encrypt:function(a,b,c,d){c=c||{};d=d||{};var e=sjcl.json,f=e.c({iv:sjcl.random.randomWords(4,0)},e.defaults);e.c(f,c);if(typeof f.salt==="string")f.salt=sjcl.codec.base64.toBits(f.salt);if(typeof f.iv==="string")f.iv=sjcl.codec.base64.toBits(f.iv);if(!sjcl.mode[f.mode]||!sjcl.cipher[f.cipher]||typeof a==="string"&&f.iter<=100||f.ts!==64&&f.ts!==96&&f.ts!==128||f.ks!==128&&f.ks!==192&&f.ks!==0x100||f.iv.length<2||f.iv.length>
4)throw new sjcl.exception.invalid("json encrypt: invalid parameters");if(typeof a==="string"){c=sjcl.misc.cachedPbkdf2(a,f);a=c.key.slice(0,f.ks/32);f.salt=c.salt}if(typeof b==="string")b=sjcl.codec.utf8String.toBits(b);c=new sjcl.cipher[f.cipher](a);e.c(d,f);d.key=a;f.ct=sjcl.mode[f.mode].encrypt(c,b,f.iv,f.adata,f.tag);return e.encode(e.V(f,e.defaults))},decrypt:function(a,b,c,d){c=c||{};d=d||{};var e=sjcl.json;b=e.c(e.c(e.c({},e.defaults),e.decode(b)),c,true);if(typeof b.salt==="string")b.salt=
sjcl.codec.base64.toBits(b.salt);if(typeof b.iv==="string")b.iv=sjcl.codec.base64.toBits(b.iv);if(!sjcl.mode[b.mode]||!sjcl.cipher[b.cipher]||typeof a==="string"&&b.iter<=100||b.ts!==64&&b.ts!==96&&b.ts!==128||b.ks!==128&&b.ks!==192&&b.ks!==0x100||!b.iv||b.iv.length<2||b.iv.length>4)throw new sjcl.exception.invalid("json decrypt: invalid parameters");if(typeof a==="string"){c=sjcl.misc.cachedPbkdf2(a,b);a=c.key.slice(0,b.ks/32);b.salt=c.salt}c=new sjcl.cipher[b.cipher](a);c=sjcl.mode[b.mode].decrypt(c,
b.ct,b.iv,b.adata,b.tag);e.c(d,b);d.key=a;return sjcl.codec.utf8String.fromBits(c)},encode:function(a){var b,c="{",d="";for(b in a)if(a.hasOwnProperty(b)){if(!b.match(/^[a-z0-9]+$/i))throw new sjcl.exception.invalid("json encode: invalid property name");c+=d+b+":";d=",";switch(typeof a[b]){case "number":case "boolean":c+=a[b];break;case "string":c+='"'+escape(a[b])+'"';break;case "object":c+='"'+sjcl.codec.base64.fromBits(a[b],1)+'"';break;default:throw new sjcl.exception.bug("json encode: unsupported type");
}}return c+"}"},decode:function(a){a=a.replace(/\s/g,"");if(!a.match(/^\{.*\}$/))throw new sjcl.exception.invalid("json decode: this isn't json!");a=a.replace(/^\{|\}$/g,"").split(/,/);var b={},c,d;for(c=0;c<a.length;c++){if(!(d=a[c].match(/^([a-z][a-z0-9]*):(?:(\d+)|"([a-z0-9+\/%*_.@=\-]*)")$/i)))throw new sjcl.exception.invalid("json decode: this isn't json!");b[d[1]]=d[2]?parseInt(d[2],10):d[1].match(/^(ct|salt|iv)$/)?sjcl.codec.base64.toBits(d[3]):unescape(d[3])}return b},c:function(a,b,c){if(a===
undefined)a={};if(b===undefined)return a;var d;for(d in b)if(b.hasOwnProperty(d)){if(c&&a[d]!==undefined&&a[d]!==b[d])throw new sjcl.exception.invalid("required parameter overridden");a[d]=b[d]}return a},V:function(a,b){var c={},d;for(d in a)if(a.hasOwnProperty(d)&&a[d]!==b[d])c[d]=a[d];return c},W:function(a,b){var c={},d;for(d=0;d<b.length;d++)if(a[b[d]]!==undefined)c[b[d]]=a[b[d]];return c}};sjcl.encrypt=sjcl.json.encrypt;sjcl.decrypt=sjcl.json.decrypt;sjcl.misc.S={};
sjcl.misc.cachedPbkdf2=function(a,b){var c=sjcl.misc.S,d;b=b||{};d=b.iter||1E3;c=c[a]=c[a]||{};d=c[d]=c[d]||{firstSalt:b.salt&&b.salt.length?b.salt.slice(0):sjcl.random.randomWords(2,0)};c=b.salt===undefined?d.firstSalt:b.salt;d[c]=d[c]||sjcl.misc.pbkdf2(a,c,b.iter);return{key:d[c].slice(0),salt:c.slice(0)}};

// public
module.exports = sjcl;


/***/ }),

/***/ "./src/js/tag.manager.js":
/*!*******************************!*\
  !*** ./src/js/tag.manager.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * List of tags with managing
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */



var app = __webpack_require__(/*! ./app */ "./src/js/app.js");


var TagManager = new function () {
    // for limited scopes
    var self = this;

    // max length of each tag, will be truncated on exceed
    var maxlength_tag = 100;

    // component state flag
    // true  - everything is decoded
    // false - no plain data, everything is encrypted
    this.open = false;

    // decoded to these two lists
    this.dataNmlist = {}; // {note:1, site:2, email:3}
    this.dataIdlist = {}; // {1:note, 2:site, 3:email}
    // they are filling on page loading and on note creation
    // if there are some new tags


    /**
     * Open the subscriber
     * master password is accessible
     * decrypt all the data and show it
     */
    // this.EventOpen = function () {
    //     console.time('TagManager: decrypt tags');
    //     // decrypt tags
    //     for ( var id in window.dataTags.data ) {
    //         var name = app.decode(window.dataTags.data[id][window.dataTags.defn.name]);
    //         // fill service lookup tables of tags by id and by name
    //         window.dataTagsNmlist[name] = id = parseInt(id, 10);
    //         window.dataTagsIdlist[id] = name;
    //     }
    //     console.timeEnd('TagManager: decrypt tags');
    // };


    /**
     * Close the subscriber
     * master password is expired and cleared
     * clear all the decrypted data
     */
    // this.EventClose = function () {
    //     // clear service lookup tables
    //     window.dataTagsNmlist = {};
    //     window.dataTagsIdlist = {};
    // };


    /**
     * Adds new tag id and enc/dev values to the global lookup tables
     * @param id of the new tag
     * @param enc encrypted tag name value
     * @param dec optional decrypted tag name value, decrypted from enc if omitted
     */
    this.Add = function ( id, enc, dec ) {
        // decrypt name if necessary
        dec = dec || app.decode(enc, true);
        this.data[id] = [enc, [], 1];
        this.dataNmlist[dec] = id;
        this.dataIdlist[id] = dec;
    };


    /**
     * Returns the sorted list of tag ids by usage
     * first ids the most used
     */
    this.SortByUses = function () {
        var result = [];
        // prepare list of id/usage
        for ( var id in this.data ) {
            result.push({id: parseInt(id, 10), uses: this.data[id][this.defn.uses]});
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
                    if ( this.dataIdlist[data[i]] )
                    // tag found in the global list
                        result.push((prefix ? prefix : '') + this.dataIdlist[data[i]]);
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
                    if ( this.dataNmlist[name] ) {
                        // tag found in the global data
                        result.push(this.dataNmlist[name]);
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
                    var tid = self.dataNmlist[word];
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
    };


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
    };


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
                result = this.data[data[0]][this.defn.links];
            } else {
                data.forEach(function ( id ) {
                    var links = self.data[id][self.defn.links];
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
    };


    this.Init = function ( tags ) {
        this.data = tags.data;
        this.defn = tags.defn;

        console.time('TagManager: decrypt tags');
        // decrypt tags
        for ( var id in this.data ) {
            var name = app.decode(this.data[id][this.defn.name]);
            // fill service lookup tables of tags by id and by name
            this.dataNmlist[name] = id = parseInt(id, 10);
            this.dataIdlist[id] = name;
        }
        console.timeEnd('TagManager: decrypt tags');
    }

};


// public
module.exports = TagManager;


/***/ }),

/***/ "./src/js/template.list.js":
/*!*********************************!*\
  !*** ./src/js/template.list.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * List of note templates
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */



var templates = __webpack_require__(/*! ./data.templates */ "./src/js/data.templates.js");


var TemplateList = new function () {
    // for limited scopes
    var self = this;

    var hint_main = 'In the list above please select a template to be used to create your new note.';
    var hint_item = 'This template will create a note with this set of entries:<br>';
    //var hint_filter = 'filter by name or description ...';


    /**
     * Open the subscriber
     * master password is accessible
     * decrypt all the data and show it
     */
    // this.EventOpen = function () {
    //     console.log('TemplateList.EventOpen');
    //     //this.Fill();
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
    //         elclear(this.dom.list);
    //         // component state flag
    //         this.open = false;
    //     }
    // };


    /**
     * Fills the list with templates
     */
    this.Fill = function () {
        // prepare
        elclear(self.dom.list);
        // iterate all templates
        //window.dataTemplates.data.forEach(function ( data ) {
        templates.forEach(function ( data ) {
            // template body
            var item = element('div', {className: 'item', /*style:'display:none',*/ data: data},
                element('div', {className: 'line ' + data.name}, [
                    element('div', {className: 'name'}, data.name),
                    element('div', {className: 'hint'}, data.description)
                ]));
            // append
            elchild(self.dom.list, item);
            // template item handlers
            //$(item).click(function(){
            item.addEventListener('click', function () {
                self.Show(false);
                NoteEditor.Create(this.data);
            });
            //$(item).mouseenter(function(){
            item.addEventListener('mouseenter', function () {
                var list = [];
                data.entries.forEach(function ( entry ) {
                    list.push('<b>' + entry.name + '</b>');
                });
                // window.dataTemplateEntries.data[this.data[window.dataTemplates.defn.id]].forEach(function ( entry ) {
                //     list.push('<b>' + entry[window.dataTemplateEntries.defn.name] + '</b>');
                // });
                self.dom.hint.innerHTML = hint_item + list.join(', ');
            });
        });
        //this.Filter();
    };


    /**
     * Filters by given text
     * @param text string to search in each template name or description
     */
    // this.Filter = function ( text ) {
    //     text = text || this.dom.filter.value;
    //     text = text.toLowerCase();
    //     for ( var i = 0; i < self.dom.list.childNodes.length; i++ ) {
    //         // prepare
    //         var item = self.dom.list.childNodes[i];
    //         var name = item.data[window.dataTemplates.defn.name].toLowerCase();
    //         var desc = item.data[window.dataTemplates.defn.description].toLowerCase();
    //         // search substring and show/hide
    //         //$(item).toggle(name.indexOf(text) >= 0 || desc.indexOf(text) >= 0);
    //         item.classList.toggle('hidden', !(!text || name.indexOf(text) >= 0 || desc.indexOf(text) >= 0));
    //     }
    // };


    /**
     * Shows/hides the component
     * @param state visibility flag: true - show, false - hide
     */
    this.Show = function ( state ) {
        this.dom.handle.style.display = state ? 'block' : 'none';
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
        // build main blocks together
        elchild(this.dom.handle, [
            this.dom.title = element('div', {className: 'title'}),
            this.dom.list = element('div', {className: 'list'}),
            this.dom.hint = element('div', {className: 'hint'}, hint_main)
        ]);
        // reset hint
        //$(this.dom.handle).mouseleave(function(){
        this.dom.handle.addEventListener('mouseleave', function () {
            self.dom.hint.innerHTML = hint_main;
        });

        //this.dom.filter = element('input', {type:'text', value:hint_filter});
        //this.dom.filter = element('input', {type: 'text', placeholder: hint_filter});
        // watermark and filtering
        //watermark(this.dom.filter, hint_filter, '#000');
        //$(this.dom.filter).keyup(function(){
        // this.dom.filter.addEventListener('keyup', function () {
        //     self.Filter(this.value);
        // });

        // title
        elchild(this.dom.title, [element('div', {className: 'text'}, 'Templates')/*, this.dom.filter*/]);

        this.Fill();
    };
};


// public
module.exports = TemplateList;


/***/ }),

/***/ "./src/js/tools.js":
/*!*************************!*\
  !*** ./src/js/tools.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Helper functions
 */

var sjcl = __webpack_require__(/*! ./sjcl.min */ "./src/js/sjcl.min.js");


// array prototypes
Array.prototype.has = function ( value ) {
    return this.indexOf(value) >= 0;
};
// Array.prototype.empty = function () {
//     return !(this.length > 0);
// };
// Array.prototype.each = function ( func ) {
//     var i, l = this.length;
//
//     for ( i = 0; i < l; i++ ) {
//         func(this[i], i);
//     }
// };
// IE compatibility
// if ( !Array.indexOf ) {
//     Array.prototype.indexOf = function ( obj, start ) {
//         var i;
//         for ( i = (start || 0); i < this.length; i++ ) {
//             if ( this[i] === obj ) { return i; }
//         }
//         return -1;
//     };
// }

// string prototypes
// String.prototype.trim = function() {
//    return this.replace(/^\s+|\s+$/g,"");
// };
// String.prototype.ltrim = function() {
//    return this.replace(/^\s+/g,"");
// };
// String.prototype.rtrim = function () {
//     return this.replace(/\s+$/g, '');
// };


/**
 * Firebug debug compatible with IE
 * free list of params
 */
// function fb () {
//     if ( window.console && window.console.info )
//         // send all arguments to firebug
//         console.info(arguments.length == 1 ? arguments[0] : arguments);
//
// }


/**
 * Moves focus to the given html element on enter key pressed
 * @param src object to track
 * @param dest given html element to jump to
 */
// window.onEnterFocus = function onEnterFocus ( src, dest ) {
//     src.onkeypress = function ( event ) {
//         if ( event.keyCode || event.keyCode ) {
//             if ( (event.keyCode === 13) || (event.keyCode === 13) ) {
//                 dest.focus();
//
//                 return false;
//             }
//         }
//
//         return true;
//     };
// };


/**
 * Clicks the given html element on enter key pressed
 * @param src object to track
 * @param dest given html element to click to
 */
window.onEnterClick = function onEnterClick ( src, dest ) {
    src.addEventListener('keydown', function ( event ) {
        if ( event.keyCode === 13 ) {
            //dest.focus();
            dest.click();
        }
    });
};


/**
 * New link type to select value from the set
 * @param obj html element to expand
 * @param data list of values and titles like {300:{title:'5 minutes',next:1200}, 1200:{title:'20 minutes',next:300}}
 * @param id default value to select
 */
// function LinkSet ( obj, data, id ) {
//     if ( !obj ) return;
//
//     this.obj  = obj;
//     this.data = data;
//
//     /**
//      * Set currect value and title from the data
//      * @param id to select
//      */
//     this.ItemSelect = function ( id ) {
//         // if somebody alredy have 1 munute (probably should be removed in the future)
//         if ( id == 60 ) data[60] = {next:300,  title: '1 minute'};
//         // check input
//         if ( id && data && data[id] ) {
//             // set value and html
//             this.obj.value = id;
//             this.obj.innerHTML = data[id].title;
//             var pthis = this;
//             // set onclick handler and pass this object pointer for future selection
//             this.obj.onclick = function(){
//                 pthis.ItemSelect(data[id].next);
//             };
//         }
//     };
//
//     // do the default selection
//     this.ItemSelect(id);
// }


/**
 * Adds the given value to the obj as a child recursively
 * @param obj DOMElement to be appended
 * @param value data to add (simple text values, DOMElements, array of DOMElements)
 * @return DOMElement owner of all added data
 * @example elchild(mydiv, 'Hello world'); // simple text value
 * @example elchild(mydiv, someotherdiv); // DOMElement
 * @example elchild(mydiv, [div1, div2, div3]); // DOMElement list
 * @example elchild(mydiv, [div1, 'hello', 'world']); // combined case
 */
window.elchild = function elchild ( obj, value ) {
    // check input
    if ( obj && value ) {
        // DOMElement
        if ( value.nodeType ) {
            obj.appendChild(value);
        } else if ( value instanceof Array ) {
            // array of DOMElements of simple values
            for ( var i = 0; i < value.length; i++ ) {
                elchild(obj, value[i]);
            }
        } else {
            // simple values
            obj.appendChild(document.createTextNode(value));
        }
    }

    return obj;
};


/**
 * Removes all child elements from the given object
 * @param obj DOMElement to be updated
 * @return DOMElement cleared
 */
window.elclear = function elclear ( obj ) {
    if ( obj && obj.hasChildNodes() ) {
        while ( obj.hasChildNodes() ) {
            obj.removeChild(obj.firstChild);
        }
    }

    return obj;
};


/**
 * Assigns a list of attribute values to the given object
 * @param obj DOMElement
 * @param attr list of attributes with values
 * @return DOMElement the same as the given one
 * @example elattr(myimg, {src:'face.png', className:'main'});
 */
window.elattr = function elattr ( obj, attr ) {
    // check if DOMElement
    if ( obj && obj.nodeType && attr && attr instanceof Object ) {
        for ( var akey in attr ) {
            obj[akey] = attr[akey];
        }
    }

    return obj;
};


/**
 * Creates a DOMElement with given options
 * @param name html element name (a, img, div, ...)
 * @param attr list of attributes with values
 * @param [data] inner html value
 * @param [handlers] list of DOMElement event handlers (onclick, onload, ...)
 * @return {Node}
 * @example element('link', {rel:'stylesheet', type:'text/css', href:'http://some.url/'});
 */
window.element = function element ( name, attr, data, handlers ) {
    var tag = document.createElement(name);

    elattr(tag, attr);
    elchild(tag, data);

    // set all handlers
    if ( handlers && handlers instanceof Object ) {
        for ( var handler in handlers ) {
            tag[handler] = handlers[handler];
        }
    }

    return tag;
};


window.table = function table ( rows, cols, attr, handlers ) {
    var el = element('table', attr, null, handlers);

    for ( var i = 0; i < rows; i++ ) {
        el.insertRow(-1);
        for ( var j = 0; j < cols; j++ ) {
            el.rows[i].insertCell(-1);
        }
    }

    return el;
};


window.tblrow = function tblrow ( obj, cells, attrs ) {
    var row = obj.insertRow(-1);

    for ( var i = 0; i < cells.length; i++ ) {
        row.insertCell(-1);
        elchild(row.cells[i], cells[i]);
        elattr(row.cells[i], attrs[i]);
    }

    return obj;
};


/**
 * converts date from timestamp to simple date string
 * 1209589200 -> 2012.02.03 00:23
 * @return {String}
 */
window.TimestampToDateStr = function TimestampToDateStr ( tstamp ) {
    var theDate = tstamp ? new Date(tstamp * 1000) : new Date();
    var nyear = theDate.getFullYear();
    var nmonth = theDate.getMonth() + 1;
    var nday = theDate.getDate();
    var hour = theDate.getHours();
    var min = theDate.getMinutes();

    if ( nmonth < 10 ) nmonth = '0' + nmonth;
    if ( nday < 10 ) nday = '0' + nday;
    if ( hour < 10 ) hour = '0' + hour;
    if ( min < 10 ) min = '0' + min;

    return nyear + '.' + nmonth + '.' + nday + ' ' + hour + ':' + min;
};


// function time_data ( timestamp ) {
//     var dt = new Date(timestamp * 1000);
//     var dl = {y:dt.getFullYear(), m:dt.getMonth()+1, d:dt.getDate(), h:dt.getHours(), i:dt.getMinutes()};
//     // extend with zero where necessary
//     if ( dl.m < 10 ) dl.m = '0' + dl.m;
//     if ( dl.d < 10 ) dl.d = '0' + dl.d;
//     if ( dl.h < 10 ) dl.h = '0' + dl.h;
//     if ( dl.i < 10 ) dl.i = '0' + dl.i;
//     return dl;
// }


/**
 * Password generator with SJCL entropy mechanism
 * @param {Number} length size of the result password
 * @return {String}
 */
window.pwdgen = function pwdgen ( length ) {
    var charset = 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&{}()[]=+?*<>;,.:-_',
        letters = [], letter, result = '';

    while ( result.length < length ) {
        letter = null;
        // generate a char
        if ( sjcl.random.isReady() ) {
            // get
            letter = String.fromCharCode(parseInt(sjcl.codec.hex.fromBits(sjcl.random.randomWords(1)).substr(0, 2), 16));
            // invalidate if not in dictionary
            if ( charset.indexOf(letter) === -1 ) letter = null;
        } else {
            letter = charset.charAt(Math.floor(Math.random() * charset.length));
        }
        // something is found
        if ( letter ) {
            // check if not a duplicate
            if ( letters.indexOf(letter.toLowerCase()) < 0 ) {
                // fill already used chars list
                letters.push(letter.toLowerCase());
                // fill the result
                result += letter;
            }
        }
    }
    return result;
};


/**
 * Ajax cross-domain request helper
 * @param url link to external resource
 */
// function jsonp ( url ) {
//     // create element and get data to callback
//     var script = element('script', {type:'text/javascript', src:url});
//     // insert to DOM
//     document.body.appendChild(script);
//     // clear after data processed in 5 secs
//     setTimeout(function(){
//         console.log('jsonp script tag clearing');
//         document.body.removeChild(script);
//     }, 10000);
// }


/**
 * Set input watermark hint
 * @param obj html element
 * @param text string hint
 * @param cin string color
 */
// function watermark ( obj, text, cin ) {
//     $(obj)
//         .focus(function(){
//             if ( this.value == text ) $(this).val('').css({color:cin});
//         })
//         .focusout(function(){
//             if ( !this.value ) $(this).val(text).css({color:''});
//         });
// }


/***/ })

/******/ });
//# sourceMappingURL=main.js.map