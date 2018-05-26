/**
 * List of note templates
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var //crypto = require('./crypto'),
    tag = require('spa-dom').tag,
    //List = require('spa-component-list'),
    Component = require('spa-component'),
    //TagManager = require('./models/tag-manager'),
    NoteEditor = require('./note-editor'),
    entryTypes = require('./data.entry.types').hash;


function NoteViewer ( config ) {
    config.modifiers = ['viewer'];

    // parent constructor call
    Component.call(this, config);

    this.user = config.model;

    // this.$title = this.$node.appendChild(
    //     tag('div', {className: this.name + '__title'}, 'NoteViewer')
    // );
    //
    // this.$items = this.$node.appendChild(
    //     tag('div', {className: this.name + '__items'})
    // );

    config.data && this.init(config);

    // this.addListener('click', function () {
    //     console.log(config.data);
    //     NoteEditor.Load(note);
    // });
}


// inheritance
NoteViewer.prototype = Object.create(Component.prototype);
NoteViewer.prototype.constructor = NoteViewer;

// set component name
NoteViewer.prototype.name = 'note';


NoteViewer.prototype.init = function ( config ) {
    var self = this,
        note = config.data,
        $node = this.$node,
        $entries = tag('div', {className: this.name + '__entries'}),
        $tags    = tag('div', {className: this.name + '__tags'});
        // $body    = tag('div', {className: self.name + '__item-body'}, $entries, $tags),
        //firstUrl, $firstUrlImage;

    // clear container
    while ( $node.lastChild ) {
        $node.removeChild($node.lastChild);
    }

    //console.log('note', note);

    // iterate all note entries
    note.entries.forEach(function ( entry ) {
        var plain = entry.plain,
            $entryData;

        // there is data and it's not a password
        //if ( plain.name && plain.data ) {
        // url
        if ( entry.id_type === 2 ) {
            $entryData = tag('a', {target: '_blank', href: plain.data}, plain.data);

            // store the first available url for icon
            // if ( !firstUrl ) {
            //     firstUrl = plain.data;
            // }
        }

        // email
        if ( entry.id_type === 5 ) {
            $entryData = tag('a', {href: 'mailto:' + plain.data}, plain.data);
        }

        $entries.appendChild(tag('div', {className: self.name + '__entry'},
            tag('img', {className: self.name + '__icon', src: entryTypes[entry.id_type].icon}),
            tag('div', {className: self.name + '__body'},
                tag('div', {className: self.name + '__name'}, plain.name),
                tag('div', {className: self.name + '__data'}, $entryData ? $entryData : plain.data)
            )
        ));
        //}
    });

    // has valid url (the first one)
    /*if ( firstUrl ) {
        //console.log('firstUrl raw', firstUrl);
        // get rid of all unnecessary parts
        firstUrl = firstUrl.split('/');
        // schema can be missing
        firstUrl = firstUrl.length === 1 ? firstUrl[0] : firstUrl[2];
        //console.log('firstUrl', firstUrl);

        // try to get favicon
        $firstUrlImage = new Image();
        $firstUrlImage.src = 'https://favicons.githubusercontent.com/' + firstUrl;
        $firstUrlImage.onload = function () {
            //$item.style.backgroundImage = 'url(' + $firstUrlImage.src + ')';
            $icon.src = $firstUrlImage.src;
        };
    }*/

    this.user.tags.ids2names(note.tags).forEach(function ( tag ) {
        var $tag = document.createElement('div');

        $tag.className = self.name + '__tag';
        $tag.textContent = tag;

        $tags.appendChild($tag);
    });

    // use template for a new note creation
    this.$node.addEventListener('click', function () {
        var noteEditor = new NoteEditor({model: self.user, data: note});

        //self.emit('create', note);
        console.log(note);
        noteEditor.Init({});
        noteEditor.Load(note);

        self.$node.appendChild(noteEditor.$node);
    });

    //$item.appendChild($icon);
    //$item.appendChild($body);
    this.$node.appendChild($entries);
    this.$node.appendChild($tags);
};


// public
module.exports = NoteViewer;
