/**
 * List of note templates
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var tag = require('spa-dom').tag,
    List = require('spa-component-list');


function TemplateList ( config ) {
    config.modifiers = ['template-list'];

    // parent constructor call
    List.call(this, config);

    /*this.$title = this.$node.appendChild(
        tag('div', {className: this.name + '__title'}, 'Templates')
    );

    this.$items = this.$node.appendChild(
        tag('div', {className: this.name + '__items'})
    );

    this.fill(config.data);*/
}


// inheritance
TemplateList.prototype = Object.create(List.prototype);
TemplateList.prototype.constructor = TemplateList;

// set component name
//TemplateList.prototype.name = 'template-list';


TemplateList.prototype.render = function ( $item, template ) {
    var self  = this,
        //$icon = tag('img', {className: self.name + '__item-icon', src: 'https://image.flaticon.com/icons/svg/137/137132.svg'}),
        $icon = tag('img', {className: self.name + '__item-icon', src: 'img/tags/' + template.name + '.svg'}),
        //$icon = tag('div', {className: self.name + '__item-icon'}),
        //$icon = tag('div', {className: self.name + '__item-icon'}, tag('img', {src: 'img/tags/' + template.tag + '.svg'})),
        $name = tag('div', {className: self.name + '__item-name'}, template.name),
        $hint = tag('div', {className: self.name + '__item-hint'}, template.description),
        $body = tag('div', {className: self.name + '__item-body'}, $name, $hint);

    //$icon.style.backgroundImage = 'url(img/tags/' + template.tag + '.svg)';

    // use template for a new note creation
    // $item.addEventListener('click', function () {
    //     //self.hide();
    //     self.emit('create', template);
    // });

    $item.appendChild($icon);
    $item.appendChild($body);
    //$item.appendChild($name);
    //$item.appendChild($hint);
};


// public
module.exports = TemplateList;
