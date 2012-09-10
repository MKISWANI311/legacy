drop table if exists entry_types;
drop table if exists entry_values;
drop table if exists note_entries;
drop table if exists notes;
drop table if exists note_tags;
drop table if exists tags;
drop table if exists users;
drop table if exists template_entries;
drop table if exists templates;


CREATE TABLE "entry_types" (
	"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
	"max" mediumint(8) NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" varchar(512) DEFAULT NULL
);

CREATE TABLE "entry_values" (
	"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
	"id_entry" INTEGER NOT NULL,
	"id_type" smallint(5) DEFAULT 1,
	"place" smallint(5) NOT NULL DEFAULT 0,
	"time" INTEGER NOT NULL DEFAULT 0,
	"name" text NOT NULL,
	"data" mediumtext NOT NULL
);

CREATE TABLE "note_entries" (
	"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
	"id_note" INTEGER NOT NULL,
	"is_active" tinyint(1) DEFAULT 1,
	"id_type" smallint(5) DEFAULT 1,
	"place" smallint(5) NOT NULL DEFAULT 0,
	"time" INTEGER NOT NULL DEFAULT 0,
	"name" text NOT NULL,
	"data" mediumtext NOT NULL
);

CREATE TABLE "note_tags" (
	"id_note" INTEGER NOT NULL,
	"id_tag" INTEGER NOT NULL,
	"time" INTEGER DEFAULT 0
);

CREATE TABLE "notes" (
	"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
	"id_user" INTEGER NOT NULL,
	"is_active" tinyint(1) DEFAULT 1,
	"ctime" INTEGER DEFAULT 0,
	"mtime" INTEGER DEFAULT 0,
	"atime" INTEGER DEFAULT 0
);

CREATE TABLE "tags" (
	"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
	"id_user" INTEGER NOT NULL DEFAULT 0,
	"name" varchar(512) NOT NULL,
	"uses" INTEGER DEFAULT 1,
	"ctime" INTEGER DEFAULT 0,
	"mtime" INTEGER DEFAULT 0
);

CREATE TABLE "template_entries" (
	"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
	"id_template" INTEGER NOT NULL,
	"id_type" smallint(5) NOT NULL,
	"name" varchar(256) NOT NULL,
	"place" smallint(5) NOT NULL DEFAULT 0
);

CREATE TABLE "templates" (
	"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
	"id_user" INTEGER NOT NULL DEFAULT 0,
	"place" smallint(5) NOT NULL DEFAULT 0,
	"name" varchar(256) NOT NULL,
	"tag" varchar(256) NOT NULL,
	"description" varchar(512) DEFAULT NULL
);

CREATE TABLE "users" (
	"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
	"name" varchar(512) NOT NULL,
	"pass" varchar(512) NOT NULL,
	"ctime" INTEGER DEFAULT 0,
	"ltime" INTEGER DEFAULT 0
);

CREATE INDEX "entry_values_idx_id_entry" ON "entry_values" ("id_entry");
CREATE INDEX "users_idx_name" ON "users" ("name");
CREATE INDEX "notes_idx_id_user" ON "notes" ("id_user");
CREATE INDEX "note_tags_idx_id_note" ON "note_tags" ("id_note");
CREATE INDEX "note_tags_idx_id_tag" ON "note_tags" ("id_tag");
CREATE INDEX "note_entries_idx_id_note" ON "note_entries" ("id_note");
CREATE INDEX "tags_idx_id_user" ON "tags" ("id_user");
CREATE INDEX "template_entries_idx_id_template" ON "template_entries" ("id_template");
CREATE INDEX "templates_idx_id_user" ON "templates" ("id_user");


insert into entry_types (id, max, name, description) values
	(1, 1024,  'line',	'title or short one line text description'),
	(2, 2048,  'uri',   'any addresses - http/https/ftp/ssh or file path'),
	(3, 1024,  'login',	'user name, login or email in some cases'),
	(4, 4096,  'password','any secret letters sequence'),
	(5, 1024,  'email',	'email address line'),
	(6, 65535, 'text',	'plain text entry for notes'),
	(7, 65535, 'html',	'formatted text entry for notes');

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
