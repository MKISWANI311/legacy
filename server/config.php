<?php

// base paths of the app
define('PATH_ROOT', __DIR__ . DIRECTORY_SEPARATOR);
define('PATH_CONTROLLERS', PATH_ROOT . 'controllers' . DIRECTORY_SEPARATOR);
define('PATH_LIBRARY', PATH_ROOT . 'library' . DIRECTORY_SEPARATOR);
define('PATH_LOGS', getenv('PATH_LOGS') ?: PATH_ROOT . 'logs' . DIRECTORY_SEPARATOR);

// dsn example for mysql
// mysql:host=localhost;dbname=fortnotes;charset=utf8

define('PDO_DSN', getenv('PDO_DSN') ?: 'sqlite:./data/sqlite');
define('PDO_USER', getenv('PDO_USER') ?: null);
define('PDO_PASS', getenv('PDO_PASS') ?: null);
define('PDO_PERSISTENT', getenv('PDO_PERSISTENT') ?: 0);

define('DEBUG', getenv('DEBUG') ?: 0);

define('SESSION_SAVE_PATH', getenv('SESSION_SAVE_PATH') ?: PATH_ROOT . 'sessions');

define('DISABLE_REGISTRATION', getenv('DISABLE_REGISTRATION') ?: 0);
