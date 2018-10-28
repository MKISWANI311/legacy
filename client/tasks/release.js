/**
 * Release tasks
 */

'use strict';

var path     = require('path'),
    runner   = require('runner'),
    tools    = require('runner-tools'),
    logger   = require('runner-logger'),
    webpack  = require('webpack'),
    UglifyJS = require('uglifyjs-webpack-plugin'),
    source   = 'src',
    target   = path.join('build', 'release');


// add system task "status"
// to get all tasks running state
//require('node-runner/lib/status');

Object.assign(
    runner.tasks,

    // activate popup notifications on errors
    require('runner-generator-notify')(),

    require('runner-generator-repl')({
        runner: runner
    }),

    require('runner-generator-eslint')({
        watch: [
            path.join(source, 'js', '**', '*.js'),
            path.join('tasks', '**', '*.js')
        ]
    }),

    require('runner-generator-static')({
        open: path.join(target)
    }),

    require('runner-generator-pug')({
        source: path.join(source, 'pug', 'main.pug'),
        target: path.join(target, 'index.html'),
        variables: {
            develop: false,
            package: require('../package')
        }
    }),

    require('runner-generator-webpack')({
        mode: 'production',
        entry: path.resolve(path.join(source, 'js', 'main.js')),
        output: {
            filename: 'main.js',
            path: path.resolve(target)
        },
        resolve: {
            alias: {
                'app:config': path.resolve(path.join(source, 'js', 'config.js'))
            }
        },
        // choose a developer tool to enhance debugging
        devtool: 'source-map',
        optimization: {
            minimize: true,
            minimizer: [
                new UglifyJS({
                    // set true to sourceMap to get correct map-file
                    sourceMap: true,
                    uglifyOptions: {
                        output: {
                            comments: false
                        },
                        /* eslint camelcase: 0 */
                        compress: {
                            // display warnings when dropping unreachable code or unused declarations etc.
                            warnings: false,
                            unused: true,
                            dead_code: true,
                            drop_console: true,
                            drop_debugger: true,
                            properties: false,
                            pure_funcs: [
                                'debug.assert',
                                'debug.log',
                                'debug.info',
                                'debug.warn',
                                'debug.fail',
                                'debug.inspect',
                                'debug.event',
                                'debug.stub',
                                'debug.time',
                                'debug.timeEnd'
                            ]
                        }
                    }
                })
            ]
        },
        plugins: [
            // global constants
            new webpack.DefinePlugin({
                DEVELOP: false
            }),
            new webpack.optimize.OccurrenceOrderPlugin()
        ]
    }),

    require('runner-generator-sass')({
        file: path.join(source, 'sass', 'release.scss'),
        outFile: path.join(target, 'main.css'),
        outputStyle: 'compressed',
        sourceMap: path.join(target, 'main.css.map')
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

runner.task('serve', runner.parallel('static:start', 'repl:start', 'notify:start'));

runner.task('default', runner.serial('build', runner.parallel('watch', 'serve')));
