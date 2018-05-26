/**
 * List of note templates
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var //crypto = require('./crypto'),
    tag = require('spa-dom').tag,
    List = require('spa-component-list');
    //Component = require('spa-component'),
    //TagManager = require('./models/tag-manager');


function NoteList ( config ) {
    config.modifiers = ['note-list'];

    // parent constructor call
    List.call(this, config);

    this.user = config.model;

    // this.$title = this.$node.appendChild(
    //     tag('div', {className: this.name + '__title'}, 'NoteList')
    // );
    //
    // this.$items = this.$node.appendChild(
    //     tag('div', {className: this.name + '__items'})
    // );
}


// inheritance
NoteList.prototype = Object.create(List.prototype);
NoteList.prototype.constructor = NoteList;

// set component name
//NoteList.prototype.name = 'note-list';


NoteList.prototype.render = function ( $item, note ) {
    var self     = this,
        $check   = tag('img', {className: self.name + '__check', src: 'https://image.flaticon.com/icons/svg/25/25235.svg'}),
        $icon    = tag('img', {className: self.name + '__icon', src: 'https://image.flaticon.com/icons/svg/137/137132.svg'}),
        $entries = tag('div', {className: this.name + '__entries'}),
        $tags    = tag('div', {className: this.name + '__tags'}),
        $body    = tag('div', {className: self.name + '__body'}, $entries, $tags),
        firstUrl, $firstUrlImage;

    //console.log('note', note);

    // iterate all note entries
    note.entries.forEach(function ( entry ) {
        var plain = {
                name: self.user.crypto.decrypt(entry.name),
                data: self.user.crypto.decrypt(entry.data)
            },
            $entryData;

        // store for viewer/editor
        entry.plain = plain;

        // there is data and it's not a password
        if ( entry.id_type !== 4 && plain.name && plain.data ) {
            // url
            if ( entry.id_type === 2 ) {
                $entryData = tag('a', {target: '_blank', href: plain.data}, plain.data);

                // store the first available url for icon
                if ( !firstUrl ) {
                    firstUrl = plain.data;
                }
            }

            // email
            if ( entry.id_type === 5 ) {
                $entryData = tag('a', {href: 'mailto:' + plain.data}, plain.data);
            }

            $entries.appendChild(tag('div', {className: self.name + '__entry'},
                tag('div', {className: self.name + '__name'}, plain.name + ':'),
                tag('div', {className: self.name + '__data'}, $entryData ? $entryData : plain.data)
            ));
        }
    });

    // has valid url (the first one)
    if ( firstUrl ) {
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
    }

    this.user.tags.ids2names(note.tags).forEach(function ( tag ) {
        var $tag = document.createElement('div');

        $tag.className = self.name + '__tag';
        $tag.textContent = tag;

        $tags.appendChild($tag);
    });

    // use template for a new note creation
    $item.addEventListener('click', function () {
        //self.emit('create', note);
    });

    $check.addEventListener('click', function () {
        $check.src = 'https://image.flaticon.com/icons/svg/25/25643.svg';
    });

    $item.appendChild($check);
    $item.appendChild($icon);
    $item.appendChild($body);
    // $item.appendChild($entries);
    // $item.appendChild($tags);
};


/*NoteList.prototype.fill = function ( data ) {
    var self = this,
        $fragment = document.createDocumentFragment();

    // clear items
    while ( this.$items.lastChild ) {
        this.$items.removeChild(this.$items.lastChild);
    }

    // iterate all templates
    data.notes.forEach(function ( note ) {
        var $entries = tag('div', {className: self.name + '__item-entries'}),
            $tags    = tag('div', {className: self.name + '__item-tags'}),
            $item    = tag('div', {className: self.name + '__item'}, $entries, $tags),
            firstUrl, $firstUrlImage;

        console.log('note', note);

        // iterate all note entries
        note.entries.forEach(function ( entry ) {
            var entryName = crypto.decrypt(entry.name),
                entryData = crypto.decrypt(entry.data),
                $entryData;

            // there is data and it's not a password
            if ( entry.id_type !== 4 && entryName && entryData ) {
                // url
                if ( entry.id_type === 2 ) {
                    $entryData = tag('a', {target: '_blank', href: entryData}, entryData);

                    // store the first available url for icon
                    if ( !firstUrl ) {
                        firstUrl = entryData;
                    }
                }

                // email
                if ( entry.id_type === 5 ) {
                    $entryData = tag('a', {href: 'mailto:' + entryData}, entryData);
                }

                $entries.appendChild(tag('div', {className: self.name + '__item-entry'},
                    tag('div', {className: self.name + '__item-name'}, entryName + ':'),
                    tag('div', {className: self.name + '__item-data'}, $entryData ? $entryData : entryData)
                ));
            }
        });

        // has valid url (the first one)
        if ( firstUrl ) {
            console.log('firstUrl raw', firstUrl);
            // get rid of all unnecessary parts
            firstUrl = firstUrl.split('/');
            // schema can be missing
            firstUrl = firstUrl.length === 1 ? firstUrl[0] : firstUrl[2];
            console.log('firstUrl', firstUrl);

            // try to get favicon
            $firstUrlImage = new Image();
            $firstUrlImage.src = 'https://favicons.githubusercontent.com/' + firstUrl;
            $firstUrlImage.onload = function () {
                $item.style.backgroundImage = 'url(' + $firstUrlImage.src + ')';
            };
        }

        TagManager.ids2names(note.tags).forEach(function ( tag ) {
            var $tag = document.createElement('div');

            $tag.className = self.name + '__item-tag';
            $tag.textContent = tag;

            $tags.appendChild($tag);
        });

        // use template for a new note creation
        $item.addEventListener('click', function () {
            self.hide();
            self.emit('create', note);
        });

        $fragment.appendChild($item);
    });

    this.$items.appendChild($fragment);
};*/


// public
module.exports = NoteList;
