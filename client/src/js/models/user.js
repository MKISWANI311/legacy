/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var Emitter = require('cjs-emitter'),
    Crypto  = require('../crypto'),
    api     = require('../api'),
    TagManager = require('./tag-manager');


/**
 * events:
 * session - there is a user session
 * signup  - user was registered
 * login   - new session was created
 * unlock  - has pass
 * logout  - session was deleted
 *
 * @param {Object} [config] init parameters
 * @constructor
 */
function User ( config ) {
    // parent constructor call
    Emitter.call(this, config);

    this.crypto = new Crypto();

    this.tags = new TagManager(this.crypto);
}


// inheritance
User.prototype = Object.create(Emitter.prototype);
User.prototype.constructor = User;


User.prototype.init = function () {
    var self = this;

    api.get('user/info', function ( error, data ) {
        error && console.error(error);

        //console.log('user info', data);

        if ( !error ) {
            // valid reply
            if ( data && data.hash ) {
                // apply
                self.crypto.setPassHash(data.hash);
            } else {
                // status
                error = true;
            }
        }

        self.emit('session', error, data);
    });
};


User.prototype.captcha = function () {
    var self = this;

    api.get('captcha/uri', function ( error, data ) {
        error && console.error(error);

        if ( !error ) {
            // valid reply
            if ( data && data.src ) {
                // apply
                data.src = api.defaults.server + data.src;
            } else {
                // status
                error = true;
            }
        }

        self.emit('captcha', error, data);
    });
};


User.prototype.signup = function ( name, pass, code ) {
    var self = this,
        data = {
            name: this.crypto.calcHash(name),
            pass: this.crypto.calcHash(pass),
            code: code,
            mode: 'signup'
        };

    api.post('user/auth', data, function ( error, data ) {
        error && console.error(error);

        //console.log('user auth', data);

        if ( !error ) {
            // valid reply
            if ( data && data.id ) {
                // apply
                self.unlock(pass);
                // for autocomplete
                localStorage.setItem('username_last_used', name);
            } else {
                // status
                error = true;
            }
        }

        self.emit('signup', error, data);
    });
};


User.prototype.login = function ( name, pass ) {
    var self = this,
        data = {
            name: this.crypto.calcHash(name),
            pass: this.crypto.calcHash(pass),
            mode: 'login'
        };

    api.post('user/auth', data, function ( error, data ) {
        error && console.error(error);

        //console.log('user auth', data);

        if ( !error ) {
            // valid reply
            if ( data && data.id ) {
                // apply
                self.unlock(pass);
                // for autocomplete
                localStorage.setItem('username_last_used', name);
            } else {
                // status
                error = true;
            }
        }

        self.emit('login', error, data);
    });
};


User.prototype.unlock = function ( pass ) {
    var error = null;

    // no hash or match
    if ( !this.crypto.hasHash() || this.crypto.checkPass(pass) ) {
        // apply
        this.crypto.setPass(pass);
    } else {
        // status
        error = true;
    }

    //console.log('user unlock', error);

    this.emit('unlock', error);
};


User.prototype.logout = function () {
    var self = this;

    api.post('user/logout', null, function ( error, success ) {
        error && console.error(error);

        //console.log('user logout', success);

        self.emit('logout', error || !success);
    });
};


// public
module.exports = User;
