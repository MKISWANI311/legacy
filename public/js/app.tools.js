/**
 * Helper functions
 */

// array prototypes
Array.prototype.has = function ( value ) {
	return this.indexOf(value) >= 0;
};
Array.prototype.empty = function () {
	return !(this.length > 0);
};
Array.prototype.each = function ( func ) {
	var i, l = this.length;
	for ( i = 0; i < l; i++ ) { func(this[i], i); }
};
// IE compatibility
if ( !Array.indexOf ) {
	Array.prototype.indexOf = function ( obj, start ) {
		var i;
		for ( i = (start || 0); i < this.length; i++ ) {
			if ( this[i] === obj ) { return i; }
		}
		return -1;
	};
}

// string prototypes
String.prototype.trim = function() {
   return this.replace(/^\s+|\s+$/g,"");
};
String.prototype.ltrim = function() {
   return this.replace(/^\s+/g,"");
};
String.prototype.rtrim = function() {
   return this.replace(/\s+$/g,"");
};

/**
 * Associative Array size
 */
function AASize ( array ) {
	var size = 0;
	if ( array ) {
		for ( var el in array ) {size++;}
	}
	return size;
}

/**
 * Firebug debug compatible with IE
 * free list of params
 */
function fb () {
	if ( window.console && window.console.info )
		// send all arguments to firebug
		console.info(arguments.length == 1 ? arguments[0] : arguments);

}

/**
 * Moves focus to the given html element on enter key pressed
 * @param src object to track
 * @param dest given html element to jump to
 */
function onEnterFocus ( src, dest ) {
	src.onkeypress = function(event){
		if ( event.which || event.keyCode ) {
			if ( (event.which == 13) || (event.keyCode == 13) ) {
				dest.focus();
				return false;
			}
		}
		return true;
	};
}

/**
 * Clicks the given html element on enter key pressed
 * @param src object to track
 * @param dest given html element to click to
 */
function onEnterClick ( src, dest ) {
	src.onkeypress = function(event){
		if ( event.which || event.keyCode ) {
			if ( (event.which == 13) || (event.keyCode == 13) ) {
				dest.focus();
				dest.click();
				return false;
			}
		}
		return true;
	};
}

/**
 * New link type to select value from the set
 * @param obj html a element to expand
 * @param data list of values and titles like {300:{title:'5 minutes',next:1200}, 1200:{title:'20 minutes',next:300}}
 * @param id default value to select
 */
function LinkSet ( obj, data, id ) {
	if ( !obj ) return;

	this.obj  = obj;
	this.data = data;

	/**
	 * Set currect value and title from the data
	 * @param id to select
	 */
	this.ItemSelect = function ( id ) {
		// check input
		if ( id && data && data[id] ) {
			// set value and html
			this.obj.value = id;
			this.obj.innerHTML = data[id].title;
			var pthis = this;
			// set onclick handler and pass this object pointer for future selection
			this.obj.onclick = function(){
				pthis.ItemSelect(data[id].next);
			};
		}
	};

	// do the default selection
	this.ItemSelect(id);
}

function elchild ( obj, value ) {
	// check input
	if ( obj && value != null ) {
		// DOMElement
		if ( value.nodeType ) {
			obj.appendChild(value);
		}
		// array of DOMElements of simple values
		else if ( value instanceof Array ) {
			for ( var i = 0; i < value.length; i++ ) {
				elchild(obj, value[i]);
			}
		}
		// simple values
		else {
			obj.appendChild(document.createTextNode(value));
		}
	}
	return obj;
}

function elclear ( obj ) {
	if ( obj.hasChildNodes() ) {
		while ( obj.hasChildNodes() ) {
			obj.removeChild(obj.firstChild);
		}
	}
	return obj;
}

function elattr ( obj, attr ) {
	// check if DOMElement
	if ( obj && obj.nodeType && attr && attr instanceof Object ) {
		for ( var akey in attr ) {
			//obj.setAttribute(akey, attr[akey]);
			obj[akey] = attr[akey];
		}
	}
	return obj;
}

function element ( name, attr, data, handlers ) {
	var tag = document.createElement(name);
	elattr(tag, attr);
	elchild(tag, data);
	// set all handlers
	if ( handlers && handlers instanceof Object ) {
		for ( var handler in handlers ) {
			tag[handler] = handlers[handler];
		}
	}
	return tag;
}

function table ( rows, cols, attr, handlers ) {
	var el = element('table', attr, null, handlers);
	for ( var i = 0; i < rows; i++ ) {
		el.insertRow(-1);
		for ( var j = 0; j < cols; j++ ) {
			el.rows[i].insertCell(-1);
		}
	}
	return el;
}

function tblrow ( obj, cells, attrs ) {
	var row = obj.insertRow(-1);
	for ( var i = 0; i < cells.length; i++ ) {
		row.insertCell(-1);
		elchild(row.cells[i], cells[i]);
		elattr(row.cells[i], attrs[i]);
	}

	return obj;
}


/**
 * converts date from timestamp to simple date string
 * 1209589200 -> 2012.02.03 00:23
 */
function TimestampToDateStr ( tstamp ) {
	var theDate = tstamp ? new Date(tstamp * 1000) : new Date();
	var nyear   = theDate.getFullYear();
	var nmonth  = theDate.getMonth() + 1;
	var nday    = theDate.getDate();
	var hour    = theDate.getHours();
	var min     = theDate.getMinutes();
	if ( nmonth < 10 ) nmonth = '0' + nmonth;
	if ( nday   < 10 ) nday   = '0' + nday;
	if ( hour   < 10 ) hour   = '0' + hour;
	if ( min    < 10 ) min    = '0' + min;
	return nyear + '.' + nmonth + '.' + nday + ' ' + hour + ':' + min;
}

function time_data ( timestamp ) {
	var dt = new Date(timestamp * 1000);
	var dl = {y:dt.getFullYear(), m:dt.getMonth()+1, d:dt.getDate(), h:dt.getHours(), i:dt.getMinutes()};
	// extend with zero where necessary
	if ( dl.m < 10 ) dl.m = '0' + dl.m;
	if ( dl.d < 10 ) dl.d = '0' + dl.d;
	if ( dl.h < 10 ) dl.h = '0' + dl.h;
	if ( dl.i < 10 ) dl.i = '0' + dl.i;
	return dl;
}

function pwdgen ( length ) {
    var charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
		letters = [], letter = null, result = "";
	while ( result.length < length ) {
		// generate a char
		letter = charset.charAt(Math.floor(Math.random() * charset.length));
		// check if not a duplicate
		if ( letters.indexOf(letter.toLowerCase()) < 0 ) {
			// fill already used chars list
			letters.push(letter.toLowerCase());
			// fill the result
			result += letter;
		}
	}
    return result;
}

/**
* Ajax cross-domain request helper
* @param url link to external resource
*/
function jsonp ( url ) {
	// create element and get data to callback
	var script = element('script', {type:'text/javascript', src:url});
	// insert to DOM
	document.body.appendChild(script);
	// clear after data processed in 5 secs
	setTimeout(function(){
		fb('jsonp script tag clearing');
		document.body.removeChild(script);
	}, 10000);
}

