/**
 * Sqlite db initialization, default tables and data creation
 */

/* clear previous data */

drop table if exists entry_values;
drop table if exists note_entries;
drop table if exists notes;
drop table if exists note_tags;
drop table if exists tags;
drop table if exists users;


/* tables creation */

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


CREATE TABLE "users" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
    "name" varchar(512) NOT NULL,
    "pass" varchar(512) NOT NULL,
    "ctime" INTEGER DEFAULT 0,
    "ltime" INTEGER DEFAULT 0
);


/* indexes creation */

CREATE INDEX "entry_values_idx_id_entry" ON "entry_values" ("id_entry");
CREATE INDEX "users_idx_name" ON "users" ("name");
CREATE INDEX "notes_idx_id_user" ON "notes" ("id_user");
CREATE INDEX "note_tags_idx_id_note" ON "note_tags" ("id_note");
CREATE INDEX "note_tags_idx_id_tag" ON "note_tags" ("id_tag");
CREATE INDEX "note_entries_idx_id_note" ON "note_entries" ("id_note");
CREATE INDEX "tags_idx_id_user" ON "tags" ("id_user");
