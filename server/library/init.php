<?php

//application execution mode
const DEBUG = true;

// core initialization time mark
define('INIT_TIMESTAMP', time());

date_default_timezone_set('UTC');

// user defined error handling function
function MainErrorHandler ( $errno, $errmsg, $filename, $linenum ) {
    // define an assoc array of error string
    $errortype = array(
        1    => 'Error',
        2    => 'Warning',
        4    => 'Parsing Error',
        8    => 'Notice',
        16   => 'Core Error',
        32   => 'Core Warning',
        64   => 'Compile Error',
        128  => 'Compile Warning',
        256  => 'User Error',
        512  => 'User Warning',
        1024 => 'User Notice',
        2048 => 'Runtime Notice',
        4096 => 'Catchable Fatal Error'
    );
    $filename = str_replace(PATH_ROOT, '', $filename);
    $message  = "$filename:$linenum :: {$errortype[$errno]}: $errmsg";
    if ( PHP_SAPI === 'cli' ) {
        echo "$message\n";
    }
    // separate log file for each day
    error_log(date('H:i') . "\t$message\n", 3, PATH_LOGS . date('Y-m-d'));

    return true;
}

// we will do our own error handling
error_reporting(0);
set_error_handler('MainErrorHandler');

// not catchable fatal error handler
register_shutdown_function(function(){
    $error = error_get_last();

    if ( $error ) {
        MainErrorHandler($error['type'], $error['message'], $error['file'], $error['line']);
    }
});
