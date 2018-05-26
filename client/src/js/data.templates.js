/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var list = [
    {
        name: 'note',
        description: 'simple note with title and text',
        entries: [
            {id: 1, name: 'title'},
            {id: 6, name: 'description'}
        ]
    },
    {
        name: 'site',
        description: 'regular site bookmark',
        entries: [
            {id: 2, name: 'site url'},
            {id: 5, name: 'email'},
            {id: 4, name: 'password'},
            {id: 6, name: 'comments'}
        ]
    },
    {
        name: 'email',
        description: 'email address record',
        entries: [
            {id: 2, name: 'site url'},
            {id: 5, name: 'email'},
            {id: 4, name: 'password'},
            {id: 6, name: 'comments'}
        ]
    },
    {
        name: 'messenger',
        description: 'instant messenger account information',
        entries: [
            {id: 2, name: 'site url'},
            {id: 5, name: 'email'},
            {id: 3, name: 'username'},
            {id: 4, name: 'password'},
            {id: 1, name: 'phone'},
            {id: 6, name: 'comments'}
        ]
    },
    {
        name: 'ftp',
        description: 'ftp server data',
        entries: [
            {id: 2, name: 'server address'},
            {id: 3, name: 'username'},
            {id: 4, name: 'password'},
            {id: 6, name: 'comments'}
        ]
    },
    {
        name: 'ssh',
        description: 'ssh server data',
        entries: [
            {id: 2, name: 'server address'},
            {id: 3, name: 'username'},
            {id: 4, name: 'password'},
            {id: 6, name: 'comments'}
        ]
    },
    {
        name: 'database',
        description: 'database access parameters',
        entries: [
            {id: 2, name: 'server address'},
            {id: 1, name: 'database name'},
            {id: 3, name: 'username'},
            {id: 4, name: 'password'},
            {id: 6, name: 'comments'}
        ]
    }
];


// public
module.exports = list;
