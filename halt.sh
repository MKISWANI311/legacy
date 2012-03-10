#!/bin/bash
# stops the web server
# copy all cache data from memory to disk

ok='[\e[0;32mok\e[0m]\t'
fail='[\e[0;31mfail\e[0m]\t'

# project root
base=$(realpath $(dirname $0))
cd "$base" && echo -e "base\t$base"

# stop the web server
rc.d stop php-fpm && rc.d stop lighttpd && echo -ne $ok || echo -ne $fail
echo "php-fpm and http server stopping"

# prepare directory
mkdir -p offline && chmod 700 offline && echo -ne $ok || echo -ne $fail
echo "offline directory preparation"
# backup data
[ -d offline ] && mv cache/* offline/ && echo -ne $ok || echo -ne $fail
echo "offline data moving"

# try to unmount if already exist
umount cache && echo -ne $ok || echo -ne $fail
echo "cache directory unmounting"
