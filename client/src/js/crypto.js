/**
 * Main application object
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var sjcl   = require('./sjcl.min'),
    params = {ks: 256, ts: 128, mode: 'ccm', cipher: 'aes'},
    collectTimer;


function Crypto () {
    var self = this,
        pass = null,
        hash = null;

    // Check if hash set
    this.hasHash = function () {
        return (typeof hash === 'string' && hash !== '');
    };


    // Check if pass set
    this.hasPass = function () {
        return (typeof pass === 'string' && pass !== '');
    };


    // Check if pass set and matches the hash
    // @param value the master password to check
    this.checkPass = function ( value ) {
        // check input
        if ( !hash || !value ) {
            return false;
        }

        // comparing
        return (hash === self.calcHash(value));
    };


    // Set the hash of private pass var
    // @param value the master password hash value
    this.setPassHash = function ( value ) {
        // check input
        if ( !value ) {
            return false;
        }

        // set and return
        return (hash = value);
    };


    // Set the private pass var and start timer for clearing it in some time
    // @param value the master password to check
    this.setPass = function ( value ) {
        // check input
        if ( !value ) {
            return false;
        }

        // set the private password
        pass = value;

        // calculate and set hash
        self.setPassHash(self.calcHash(value));

        // return password hash value
        return hash;
    };


    // Encrypt the given text and pass the result to callback function
    // @param data data for encryption
    this.encrypt = function ( data ) {
        // password is present and not empty input
        if ( pass && typeof data === 'string' ) {
            try {
                return sjcl.encrypt(pass, data, params);
            } catch ( error ) {
                console.error(error);
            }
        }

        return false;
    };


    // Decrypt the given text and pass the result to callback function
    // @param data data to be decrypted
    this.decrypt = function ( data ) {
        // password is present and not empty input
        if ( pass && data ) {
            try {
                return sjcl.decrypt(pass, data);
            } catch ( error ) {
                console.error(error);
            }
        }

        return false;
    };
}


// correct constructor name
Crypto.prototype.constructor = Crypto;


// Calculate the hash from given value
// algorithm: sha256
Crypto.prototype.calcHash = function ( value ) {
    return sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(value));
};


// public
module.exports = Crypto;


// start entropy collection
sjcl.random.startCollectors();
// check each 1 sec if has enough
collectTimer = setInterval(function () {
    if ( sjcl.random.isReady() ) {
        console.log('entropy collected');
        // has enough
        sjcl.random.stopCollectors();
        // stop checking
        clearInterval(collectTimer);
    }
}, 1000);
