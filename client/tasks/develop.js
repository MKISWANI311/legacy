/**
 * Develop tasks
 */

'use strict';

var path    = require('path'),
    runner  = require('runner'),
    tools   = require('runner-tools'),
    logger  = require('runner-logger'),
    webpack = require('webpack'),
    source  = 'src',
    target  = path.join('build', 'develop');


// add system task "status"
// to get all tasks running state
//require('node-runner/lib/status');

Object.assign(
    runner.tasks,

    // activate popup notifications on errors
    //require('runner-generator-notify')(),

    require('runner-generator-repl')({
        runner: runner
    }),

    require('runner-generator-eslint')({
        watch: [
            path.join(source, 'js', '**', '*.js'),
            path.join('tasks', '**', '*.js')
        ]
    }),

    require('runner-generator-livereload')({
        watch: [
            path.join(target, '**', '*'),
            '!' + path.join(target, '**', '*.map')
        ]
    }),

    require('runner-generator-pug')({
        source: path.join(source, 'pug', 'main.pug'),
        target: path.join(target, 'index.html'),
        options: {
            pretty: true
        },
        variables: {
            develop: true,
            package: require('../package')
        }
    }),

    require('runner-generator-sass')({
        file: path.join(source, 'sass', 'develop.scss'),
        outFile: path.join(target, 'main.css'),
        sourceMap: path.join(target, 'main.css.map')
    }),

    require('runner-generator-static')({
        open: path.join(target)
    }),

    require('runner-generator-webpack')({
        mode: 'development',
        entry: path.resolve(path.join(source, 'js', 'main.js')),
        output: {
            filename: 'main.js',
            path: path.resolve(target)
        },
        watchOptions: {
            // delay rebuilding after the first change (in ms)
            aggregateTimeout: 50
        },
        resolve: {
            alias: {
                'app:config': path.resolve(path.join(source, 'js', 'config.js'))
            }
        },
        devtool: 'source-map',
        plugins: [
            // global constants
            new webpack.DefinePlugin({
                DEVELOP: true,
                LIVERELOAD: {
                    port: 35729
                }
            }),
            new webpack.optimize.OccurrenceOrderPlugin()
        ]
    })
);


// main tasks
runner.task('init', function ( done ) {
    tools.mkdir([path.join(target)], logger.wrap('init'), done);
});

runner.task('copy', function ( done ) {
    tools.copy(
        {
            source: path.join(source, 'img'),
            target: path.join(target, 'img')
        },
        logger.wrap('copy'),
        done
    );
});

runner.task('build', runner.parallel('pug:build', 'sass:build', 'webpack:build', 'copy'));

// eslint-disable-next-line no-unused-vars
runner.task('watch', function ( done ) {
    runner.watch(path.join(source, 'pug', '**', '*.pug'), 'pug:build');
    runner.watch(path.join(source, 'sass', '**', '*.scss'), 'sass:build');
    runner.watch(path.join(source, 'img', '**', '*'), 'copy');
    runner.run('eslint:watch');
    runner.run('webpack:watch');
});

runner.task('serve', runner.parallel('static:start', 'livereload:start', 'repl:start'/*, 'notify:start'*/));

runner.task('default', runner.serial('build', runner.parallel('watch', 'serve')));
