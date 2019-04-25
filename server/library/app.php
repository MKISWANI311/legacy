<?php

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
     * Final data to be send to a client
     * @var string
     */
    public static $output = '';

    /**
     * Main routine
     */
    public static function run ()
    {
        // CORS
        if ( array_key_exists('HTTP_ORIGIN', $_SERVER) ) {
            header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: Content-Type');
            header('Access-Control-Max-Age: 3600');
            //header('Access-Control-Allow-Origin: *');
            //header('Access-Control-Allow-Headers: *');
            //header('Access-Control-Allow-Methods: *');
        }

        if ( $_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
            return;
        }

        ini_set('session.save_path',SESSION_SAVE_PATH);
        ini_set('session.hash_function','sha512');
        ini_set('session.sid_length',64);
        ini_set('session.sid_bits_per_character',5);
        session_start();

        // sqlite database configuration
        db::$dsn  = PDO_DSN;
        db::$user = PDO_USER;
        db::$pass = PDO_PASS;

        db::$onenginit = function () {
            // try to import data from the external previously generated struct file
            if ( ($data = include PATH_LIBRARY . 'db.struct.php') && is_array($data) ) db::$struct = $data;
        };

        // if ( DEBUG ) {
        //     db::$onsuccess = function ( $data ) {
        //         // collect queries data
        //         //app::$queries['time'] += $data['time'];
        //         //app::$queries['data'][] = array(number_format(round(1000*$data['time'], 3), 3), ($data['affected'] > 0 ? $data['affected'] : ''), $data['sql']);
        //     };
        // }

        // db error handler
        db::$onfailure = function ( $data ) {
            error_log(print_r($data, true));
        };

        db::init();

        // prepare uri parts from incoming request
        self::$uri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

        // set route if specified (defaults otherwise)
        if ( !empty(self::$uri[0]) ) self::$class  = self::$uri[0];  // controller and class
        if ( !empty(self::$uri[1]) ) self::$method = self::$uri[1];  // method

        $controller = PATH_CONTROLLERS . strtolower(self::$class) . '.php';

        if ( file_exists($controller) ) {
            // class file exists so include it
            include $controller;

            if ( class_exists(self::$class) ) {
                // check the class in the file and initialize it
                $class  = self::$class;
                $object = new $class();
                if ( method_exists($object, self::$method) ) {
                    // check method and execute it with the rest uri params
                    call_user_func_array(array($object, self::$method), array_slice(self::$uri, 2));
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
