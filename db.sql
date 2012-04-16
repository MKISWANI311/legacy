set foreign_key_checks=0;
drop database if exists fortnotes;
create database fortnotes character set 'ascii' collate 'ascii_general_ci';
use fortnotes;

create table phpunit (
	id int unsigned not null auto_increment,
	id_type smallint unsigned default 1,
	name varchar(200) not null default '',
	time int unsigned not null default 0,

	primary key (id),
	key idx_id_type (id_type)
) engine=memory default charset=ascii comment='PHPUnit test table';

drop table if exists entry_types;
create table entry_types (
	id int unsigned not null auto_increment,
	max mediumint unsigned not null comment 'max length of data in the fields of this type',
	name varchar(256) not null comment 'name of the entry',
	description varchar(512) default null,

	primary key (id)
) engine=innodb default charset=ascii comment='note parts types (text/pass/url/email)';

drop table if exists entry_values;
create table entry_values (
	id int unsigned not null auto_increment,
	id_entry int unsigned not null comment 'link to the note_entries table record by id',
	/*version int unsigned not null default '1' comment 'incrementing record version',/**/
	id_type smallint unsigned default 1 comment 'link to the entry_types table record by id',
	place smallint unsigned not null default 0 comment 'order of the record',
	time int unsigned not null default 0 comment 'creation or last edit timestamp',
	name text not null comment 'encoded entry title if necessary to overwrite the default one',
	data mediumtext not null comment 'encoded entry data',
	/*name_hash varchar(256) comment 'hash of the entry title to check consistency',
	value_hash varchar(256) comment 'hash of the value to check consistency',/**/

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
	/*name_hash varchar(256) comment 'hash of the entry title to check consistency',/**/
	/*value_hash varchar(256) comment 'hash of the value to check consistency',/**/

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
	/*htime int unsigned default 0 comment 'last note values history reading timestamp',/**/

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
	hash varchar(512) comment 'master password hash for the consistency purpose',
	ctime int unsigned default 0 comment 'creation timestamp',
	ltime int unsigned default 0 comment 'last login timestamp',

	primary key (id),
	key idx_name (name(255))
) engine=innodb default charset=ascii comment='users with name/pass encoded';

drop table if exists template_entries;
create table template_entries (
	id int unsigned not null auto_increment,
	id_template int unsigned not null comment 'link to the templates table by id',
	id_type smallint unsigned not null comment 'link to the entry_types table by id',
	name varchar(256) not null comment 'entry template title',
	place smallint unsigned not null default 0 comment 'order of the record',

	primary key (id),
	key idx_id_template (id_template)
) engine=innodb default charset=ascii comment='note templates entries linked to note templates';

drop table if exists templates;
create table templates (
	id int unsigned not null auto_increment,
	id_user int unsigned not null default 0 comment 'link to the users table by id\nif 0 then common type for everybody',
	place smallint unsigned not null default 0 comment 'order of the record',
	name varchar(256) not null comment 'note type name',
	tag varchar(256) not null comment 'tag value for autotagging',
	description varchar(512) default null,

	primary key (id),
	key idx_id_user (id_user)
) engine=innodb default charset=ascii comment='note templates for particular users or for common use';

insert into entry_types (id, max, name, description) values
	(1, 1024,  'line',	'title or short one line text description'),
	(2, 2048,  'uri',   'any addresses - http/https/ftp/ssh or file path'),
	(3, 1024,  'login',	'user name, login or email in some cases'),
	(4, 4096,  'password','any secret letters sequence'),
	(5, 1024,  'email',	'email address line'),
	(6, 65535, 'text',	'plain text entry for notes'),
	(7, 65535, 'html',	'formatted text entry for notes')/*,
	(8, 16777215, 'file',	'file of any type'),
	(9, 16777215, 'image',	'image/picture file type')/**/;

insert into templates (id_user, place, name, tag, description) values
	(0, 0, 'note',    'note',    'simple note with title and text'),
	(0, 1, 'site',    'site',    'regular site bookmark'),
	(0, 2, 'email',   'email',   'email address record'),
	(0, 3, 'icq',     'icq',     'icq account information'),
	(0, 4, 'msn',     'msn',     'msn account information'),
	(0, 5, 'skype',   'skype',   'skype account details'),
	(0, 6, 'jabber',  'jabber',  'jabber account information'),
	(0, 7, 'ftp',     'ftp',     'ftp server data'),
	(0, 8, 'ssh',     'ssh',     'ssh server data'),
	(0, 9, 'database','database','database access parameters');
-- 	(0,10, 'phone',   'phone',   'telephone/cell number'),
-- 	(0,11, 'visa',    'visa',    'visa card data');

insert into template_entries (id_template, id_type, name, place) values
	((select id from templates where name = 'note'), 1, 'title', 0),
	((select id from templates where name = 'note'), 6, 'description', 1);

insert into template_entries (id_template, id_type, name, place) values
	((select id from templates where name = 'site'), 2, 'site url', 0),
	((select id from templates where name = 'site'), 3, 'username', 1),
	((select id from templates where name = 'site'), 4, 'password', 2),
	((select id from templates where name = 'site'), 6, 'comments', 3);

insert into template_entries (id_template, id_type, name, place) values
	((select id from templates where name = 'email'), 2, 'site url', 0),
	((select id from templates where name = 'email'), 5, 'email', 1),
	((select id from templates where name = 'email'), 4, 'password', 2),
	((select id from templates where name = 'email'), 6, 'comments', 3);

insert into template_entries (id_template, id_type, name, place) values
	((select id from templates where name = 'skype'), 3, 'skype name', 0),
	((select id from templates where name = 'skype'), 4, 'password', 1),
	((select id from templates where name = 'skype'), 6, 'comments', 2);

insert into template_entries (id_template, id_type, name, place) values
	((select id from templates where name = 'icq'), 3, 'icq number', 0),
	((select id from templates where name = 'icq'), 4, 'password', 1),
	((select id from templates where name = 'icq'), 6, 'comments', 2);

insert into template_entries (id_template, id_type, name, place) values
	((select id from templates where name = 'jabber'), 2, 'server address', 0),
	((select id from templates where name = 'jabber'), 3, 'username', 1),
	((select id from templates where name = 'jabber'), 4, 'password', 2),
	((select id from templates where name = 'jabber'), 6, 'comments', 3);

insert into template_entries (id_template, id_type, name, place) values
	((select id from templates where name = 'msn'), 5, 'email', 0),
	((select id from templates where name = 'msn'), 4, 'password', 1),
	((select id from templates where name = 'msn'), 6, 'comments', 2);

insert into template_entries (id_template, id_type, name, place) values
	((select id from templates where name = 'ssh'), 2, 'server address', 0),
	((select id from templates where name = 'ssh'), 3, 'username', 1),
	((select id from templates where name = 'ssh'), 4, 'password', 2),
	((select id from templates where name = 'ssh'), 6, 'comments', 3);

insert into template_entries (id_template, id_type, name, place) values
	((select id from templates where name = 'ftp'), 2, 'server address', 0),
	((select id from templates where name = 'ftp'), 3, 'username', 1),
	((select id from templates where name = 'ftp'), 4, 'password', 2),
	((select id from templates where name = 'ftp'), 6, 'comments', 3);

insert into template_entries (id_template, id_type, name, place) values
	((select id from templates where name = 'database'), 2, 'server address', 0),
	((select id from templates where name = 'database'), 1, 'database name', 1),
	((select id from templates where name = 'database'), 3, 'username', 2),
	((select id from templates where name = 'database'), 4, 'password', 3),
	((select id from templates where name = 'database'), 6, 'comments', 4);

-- insert into template_entries (id_template, id_type, name, place) values
-- 	((select id from templates where name = 'phone'), 1, 'phone number', 0),
-- 	((select id from templates where name = 'phone'), 3, 'person', 1),
-- 	((select id from templates where name = 'phone'), 6, 'description', 2);
--
-- insert into template_entries (id_template, id_type, name, place) values
-- 	((select id from templates where name = 'visa'), 1, 'card number', 0),
-- 	((select id from templates where name = 'visa'), 3, 'person', 1),
-- 	((select id from templates where name = 'visa'), 6, 'description', 2);

--insert into fortnotes.users (id, name, pass, hash, ctime) values (1, '', '', '', 1305211680);
--insert into fortnotes.users (id, name, pass, hash, ctime) values (2, '', '', '', 1305211680);
--insert into fortnotes.users (id, name, pass, hash, ctime) values (3, 'a9dc602f9d82bc6720b2b4bb016edcacf7da4b2b453a466b742da743f3cba15d', 'a9dc602f9d82bc6720b2b4bb016edcacf7da4b2b453a466b742da743f3cba15d', 'a9dc602f9d82bc6720b2b4bb016edcacf7da4b2b453a466b742da743f3cba15d', 1305211680);


--RESET QUERY CACHE;
--select @@autocommit;
--select @@wait_timeout;
