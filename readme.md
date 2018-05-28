FortNotes legacy application
============================

## Overview ##

FortNotes is a web application for secure storage of encrypted notes (such as passwords). The presentation layer consists of two HTML pages:
* A welcome page allowing users to register and log in.
* A main page that performs the remainder of the functionality: client-side decryption and encryption, creating, editing, deleting, and navigating notes, backup, etc. The main editing functions are done through a two-pane view with the list of notes on the left and the currently selected note on the right. Other functions are performed using pop-up dialog boxes.

FortNotes is implemented in JavaScript on the client side and PHP on the server side. Persistent data is stored in a MySQL or SQLite database on the server.

## Documentation ##

Apart from this page, instructions are available in the [blog](http://fortnotes.blogspot.com/).


## Deployment ##

Install dependencies:

`apt install php-cli php-sqlite3 php-gd`

Start static server:

```
cd public
php -S 0.0.0.0:8000
```

There is also an old manual for installation on Windows - https://bitbucket.org/DarkPark/fortnotes/wiki/Home.


## Directory Structure ##

The source code repository of FortNotes contains the following directory structure:

* **application**
  * **controllers** - contains PHP classes for each of the three main resource types (front page, note, and user)
  * **templates** - contains PHP templates for the two HTML pages as well as the "dialog boxes" used by the main page
* **lang** - a placeholder to support a future multilingual version of the application (currently empty)
* **library** - contains PHP classes used by the index page and by the controllers
* **public** - the root of the website
  * **captcha** - a library for generating [CAPTCHA](http://en.wikipedia.org/wiki/CAPTCHA) images, called [simple-php-captcha](https://github.com/claviska/simple-php-captcha)
  * **css** - contains several Cascading Style Sheets for different parts of the application
  * **img** - contains static PNG image files referenced by the HTML
    * **lang** - these PNG images are used to visually represent different language codes
  * **js** - contains numerous JavaScript modules and libraries
* **tests** - contains unit test code based on the [PHPUnit](http://www.phpunit.de/) framework


## PHP Code Structure ##

### URI Structure ###

The only URI visible to the user is the root of the website, which is handled by public/index.php. This source file simply includes some of the `library/*.php` modules and then invokes `app::run()`. This dispatches requests based on the following URL pattern:

`scheme://host:port/<controller_name>/<method_name>[/<first_arg>[/<second_arg>...]]`

Where:
* `controller_name` is the name of a PHP class, and must match the name of a source code file at `application/controllers/<controller_name>.php`
* `method_name` is the name of a method in the controller class
* `first_arg` is an optional string that will be passed as the first argument to the method
* additional arguments may also be specified

The defaults are `controller_name` = `front` and `method_name` = `index`, therefore the website root is handled by `front::index()` in `application/controllers/front.php`.

### Front controller ###

`front::index()` simply displays one of two possible HTML pages:
* if no valid login session exists, `application/templates/front.init.php` is rendered
* if the user is already logged in, `application/templates/front.main.php` is rendered

In `DEBUG` mode (set at the top of `library/app.core.php`), this controller also invokes `response::compact()` to concatenate all of the CSS files into a single file `public/css/all.css`, and concatenates all of the JavaScript files into a single file `public/js/all.js`. This implies that any any change to a CSS or JS file needs to be executed in `DEBUG` mode first, and then the concatenated file should be deployed to the production server.


## Dependencies ##

### Libraries Used ###

The following libraries are used by FortNotes and are included in the source:
* [jQuery](http://jquery.com/)
* [jQuery UI Autocomplete](http://jqueryui.com/autocomplete/)
* [SimpleModal jQuery Plugin](http://www.ericmmartin.com/projects/simplemodal/)
* [simple-php-captcha](https://github.com/claviska/simple-php-captcha)
* [Stanford Javascript Crypto Library](http://crypto.stanford.edu/sjcl/)

The following library is used during development but is not included:
* [PHPUnit](http://www.phpunit.de/)

### PHP Extensions Required ###

The following PHP extensions are required:
* [GD](http://php.net/manual/en/book.image.php) Image Processing Library (required by simple-php-captcha)
* [PDO-MySQL](http://www.php.net/manual/en/ref.pdo-mysql.php) database driver (or [SQLite](http://www.php.net/manual/en/sqlite3.installation.php))


## License ##

`fortnotes` is released under the [GPL-3.0 License](http://opensource.org/licenses/GPL-3.0).
