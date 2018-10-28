/**
 * Eslint config.
 */

'use strict';

// public
module.exports = {
    // base rules
    extends: require.resolve('spa-eslint'),

    env: {
        browser: true,
        es6: true,
        node: true
    },

    globals: {
        _: false,
        elclear: false,
        element: false,
        elchild: false
    }
};
