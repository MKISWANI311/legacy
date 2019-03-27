#!/usr/bin/env bash

set -eux

docker build --no-cache --tag fortnotes/legacy:apache ./docker/build/apache/
docker image push fortnotes/legacy:apache

docker build --no-cache --tag fortnotes/legacy:fpm ./docker/build/fpm/
docker image push fortnotes/legacy:fpm
