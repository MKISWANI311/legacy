#!/bin/sh

# clearing any old pid files
rm -f /run/apache2/*.pid

# start daemon
exec httpd -D FOREGROUND
