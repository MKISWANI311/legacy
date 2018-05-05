/**
 * List of groups with its items
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

function CTemplateList ( params ) {
    // global params
    this.params = params;

    /**
     * Add new parent section
     */
    this.AddGroup = function ( name ) {
        // prepare data
        var group = element('div', {className: 'group'}, [
            element('div', {className: 'title'}, element('div', {className: 'name'}, name)),
            element('div', {className: 'items'})
        ]);
        // append to container
        elchild(this.params.handle, group);
        return group;
    };

    /**
     * Add new child section
     * @param group pointer to parent section
     * @param data of the template
     */
    this.AddItem = function ( group, data ) {
        // prepare data
        var item = element('div', {className: 'item', data: data}, element('div', {className: 'line'}, [
            element('div', {className: 'name'}, data[window.dataTemplates.defn.name]),
            element('div', {className: 'hint'}, data[window.dataTemplates.defn.description])
            //element('div', {className:'ctrl'}, element('img', {src:'img/field_btn_delete_white.png'}))
        ]));
        // append to group
        elchild(group.childNodes[1], item);
        // callback handler
        if ( this.params.onclick && this.params.onclick instanceof Function ) {
            item.onclick = this.params.onclick;
        }
    };

    this.Init = function () {
        // check input
        if ( !this.params.handle ) return;
        // set class for container
        this.params.handle.className = 'tplist';
    };
    this.Init();
}


// public
module.exports = CTemplateList;
