/**
 * User login and registration.
 */

'use strict';

var Page       = require('spa-component-page'),
    dom        = require('spa-dom'),
    UserLogin  = require('./user-login'),
    UserSignup = require('./user-signup'),
    UserUnlock = require('./user-unlock'),
    tag        = dom.tag;


function User ( config ) {
    //var self = this;
    var user = config.model,
        tabs;

    // defaults
    config.modifiers = ['user'];
    config.hidden = true;

    // parent constructor call
    Page.call(this, config);

    tabs = {
        login: new UserLogin({
            model: user,
            events: {
                signup: function () {
                    tabs.signup.show();
                }
            }
        }),

        signup: new UserSignup({
            model: user,
            events: {
                cancel: function () {
                    tabs.login.show();
                }
            }
        }),

        unlock: new UserUnlock({model: user})
    };

    // model events
    user.addListeners({
        session: function ( error ) {
            if ( error ) {
                // no session
                // user should login or signup
                tabs.login.show();
            } else {
                // there is a user session
                tabs.unlock.show();
            }
        },
        unlock: function ( error ) {
            if ( !error ) {
                // remove all tabs
                tabs.login.remove();
                tabs.signup.remove();
                tabs.unlock.remove();
            }
        },
        logout: function ( error ) {
            !error && location.reload();
        }
    });

    // userLogin.addListeners({
    //     signup: function () {
    //         userSignup.show();
    //     }
    // });
    //
    // userSignup.addListeners({
    //     cancel: function () {
    //         userLogin.show();
    //     }
    // });


    this.$node.appendChild(dom.fragment(
        tag('div', {className: this.name + '__header'}, 'FortNotes'),
        tag('div', {className: this.name + '__body'},
            tabs.login.$node,
            tabs.signup.$node,
            tabs.unlock.$node
        ),
        tag('div', {className: this.name + '__footer'},
            tag('div', {className: this.name + '__links'},
                tag('a', {className: this.name + '__link', href: '#'}, 'About'), '\u2022',
                tag('a', {className: this.name + '__link', href: '#'}, 'Blog'), '\u2022',
                tag('a', {className: this.name + '__link', href: '#'}, 'Help'), '\u2022',
                tag('a', {className: this.name + '__link', href: '#'}, 'Terms')
            ),
            tag('div', {className: this.name + '__copyright'},
                _('© 2013-2018 FortNotes. All rights reserved.')
            )
        )
    ));
}


// inheritance
User.prototype = Object.create(Page.prototype);
User.prototype.constructor = User;


// public
module.exports = User;
