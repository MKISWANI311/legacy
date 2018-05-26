<?php

/**
 * Main cacher class
 * @author DarkPark
 */
class cache {

    /**
     * Get/set variable using session
     * if value set then setting otherwise - requesting
     * @param string $name var name to get/set
     * @param mixed $value var value to set
     * @return mixed
     */
    public static function sess ( $name, $value = null ) {
        if ( $value === null ) {
            // obtaining data
            if ( isset($_SESSION['cache'][$name]) )
                $value = $_SESSION['cache'][$name];
        } else {
            // setting
            $_SESSION['cache'][$name] = $value;
        }

        return $value;
    }

    /**
     * Clears given session variable or all cached data
     * if $name is not set then clears everything
     * @param string $name var name to clear
     */
    public static function sess_clear ( $name = null ) {
        if ( $name === null ) {
            // clearing all
            $_SESSION['cache'] = array();
        } else if ( $name && isset($_SESSION['cache'][$name]) ) {
            // delete single value
            unset($_SESSION['cache'][$name]);
        }
    }

    /**
     * Get/set variable using apc cache
     * if value set then setting otherwise - requesting
     * @param string $name var name to get/set
     * @param mixed $value var value to set
     * @param int $ttl time in seconds to store (0 - infinite)
     * @return mixed
     */
    public static function apc ( $name, $value = null, $ttl = 0 ) {
        $name = $_SERVER['SERVER_NAME'] . ':' . $name;
        if ( $value === null ) {
            // obtaining data
            $success = true;
            $value   = apcu_fetch($name, $success);
            // fail to get
            if ( !$success ) $value = null;
        } else {
            // setting
            apcu_store($name, $value, $ttl);
        }

        return $value;
    }


    public static function clear ( $list ) {
        foreach ( $list as $name ) {
            apcu_delete($name);
            unset($_SESSION['cache'][$name]);
            //self::clear_file($name);
        }
    }

}
