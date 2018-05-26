/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var Tab    = require('spa-component-tab'),
    Button = require('spa-component-button'),
    tag    = require('spa-dom').tag;


function UserLogin ( config ) {
    var self = this,
        user = config.model,
        buttons, inputs, errors;

    // defaults
    config.modifiers = ['user-login'];
    config.hidden = true;
    config.group = 'user';

    // parent constructor call
    Tab.call(this, config);

    // model events
    user.addListeners({
        login: function ( error ) {
            if ( error ) {
                // todo
            }
        }
    });


    buttons = {
        signup: new Button({
            value: 'Signup',
            events: {
                click: function () {
                    self.emit('signup');
                }
            }
        }),

        login: new Button({
            value: 'Login',
            modifiers: ['primary'],
            events: {
                click: function () {
                    var valid = true;

                    if ( !inputs.$name.value ) {
                        errors.$name.textContent = _('this field can not be empty');
                        valid = false;
                    }

                    if ( !inputs.$pass.value ) {
                        errors.$pass.textContent = _('this field can not be empty');
                        valid = false;
                    }

                    if ( valid ) {
                        user.login(inputs.$name.value, inputs.$pass.value);
                    }
                }
            }
        })
    };

    inputs = {
        $name: tag('input', {
            type: 'text',
            className: 'dialog__input',
            autofocus: true,
            autocomplete: 'username',
            value: localStorage.getItem('username_last_used')
        }),
        $pass: tag('input', {
            type: 'password',
            className: 'dialog__input',
            autocomplete: 'current-password'
        })
    };

    errors = {
        $name: tag('div', {className: 'dialog__error'}),
        $pass: tag('div', {className: 'dialog__error'})
    };

    this.$node.appendChild(
        tag('form', {className: 'dialog dialog--login'},
            tag('div', {className: 'dialog__title'},
                //images.main.$node,
                _('Login to your account')
            ),
            tag('div', {className: 'dialog__info'},
                _('Please provide your user name and password to get access to your encrypted data.')
            ),
            tag('div', {className: 'dialog__entries'},
                // username
                tag('div', {className: 'dialog__entry dialog__entry--username'},
                    //tag('div', {className: 'dialog__icon'}, images.key.$node),
                    //tag('div', {className: 'dialog__icon'},
                    tag('img', {className: 'dialog__icon', src: 'https://image.flaticon.com/icons/svg/149/149452.svg'}),
                    //),
                    tag('div', {className: 'dialog__body'},
                        tag('div', {className: 'dialog__name'}, 'Username'),
                        errors.$name,
                        inputs.$name,
                        tag('div', {className: 'dialog__hint'}, _('user identifier in any form'))
                    )
                ),
                // password
                tag('div', {className: 'dialog__entry dialog__entry--password'},
                    //tag('div', {className: 'dialog__icon'}, images.key.$node),
                    //tag('div', {className: 'dialog__icon'},
                    tag('img', {className: 'dialog__icon', src: 'https://image.flaticon.com/icons/svg/283/283430.svg'}),
                    //),
                    tag('div', {className: 'dialog__body'},
                        tag('div', {className: 'dialog__name'}, 'Password'),
                        errors.$pass,
                        inputs.$pass,
                        tag('div', {className: 'dialog__hint'}, _('encryption/decryption password'))
                    )
                )
            ),
            //tag('div', {className: 'dialog__errors'}),
            tag('div', {className: 'dialog__buttons'},
                buttons.signup.$node,
                buttons.login.$node
            )
        )
    );

    inputs.$pass.addEventListener('keydown', function ( event ) {
        if ( event.keyCode === 13 ) {
            buttons.login.emit('click');
        }
    });
}


// inheritance
UserLogin.prototype = Object.create(Tab.prototype);
UserLogin.prototype.constructor = UserLogin;


// public
module.exports = UserLogin;
