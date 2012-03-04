<?php
/**
 * Main application handler
 * receives all the requests and forward them further
 * @author DarkPark, Ukraine Odessa 2012
 */

// main application include
include '../library/app.core.php';

// additional modules
include PATH_LIBRARY . 'firephp.php';

// core modules
include PATH_LIBRARY . 'app.db.php';
include PATH_LIBRARY . 'app.init.php';
include PATH_LIBRARY . 'app.tools.php';
include PATH_LIBRARY . 'app.cache.php';

// all the magic
app::run();

?>