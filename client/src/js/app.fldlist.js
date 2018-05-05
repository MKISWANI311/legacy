/**
 * Table manager for fields
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

/**
 * @param params list of configuration parameters
 *     cols - name of table columns (also class names for corresponding cells)
 *     attr - table attributes overwriting the default ones
 */
function FieldList ( params ) {
    this.params = params;

    // html elements
    this.dom = {};

    this.SetCols = function ( cols ) {
        this.params.cols = cols;
    };

    this.AddRow = function ( cells, attr ) {
        if ( cells && cells instanceof Array && cells.length === this.params.cols.length ) {
            var cell = null;
            var row = this.dom.table.insertRow(-1);
            elattr(row, attr);
            for ( var i = 0; i < this.params.cols.length; i++ ) {
                cell = row.insertCell(-1);
                cell.className = this.params.cols[i];
                elchild(cell, cells[i]);
                elattr(cell, this.params.cols[i]);
            }
            return row;
        }
        return false;
    };

    this.AddDivider = function ( cells, attr ) {
        var row = this.dom.table.insertRow(-1);
        var cell = row.insertCell(-1);
        elattr(cell, {colspan: this.params.cols.length});
        elchild(cell, element('div', {className: 'divider'}));
    };

    this.Init = function () {
        this.dom.table = element('table', {className: 'fldlist'});
        elattr(this.dom.table, this.params.attr);
    };
    this.Init();
}


// public
module.exports = FieldList;
