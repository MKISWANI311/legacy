/**
 * List of note templates
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var dom = require('spa-dom'),
    Component = require('spa-component'),
    Button = require('spa-component-button');
    //TagManager = require('./models/tag-manager');


function NoteSearch ( config ) {
    var self = this,
        user = config.model,
        buttons;

    // parent constructor call
    Component.call(this, config);

    buttons = {
        create: new Button({
            value: 'Create',
            events: {
                click: function () {
                    self.emit('create');
                }
            }
        })
    };


    /*this.$node.appendChild(
        this.$title = dom.tag('div', {className: this.name + '__title'}, 'NoteSearch')
    );

    this.$node.appendChild(
        this.$items = dom.tag('div', {className: this.name + '__items'})
    );*/

    //this.fill(config.data);

    this.$node.appendChild(dom.fragment(
        //buttons.create.$node,
        this.$input = dom.tag('input', {className: this.name + '__input', autofocus: true, value: '-icq site :month'})
    ));

    this.$input.addEventListener('keydown', function ( event ) {
        if ( event.keyCode === 13 ) {
            self.emit('search', user.tags.strParse(self.$input.value));
        }
    });
}


// inheritance
NoteSearch.prototype = Object.create(Component.prototype);
NoteSearch.prototype.constructor = NoteSearch;

// set component name
NoteSearch.prototype.name = 'note-search';


// public
module.exports = NoteSearch;
