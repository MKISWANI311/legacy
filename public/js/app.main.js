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


function status ( response ) {
    if ( response.status >= 200 && response.status < 300 ) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function json ( response ) {
    return response.json();
}

var api = {
    defaults: {
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    },

    get: function ( uri, callback ) {
        fetch(uri, api.defaults)
            .then(status)
            .then(json)
            .then(function ( data ) {
                callback(null, data);
            })
            .catch(callback);
    },

    post: function ( uri, data, callback ) {
        fetch(uri, Object.assign({}, api.defaults, {method: 'post', body: JSON.stringify(data)}))
            .then(status)
            .then(json)
            .then(function ( data ) {
                callback(null, data);
            })
            .catch(callback);
    },

    postForm: function ( uri, data, callback ) {
        var config = Object.assign({}, api.defaults, {method: 'post', body: data, headers: {
                'Accept': 'application/json'
            }});

        fetch(uri, config)
            .then(status)
            .then(json)
            .then(function ( data ) {
                callback(null, data);
            })
            .catch(callback);
    }
};


// logoff
function SignOut () {
    api.post('user/signout', null, function ( error, data ) {
        if ( error ) {
            console.error(error);
            return;
        }

        // true or false
        console.log('signout', data);

        location.reload();
    });
}


function initData ( data, callback ) {
    window.data_user = data;

    api.get('user/data', function ( error, data ) {
        if ( error ) {
            console.error(error);
            callback();
            return;
        }

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


api.get('user/info', function ( error, data ) {
    if ( error ) {
        console.error(error);
        return;
    }

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
