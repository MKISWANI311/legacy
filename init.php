<?php
/**
 * Main init script
 * db structure generation, js/css files merging and so on
 * @author DarkPark, Ukraine Odessa 2012
 */

// main application include
include 'library/app.core.php';

// core modules
include PATH_LIBRARY . 'app.db.php';
include PATH_LIBRARY . 'app.init.php';
include PATH_LIBRARY . 'app.tools.php';

// get database structure and write to php file
if ( ($data = db::struct()) ) {
	echo "[ok]\tdatabase structure file generation\n";
	file_put_contents(PATH_CACHE . 'db.struct.php',
		sprintf("<?php\nreturn %s;\n?>", var_export($data, true)));
} else {
	echo "[fail]\tdatabase structure file generation\n";
}