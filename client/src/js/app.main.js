/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var App     = require('./app'),
    sjcl    = require('./sjcl.min'),
    api     = require('./api'),
    //dialogs = require('./app.dialogs'),
    //NoteFilter   = require('./app.note.filter'),
    NoteList     = require('./app.note.list'),
    TemplateList = require('./app.template.list'),
    //NoteEditor   = require('./app.note.editor'),
    TagManager   = require('./app.tag.manager'),
    collectTimer;


require('./app.note.filter');
require('./app.note.editor');
require('./app.tools');
require('./app.dialogs');

//require('./jquery');
//window.$ = require('jquery');
//require('./_jquery-1.9.1.min');
//require('./_jquery.simplemodal.1.4.4.min');

window.SignOut = function SignOut () {
    api.post('user/signout', null, function ( error, data ) {
        if ( error ) {
            console.error(error);
            return;
        }

        // true or false
        console.log('signout', data);

        location.reload();
    });
};


window.initData = function initData ( data, callback ) {
    window.dataUser = data;

    api.get('user/data', function ( error, data ) {
        if ( error ) {
            console.error(error);
            callback();

            return;
        }

        window.dataEntryTypes = data.entry_types;
        window.dataTemplates = data.templates;
        window.dataTemplateEntries = data.template_entries;

        // compacted list of all encoded tags with links and use counters
        window.dataTags = data.tags;
        // need to correct type if empty
        // if ( !window.dataTags.data.length ) {
        //     window.dataTags.data = {};
        //     window.dataTags.defn = {name:0, links:1, uses:2};
        // }
        // decoded to these two lists
        window.dataTagsNmlist = {}; // {note:1, site:2, email:3}
        window.dataTagsIdlist = {}; // {1:note, 2:site, 3:email}
        // they are filling on page loading and on note creation
        // if there are some new tags

        // main components initialization
        NoteFilter.Init({handle: document.querySelector('div.notefilter')});
        NoteList.Init({handle: document.querySelector('div.notelist')});
        TemplateList.Init({handle: document.querySelector('div.templatelist')});
        NoteEditor.Init({handle: document.querySelector('div.noteeditor')});

        // to receive password change events
        App.Subscribe(TagManager);
        App.Subscribe(TemplateList);
        App.Subscribe(NoteList);
        App.Subscribe(NoteFilter);
        App.Subscribe(NoteEditor);

        // show
        window.pageMain.style.display = 'block';

        callback();
    });
};


// contains encrypted data for export
// if not null an export window appears
window.exportData = null;

// list of tag names with title images
window.iconTags = ['email', 'ftp', 'ssh', 'icq', 'note', 'site', 'skype', 'jabber', 'msn', 'database'];

window.pageInit = document.getElementById('pageInit');
window.pageMain = document.getElementById('pageMain');


// start entropy collection
sjcl.random.startCollectors();
// check each 5 sec if has enough
collectTimer = setInterval(function () {
    if ( sjcl.random.isReady() ) {
        console.log('entropy collected');
        // has enough
        sjcl.random.stopCollectors();
        // stop checking
        clearInterval(collectTimer);
    }
}, 1000);


api.get('user/info', function ( error, data ) {
    if ( error ) {
        console.error(error);

        return;
    }

    console.log('user info', data);

    if ( data ) {
        window.dataUser = data;

        // apply current pass hash
        App.SetPassHash(data.hash);
        // ask for a pass
        DlgPassGet.Show({escClose: false});
    } else {
        window.pageInit.style.display = 'block';
    }
});
