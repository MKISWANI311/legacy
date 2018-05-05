/**
 * Main application object
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var sjcl = require('./sjcl.min');


var App = new function () {
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
     * shuld be set on application level
     */
    this.RequestPass = null;

    // lists for cached enc/dec values
    // to prevent unnecessary ecnryption/decryption
    // filling optionally and clearing on master password expiration
    var cache_enc = {};  // "plain_text":'***encoded string***' list
    var cache_dec = {};  // '***encoded string***':"plain_text" list

    /**
     * Set global variable
     * @param name the name of value to store
     * @param value the variable value
     * @param persistent flag to store in the local storage permanently
     */
    this.Set = function ( name, value, persistent ) {
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
    this.Get = function ( name, ifnull ) {
        return this.data[name] || localStorage.getItem(name) || ifnull;
    };

    /**
     * Calculate the hash from given value
     * algorithm: sha256
     */
    this.CalcHash = function ( value ) {
        return sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(value));
    };

    /**
     * Check if hash set
     */
    this.HasHash = function () {
        return (hash != null && hash != '');
    };

    /**
     * Check if pass set
     */
    this.HasPass = function () {
        return (pass != null && pass != '');
    };

    /**
     * Check if pass set and matches the hash
     * @param value the master password to check
     */
    this.CheckPass = function ( value ) {
        // check input
        if ( !this.HasHash() || !value ) {
            return false;
        }
        // comparing
        return (hash == this.CalcHash(value));
    };

    /**
     * Set the hash of private pass var
     * @param value the master password hash value
     */
    this.SetPassHash = function ( value ) {
        //console.log('SetPassHash', value);
        // check input
        if ( !value ) return false;
        // set and return
        return hash = value;
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
    this.SetPass = function ( value ) {
        //console.log('SetPass', value);
        // check input
        if ( !value ) {
            return false;
        }
        // set the private password
        pass = value;
        // calculate and set hash if necessary
        if ( !this.HasHash() ) {
            this.SetPassHash(this.CalcHash(value));
        }
        //console.log('pass will expire in', time);
        // set clearing timer
        //setTimeout(function(){self.ExpirePass()}, time * 1000);
        // notify all the subsribers that we have the pass
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
    this.ExpirePass = function () {
        console.log('master password expire');
        // notify all the subsribers about clearing
        for ( var i in self.subscribers ) {
            if ( typeof self.subscribers[i].EventClose === 'function' ) {
                // close the subscriber - clear all the decrypted data
                self.subscribers[i].EventClose();
            }
        }
        // clear the master pass
        pass = null;
        // clear cache
        cache_enc = {};
        cache_dec = {};
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
    this.Encode = function ( data, cache ) {
        // password is present and not empty input
        if ( pass && data !== false && data !== null ) {
            // try to get from cache
            if ( cache && cache_enc[data] ) return cache_enc[data];
            // protected block
            try {
                var enc = sjcl.encrypt(pass, data, params);
                // fill cache if necessary
                if ( cache ) {
                    cache_enc[data] = enc;
                    cache_dec[enc] = data;
                }
                return enc;
            } catch ( e ) {
                console.trace();
                console.log('encrypt failure', e, data);
            }
        }
        return false;
    };
//    this.Encode = function ( text, callback ) {
//        // temporary pass storing not to loose in on timer clearing
//        var ptmp = pass;
//        // password is cached so do encryption immediately
//        if ( ptmp ) {
//            callback.call(this, sjcl.encrypt(ptmp, text, params));
//            return true;
//        } else {
//            // ask for password and then do encryption
//            if ( this.RequestPass && this.RequestPass instanceof Function ) {
//                this.RequestPass.call(this, function(){
//                    // pass encryption to the callback
//                    callback.call(this, sjcl.encrypt(pass, text, params));
//                    return true;
//                });
//            }
//            return false;
//        }
//    }

    /**
     * Decrypt the given text and pass the result to callback function
     * @param data data to be decrypted
     * @param cache optional bool flag
     */
    this.Decode = function ( data, cache ) {
        // password is present and not empty input
        if ( pass && data ) {
            // try to get from cache
            if ( cache && cache_dec[data] ) return cache_dec[data];
            // protected block
            try {
                var dec = sjcl.decrypt(pass, data);
                // fill cache if necessary
                if ( cache ) {
                    cache_dec[data] = dec;
                    cache_enc[dec] = data;
                }
                return dec;
            } catch ( e ) {
                console.trace();
                console.log('decrypt failure', e, data);
            }
        }
        return false;
    };
//    this.Decode = function ( text, callback ) {
//        // temporary pass storing not to loose in on timer clearing
//        var ptmp = pass;
//        // password is cached so do encryption immediately
//        if ( ptmp ) {
//            callback.call(this, sjcl.decrypt(ptmp, text));
//            return true;
//        } else {
//            // ask for password and then do encryption
//            if ( this.RequestPass && this.RequestPass instanceof Function ) {
//                this.RequestPass.call(this, function(){
//                    // pass decryption to the callback
//                    callback.call(this, sjcl.decrypt(pass, text));
//                    return true;
//                });
//            }
//            return false;
//        }
//    }

    this.Subscribe = function ( component ) {
        this.subscribers.push(component);
    }
};


// public
module.exports = App;
