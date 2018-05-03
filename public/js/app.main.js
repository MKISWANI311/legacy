// reference and dictionary data
//var data_entry_types      = <?php //echo cache::db_entry_types() ?>;
//var data_templates        = <?php //echo cache::db_templates() ?>;
//var data_template_entries = <?php //echo cache::db_template_entries() ?>;

// compacted list of all encoded tags with links and use counters
//var data_tags = <?php //echo cache::db_tags() ?>;
// need to correct type if empty
//if ( data_tags.data.length != undefined && data_tags.data.length == 0 )
//	{ data_tags.data = {}; data_tags.defn = {name:0, links:1, uses:2}; }
// decoded to these two lists
//var data_tags_nmlist = {}; // {note:1, site:2, email:3}
//var data_tags_idlist = {}; // {1:note, 2:site, 3:email}
// they are filling on page loading and on note creation
// if there are some new tags

// contains encrypted data for export
// if not null an export window appears
var export_data = null;

// list of tag names with title images
var icon_tags = ['email', 'ftp', 'ssh', 'icq', 'note', 'site', 'skype', 'jabber', 'msn', 'database'];

var pageInit = document.getElementById('pageInit');
var pageMain = document.getElementById('pageMain');

//App.SetPassHash(<?php //echo !empty($_SESSION['user']['hash']) ? "'{$_SESSION['user']['hash']}'" : 'null' ?>);

// logoff
function SignOut () {
    $.modal('<div><h1>Logged off</h1></div>');
    $.post('/user/signout', function(){
        location.reload();
    });
}

// menu item handler
function MenuItemClick ( item ) {
    $('div#menu_items .menu-item').each(function(index, it) {
        if ( !item || it.id != item.id ) {
            $('a', it).css('font-weight', 'normal');
            $(it).css('background-color', '#F9F9F9');
            $(it).css('border-bottom', '1px solid #eee');
            $('div#' + it.id + '_body').hide();
        }
    });
    if ( item ) {
        $(item).css('font-weight', 'bold');
        $(item.parentNode).css('background-color', 'white');
        $(item.parentNode).css('border-bottom', '1px solid white');
        $('div#' + item.parentNode.id + '_body').show();
    }
}

// function AddNoteDialogShow () {
//     $("#dlg_pass_set").modal();
// }

// function CacheClear ( param ) {
//     $.post('/front/clear/' + param, function(){});
// }

function initData ( data, callback ) {
    window.data_user = data;

    $.get('user/data', function(data) {
        window.data_entry_types = data.entry_types;
        window.data_templates = data.templates;
        window.data_template_entries = data.template_entries;

        // compacted list of all encoded tags with links and use counters
        window.data_tags = data.tags;
        // need to correct type if empty
        // if ( !data_tags.data.length ) {
        //     data_tags.data = {};
        //     data_tags.defn = {name:0, links:1, uses:2};
        // }
        // decoded to these two lists
        window.data_tags_nmlist = {}; // {note:1, site:2, email:3}
        window.data_tags_idlist = {}; // {1:note, 2:site, 3:email}
        // they are filling on page loading and on note creation
        // if there are some new tags

        //window.data_user = data.user || {};
        //if ( data_user.id ) {


            // if ( !App.HasPass() ) {
            //     // ask pass
            //     DlgPassGet.Show({escClose:false});
            // }

            //App.SetPassHash(data_user.hash);

            // main components initialization
        NoteFilter.Init({handle:document.querySelector('div.notefilter')});
        NoteList.Init({handle:document.querySelector('div.notelist')});
        TemplateList.Init({handle:document.querySelector('div.templatelist')});
        NoteEditor.Init({handle:document.querySelector('div.noteeditor')});

        // to receive password change events
        App.Subscribe(TagManager);
        App.Subscribe(TemplateList);
        App.Subscribe(NoteList);
        App.Subscribe(NoteFilter);
        App.Subscribe(NoteEditor);

        // TagManager.EventOpen();
        // TemplateList.EventOpen();
        // NoteList.EventOpen();
        // NoteFilter.EventOpen();
        // NoteEditor.EventOpen();
        // } else {
        //     // ???
        //     //App.SetPassHash(null);
        //
        // }

        //$.modal.defaults.opacity = 20;

        // set menu to home
        MenuItemClick($('div#menu_item_home a')[0]);

        // show
        pageMain.style.display = 'block';

        callback();
    });
}


// start entropy collection
sjcl.random.startCollectors();
// check each 5 sec if has enough
var collect_timer = setInterval(function(){
    if ( sjcl.random.isReady() ) {
        console.log('entropy collected');
        // has enough
        sjcl.random.stopCollectors();
        // stop checking
        clearInterval(collect_timer);
    }
}, 5000);


$.get('user/info', function ( data ) {
    console.log('user info', data);

    if ( data ) {
        window.data_user = data;

        // apply current pass hash
        App.SetPassHash(data.hash);
        // ask for a pass
        DlgPassGet.Show({escClose:false});
    } else {
        pageInit.style.display = 'block';
    }
});
