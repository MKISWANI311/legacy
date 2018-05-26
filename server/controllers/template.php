<?php

/**
 * not used at the moment
 * not working but maybe useful code
 */
class template {

    function data () {
        $data = db::query('select id, name, tag as tags, description from templates where id_user = 0 order by place');

        response::json($data);
    }


    /**
     * List of note templates for given user + common
     * @param int $id_user link to user otherwise taken from session
     * @return string json
     */
    public static function db_templates ( $id_user = null ) {
        if ( null === ($data_common = self::apc('lookup_note_templates')) ) {
            // cache is empty, filling
            $data_common = db::query('select id,1 as sys,name,tag,description from templates where id_user = 0 order by place');
            //$data_common = self::apc('lookup_note_templates', matrix_order($data_common, 'id'));
            $data_common = self::apc('lookup_note_templates', json_encode(array_pack($data_common), JSON_NUMERIC_CHECK));
        }

        return $data_common;
    }

    /**
     * List of template entries for given user + common
     * @param int $id_user link to user otherwise taken from session
     * @return string json
     */
    public static function db_template_entries ( $id_user = null ) {
        if ( null === ($data_common = self::apc('lookup_template_entries')) ) {
            // cache is empty, filling
            $sql = 'select te.id_template,te.id_type,te.name from template_entries te, templates t where te.id_template = t.id and t.id_user = @i order by te.id_template,te.place';
            $data_common = db::query($sql, 0);
            $data_common = self::apc('lookup_template_entries', json_encode(array_pack(matrix_group($data_common, 'id_template')), JSON_NUMERIC_CHECK));
        }

        return $data_common;
    }

}
