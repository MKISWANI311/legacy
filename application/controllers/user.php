<?php
/**
 * User management
 *   - login/logout
 *   - master password hash save
 */
class user extends controller {

	function auth () {
		$username = isset($_REQUEST['name']) ? trim($_REQUEST['name']) : null;
		$password = isset($_REQUEST['pass']) ? trim($_REQUEST['pass']) : null;
		$authmode = isset($_REQUEST['mode']) ? trim($_REQUEST['mode']) : null;

		$result = array();

		if ( $username && $password ) {
			$user = db::queryFirstRow('select id,pass,hash from users where name = @s limit 1', $username);
			if ( $user && $authmode == 'login' ) {
				if ( $user['pass'] == $password ) {
					$result['id']   = $user['id'];
					$result['time'] = INIT_TIMESTAMP;
					$result['hash'] = $user['hash'];
					db::update('users', array('ltime' => $result['time']), 'id = @i limit 1', $user['id']);
				}
			} else if ( !$user && $authmode == 'register' ) {
				if ( strtolower($_REQUEST['code']) == strtolower($_SESSION['captcha']['code']) ) {
					unset($_SESSION['captcha']);
					$result['id'] = db::insert('users', array(
						'name'  => $username,
						'pass'  => $password,
						'ctime' => INIT_TIMESTAMP,
					));
					$result['time'] = 0;
					$result['hash'] = null;
				} else {
					$result['code'] = false;
				}

				// clone templates
//				$tlist = db::query('select id, @i as id_user,place,name,tag,description from templates where id_user = 0', $result['id']);
//				db::insert('templates', $tlist);
//				foreach ( $tlist as $tpl ) {
//
//				}
			}

			if ( !empty($result['id']) ) {
				// check if session id set
				if ( empty($_COOKIE[session_name()]) ) {
					// set lifetime of the session cookie to 2 weeks and start
					session_set_cookie_params(1209600);
					// first time session creation
					session_start();
					// create cache dir for user searches
					mkdir(PATH_CACHE . 'searches' . DIRECTORY_SEPARATOR . sprintf('%010s', $result['id']));
				}
				$_SESSION['user'] = $result;
			}
		}
		response::json($result);
	}

	/**
	 * Save the master password hash
	 * @param string $action - "save" at the moment
	 */
	function hash ( $action ) {
		$result = array('ok'=>false);
		// save master password hash
		if ( strtolower(trim($action)) == 'save' ) {
			if ( !empty($_REQUEST['hash']) ) {
				db::update('users', array('hash' => $_REQUEST['hash']), 'id = @s', $_SESSION['user']['id']);
				$_SESSION['user']['hash'] = $_REQUEST['hash'];
				$result['ok'] = true;
			} else {

			}
		}
		response::json($result);
	}

	/**
	 * Captcha imgage to test if a user
	 */
	function captcha () {
		$result = array();
		include(PATH_PUBLIC . 'captcha/captcha.php');
		$_SESSION['captcha'] = captcha(array(
			'min_length' => 6,
			'max_length' => 6
		));
		$result['src'] = $_SESSION['captcha']['image_src'];
		response::json($result);
	}

	function signout () {
		// check if session id set
		if ( !empty($_COOKIE[session_name()]) ) {
			// clear cache
			//cache::user_clear();
			fb('/user/signout');
			session_unset();
			$params = session_get_cookie_params();
			setcookie(session_name(), '', INIT_TIMESTAMP - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
			return session_destroy();
		}
	}

}

?>