/**
 * Main application entry point.
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var app      = require('spa-app'),
    gettext  = require('spa-gettext'),
    api      = require('./api'),
    //crypto   = require('./crypto'),
    User     = require('./models/user'),
    MainView = require('./views/main'),
    UserView = require('./views/user');


// setup environment
app.language = localStorage.getItem('language') || 'en';


// load localization
gettext.load({name: app.language}, function () {
    var user     = new User(),
        mainView = new MainView({model: user}),
        userView = new UserView({model: user});

    user.init();
    app.user = user;

    user.addListeners({
        session: function () {
            // open page anyway
            userView.show();
        },
        unlock: function ( error ) {
            if ( !error ) {
                // clear
                userView.remove();
                // navigate
                mainView.show();
            }
        }
    });

    // add to DOM
    document.body.appendChild(mainView.$node);
    document.body.appendChild(userView.$node);

    /*var pageUser = require('./pages/user');

    pageUser.addListeners({
        unlock: function ( tags ) {
            var pageMain = require('./pages/main');

            document.body.appendChild(pageMain.$node);
            pageMain.show(tags);
            pageUser.remove();
        }
    });

    // add to DOM
    document.body.appendChild(pageUser.$node);

    api.get('user/info', function ( error, data ) {
        if ( error ) {
            console.error(error);
        }

        console.log('user info', data);

        app.user = data;

        if ( data ) {
            // apply current pass hash
            crypto.setPassHash(data.hash);
        }

        pageUser.show();
    });/**/
});




function noop () {
    var gettext = require('spa-gettext'),
        app     = require('./app'),
        sjcl    = require('./sjcl.min'),
        //dialogs = require('./app.dialogs'),
        //NoteFilter   = require('./app.note.filter'),
        //NoteList     = require('./note.list'),
        NoteSearch   = require('./note-search'),
        NoteList     = require('./note-list'),
        TemplateList = require('./template-list'),
        //NoteEditor   = require('./app.note.editor'),
        TagManager   = require('./models/tag-manager'),
        templates    = require('./data.templates'),
        collectTimer;


    require('./note.filter');
    require('./note.editor');
    require('./tools');
    require('./dialogs');

//require('./jquery');
//window.$ = require('jquery');
//require('./_jquery-1.9.1.min');
//require('./_jquery.simplemodal.1.4.4.min');

    window.SignOut = function SignOut () {
        api.post('user/logout', null, function ( error, data ) {
            if ( error ) {
                console.error(error);
                return;
            }

            // true or false
            console.log('logout', data);

            location.reload();
        });
    };


    window.initData = function initData ( data, callback ) {
        var $panelRight = document.getElementById('panelRight');
        var $panelLeft  = document.getElementById('panelLeft');

        console.log('window.initData');

        window.dataUser = data;

        api.get('user/tags', function ( error, data ) {
            var notes, search;

            if ( error ) {
                console.error(error);
                callback();

                return;
            }

            console.log('user tags', data);

            //window.dataEntryTypes = data.entry_types;
            //window.dataTemplates = data.templates;
            //window.dataTemplateEntries = data.template_entries;

            // compacted list of all encoded tags with links and use counters
            //window.dataTags = data;
            // need to correct type if empty
            // if ( !window.dataTags.data.length ) {
            //     window.dataTags.data = {};
            //     window.dataTags.defn = {name:0, links:1, uses:2};
            // }

            // main components initialization
            //NoteFilter.Init({handle: document.querySelector('div.notefilter')});
            //NoteList.Init({handle: document.querySelector('div.notelist')});
            //TemplateList.Init({handle: document.querySelector('div.template-list')});
            NoteEditor.Init({handle: document.querySelector('div.noteeditor')});

            // to receive password change events
            app.subscribe(TagManager);
            //app.subscribe(TemplateList);
            //app.subscribe(NoteList);
            //app.subscribe(NoteFilter);
            app.subscribe(NoteEditor);


            notes = new NoteList({
                data: [],
                events: {
                    'click:item': function ( note ) {
                        console.log(note);
                        window.templateList.hide();
                        NoteEditor.Load(note);
                    }
                }
            });

            $panelLeft.insertBefore(notes.$node, $panelLeft.firstChild);

            search = new NoteSearch({
                events: {
                    search: function ( value ) {
                        var data = {
                            tinc: value.tinc,
                            texc: value.texc,
                            wcmd: value.wcmd,
                            all: false
                        };

                        console.log(value, data);

                        api.post('note/search', data, function ( error, data ) {
                            if ( error ) {
                                console.error(error);
                            }

                            console.log('note search', data);

                            notes.init({data: data.notes});
                        });
                    }
                }
            });

            $panelLeft.insertBefore(search.$node, $panelLeft.firstChild);

            window.templateList = new TemplateList({
                data: templates,
                events: {
                    'click:item': function ( template ) {
                        this.hide();
                        NoteEditor.Create(template);
                    }
                }
            });

            $panelRight.appendChild(window.templateList.$node);


            // show
            //window.pageMain.style.display = 'block';

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

    document.body.removeChild(window.pageInit);
    document.body.removeChild(window.pageMain);


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
            //return;
        }

        console.log('user info', data);

        if ( data ) {
            window.dataUser = data;

            // apply current pass hash
            app.setPassHash(data.hash);
            // ask for a pass
            DlgPassGet.Show({escClose: false});
        } else {
            //window.pageInit.style.display = 'block';
        }
    });
}
