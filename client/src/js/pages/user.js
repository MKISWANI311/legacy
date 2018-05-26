/**
 * User login and registration.
 */

'use strict';

var Page   = require('spa-component-page'),
    dom    = require('spa-dom'),
    api    = require('../api'),
    crypto = require('../crypto'),
    TagManager = require('../models/tag-manager'),
    tag    = dom.tag,
    page, tabs, images;


// init
page = new Page({
    modifiers: ['user'],
    hidden: true,
    events: {
        show: function () {
            tabs.unlock.show();
        }
    }
});


// content
tabs = {
    unlock: require('../tabs/user.unlock')
};


tabs.unlock.addListeners({
    show: function () {
        //page.$user.style.display = 'block';
        // todo: enable
        //page.$user.textContent = 'app.user.name';
    },
    logout: function () {
        //localStorage.removeItem('profileId');
        //location.reload();
        console.log('logout');
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
                //window.dataTags = data;
                TagManager.fill(data);

                page.emit('unlock');
            });
        }
    }
});


page.$node.appendChild(dom.fragment(
    tag('div', {className: page.name + '__header'}, 'FortNotes'),
    tag('div', {className: page.name + '__body'}, tabs.unlock.$node),
    tag('div', {className: page.name + '__footer'},
        tag('div', {className: page.name + '__links'},
            tag('a', {className: page.name + '__link', href: '#'}, 'About'), '\u2022',
            tag('a', {className: page.name + '__link', href: '#'}, 'Blog'), '\u2022',
            tag('a', {className: page.name + '__link', href: '#'}, 'Help'), '\u2022',
            tag('a', {className: page.name + '__link', href: '#'}, 'Terms')
        ),
        tag('div', {className: page.name + '__copyright'},
            _('© 2013-2018 FortNotes. All rights reserved.')
        )
    )
));


/*page.$node.appendChild(dom.fragment(
    tag('div', {className: 'page__header'}, 'FortNotes'),
    tag('div', {className: 'page__body'}, tabs.unlock.$node),
    tag('div', {className: 'page__footer'},
        tag('div', {className: 'page__links'},
            tag('a', {className: 'page__link', href: '#'}, 'About'), '\u2022',
            tag('a', {className: 'page__link', href: '#'}, 'Blog'), '\u2022',
            tag('a', {className: 'page__link', href: '#'}, 'Help'), '\u2022',
            tag('a', {className: 'page__link', href: '#'}, 'Terms')
        ),
        tag('div', {className: 'page__copyright'},
            _('© 2013-2018 FortNotes. All rights reserved.')
        )
    )
));*/


// public
module.exports = page;
