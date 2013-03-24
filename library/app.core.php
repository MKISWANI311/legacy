<?php

/**
 * application execution mode
 */
const DEBUG = true;

/**
 * core initialization time mark
 * current Unix timestamp in seconds
 */
define('INIT_TIMESTAMP', time());

// set debug environment
if ( DEBUG ) {
	/**
	 * core initialization time mark
	 * current Unix timestamp with microseconds as float
	 */
	define('INIT_MICROTIME', microtime(true));

	/**
	 * memory usage mark
	 */
	define('MEM_USE', memory_get_usage());
}

// base paths of the app
define('PATH_ROOT',        dirname(__DIR__) . DIRECTORY_SEPARATOR);
define('PATH_APP',         PATH_ROOT   . 'application' . DIRECTORY_SEPARATOR);
define('PATH_LIBRARY',     PATH_ROOT   . 'library'     . DIRECTORY_SEPARATOR);
define('PATH_PUBLIC',      PATH_ROOT   . 'public'      . DIRECTORY_SEPARATOR);
define('PATH_CACHE',       PATH_ROOT   . 'cache'       . DIRECTORY_SEPARATOR);
define('PATH_LOGS',        PATH_ROOT   . 'logs'        . DIRECTORY_SEPARATOR);
define('PATH_LANG',        PATH_ROOT   . 'lang'        . DIRECTORY_SEPARATOR);
define('PATH_CSS',         PATH_PUBLIC . 'css'         . DIRECTORY_SEPARATOR);
define('PATH_JS',          PATH_PUBLIC . 'js'          . DIRECTORY_SEPARATOR);
define('PATH_CONTROLLERS', PATH_APP    . 'controllers' . DIRECTORY_SEPARATOR);
define('PATH_TEMPLATES',   PATH_APP    . 'templates'   . DIRECTORY_SEPARATOR);

/**
 * Main class for Web Application
 * @author DarkPark
 */
class app {

	/**
	 * Main array with all application data
	 * @var array
	 */
	public static $data = null;

	/**
	 * URI parts of the request
	 * @var array
	 */
	public static $uri = null;

	/**
	 * Controller and class
	 * @var string
	 */
	public static $class  = 'front';

	/**
	 * Action and method
	 * @var string
	 */
	public static $method = 'index';

	/**
	 * List of the sql queries for debug
	 * @var array
	 */
	public static $queries = array('time'=>0, 'data'=>array());

	/**
	 * Final data to be send to a client
	 * @var string
	 */
	public static $output = '';

	/**
	 * Send system info to the firebug console in debug mode
	 */
	public static function sysinfo () {
		if ( DEBUG ) {
			// debug info
			$time = round(1000*(microtime(true)-INIT_MICROTIME), 3);
			$mem  = round((memory_get_usage() - MEM_USE)/1024, 2);
			$len  = strlen(self::$output);
			$fb   = FirePHP::getInstance(true);
			// common info
			$fb->group('core::run ' . self::$class . '/' . self::$method . " (time:{$time}ms mem:{$mem}kb data:{$len}b)", array('Collapsed' => true));
				fb($_REQUEST, 'REQUEST');
				fb($_COOKIE, 'COOKIE');
				//fb($_SERVER, 'SERVER');
				if ( !empty($_SESSION) ) fb($_SESSION, 'SESSION');
			$fb->groupEnd();
			// db info
			if ( app::$queries['data'] ) {
				fb(array_merge(array(array('ms', 'ar', 'query')), app::$queries['data']), 'db::queries (' . count(app::$queries['data']) . ':' . round(app::$queries['time']*1000, 3) . 'ms)', FirePHP::TABLE);
			}
		}
	}

	/**
	 * Main routine
	 */
	public static function run ()
	{
		// check if session id set
		//if ( !empty($_COOKIE[session_name()]) ) {
			session_start();
		//}

		// prepare uri parts from incoming request
		self::$uri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

		// set route if specified (defaulds otherwise)
		if ( !empty(self::$uri[0]) ) self::$class  = self::$uri[0];  // controller and class
		if ( !empty(self::$uri[1]) ) self::$method = self::$uri[1];  // method

		// TODO: check cached results
		//$cache_file = sprintf('%scache.%s.%s.%s.%s', PATH_CACHE, $_SERVER['SERVER_NAME'], session_id(), self::$class, self::$method);
		//if ( file_exists($cache_file) ) { echo file_get_contents($cache_file); return; }

		$controller = PATH_CONTROLLERS . strtolower(self::$class) . '.php';

		if ( file_exists($controller) ) {
			// class file exists so include it
			include $controller;
			if ( class_exists(self::$class) ) {
				// check the class in the file and initialize it
				$class  = self::$class;
				$object = new $class();
				if ( method_exists($object, self::$method) ) {
					// start buffering
					ob_start();
					// check method and execute it with the rest uri params
					call_user_func_array(array($object, self::$method), array_slice(self::$uri, 2));
					//echo round(microtime(true) - INIT_MICROTIME, 5) . "<br>";
					// handle buffer
					self::$output = ob_get_contents();
					ob_end_clean();
					// dump info
					self::sysinfo();
					// dump page data
					echo self::$output;
					//file_put_contents($cache_file, self::$output);
				} else {
					die("Action " . self::$method . " does not exist!");
				}
			} else {
				die('Class ' . self::$class . ' does not exist!');
			}
		} else {
			die("Controller $controller does not exist!");
		}
	}

}

/**
 * Parent controller
 * @author dp
 */
class controller {

	public function __construct () {}

}

/**
 * Application response
 * @author dp
 */
class response {

	public static function send () {}

	public static function zip ( $data ) {
		// disable ZLIB ouput compression
		ini_set('zlib.output_compression', 'Off');
		// compress data
		$data = gzencode($data, 6);
		// send headers
		header('Content-Type: application/x-download');
		//header('Content-Encoding: gzip');
		header('Content-Length: ' . strlen($data));
		header('Content-Disposition: attachment; filename="fortnotes.export.'.date('Ymd').'.zip"');
		header('Cache-Control: no-cache, no-store, max-age=0, must-revalidate');
		header('Pragma: no-cache');
		// output data
		echo $data;
	}

	/**
	 * Prepares and sends given data to the client side
	 * @param mixed $data data to be converted to json and sent to user
	 * @param boolean $israw flag shows if it is necessary to convert data to json, if false - data is already json
	 * @param boolean $gzip flag shows if it is necessary to gzip the data and add gzip headers
	 * @return string
	 */
	public static function json ( $data, $israw = true, $gzip = false ) {
		// prepare data if necessary
		if ( $israw ) $data = json_encode($data, JSON_NUMERIC_CHECK);
		if ( $gzip  ) $data = gzencode($data, 9);
		// send headers
		header('Content-Type: application/json; charset=utf-8');
		if ( $gzip ) header('Content-Encoding: gzip');
		header('Content-Length: ' . strlen($data));
		header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . 'GMT');
		header('Cache-Control: no-cache, no-store, max-age=0, must-revalidate');
		header('Pragma: no-cache');
		// send data
		echo $data;
		return $data;
	}

	/**
	 * Concatente all files in the given dir with given extention to one file
	 * i.e. all css files in the directory into all.css file
	 * updates only if there are changes in any of the files
	 */
	public static function compact ( $path, $extention ) {
		// skip for production
		if ( !DEBUG ) return;

		// list of files with modification time
		$ftimes = array();
		// list building
		foreach ( glob("{$path}*.$extention") as $file ) {
			$ftimes[$file] = filemtime($file);
		}
		// clear from all_file info
		$file_all = "{$path}all.$extention";
		$time_all = $ftimes[$file_all];
		unset($ftimes[$file_all]);
		// find modifications
		$need_regenerate = filesize($file_all) == 0 ? true : false;
		foreach ( $ftimes as $ftime ) {
			if ( $ftime > $time_all ) {
				// there are newer files then combinded file
				$need_regenerate = true;
				break;
			}
		}
		// make combined file if necessary
		//TODO: move this to separate file executed on RAMFS init
		if ( $need_regenerate ) {
			$data = '';
			// concatenate all files
			foreach ( $ftimes as $fname => $ftime ) {
				$buffer = file_get_contents($fname);
				// compress css
				if ( $extention == 'css' ) {
					// remove comments
					$buffer = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $buffer);
					// remove tabs, spaces, newlines, etc.
					$buffer = str_replace(array("\r\n", "\r", "\n", "\t", '  ', '    ', '    '), '', $buffer);
					$buffer = str_replace(array('{ '), '{', $buffer);
					$buffer = str_replace(array('; '), ';', $buffer);
					$buffer = str_replace(array(': '), ':', $buffer);
					$buffer = str_replace(';}', '}', $buffer);
					$buffer = str_replace('}', "}\n", $buffer);
				}
				// compress js if necessary
				if ( $extention == 'js' && strpos($fname, '.min.') === false ) {
//					$ch = curl_init('http://closure-compiler.appspot.com/compile');
//					curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//					curl_setopt($ch, CURLOPT_POST, 1);
//					curl_setopt($ch, CURLOPT_POSTFIELDS, 'output_info=compiled_code&output_format=text&compilation_level=SIMPLE_OPTIMIZATIONS&js_code=' . urlencode($buffer));
//					$buffer = curl_exec($ch);
//					curl_close($ch);
				}
				$data .= "\n\n/*** " . basename($fname) . " ***/\n" . trim($buffer);
			}
			$data = trim($data);
			// save
			file_put_contents($file_all, $data);
			// set modification time to the olders of combined files
			touch($file_all, max($ftimes));
		}

	}

	/**
	 * Renders the given template with passed variables
	 * @param string $tplname template file name in the template directory
	 * @param array $data list of vars to be passed to the template
	 */
	public static function template ( $tplname, $data = null ) {
		// prepare data variables for template
		if ( $data && is_array($data)) {
			extract($data);
		}
		//TODO: caching
		include PATH_TEMPLATES . $tplname . '.php';
	}

	/**
	 * Redirect to the given address
	 * @param string $url address where to go
	 */
	public static function redirect ( $url ) {
		header('Location: ' . $url);
		exit();
	}

}
