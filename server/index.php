<?php
/**
 * Main application handler
 * receives all the requests and forward them further
 * @author DarkPark, Ukraine Odessa 2012
 */

// db access, sessions storage and so on
include 'config.php';

// core modules
include PATH_LIBRARY . 'init.php';
include PATH_LIBRARY . 'app.php';
include PATH_LIBRARY . 'db.php';
include PATH_LIBRARY . 'response.php';
include PATH_LIBRARY . 'tools.php';

// all the magic
app::run();
