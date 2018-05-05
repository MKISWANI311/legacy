<?php
/**
 * User management
 *   - login/logout
 *   - master password hash save
 */
class user extends controller {

    function auth () {
        $_REQUEST = json_decode(file_get_contents('php://input'), true);

        $username = isset($_REQUEST['name']) ? trim($_REQUEST['name']) : null;
        $password = isset($_REQUEST['pass']) ? trim($_REQUEST['pass']) : null;
        $authmode = isset($_REQUEST['mode']) ? trim($_REQUEST['mode']) : null;

        $result = array();

        if ( $username && $password ) {
            $user = db::queryFirstRow('select id,pass from users where name = @s limit 1', $username);
            if ( $user && $authmode == 'login' ) {
                if ( $user['pass'] == $password ) {
                    $result['id']   = $user['id'];
                    $result['time'] = INIT_TIMESTAMP;
                    $result['hash'] = $user['pass'];
                    db::update('users', array('ltime' => $result['time']), 'id = @i', $user['id']);
                }
            } else if ( !$user && $authmode == 'register' ) {
                if ( isset($_SESSION['captcha']) && strtolower($_REQUEST['code']) == strtolower($_SESSION['captcha']['code']) ) {
                    // clear captcha temp data
                    unset($_SESSION['captcha']);
                    $result['id'] = db::insert('users', array(
                        'name'  => $username,
                        'pass'  => $password,
                        'ctime' => INIT_TIMESTAMP,
                    ));
                    $result['time'] = 0;
                    $result['hash'] = $password;
                } else {
                    $result['code'] = false;
                }

                // clone templates
//                $tlist = db::query('select id, @i as id_user,place,name,tag,description from templates where id_user = 0', $result['id']);
//                db::insert('templates', $tlist);
//                foreach ( $tlist as $tpl ) {
//
//                }
            }

            if ( !empty($result['id']) ) {
                // set lifetime of the session cookie to 30 days and start
                session_set_cookie_params(2592000);
                // create cache dir for user searches if not exist
                $path = PATH_CACHE . 'searches' . DIRECTORY_SEPARATOR . sprintf('%010s', $result['id']);
                if ( !is_dir($path) ) mkdir($path);
                $_SESSION['user'] = $result;
            }
        }
        response::json($result);
    }

    function info () {
        response::json($_SESSION['user']);
    }

    function data () {
        response::json(array(
            'entry_types' => json_decode(cache::db_entry_types()),
            'templates' => json_decode(cache::db_templates()),
            'template_entries' => json_decode(cache::db_template_entries()),
            'tags' => json_decode(cache::db_tags())
        ));
    }

    /**
     * Save the master password hash
     * @param string $action - "save" at the moment
     */
//    function hash ( $action ) {
//        $result = array('ok'=>false);
//        // save master password hash
//        if ( strtolower(trim($action)) == 'save' ) {
//            if ( !empty($_REQUEST['hash']) ) {
//                db::update('users', array('hash' => $_REQUEST['hash']), 'id = @s', $_SESSION['user']['id']);
//                $_SESSION['user']['hash'] = $_REQUEST['hash'];
//                $result['ok'] = true;
//            } else {
//
//            }
//        }
//        response::json($result);
//    }

    /**
     * Captcha image to test if a user
     */
    function captcha () {
        $result = array();

        include(PATH_PUBLIC . 'captcha/simple-php-captcha.php');
        try {
            $_SESSION['captcha'] = simple_php_captcha(array(
                'min_length' => 6,
                'max_length' => 6,
                'min_font_size' => 24,
                'max_font_size' => 30,
            ));
            $result['src'] = $_SESSION['captcha']['image_src'];
        } catch ( Exception $e ) {
            // todo: add
        }

        response::json($result);
    }

    function signout () {
        $result = false;

        // check if session id set
        if ( !empty($_COOKIE[session_name()]) ) {
            // clear cache
            cache::user_clear('tags');
            cache::user_clear('searches');
            //fb('/user/signout');
            session_unset();
            $params = session_get_cookie_params();
            setcookie(session_name(), '', INIT_TIMESTAMP - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
            $result = session_destroy();
        }

        response::json($result);
    }

    /**
     * Collects and dumps all the user data
     * @param string $type data format flag: plain|zip
     * @example https://fortnotes.dev/user/export/plain
     * @example https://fortnotes.dev/user/export/txt
     * @example https://fortnotes.dev/user/export/zip
     */
    function export ( $type = 'plain' ) {
        $type = strtolower(trim($type));
        $data = array();
        // check if logged in
        if ( !empty($_SESSION['user']['id']) && ($id_user = $_SESSION['user']['id']) ) {
            // metadata
            $data['info'] = array(
                'hash'    => $_SESSION['user']['hash'],
                'time'    => time(),
                'version' => 1  // format version
            );
            if ( $type == 'plain' ) {
                $data['tags'] = matrix_order(db::query('select id,name from tags where id_user = @i', $id_user), 'id', 'name');
                $data['note_tags'] = matrix_group(db::query('select id_note,id_tag from note_tags where id_note in (select id from notes where id_user = @i)', $id_user), 'id_note');
                $data['notes'] = matrix_group(
                    db::query('select id_note,name,data from note_entries where is_active=1 and id_note in (select id from notes where is_active=1 and id_user = @i) order by id_note, place', $id_user),
                    'id_note');
                krsort($data['notes']);
            } else {
                // full backup
                $data['tags'] = matrix_order(db::query('select * from tags where id_user = @i', $id_user), 'id');
                $data['notes'] = matrix_order(db::query('select * from notes where id_user = @i', $id_user), 'id');
                $data['note_tags'] = db::query('select * from note_tags where id_note in (select id from notes where id_user = @i)', $id_user);
                $data['note_entries'] = matrix_order(db::query('select * from note_entries where id_note in (select id from notes where id_user = @i)', $id_user), 'id');
                $data['entry_values'] = matrix_order(db::query('select * from entry_values where id_entry in (select id from note_entries where id_note in (select id from notes where id_user = @i))', $id_user), 'id');
            }
        }
        $data = json_encode($data, JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE);
        if ( $type == 'plain' ) {
            response::json($data, false, true);
        } else if ( $type == 'txt' ) {
            response::txt($data);
        } else if ( $type == 'zip' ) {
            response::zip($data);
        }
    }

    /**
     * Handles the backup restore process
     * check uploaded file, decompress/decode and import
     * @param string $type data type
     */
    function import ( $type = '' ) {
        // check if logged in
        if ( !empty($_SESSION['user']['id']) && $_SESSION['user']['id'] ) {
            //fb($_FILES);
            $result = array();
            /*if ( $type != 'zip' ) {
                $result['error'] = 'Import type must be zip';
            } else */
            if ( !isset($_FILES['file']) ) {
                $result['error'] = 'No file was uploaded';
            } else if ( $_FILES['file']['error'] == UPLOAD_ERR_INI_SIZE ) {
                $result['error'] = 'Upload failed because the file is too large (maximum ' . ini_get('upload_max_filesize') . ')';
            } else if ( $_FILES['file']['error'] != UPLOAD_ERR_OK ) {
                $result['error'] = 'Upload failed. Error number: ' . $_FILES['file']['error'];
            } else if ( $_FILES['file']['size'] == 0 ) {
                $result['error'] = 'Uploaded file size is zero';
            } else {
                // validation
                if ( is_uploaded_file($_FILES['file']['tmp_name']) ) {
                    $data = file_get_contents($_FILES['file']['tmp_name']);
                    if ( $data ) {
                        //$data = gzdecode($data);
                        //if ( $data ) {
                            $data = json_decode($data, true);
                            if ( !is_null($data) ) {
                                $result = self::import_json($data);
                            } else {
                                $result['error'] = 'Failed to decode JSON';
                            }
                        //} else {
                        //    $result['error'] = 'Failed to decompress the file';
                        //}
                    } else {
                        $result['error'] = 'Failed to read the file';
                    }
                    // delete temp file
                    unlink($_FILES['file']['tmp_name']);
                } else {
                    $result['error'] = 'Error opening temporary file';
                }
            }
        } else {
            $result['error'] = 'not authorized';
        }

        //fb($result, 'import');
        response::json($result);
    }

    /**
     * Clears old data and insert the data from uploaded backup
     * @param array $import backup data to restore
     * @return array operation status and records statistics or false on failure
     */
    private function import_json ( $import ) {
        $result = array();
        if ( db::begin() ) {
            $db_fail = false;
            $id_user = $_SESSION['user']['id'];

            // First we obtain a list of all the IDs of the existing records, so that we can selectively delete them later.
            $db_fail = $db_fail || false === ($existing_tags  = db::query('select id from tags where id_user = @i', $id_user));
            $db_fail = $db_fail || false === ($existing_notes = db::query('select id from notes where id_user = @i', $id_user));
            $db_fail = $db_fail || false === ($existing_note_entries = db::query('select id from note_entries where id_note in (select id from notes where id_user = @i)', $id_user));
            $db_fail = $db_fail || false === ($existing_entry_values = db::query('select id from entry_values where id_entry in (select id from note_entries where id_note in (select id from notes where id_user = @i))', $id_user));

            // reorganize the data
            $existing_tags  = matrix_column(value($existing_tags), 'id');
            $existing_notes = matrix_column(value($existing_notes), 'id');
            $existing_note_entries = matrix_column(value($existing_note_entries), 'id');
            $existing_entry_values = matrix_column(value($existing_entry_values), 'id');

            // Insert the imported records
            // with mapping from old id to new id

            $new_tags = array();
            // validate import block
            if ( isset($import['tags']) && is_array($import['tags']) ) {
                foreach ( $import['tags'] as $id => $record ) {
                    $record['id_user'] = $id_user;
                    // insert new item and make link between old and new
                    if ( !($db_fail = $db_fail || false === ($new_id = db::insert('tags', $record))) ) {
                        $new_tags[$id] = $new_id;
                    }
                }
            }

            $new_notes = array();
            // validate import block
            if ( isset($import['notes']) && is_array($import['notes']) ) {
                foreach ( $import['notes'] as $id => $record ) {
                    $record['id_user'] = $id_user;
                    // insert new item and make link between old and new
                    if ( !($db_fail = $db_fail || false === ($new_id = db::insert('notes', $record))) ) {
                        $new_notes[$id] = $new_id;
                    }
                }
            }

            $result['num_note_tags_new'] = 0;
            // validate import block
            if ( isset($import['note_tags']) && is_array($import['note_tags']) ) {
                foreach ( $import['note_tags'] as $record ) {
                    $record['id_tag'] = $new_tags[$record['id_tag']];
                    $record['id_note'] = $new_notes[$record['id_note']];
                    // insert new item and inc total links counter
                    if ( !($db_fail = $db_fail || false === db::insert('note_tags', $record)) ) {
                        // statistics
                        $result['num_note_tags_new']++;
                    }
                }
            }

            $new_note_entries = array();
            // validate import block
            if ( isset($import['note_entries']) && is_array($import['note_entries']) ) {
                foreach ( $import['note_entries'] as $id => $record ) {
                    $record['id_note'] = $new_notes[$record['id_note']];
                    // insert new item and make link between old and new
                    if ( !($db_fail = $db_fail || false === ($new_id = db::insert('note_entries', $record))) ) {
                        $new_note_entries[$id] = $new_id;
                    }
                }
            }

            $result['num_entry_values_new'] = 0;
            // validate import block
            if ( isset($import['entry_values']) && is_array($import['entry_values']) ) {
                foreach ( $import['entry_values'] as $id => $record ) {
                    $record['id_entry'] = $new_note_entries[$record['id_entry']];
                    // insert new item and inc total links counter
                    if ( !($db_fail = $db_fail || false === db::insert('entry_values', $record)) ) {
                        // statistics
                        $result['num_entry_values_new']++;
                    }
                }
            }

            // statistics old
            $result['num_tags_old']  = count($existing_tags);
            $result['num_notes_old'] = count($existing_notes);
            $result['num_note_entries_old'] = count($existing_note_entries);
            $result['num_entry_values_old'] = count($existing_entry_values);
            // statistics new
            $result['num_tags_new'] = count($new_tags);
            $result['num_notes_new'] = count($new_notes);
            $result['num_note_entries_new'] = count($new_note_entries);

            // Delete the old records that existed before the import
            if ( $result['num_entry_values_old'] > 0 ) $db_fail = $db_fail || (db::delete('entry_values', 'id in @li', $existing_entry_values) === false);
            if ( $result['num_note_entries_old'] > 0 ) $db_fail = $db_fail || (db::delete('note_entries', 'id in @li', $existing_note_entries) === false);
            if ( $result['num_notes_old'] > 0 ) $db_fail = $db_fail || (db::delete('note_tags', 'id_note in @li', $existing_notes) === false);
            if ( $result['num_notes_old'] > 0 ) $db_fail = $db_fail || (db::delete('notes', 'id_user = @i and id in @li', $id_user, $existing_notes) === false);
            if ( $result['num_tags_old']  > 0 ) $db_fail = $db_fail || (db::delete('tags', 'id_user = @i and id in @li', $id_user, $existing_tags) === false);

            if ( !$db_fail ) {
                // finalization
                db::commit();
                // reset cache
                cache::user_clear('tags');
                cache::user_clear('searches');
                // restore user search cache dir manually as next time it will be only on login
                mkdir(PATH_CACHE . 'searches' . DIRECTORY_SEPARATOR . sprintf('%010s', $id_user));
            } else {
                $result['error'] = 'Database error';
                db::rollback();
            }

            return $result;
        }
        return false;
    }
}
