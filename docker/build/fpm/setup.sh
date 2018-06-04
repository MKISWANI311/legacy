#!/bin/sh

# exit immediately if a command exits with a non-zero status
# treat unset variables as an error when substituting
# print commands and their arguments as they are executed
set -eux

# install dependencies
apk add --no-cache --virtual .rundeps unzip curl

apk add --no-cache php7-fpm php7-session php7-pdo php7-pdo_sqlite php7-pdo_mysql php7-json php7-gd

# application source code
curl -fsSL https://github.com/fortnotes/legacy/archive/master.zip -o master.zip
unzip -q master.zip -d .
mv legacy-master/server /
rm -rf legacy-master
rm master.zip

# make session storage writable
chmod a+w /server/data
chmod a+w /server/sessions

# clean
apk del --no-cache .rundeps
rm setup.sh
