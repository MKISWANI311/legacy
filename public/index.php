<?php
/**
 * Main application handler
 * receives all the requests and forward them further
 * @author DarkPark, Ukraine Odessa 2012
 */

// main application include
include '../library/app.core.php';

// additional modules
include PATH_LIBRARY . 'firephp.php';

// core modules
include PATH_LIBRARY . 'app.db.php';
include PATH_LIBRARY . 'app.init.php';
include PATH_LIBRARY . 'app.tools.php';
include PATH_LIBRARY . 'app.cache.php';

//$data = array();
//foreach ( db::query('show tables') as $table ) {
//	$table = current($table);
//	foreach ( db::query("show columns from $table") as $column ) {
//		$column = array_change_key_case($column, CASE_LOWER);
//		$field  = $column['field'];
//		$column['null'] = $column['null'] == 'NO' ? 0 : 1;
//		unset($column['field']);
//		$data[$table][$field] = $column;
//	}
//}
//fb($data);

//fb(db::sql('  @s and @i  ', 's"t\r', 128));
//fb(db::sql('select * from users where id in @li and name = @s', array(1,2,3), 'Troy'));
//fb(db::sql('select * from notes where id in (@s)', 'qwe'));
//db::query('explain select * from notes where id in (1)');
//db::exec('delete from notes where id = 0');
//db::query('select * from note_entries where id_note in (1,2,3,4,5,6,7,8,9)');
//db::query('select * from notes where id in %li', 1,2,3);
//db::query("show columns from entry_types");

//$data = array();
//foreach ( db::query('show tables') as $table ) {
//	$table = current($table);
//	foreach ( db::query("show columns from $table") as $column ) {
//		$column = array_change_key_case($column, CASE_LOWER);
//		$field  = array('null' => $column['null'] == 'NO' ? 0 : 1);
//		if ( $column['key'] == 'PRI' ) $field['pk'] = true;
//		$data[$table][$column['field']] = $field;
//	}
//}
//echo 'db: structure file generation ' . ($data ? 'successful' : 'failed') . "\n";
//$data = sprintf("<?php\nreturn %s;\n>", var_export($data, true));
//file_put_contents(PATH_CACHE . 'db.struct.php', $data);

//$sql = 'select * from notes where id in #li#';
//$tagname = strtok($sql, '#');
//fb($tagname);
//fb(strtok('#'));

// all the magic
app::run();

?>