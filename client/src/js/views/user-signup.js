/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var Tab    = require('spa-component-tab'),
    Button = require('spa-component-button'),
    tag    = require('spa-dom').tag;


function UserSignup ( config ) {
    var self = this,
        user = config.model,
        buttons, inputs, errors, images;

    // defaults
    config.modifiers = ['user-signup'];
    config.hidden = true;
    config.group = 'user';

    // parent constructor call
    Tab.call(this, config);

    this.addListeners({
        show: function () {
            user.captcha();
        }
    });

    // model events
    user.addListeners({
        captcha: function ( error, data ) {
            if ( !error ) {
                images.$code.src = data.src;
            }
        },
        signup: function ( error ) {
            if ( error ) {
                // todo
            }
        }
    });

    images = {
        $code: tag('img', {className: 'dialog__captcha'})
    };

    buttons = {
        cancel: new Button({
            value: 'Cancel',
            events: {
                click: function () {
                    self.emit('cancel');
                }
            }
        }),

        signup: new Button({
            value: 'Signup',
            modifiers: ['primary'],
            events: {
                click: function () {
                    var valid = true;

                    if ( !inputs.$name.value ) {
                        errors.$name.textContent = _('this field can not be empty');
                        valid = false;
                    }

                    if ( !inputs.$passA.value || !inputs.$passB.value ) {
                        errors.$pass.textContent = _('both passwords can not be empty');
                        valid = false;
                    } else if ( inputs.$passA.value !== inputs.$passB.value ) {
                        errors.$pass.textContent = _('both passwords should be identical');
                        valid = false;
                    }

                    if ( !inputs.$code.value ) {
                        errors.$code.textContent = _('this field can not be empty');
                        valid = false;
                    }

                    if ( valid ) {
                        user.signup(inputs.$name.value, inputs.$passA.value, inputs.$code.value);
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
        $passA: tag('input', {
            type: 'password',
            className: 'dialog__input',
            autocomplete: 'new-password'
        }),
        $passB: tag('input', {
            type: 'password',
            className: 'dialog__input',
            autocomplete: 'new-password'
        }),
        $code: tag('input', {
            type: 'text',
            className: 'dialog__input',
            autocomplete: 'off'
        })
    };

    errors = {
        $name: tag('div', {className: 'dialog__error'}),
        $pass: tag('div', {className: 'dialog__error'}),
        $code: tag('div', {className: 'dialog__error'})
    };

    this.$node.appendChild(
        tag('form', {className: 'dialog dialog--signup'},
            tag('div', {className: 'dialog__title'},
                //images.main.$node,
                _('Create a new account')
            ),
            tag('div', {className: 'dialog__info'},
                _('Your account will contain all your notes and tags. Everything will be encrypted with the password bellow. No password recovery is available!')
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
                        inputs.$passA,
                        tag('div', {className: 'dialog__hint'}, _('encryption/decryption password')),
                        inputs.$passB,
                        tag('div', {className: 'dialog__hint'}, _('password once again'))
                    )
                ),
                // code
                tag('div', {className: 'dialog__entry dialog__entry--code'},
                    //tag('div', {className: 'dialog__icon'}, images.key.$node),
                    //tag('div', {className: 'dialog__icon'},
                    tag('img', {className: 'dialog__icon', src: 'https://image.flaticon.com/icons/svg/109/109730.svg'}),
                    //),
                    tag('div', {className: 'dialog__body'},
                        tag('div', {className: 'dialog__name'}, 'Verification code'),
                        errors.$code,
                        inputs.$code,
                        tag('div', {className: 'dialog__hint'}, _('to make sure you are not a robot')),
                        images.$code
                    )
                )
            ),
            //tag('div', {className: 'dialog__errors'}),
            tag('div', {className: 'dialog__buttons'},
                buttons.cancel.$node,
                buttons.signup.$node
            )
        )
    );

    // inputs.$pass.addEventListener('keydown', function ( event ) {
    //     if ( event.keyCode === 13 ) {
    //         buttons.signup.emit('click');
    //     }
    // });
}


// inheritance
UserSignup.prototype = Object.create(Tab.prototype);
UserSignup.prototype.constructor = UserSignup;


// public
module.exports = UserSignup;
