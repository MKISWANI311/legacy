<?php
/**
 * Main front screen controller
 */

class front extends controller {

	public function index () {
		// link the current lang file
		include PATH_LANG . value($_SESSION['user']['lang'], 'en') . '.php';

		// concatenate css and js if necessary
		response::compact(PATH_JS, 'js');
		response::compact(PATH_CSS, 'css');

		if ( empty($_SESSION['user']['id']) ) {
			// suggest to login or register
			response::template('front.init');
		} else {
			// authenticated user's home

			// main page template
			response::template('front.main');
		}
	}

	public function clear ( $flag = 'user' ) {
//		cache::user_clear();
//		cache::clear(array('lookup_entry_types','lookup_note_templates','lookup_template_entries'));
//		fb('user memory and file cache cleared');
//		if ( $flag == 'user' ) return;
//		// global cache
//		apc_clear_cache();
//		apc_clear_cache('user');
//		fb('global apc cache cleared');
	}

}

?>
