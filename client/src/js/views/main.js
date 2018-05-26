/**
 * User login and registration.
 */

'use strict';

var Page   = require('spa-component-page'),
    dom    = require('spa-dom'),
    api    = require('../api'),
    MainNotes = require('./main-notes'),
    tag    = dom.tag,
    page, tabs, images;


function Main ( config ) {
    //var self = this;
    var user = config.model,
        tabs;

    // defaults
    config.modifiers = ['main'];
    config.hidden = true;

    // parent constructor call
    Page.call(this, config);

    tabs = {
        notes: new MainNotes({model: user})
    };

    // model events
    user.addListeners({
        unlock: function ( error ) {
            if ( !error ) {
                user.tags.init();
            }
        }
    });

    user.tags.addListeners({
        data: function ( error ) {
            if ( !error ) {
                console.log('has tags');
                tabs.notes.show();
            }
        }
    });

    this.$node.appendChild(dom.fragment(
        tag('div', {className: this.name + '__header'},
            tag('img', {className: this.name + '__icon', src: 'img/safebox.svg'}),
            'FortNotes'
        ),
        tag('div', {className: this.name + '__body'},
            //require('../tabs/main.home').$node
            tabs.notes.$node
        ),
        tag('div', {className: this.name + '__footer'},
            tag('div', {className: this.name + '__copyright'},
                _('© 2013-2018 FortNotes. All rights reserved.')
            )
        )
    ));
}


// inheritance
Main.prototype = Object.create(Page.prototype);
Main.prototype.constructor = Main;


// public
module.exports = Main;
