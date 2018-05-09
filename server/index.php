<?php
/**
 * Main application handler
 * receives all the requests and forward them further
 * @author DarkPark, Ukraine Odessa 2012
 */

// base paths of the app
define('PATH_ROOT', __DIR__ . DIRECTORY_SEPARATOR);
define('PATH_CONTROLLERS', PATH_ROOT . 'controllers' . DIRECTORY_SEPARATOR);
define('PATH_LIBRARY', PATH_ROOT . 'library' . DIRECTORY_SEPARATOR);
define('PATH_LOGS', PATH_ROOT . 'logs' . DIRECTORY_SEPARATOR);

// core modules
include PATH_LIBRARY . 'init.php';
include PATH_LIBRARY . 'app.php';
include PATH_LIBRARY . 'cache.php';
include PATH_LIBRARY . 'db.php';
include PATH_LIBRARY . 'response.php';
include PATH_LIBRARY . 'tools.php';

// all the magic
app::run();
