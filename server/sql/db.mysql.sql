set foreign_key_checks=0;
drop database if exists fortnotes;
create database fortnotes character set 'ascii' collate 'ascii_general_ci';
use fortnotes;


drop table if exists entry_values;
create table entry_values (
    id int unsigned not null auto_increment,
    id_entry int unsigned not null comment 'link to the note_entries table record by id',
    id_type smallint unsigned default 1 comment 'link to the entry_types table record by id',
    place smallint unsigned not null default 0 comment 'order of the record',
    time int unsigned not null default 0 comment 'creation or last edit timestamp',
    name text not null comment 'encoded entry title if necessary to overwrite the default one',
    data mediumtext not null comment 'encoded entry data',

    primary key (id),
    key idx_id_entry (id_entry)
) engine=innodb default charset=ascii comment='note parts actual values with versioning';


drop table if exists note_entries;
create table note_entries (
    id int unsigned not null auto_increment,
    id_note int unsigned not null comment 'link to the notes table record by id',
    is_active tinyint(1) unsigned default 1 comment 'boolean flag shows if the record is active or deleted',
    id_type smallint unsigned default 1 comment 'link to the entry_types table record by id',
    place smallint unsigned not null default 0 comment 'order of the record',
    time int unsigned not null default 0 comment 'creation or last edit timestamp',
    name text not null comment 'encoded entry title if necessary to overwrite the default one',
    data mediumtext not null comment 'encoded entry data',

    primary key (id),
    key idx_id_note (id_note)
) engine=innodb default charset=ascii comment='note parts linked to notes and entry types';


drop table if exists notes;
create table notes (
    id int unsigned not null auto_increment,
    id_user int unsigned not null comment 'link to the users table by id',
    is_active tinyint(1) unsigned default 1 comment 'boolean flag shows if the record is active or deleted',
    ctime int unsigned default 0 comment 'creation timestamp',
    mtime int unsigned default 0 comment 'last modification timestamp',
    atime int unsigned default 0 comment 'last record reading access timestamp',

    primary key (id),
    key idx_id_user (id_user)
) engine=innodb default charset=ascii comment='notes definitions linked to users';


drop table if exists note_tags;
create table note_tags (
    id_note int unsigned not null comment 'link to the notes table record by id',
    id_tag int unsigned not null comment 'link to the tags table record by id',
    time int unsigned default 0 comment 'timestamp of link creation',

    key idx_id_note (id_note),
    key idx_id_tag (id_tag)
) engine=innodb default charset=ascii comment='links between notes and tags';


drop table if exists tags;
create table tags (
    id int unsigned not null auto_increment,
    id_user int unsigned not null default '0' comment 'link to the users table by id\nif 0 then common tag for everybody',
    name varchar(512) not null comment 'encoded tag name',
    uses int(10) unsigned default 1 comment 'amount of links to this tag',
    ctime int unsigned default 0 comment 'creation timestamp',
    mtime int unsigned default 0 comment 'last modification timestamp',

    primary key (id),
    key idx_id_user (id_user)
) engine=innodb default charset=ascii comment='tags linked to users';


drop table if exists users;
create table users (
    id int unsigned not null auto_increment,
    name varchar(512) not null comment 'hash of the user name',
    pass varchar(512) not null comment 'hash of the user password',
    ctime int unsigned default 0 comment 'creation timestamp',
    ltime int unsigned default 0 comment 'last login timestamp',

    primary key (id),
    key idx_name (name(255))
) engine=innodb default charset=ascii comment='users with name/pass encoded';
