/**
 * User login and registration.
 */

'use strict';

var Page   = require('spa-component-page'),
    dom    = require('spa-dom'),
    api    = require('../api'),
    crypto = require('../crypto'),
    tag    = dom.tag,
    page, tabs, images;


// init
page = new Page({
    modifiers: ['main'],
    hidden: true,
    events: {
        show: function () {
            tabs.home.show();
        }
    }
});


tabs = {
    home: require('../tabs/main.home')
};


/*tabs.unlock.addListeners({
    show: function () {
        //page.$user.style.display = 'block';
        // todo: enable
        //page.$user.textContent = 'app.user.name';
    },
    switch: function () {
        //localStorage.removeItem('profileId');
        //location.reload();
    },
    unlock: function ( pass ) {
        console.log(pass);

        // check and set pass
        if ( crypto.checkPass(pass) && crypto.setPass(pass) ) {
            api.get('user/tags', function ( error, data ) {
                if ( error ) {
                    console.error(error);
                }

                console.log('user tags', data);

                page.emit('unlock');
            });
        }
    }
});*/


page.$node.appendChild(dom.fragment(
    tag('div', {className: page.name + '__header'},
        tag('img', {className: page.name + '__icon', src: 'img/safebox.svg'}),
        'FortNotes'
    ),
    tag('div', {className: page.name + '__body'},
        tabs.home.$node
        //'tabs.unlock.$node'
        // tag('div', {className: 'dialog__title'}, _('Unlock your data')),
        // tag('div', {className: 'dialog__info'}, _('All profile data is unavailable till the master password is provided. You can unlock it with your password or switch to another user.')),
        // tag('div', {className: 'dialog__entries'},
        //     tag('div', {className: 'dialog__entriy'}, 'entriy'),
        //     tag('div', {className: 'dialog__entriy'}, 'entriy')
        // )
    ),
    tag('div', {className: page.name + '__footer'},
        tag('div', {className: page.name + '__copyright'},
            _('© 2013-2018 FortNotes. All rights reserved.')
        )
    )
));


// public
module.exports = page;
