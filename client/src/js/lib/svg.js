/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var svgns = 'http://www.w3.org/2000/svg',
    usens = 'http://www.w3.org/1999/xlink';

/**
 * @constructor
 */
function Svg ( config ) {
    this.$node = document.createElementNS(svgns, 'svg');
    this.$node.setAttribute('class', config.className);

    this.$use = document.createElementNS(svgns, 'use');
    this.$use.setAttributeNS(usens, 'href', '#' + config.id);

    this.$node.appendChild(this.$use);
}


Svg.prototype = {};


// correct constructor name
Svg.prototype.constructor = Svg;


// public
module.exports = Svg;
