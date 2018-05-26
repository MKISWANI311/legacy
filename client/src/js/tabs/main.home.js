/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var Tab       = require('spa-component-tab'),
    //List      = require('spa-component-list'),
    //Button    = require('spa-component-button'),
    //app       = require('spa-app'),
    //Note      = require('./../lib/note'),
    tag        = require('spa-dom').tag,
    api        = require('../api'),
    NoteSearch = require('../note-search'),
    NoteViewer = require('../note-viewer'),
    NoteList   = require('../note-list'),
    TemplateList = require('../template-list'),
    templates    = require('../data.templates'),
    //encoding  = require('../lib/encoding'),
    //buf2b64   = encoding.bufferToBase64,
    //blockName = 'user-unlock',
    tab, noteSearch, noteList, noteViewer, templateList;
    //, unlockUser, buttonSwitch, buttonUnlock;


tab = new Tab({
    modifiers: ['home'],
    //hidden: true,
    group: 'main',
    events: {
        show: function () {
            noteSearch.emit('search', {});
            //tab.tabs.notes.show();
            /*var transaction = app.db.transaction(['notes']),
                notes       = transaction.objectStore('notes'),
                index       = notes.index('userId'),
                notesData   = [];

            index.openCursor(IDBKeyRange.only(app.userId)).onsuccess = function ( event ) {
                var cursor = event.target.result;

                if ( cursor ) {
                    // cursor.key is a name, like "Bill", and cursor.value is the whole object.
                    //alert("Name: " + cursor.key + ", SSN: " + cursor.value.ssn + ", email: " + cursor.value.email);
                    console.log(cursor.value);
                    notesData.push(cursor.value);
                    cursor.continue();
                } else {
                    console.log('all notes are collected');
                    //console.log(notesData);
                    tab.list.init({data: notesData});
                }
            };*/
        }
    }
});


// content
/*tab.tabs = {
    tags:  require('../tabs/main.home.tags'),
    notes: require('../tabs/main.home.notes'),
    note:  require('../tabs/main.home.note')
};*/


noteSearch = new NoteSearch({
    events: {
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
    events: {
        'click:item': function ( note ) {
            //console.log(note);
            templateList.hide();
            noteViewer.init({data: note});
            //NoteEditor.Load(note);
        }
    }
});

noteViewer = new NoteViewer({});

templateList = new TemplateList({
    data: templates,
    events: {
        'click:item': function ( template ) {
            this.hide();
            NoteEditor.Create(template);
        }
    }
});


// body with tabs
//tab.$node.appendChild(tag('div', {className: 'tab__column tab__column--tags'}, 'tags'));
tab.$notes = tab.$node.appendChild(
    tag('div', {className: 'tab__column tab__column--notes tab__column--active'},
        noteSearch.$node,
        noteList.$node
    )
);

tab.$note = tab.$node.appendChild(
    tag('div', {className: 'tab__column tab__column--note'},
        templateList.$node,
        noteViewer.$node
    )
);


// tab.$node.appendChild(tab.tabs.tags.$node);
// tab.$node.appendChild(tab.tabs.notes.$node);
// tab.$node.appendChild(tab.tabs.note.$node);


/*tab.list = new List({
    name: 'notes',
    data: [],
    render: function ( $item, record ) {
        app.crypto.decrypt(JSON.parse(record.data), function ( error, data ) {
            data = JSON.parse(data);
            $item.textContent = record.id + ':' + data.ctime;
            console.log(error, data);
        });
    },
    events: {
        click: function ( event ) {
            //console.log('click');
            //event.preventDefault();
        },
        'click:item': function ( data, event ) {
            //console.log('click:item');
            //event.preventDefault();
            //data.tab.show();
        },
        focus: function ( event ) {
            //console.log('focus');
        },
        'focus:item': function ( data, event ) {
            //console.log('focus:item');
            //console.log(event);
            //console.log(data);

            app.crypto.decrypt(JSON.parse(data.data), function ( error, data ) {
                // var buttonEdit = new Button({
                //     //$node: window.pmBtnNoteEdit,
                //     value: 'Edit',
                //     //icon: 'button-back',
                //     events: {
                //         click: function () {
                //             console.log(JSON.parse(data));
                //             window.pmNote.innerHTML = '';
                //             page.add(new Note({
                //                 $node: window.pmNote,
                //                 data: JSON.parse(data),
                //                 edit: true
                //             }));
                //         }
                //     }
                // });

                console.log(error, JSON.parse(data));

                var note = new Note({
                    //$node: window.pmNote,
                    data: JSON.parse(data)
                });

                tab.$node.appendChild(note.$node);
            });
        }
    }
});*/


// tab.$node.appendChild(tab.list.$node);


/*app.addNote = function () {
    var data = {
        ctime: Date.now(),
        blocks: [
            {
                //type: 1,
                type: 'line',
                name: 'time',
                value: Date.now()
            },
            {
                //type: 1,
                type: 'phone',
                name: 'phone',
                value: '+38 (097) 395-15-50'
            },
            {
                //type: 1,
                type: 'login',
                name: 'username',
                value: 'DarkPark'
            },
            {
                //type: 2,
                type: 'uri',
                name: 'address',
                value: 'https://mail.google.com/'
            },
            {
                //type: 3,
                type: 'email',
                name: 'email',
                value: 'darkpark.mobile@gmail.com',
                secret: true
            },
            {
                //type: 4,
                type: 'password',
                name: 'password',
                value: 'some password'
            },
            {
                //type: 4,
                type: 'text',
                name: 'text',
                value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            },
            {
                //type: 4,
                type: 'image',
                name: 'screenshot',
                value: 'https://www.thumboo.com/demo/image.html?id=dGh1bWJfaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmdfMV9kZXNrdG9wXzBfZnVsbA%3D%3D&size=128x128&force=0'
            }
        ]
    };

    app.crypto.encrypt(JSON.stringify(data), function ( error, enc ) {
        //console.log(error, enc);

        //app.db.transaction('data', 'readwrite').objectStore('data').add(enc).onsuccess = function ( event ) {
        //    console.log(null, event.target.result);

        app.db.transaction('notes', 'readwrite').objectStore('notes').add({
            userId: app.userId,
            //dataId: event.target.result
            data: JSON.stringify(enc)
        }).onsuccess = function ( event ) {
            console.log(null, event.target.result);
        };
        //};

        app.crypto.decrypt(enc, function ( error, data ) {
            console.log(error, JSON.parse(data));
        });
    });

};*/


// public
module.exports = tab;
