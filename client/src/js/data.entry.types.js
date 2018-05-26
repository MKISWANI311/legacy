/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var list = [
        {
            id: 1,
            max: 1024,
            name: 'line',
            icon: 'https://image.flaticon.com/icons/svg/23/23187.svg',
            description: 'title or short one line text description'
        },
        {
            id: 2,
            max: 2048,
            name: 'uri',
            icon: 'https://image.flaticon.com/icons/svg/117/117965.svg',
            description: 'any addresses - http/https/ftp/ssh or file path'},
        {
            id: 3,
            max: 1024,
            name: 'login',
            icon: 'https://image.flaticon.com/icons/svg/149/149452.svg',
            description: 'user name, login or email in some cases'
        },
        {
            id: 4,
            max: 4096,
            name: 'password',
            icon: 'https://image.flaticon.com/icons/svg/263/263069.svg',
            description: 'any secret letters sequence'
        },
        {
            id: 5,
            max: 1024,
            name: 'email',
            icon: 'https://image.flaticon.com/icons/svg/60/60381.svg',
            description: 'email address line'
        },
        {
            id: 6,
            max: 65535,
            name: 'text',
            icon: 'https://image.flaticon.com/icons/svg/140/140952.svg',
            description: 'plain text entry for notes'
        },
        {
            id: 7,
            max: 65535,
            name: 'html',
            icon: 'https://image.flaticon.com/icons/svg/25/25252.svg',
            description: 'formatted text entry for notes'
        }
    ],
    hash = {};


list.forEach(function ( type ) {
    hash[type.id] = type;
});


// public
module.exports = {
    list: list,
    hash: hash
};
