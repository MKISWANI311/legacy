/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var Tab    = require('spa-component-tab'),
    Button = require('spa-component-button'),
    tag    = require('spa-dom').tag,
    api    = require('../api'),
    NoteSearch = require('../note-search'),
    NoteViewer = require('../note-viewer'),
    NoteList   = require('../note-list'),
    TemplateList = require('../template-list'),
    templates    = require('../data.templates');


function MainNotes ( config ) {
    var self = this,
        user = config.model,
        columns, buttons, inputs, errors,
        noteSearch, noteList, noteViewer, templateList;

    // defaults
    config.modifiers = ['main-notes'];
    config.hidden = true;
    config.group = 'main';

    // parent constructor call
    Tab.call(this, config);


    // model events
    // user.addListeners({
    //     unlock: function ( error ) {
    //         if ( error ) {
    //             // todo
    //         }
    //     }
    // });

    noteSearch = new NoteSearch({
        model: user,
        events: {
            create: function () {
                columns.$main.classList.toggle('tab__column--active');
                columns.$side.classList.toggle('tab__column--active');
            },

            search: function ( value ) {
                var data = {
                    tinc: value.tinc || [],
                    texc: value.texc || [],
                    wcmd: value.wcmd || [],
                    all: false
                };

                console.log(value, data);

                api.post('note/search', data, function ( error, data ) {
                    if ( error ) {
                        console.error(error);
                    }

                    console.log('note search', data);

                    noteList.init({data: data.notes});
                });
            }
        }
    });

    noteList = new NoteList({
        data: [],
        model: user,
        events: {
            'click:item': function ( note ) {
                //console.log(note);
                templateList.hide();
                noteViewer.init({data: note});

                columns.$main.classList.toggle('tab__column--active');
                columns.$side.classList.toggle('tab__column--active');
                //NoteEditor.Load(note);
            }
        }
    });

    noteViewer = new NoteViewer({model: user});

    templateList = new TemplateList({
        data: templates,
        model: user,
        events: {
            'click:item': function ( template ) {
                this.hide();
                NoteEditor.Create(template);
            }
        }
    });


    columns = {
        $main: this.$node.appendChild(
            tag('div', {className: 'tab__column tab__column--main tab__column--active'},
                noteSearch.$node,
                noteList.$node
            )
        ),

        $side: this.$node.appendChild(
            tag('div', {className: 'tab__column tab__column--side'},
                templateList.$node,
                noteViewer.$node
            )
        )
    };
}


// inheritance
MainNotes.prototype = Object.create(Tab.prototype);
MainNotes.prototype.constructor = MainNotes;


// public
module.exports = MainNotes;
