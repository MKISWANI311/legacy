<?php
/**
 * Database wrapper
 * @author DarkPark
 */
class db {

    /**
     * Data Source Name
     * contains the information required to connect to the database.
     * @var string
     */
    public static $dsn = null;

    /**
     * The user name for the DSN string
     * @var string
     */
    public static $user = null;

    /**
     * The password for the DSN string
     * @var string
     */
    public static $pass = null;

    /**
     * User-defined callback handler
     * triggered on database engine initialization
     * @var callback
     */
    public static $onenginit = null;

    /**
     * User-defined callback handler
     * triggered on sql operation completed successfully
     * @var callback
     */
    public static $onsuccess = null;

    /**
     * User-defined callback handler
     * triggered on sql operation failure
     * @var callback
     */
    public static $onfailure = null;

    /**
     * Database sctructure for table/column names validation
     * array of tables where each key is a table name and values are lists of columns
     * in a list of columns each key is a column name and its value is primary key flag
     * if set this var is using in table/column names validation
     * @example array('users'=>array('id'=>true,'name'=>false,'pass'=>false))
     * @var array
     */
    public static $struct = null;

    /**
     * Flag to control general query handling behaviour
     * useful for testing or run-time query building
     *     true  - no SQL statements will be executed, just plain sql returned
     *     false - default mode when all queries are executed as requested
     * @var bool
     */
    public static $sqlonly = false;

    /**
     * Template variable marker
     * @example "select * from users where id = @i and group in @li"
     * @var string
     */
    private static $mark = '@';

    /**
     * Allow/deny multiple data values in single query
     * in case true - perform many queries instead of one
     * @var boolean
     */
    public static $no_bulk_inserts = false;

    /**
     * PDO instance representing a connection to a database
     * @var PDO
     */
    private static $pdo = null;

    /**
     * The number of rows affected by the last SQL statement
     * @var int
     */
    private static $affected = 0;

    /**
     * Init db instance
     * check success/error/warning handles and set exception mode accordingly
     * @return bool
     *     true on success or false on failure
     */
    private static function init () {
        try {
            // check init/success/error callbacks and set to null if invalid
            self::$onenginit = self::$onenginit && is_callable(self::$onenginit) ? self::$onenginit : null;
            self::$onsuccess = self::$onsuccess && is_callable(self::$onsuccess) ? self::$onsuccess : null;
            self::$onfailure = self::$onfailure && is_callable(self::$onfailure) ? self::$onfailure : null;
            // creates a pdo instance to represent a connection to the requested database
            self::$pdo = new PDO(self::$dsn, self::$user, self::$pass, array(
                PDO::ATTR_PERSISTENT => false,
                PDO::ATTR_ERRMODE    => PDO::ERRMODE_EXCEPTION  // throw exceptions    on errors
            ));
            // call user-defined init handler if given
            if ( self::$onenginit ) call_user_func(self::$onenginit);
        } catch ( PDOException $e ) { self::error($e); }
        // status of PDO creation
        return (self::$pdo != null);
    }

    /**
     * Initiates an SQL transaction
     * turns off autocommit mode
     * @return bool
     *     true on success or false on failure
     */
    public static function begin () {
        // try to init if the first time
        if ( !self::$pdo && !self::init() ) return false;
        // get time for user function
        if ( self::$onsuccess ) $mtime = microtime(true);
        $result = self::$pdo->beginTransaction();
        // get time for user function
        if ( self::$onsuccess ) $mtime = microtime(true) - $mtime;
        // call user-defined success handler if given
        if ( self::$onsuccess ) call_user_func(self::$onsuccess, array(
            'sql' => 'start transaction', 'time' => $mtime, 'affected' => null));
        return $result;
    }

    /**
     * Commits an SQL transaction
     * only if transation started previously
     * @return bool
     *     true on success or false on failure
     */
    public static function commit () {
        // try to init if the first time
        if ( !self::$pdo && !self::init() ) return false;
        // get time for user function
        if ( self::$onsuccess ) $mtime = microtime(true);
        $result = self::$pdo->inTransaction() && self::$pdo->commit();
        // get time for user function
        if ( self::$onsuccess ) $mtime = microtime(true) - $mtime;
        // call user-defined success handler if given
        if ( self::$onsuccess ) call_user_func(self::$onsuccess, array(
            'sql' => 'commit', 'time' => $mtime, 'affected' => null));
        return $result;
    }

    /**
     * Rolls back an SQL transaction
     * only if transation started previously
     * @return bool
     *     true on success or false on failure
     */
    public static function rollback() {
        // try to init if the first time
        if ( !self::$pdo && !self::init() ) return false;
        // get time for user function
        if ( self::$onsuccess ) $mtime = microtime(true);
        $result = self::$pdo->inTransaction() && self::$pdo->rollBack();
        // get time for user function
        if ( self::$onsuccess ) $mtime = microtime(true) - $mtime;
        // call user-defined success handler if given
        if ( self::$onsuccess ) call_user_func(self::$onsuccess, array(
            'sql' => 'rollback', 'time' => $mtime, 'affected' => null));
        return $result;
    }

    /**
     * Returns the number of rows affected by the last SQL statement
     * wrapper to get private self::$affected value
     * @return int
     */
    public static function affected() {
        return self::$affected;
    }

    /**
     * SQL string variable handler
     * @param string $value
     * @return string
     */
    private static function sql_var_s ( $value ) {
        // try to init if the first time
        if ( !self::$pdo && !self::init() ) return false;
        // escaping and returning
        return self::$pdo->quote($value);
    }

    /**
     * SQL integer variable handler
     * @param int $value
     * @return int
     */
    private static function sql_var_i ( $value ) {
        // try to init if the first time
        if ( !self::$pdo && !self::init() ) return false;
        // convert
        return intval($value);
    }

    /**
     * SQL list of strings variable handler
     * @param string[] $value
     * @return string
     */
    private static function sql_var_ls ( $value ) {
        // try to init if the first time
        if ( !self::$pdo && !self::init() ) return false;
        // check input
        if ( $value && is_array($value) ) {
            // iterate strings and escape
            foreach ( $value as & $item ) {
                $item = self::$pdo->quote($item);
                unset($item);
            }
            return '(' . implode(',', $value) . ')';
        }
        return false;
    }

    /**
     * SQL list of integer variable handler
     * @param int[] $value
     * @return string
     */
    private static function sql_var_li ( $value ) {
        // try to init if the first time
        if ( !self::$pdo && !self::init() ) return false;
        // check input
        if ( $value && is_array($value) ) {
            // makes sure all array elements are integers
            $value = array_map('intval', $value);
            return '(' . implode(',', $value) . ')';
        }
        return false;
    }

    /**
     * Builds SQL query or its parts from arguments
     * the first param should be sql template string with these template vars:
     *     @s  - string placeholder, will be escaped on parsing
     *     @i  - integer placeholder
     *     @ls - list of strings placeholder, each element will be escaped on parsing
     *     @li - list of integer placeholder
     * @param string $sql,... unlimited number of sql variables
     * @return stdClass
     * @example sql('select * from users where id in @li and name = @s', array(1,2,3), 'Miranda')
     *     turns to "select * from users where id in (1,2,3) and name = 'Miranda'"
     */
    public static function sql () {
        // preparing
        $result  = '';
        $arglist = func_get_args();
        $argsnum = func_num_args();
        // check input
        if ( $argsnum === 1 ) {
            // simple string is given
            $result = is_string($arglist[0]) ? $arglist[0] : '';
        } else if ( $argsnum > 1 ) {
            // list of params
            // check the first one to be a not empty string
            if ( is_string($sql = array_shift($arglist)) && ($sql = trim($sql)) ) {
                $parts = explode(self::$mark, $sql);
                // no marks - simple string is given
                if ( count($parts) === 1 ) $result = $parts[0];
                else {
                    // there can be only more than 1 parts
                    // parts amount should match arguments
                    if ( count($parts) === count($arglist)+1 ) {
                        // get the parts with vars at the beginning
                        $first = array_shift($parts);
                        // iterate all var parts
                        foreach ( $parts as $index => & $part ) {
                            // get the first word from each part i.e. variable name
                            $vname = strtok($part, ' []{}(),.|/?\\*-+~!#$%^&"\';:=');
                            // check the handler for the var of this kind
                            if ( method_exists('db', "sql_var_$vname") ) {
                                // proceed the user argument by the corresponding handler
                                $part = call_user_func("self::sql_var_$vname", $arglist[$index]) . substr($part, strlen($vname));
                            }
                            unset($part);
                        }
                        // free memory
                        strtok('','');
                        // merge everything together
                        array_unshift($parts, $first);
                        $result = implode('', $parts);
                    }
                }
            }
        }
        // cleaning
        $result = trim($result);
        // triggers error on empty result
        if ( !$result ) self::error('Invalid SQL statement or its arguments');
        //echo $result;
        return (object) $result;
    }

    /**
     * Main SQL statement performing function
     * collects all db requests, statistics, data, triggers onsuccess callback
     * @param string $operation execution mode (query|exec)
     * @param string $sql
     * @return array|bool|int depends on mode
     *     query: array of selected rows on success
     *     exec: affected rows number on success
     *     false on failure
     */
    private static function helper ( $operation, $sql ) {
        // reset affected rows
        self::$affected = null;
        // test mode so just return sql query
        if ( self::$sqlonly ) return $sql;
        $result = false;
        try {
            // get time for user function
            if ( self::$onsuccess ) $mtime = microtime(true);
            // perform the given operation - query or exec
            $opres = call_user_func(array(self::$pdo, $operation), $sql);
            // get time for user function
            if ( self::$onsuccess ) $mtime = microtime(true) - $mtime;
            // check operation result
            // exec returns int, query returns PDOStatement
            if ( is_int($opres) ) {
                /* @var $opres int */
                $result = self::$affected = $opres;
            } else {
                /* @var $opres PDOStatement */
                $result = $opres->fetchall(PDO::FETCH_ASSOC);
                self::$affected = $opres->rowCount();
                $opres->closeCursor();
            }
            // call user-defined success handler if given
            if ( self::$onsuccess ) call_user_func(self::$onsuccess, array(
                'sql' => $sql, 'time' => $mtime, 'affected' => self::$affected));
        } catch ( PDOException $e ) { self::error($e); }
        return $result;
    }

    /**
     * Executes an SQL statement
     * SELECT|PRAGMA|SHOW|EXPLAIN
     * @param dynamic list of params for helper
     * @return array|bool
     *     list of selected rows on success
     *     false on failure
     */
    public static function query () {
        // try to init if the first time
        if ( !self::$pdo && !self::init() ) return false;
        // prepare sql from input params and pass it to query helper
        if ( ($sql = call_user_func_array('self::sql', func_get_args())->scalar) ) {
            return call_user_func('self::helper', 'query', $sql);
        }
        return false;
    }

    /**
     * Retrives the first row of an SQL statement result
     * @param dynamic list of params for helper
     * @return array|bool
     *     list of the selected row fields on success
     *     false on failure
     */
    public static function queryFirstRow () {
        // get all rows
        $result = call_user_func_array('self::query', func_get_args());
        // take the first one
        if ( $result && is_array($result) ) return reset($result);
        return false;
    }

    /**
     * Retrives the first column of an SQL statement result
     * @param dynamic list of params for helper
     * @return array|bool
     *     list of the first column values from each selected rows on success
     *     false on failure
     */
    public static function queryFirstCol () {
        // get all rows
        $result = call_user_func_array('self::query', func_get_args());
        if ( $result && is_array($result) ) {
            // replace each row with its first element
            return array_map(function($row){return reset($row);}, $result);
        }
        return false;
    }

    /**
     * Executes an SQL statement
     * INSERT|UPDATE|DELETE|CREATE
     * @param dynamic list of params for helper
     * @return int|bool
     *     affected rows number on success
     *     false on failure
     */
    public static function exec () {
        // try to init if the first time
        if ( !self::$pdo && !self::init() ) return false;
        // prepare sql from input params and pass it to exec helper
        if ( ($sql = call_user_func_array('self::sql', func_get_args())->scalar) ) {
            return call_user_func('self::helper', 'exec', $sql);
        }
        return false;
    }

    /**
     * Checks and corrects input data if necessary
     * transform it to be used in SQL statement
     * @param mixed $value
     * @return mixed
     */
    private static function sanitize ( $value ) {
        if ( is_object($value) && ($value instanceof stdClass) ) $value = $value->scalar;
        else if ( is_null($value) ) $value = 'null';
        else if ( is_bool($value) ) $value = (int) $value;
        else if ( is_int($value) ) $value = (int) $value;
        else $value = self::$pdo->quote($value);
        return $value;
    }

    /**
     * Performs INSERT SQL statement
     * @param string $table name
     * @param array $data fields values with names
     * @return int|bool
     *     ID of the last insert statement or number of inserted rows in multi-mode on success
     *     false on failure
     */
    public static function insert ( $table, $data ) {
        // try to init if the first time
        if ( !self::$pdo && !self::init() ) return false;
        // check given table name (using db structure if set)
        if ( is_string($table) && ($table = trim($table)) &&
            (self::$struct === null || (self::$struct && isset(self::$struct[$table]))) )
        {
            // data is given and valid
            if ( $data && is_array($data) ) {
                // there are no sub-arrays by default
                $multi = false;
                // even one sub-array switch to multi
                foreach ( $data as $item ) if ( is_array($item) ) { $multi = true; break; }
                // check if not array of arrays then make it so
                if ( !$multi ) $data = array($data);
                // remove empty and invalid sub-arrays
                $data = array_filter($data, function($item){return $item && is_array($item);});
                // remove fields with invalid names
                foreach ( $data as & $item ) {
                    foreach ( $item as $index => $field ) {
                        // remove non-strings
                        if ( !is_string($index) ) unset($item[$index]);
                        else {
                            // field name is string but there may be edge spaces
                            // remove them and check, remove empty names
                            $itrim  = trim($index);
                            $fvalue = $field;
                            // recreate truncated field name or leave as it is if empty
                            if ( $itrim === '' || $itrim !== $index ) unset($item[$index]);
                            if ( $itrim !== '' && !isset($item[$index]) ) $item[$itrim] = $fvalue;
                        }
                    }
                    unset($item);
                }
                // the db structure is given so exclude invalid field names
                if ( self::$struct && isset(self::$struct[$table]) ) {
                    foreach ( $data as & $item ) {
                        $item = array_intersect_key($item, self::$struct[$table]);
                        unset($item);
                    }
                }
                // remove empty subarrays
                // there could appear some at this point
                $data = array_filter($data);
                // get the field names from the first subarray
                if ( $data && ($fnames = array_keys(reset($data))) ) {
                    // remove subarray with mismatching field names
                    $data = array_filter($data, function($item)use($fnames){
                        if ( $item && is_array($item) ) return $fnames == array_keys($item);
                    });
                    if ( $data ) {
                        foreach ( $data as & $item ) {
                            foreach ( $item as & $field ) {
                                $field = self::sanitize($field);
                                unset($field);
                            }
                            $item = '(' . implode(', ', $item) . ')';
                            unset($item);
                        }
                        // if there are more than one row to insert
                        $multi = count($data) > 1;
                        // build final sql
                        $sql = sprintf('insert into %s (%s) values %s', $table, implode(', ', $fnames), implode(', ', $data));
                        // no execution in testing mode
                        if ( self::$sqlonly ) return $sql;
                        // number of inserted rows
                        $inserted = 0;
                        // bulk operations
                        if ( self::$no_bulk_inserts ) {
                            // one by one
                            foreach ( $data as $value ) {
                                $inserted += call_user_func('self::helper', 'exec', sprintf('insert into %s (%s) values %s', $table, implode(', ', $fnames), $value));
                            }
                        } else {
                            // performing the built sql
                            $inserted = call_user_func('self::helper', 'exec', $sql);
                        }
                        // there are some good inserts
                        if ( $inserted > 0 ) {
                            // return last inserted id only if one row inseted
                            // otherwise - number of inserted rows
                            return $multi ? $inserted : self::$pdo->lastInsertId();
                        }
                    }
                }
            }
        }
        // triggers error
        self::error('Invalid arguments for insert');
        return false;
    }

    /**
     * Performs UPDATE SQL statement
     * arguments:
     *     string table name
     *     array new fields values with names
     *     string where sql template
     *     unlimited number of sql template variables
     * @return int|bool
     *     affected rows number on success
     *     false on failure
     */
    public static function update () {
        // try to init if the first time
        if ( !self::$pdo && !self::init() ) return false;
        // check input - should be at least 2 params
        if ( func_num_args() >= 2 ) {
            // preparing
            $args  = func_get_args();
            $table = array_shift($args);
            // check given table name (using db structure if set)
            if ( is_string($table) && ($table = trim($table)) &&
                (self::$struct === null || (self::$struct && isset(self::$struct[$table]))) )
            {
                // data is given and valid
                if ( ($data = array_shift($args)) && is_array($data) ) {
                    $fields = array();
                    // prepare and sanitize incoming data array
                    foreach ( $data as $fname => $fval ) {
                        // there are no db structure info or the field name is valid (nonempty string)
                        if ( is_string($fname) && ($fname = trim($fname)) &&
                            (self::$struct === null || (self::$struct && isset(self::$struct[$table][$fname]))) )
                        {
                            $fields[] = "$fname = " . self::sanitize($fval);
                        }
                    }
                    // data block is ready
                    if ( ($fields = implode(', ', $fields)) ) {
                        // where block
                        $where = '';
                        if ( $args ) {
                            // parsing user parameters and build conditions block
                            $where = 'where ' . call_user_func_array('self::sql', $args)->scalar;
                        }
                        // performing the built sql
                        return call_user_func('self::helper', 'exec', trim("update $table set $fields $where"));
                    }
                }
            }

        }
        // triggers error
        self::error('Invalid arguments for update');
        return false;
    }

    /**
     * Performs DELETE SQL statement
     * arguments:
     *     string table name
     *     string where sql template
     *     unlimited number of sql template variables
     * @return int|bool
     *     affected rows number on success
     *     false on failure
     */
    public static function delete () {
        // try to init if the first time
        if ( !self::$pdo && !self::init() ) return false;
        // check input - should be at least 2 params
        if ( func_num_args() >= 1 ) {
            // preparing
            $args  = func_get_args();
            $table = array_shift($args);
            // check given table name (using db structure if set)
            if ( is_string($table) && ($table = trim($table)) &&
                (self::$struct === null || (self::$struct && isset(self::$struct[$table]))) )
            {
                // where block
                $where = '';
                if ( $args ) {
                    // parsing user parameters and build conditions block
                    $where = 'where ' . call_user_func_array('self::sql', $args)->scalar;
                }
                // performing the built sql
                return call_user_func('self::helper', 'exec', trim("delete from $table $where"));
            }

        }
        // triggers error
        self::error('Invalid arguments for update');
        return false;
    }

    /**
     * Error handler
     * dumps the error message to the output or pass to the user-defined function
     * @param mixed $data error details (PDOException | string | array)
     */
    private static function error ( $data ) {
        // call user-defined error handler if given
        if ( self::$onfailure ) call_user_func(self::$onfailure, $data);
        else print_r($data);
    }

    /**
     * Generates the database structure array
     * array of tables where each key is a table name and values are lists of columns
     * in a list of columns each key is a column name and its value is primary key flag
     * should be used for self::$struct var filling
     * @param string $db database type (default - mysql)
     * @return array
     * @example array('users'=>array('id'=>true,'name'=>false,'pass'=>false))
     */
    public static function struct ( $db = 'mysql' ) {
        if ( $db == 'mysql' ) {
            self::$struct = array();
            // receive the table list and iterate
            foreach ( self::query('show tables') as $table ) {
                $table = reset($table);
                // receive the table's column list and iterate
                foreach ( self::query("show columns from $table") as $column ) {
                    // set column name and primary key flag
                    self::$struct[$table][$column['Field']] = ( $column['Key'] === 'PRI' );
                }
            }
            return self::$struct;
        }
        return false;
    }

}
