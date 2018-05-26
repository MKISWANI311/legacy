/**
 * List of note templates
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var tag = require('spa-dom').tag,
    Component = require('spa-component');


function TemplateList ( config ) {
    // parent constructor call
    Component.call(this, config);

    this.$title = this.$node.appendChild(
        tag('div', {className: this.name + '__title'}, 'Templates')
    );

    this.$items = this.$node.appendChild(
        tag('div', {className: this.name + '__items'})
    );

    this.fill(config.data);
}


// inheritance
TemplateList.prototype = Object.create(Component.prototype);
TemplateList.prototype.constructor = TemplateList;

// set component name
TemplateList.prototype.name = 'template-list';


TemplateList.prototype.fill = function ( data ) {
    var self = this,
        $fragment = document.createDocumentFragment();

    // clear items
    while ( this.$items.lastChild ) {
        this.$items.removeChild(this.$items.lastChild);
    }

    // iterate all templates
    data.data.forEach(function ( template ) {
        var $item = tag('div', {className: self.name + '__item'},
            tag('div', {className: self.name + '__item-name'}, template[data.defn.name]),
            tag('div', {className: self.name + '__item-hint'}, template[data.defn.description])
        );

        $item.style.backgroundImage = 'url(img/tags/' + template[data.defn.tag] + '.svg)';

        $fragment.appendChild($item);

        // use template for a new note creation
        $item.addEventListener('click', function () {
            self.hide();
            self.emit('create', template);
        });
    });

    this.$items.appendChild($fragment);
};


// public
module.exports = TemplateList;
