<?php

return array (
    'entry_types' => array (
        'id' => true,
        'max' => false,
        'name' => false,
        'description' => false,
    ),
    'entry_values' => array (
        'id' => true,
        'id_entry' => false,
        'id_type' => false,
        'place' => false,
        'time' => false,
        'name' => false,
        'data' => false,
    ),
    'note_entries' => array (
        'id' => true,
        'id_note' => false,
        'is_active' => false,
        'id_type' => false,
        'place' => false,
        'time' => false,
        'name' => false,
        'data' => false,
    ),
    'note_tags' => array (
        'id_note' => false,
        'id_tag' => false,
        'time' => false,
    ),
    'notes' => array (
        'id' => true,
        'id_user' => false,
        'is_active' => false,
        'ctime' => false,
        'mtime' => false,
        'atime' => false,
    ),
    'tags' => array (
        'id' => true,
        'id_user' => false,
        'name' => false,
        'uses' => false,
        'ctime' => false,
        'mtime' => false,
    ),
    'template_entries' => array (
        'id' => true,
        'id_template' => false,
        'id_type' => false,
        'name' => false,
        'place' => false,
    ),
    'templates' => array (
        'id' => true,
        'id_user' => false,
        'place' => false,
        'name' => false,
        'tag' => false,
        'description' => false,
    ),
    'users' => array (
        'id' => true,
        'name' => false,
        'pass' => false,
        'ctime' => false,
        'ltime' => false,
    )
);