/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var defaults = {
    server: localStorage.getItem('server') || 'https://api.fortnotes.com/',
    //server: (localStorage.getItem('server') || 'https://api.fortnotes.com/') + 'v1/',
    mode: 'cors',
    credentials: 'include',
    headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    }
};


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


// public
module.exports = {
    defaults: defaults,

    get: function ( uri, callback ) {
        fetch(defaults.server + uri, defaults)
            .then(status)
            .then(json)
            .then(function ( data ) {
                callback(null, data);
            })
            .catch(callback);
    },

    post: function ( uri, data, callback ) {
        fetch(defaults.server + uri, Object.assign({}, defaults, {method: 'post', body: JSON.stringify(data)}))
            .then(status)
            .then(json)
            .then(function ( data ) {
                callback(null, data);
            })
            .catch(callback);
    },

    postForm: function ( uri, data, callback ) {
        var config = Object.assign({}, defaults, {
            method: 'post', body: data, headers: {
                Accept: 'application/json'
            }
        });

        fetch(defaults.server + uri, config)
            .then(status)
            .then(json)
            .then(function ( data ) {
                callback(null, data);
            })
            .catch(callback);
    }
};
