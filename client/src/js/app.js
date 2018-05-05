/**
 * Main application object
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var sjcl = require('./sjcl.min');


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
