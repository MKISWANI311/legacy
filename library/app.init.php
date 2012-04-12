<?php
/**
 * Global declarations
 */

date_default_timezone_set('UTC');

// database configuration
db::$dsn  = 'mysql:unix_socket=/var/run/mysqld/mysqld.sock;dbname=fortnotes;charset=utf8';
db::$user = 'fortnotes';
db::$pass = 'LvbMRHGD7q9uiKeyP03C';

db::$onenginit = function () {
	// try to import data from the external previously generated struct file
	if ( ($data = include PATH_CACHE . 'db.struct.php') && is_array($data) ) db::$struct = $data;
};

if ( DEBUG ) {
	db::$onsuccess = function ( $data ) {
		// collect queries data
		app::$queries['time'] += $data['time'];
		app::$queries['data'][] = array(
			number_format(round(1000*$data['time'], 3), 3), ($data['affected'] > 0 ? $data['affected'] : ''), $data['sql']);
	};
}

// db error handler
db::$onfailure = function ( $data ) {
	if ( PHP_SAPI === 'cli' ) {
		print_r($data);
	} else {
		fb($data);
	}
	error_log(print_r($data, true));
};

// FirePhp config
//if ( !DEBUG ) FB::setEnabled(false);

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
	} else {
		$fb = FirePHP::getInstance(true);
		$fb->error($errmsg, $errortype[$errno] . " [$filename:$linenum]");
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
	if ( $error )
		MainErrorHandler($error['type'], $error['message'], $error['file'], $error['line'], null);
});

?>
