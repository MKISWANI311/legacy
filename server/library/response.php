<?php

/**
 * Application response
 * @author dp
 */
class response {

    //public static function send () {}

    public static function txt ( $data ) {
        // send headers
        header('Content-Type: application/x-download');
        header('Content-Length: ' . strlen($data));
        header('Content-Disposition: attachment; filename="fortnotes.export.'.date('Ymd').'.txt"');
        header('Cache-Control: no-cache, no-store, max-age=0, must-revalidate');
        header('Pragma: no-cache');
        // output data
        echo $data;
    }

    public static function zip ( $data ) {
        // disable ZLIB output compression
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
        if ( $gzip ) {
            header('Content-Encoding: gzip');
        }
        header('Content-Length: ' . strlen($data));
        header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . 'GMT');
        header('Cache-Control: no-cache, no-store, max-age=0, must-revalidate');
        header('Pragma: no-cache');

        // send data
        echo $data;

        return $data;
    }

}