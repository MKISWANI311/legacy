<?php
/**
 * Main application handler
 * receives all the requests and forward them further
 * @author DarkPark, Ukraine Odessa 2012
 */

// main application include
include './library/core.php';

// additional modules
//include PATH_LIBRARY . 'firephp.php';

// core modules
include PATH_LIBRARY . 'db.php';
include PATH_LIBRARY . 'init.php';
include PATH_LIBRARY . 'tools.php';
include PATH_LIBRARY . 'cache.php';

// all the magic
app::run();
