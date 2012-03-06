#!/bin/bash
# creates dir cache in the script's dir
# bind cache directory to memory
# fill it with specific work directories

# project root
base=$(realpath $(dirname $0))
cd "$base" && echo "[$base]"

# Create self signed SSL Certificate
#openssl req -new -x509 -keyout lighttpd.fortnotes.dev.pem -out lighttpd.fortnotes.dev.pem -days 365 -nodes
#chown http:http lighttpd.fortnotes.dev.pem
#chmod 0600 lighttpd.fortnotes.dev.pem

# prepare directory
mkdir -p cache && chmod 700 cache && echo "cache: directory prepared"

# try to unmount if already exist
umount cache && echo "cache: directory unmounted"
# bind the directory to memory
mount -t ramfs -o size=10M,mode=0777 ramfs cache && echo "cache: directory mounted"
#mount -t tmpfs -o size=10M,mode=0777 tmpfs cache

# move data if exists
mv offline/* cache/

# cache dirs creation
mkdir -p cache/{searches,tags,templates,template_entries,notes_latest} && echo "cache: slave directories created"
# set owner and permissions
chown http:http cache/* && chmod 755 cache/* && echo "cache: slave directories prepared"

# prepare struct file
touch cache/db.struct.php && chown http:http cache/db.struct.php && chmod 666 cache/db.struct.php && echo "db: structure file prepared"
# run php init script
# db structure generation, js/css files merging and so on
su dp -c "php init.php"

# prepare logs file
mkdir -p logs && echo "logs: directory prepared"
touch ./logs/general && echo "logs: general file prepared"
chown -R http:http logs && chmod 666 logs/* && echo "logs: owner and permissions set"

# prepare css and js files
touch public/css/all.css public/js/all.js && echo "files: all.css and all.js files prepared"
chown http:http public/css/all.css public/js/all.js && chmod 600 public/css/all.css public/js/all.js && echo "files: all.css and all.js files permissions set"
