FortNotes
=========

[![dockeri.co](http://dockeri.co/image/fortnotes/legacy)](https://hub.docker.com/r/fortnotes/legacy/)

Official FortNotes Legacy Docker images.


## Usage

There are two versions of the image you can choose from.

The `apache` tag contains a full FortNotes installation including the apache web server.
It is designed to be easy to use and gets you running pretty fast.

The second option is an fpm container. It runs a FastCGI process that serves FortNotes API calls.
To use this image it must be combined with any webserver that can proxy http requests to the FastCGI port of the container.

Both versions are based on the [alpine](https://hub.docker.com/_/alpine/) Docker image.


### Using the apache image

The apache image contains a webserver and exposes ports 8000 and 8080. To start the container type:

```bash
docker run \
    --detach \
    --publish 8080:8080 \
    --publish 8000:8000 \
    --restart always \
    --name fortnotes \
    fortnotes/legacy:apache
```

Now you can access FortNotes at http://localhost:8080/ from your host system.
On the first screen in the `server` field enter http://localhost:8000/.


### Using the fpm image

To use the fpm image you need an additional web server that can proxy HTTP requests to the fpm port of the container.
For fpm connection this container exposes port `9000`. In most cases you might want use another container or your host as proxy.

```bash
$ docker run --detach fortnotes/legacy:fpm
```


### Persistent data

The FortNotes data is stored in two unnamed docker volumes `/server/data` and `/server/sessions`.
The docker daemon will store that data within the docker directory `/var/lib/docker/volumes/...`.
That means your data is saved even if the container crashes, is stopped or deleted.
It's possible to use specific data directories instead:

```bash
docker run \
    --detach \
    --publish 8080:8080 \
    --publish 8000:8000 \
    --volume /writable/sqlite/data/dir:/server/data \
    --volume /writable/sessions/data/dir:/server/sessions \
    --restart always \
    --name fortnotes \
    fortnotes/legacy:apache
```


### External database

By default this container uses SQLite for data storage, but it's possible to use an existing MySQL/MariaDB database.


## Upgrade to a newer version
 
To upgrade FortNotes to a new version you need to:

1. Stop the running container:

    ```bash
    docker stop fortnotes
    ```

2. Remove the existing container:

    ```bash
    docker rm fortnotes
    ```

3. Pull the new image:

    ```bash
    docker pull fortnotes/legacy:apache
    ```

4. Create the container once again with previously specified options.
