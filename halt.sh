#!/bin/bash
# stops the web server
# copy all cache data from memory to disk

# project root
base=$(realpath $(dirname $0))
cd "$base" && echo "[$base]"

# stop the web server
# project root
/etc/rc.d/lighttpd stop

# prepare directory
mkdir -p offline && chmod 700 offline && echo "offline: directory prepared"
# copy data
#cp -R cache offline
mv cache/* offline/
