/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var Tab    = require('spa-component-tab'),
    Button = require('spa-component-button'),
    tag    = require('spa-dom').tag;


function UserUnlock ( config ) {
    var user = config.model,
        buttons, inputs, errors;

    // defaults
    config.modifiers = ['user-unlock'];
    config.hidden = true;
    config.group = 'user';

    // parent constructor call
    Tab.call(this, config);


    // model events
    user.addListeners({
        unlock: function ( error ) {
            if ( error ) {
                // todo
            }
        }
    });


    buttons = {
        logout: new Button({
            value: 'Logout',
            events: {
                click: function () {
                    user.logout();
                }
            }
        }),

        unlock: new Button({
            value: 'Unlock',
            modifiers: ['primary'],
            events: {
                click: function () {
                    var valid = true;

                    if ( !inputs.$pass.value ) {
                        errors.$pass.textContent = _('this field can not be empty');
                        valid = false;
                    }

                    if ( valid ) {
                        user.unlock(inputs.$pass.value);
                    }
                }
            }
        })
    };

    inputs = {
        $pass: tag('input', {type: 'password', className: 'dialog__input', autofocus: true, autocomplete: 'current-password'/*, value: '111111'*/})
    };

    errors = {
        $pass: tag('div', {className: 'dialog__error'})
    };

    this.$node.appendChild(
        tag('form', {className: 'dialog dialog--unlock'},
            tag('div', {className: 'dialog__title'},
                //images.main.$node,
                _('Unlock your data')
            ),
            tag('div', {className: 'dialog__info'},
                _('All profile data is unavailable till the master password is provided. You can unlock it with your password or logout to switch to another user.')
            ),
            tag('div', {className: 'dialog__entries'},
                // password
                tag('div', {className: 'dialog__entry dialog__entry--password'},
                    //tag('div', {className: 'dialog__icon'}, images.key.$node),
                    //tag('div', {className: 'dialog__icon'},
                    tag('img', {className: 'dialog__icon', src: 'https://image.flaticon.com/icons/svg/283/283430.svg'}),
                    //),
                    tag('div', {className: 'dialog__body'},
                        tag('div', {className: 'dialog__name'}, 'Password'),
                        tag('input', {type: 'text', autocomplete: 'username', className: 'hidden', value: localStorage.getItem('username_last_used')}),
                        errors.$pass,
                        inputs.$pass,
                        tag('div', {className: 'dialog__hint'}, _('encryption/decryption password'))
                    )
                )
            ),
            //tag('div', {className: 'dialog__errors'}),
            tag('div', {className: 'dialog__buttons'},
                buttons.logout.$node,
                buttons.unlock.$node
            )
        )
    );

    inputs.$pass.addEventListener('keydown', function ( event ) {
        if ( event.keyCode === 13 ) {
            buttons.unlock.emit('click');
        }
    });
}


// inheritance
UserUnlock.prototype = Object.create(Tab.prototype);
UserUnlock.prototype.constructor = UserUnlock;


// public
module.exports = UserUnlock;
