#!/bin/bash
# stops the web server
# copy all cache data from memory to disk

# project root
base=$(realpath $(dirname $0))
cd "$base" && echo "fortnotes [$base]"

# stop the web server
/etc/rc.d/lighttpd stop

# prepare directory
mkdir -p offline && chmod 700 offline && echo "offline: directory prepared"
# backup data
mv cache/* offline/ && echo "offline: data moved"
