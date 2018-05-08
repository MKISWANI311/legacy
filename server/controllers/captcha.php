<?php

class captcha extends controller {

    function uri () {
        include(PATH_LIBRARY . 'captcha/index.php');

        $result = array();

        try {
            $_SESSION['captcha'] = simple_php_captcha(array(
                'min_length' => 6,
                'max_length' => 6,
                'min_font_size' => 24,
                'max_font_size' => 30,
            ));
            $result['src'] = 'captcha/img/?' . explode('?', $_SESSION['captcha']['image_src'])[1];
        } catch ( Exception $e ) {
            // todo: add
        }

        response::json($result);
    }

    function img () {
        include(PATH_LIBRARY . 'captcha/index.php');
    }

}