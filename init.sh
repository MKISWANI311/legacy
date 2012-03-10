#!/bin/bash
# creates dir cache in the script's dir
# bind cache directory to memory
# fill it with specific work directories

ok='[\e[0;32mok\e[0m]\t'
fail='[\e[0;31mfail\e[0m]\t'

# project root
base=$(realpath $(dirname $0))
cd "$base" && echo -e "base\t$base"

# prepare directory
mkdir -p cache && chmod 700 cache && echo -ne $ok || echo -ne $fail
echo "cache directory preparation"

# bind the directory to memory
mount -t ramfs -o size=10M,mode=0777 ramfs cache && echo -ne $ok || echo -ne $fail
echo "cache directory mounting"

# restore backuped data if exists
[ -d offline ] && mv offline/* cache/ && echo -ne $ok || echo -ne $fail
echo "restoring backuped data if exists"

# cache dirs creation
mkdir -p cache/{searches,tags,templates,template_entries,notes_latest} && echo -ne $ok || echo -ne $fail
echo "cache slave directories creation"
# set owner and permissions
chown http:http cache/* && chmod 755 cache/* && echo -ne $ok || echo -ne $fail
echo "cache slave directories preparation"

# prepare struct file
touch cache/db.struct.php && chown http:http cache/db.struct.php && chmod 666 cache/db.struct.php && echo -ne $ok || echo -ne $fail
echo "database structure file preparation"
# run php init script
# db structure generation, js/css files merging and so on
su dp -c "php init.php"

# prepare logs file
mkdir -p logs && echo -ne $ok || echo -ne $fail
echo "logs directory preparation"
touch ./logs/general && echo -ne $ok || echo -ne $fail
echo "logs general file preparation"
chown -R http:http logs && chmod 666 logs/* && echo -ne $ok || echo -ne $fail
echo "logs owner and permissions set"

# prepare css and js files
touch public/css/all.css public/js/all.js && echo -ne $ok || echo -ne $fail
echo "files all.css and all.js files preparation"
chown http:http public/css/all.css public/js/all.js && chmod 600 public/css/all.css public/js/all.js && echo -ne $ok || echo -ne $fail
echo "files all.css and all.js files permissions set"
