/*!
 * jQuery Autocompleter
 * jquery.autocomplete.js
 * http://code.google.com/p/jquery-autocomplete/
 * Copyright 2011, Dylan Verheul
 * Licensed under the MIT license
 */

(function($) {

    /**
     * Autocompleter Object
     * @param {jQuery} $elem jQuery object with one input tag
     * @param {Object=} options Settings
     * @constructor
     */
    $.Autocompleter = function($elem, options) {

        /**
         * Cached data
         * @type Object
         * @private
         */
        this.cacheData_ = {};

        /**
         * Number of cached data items
         * @type number
         * @private
         */
        this.cacheLength_ = 0;

        /**
         * Class name to mark selected item
         * @type string
         * @private
         */
        this.selectClass_ = 'jquery-autocomplete-selected-item';

        /**
         * Handler to activation timeout
         * @type ?number
         * @private
         */
        this.keyTimeout_ = null;

        /**
         * Last key pressed in the input field (store for behavior)
         * @type ?number
         * @private
         */
        this.lastKeyPressed_ = null;

        /**
         * Last value processed by the autocompleter
         * @type ?string
         * @private
         */
        this.lastProcessedValue_ = null;

        /**
         * Last value selected by the user
         * @type ?string
         * @private
         */
        this.lastSelectedValue_ = null;

        /**
         * Is this autocompleter active?
         * Set by showResults() if we have results to show
         * @type boolean
         * @private
         */
        this.active_ = false;

        /**
         * Is it OK to finish on blur?
         * @type boolean
         * @private
         */
        this.finishOnBlur_ = true;

        /**
         * Assert parameters
         */
        if (!$elem || !($elem instanceof jQuery) || $elem.length !== 1 || $elem.get(0).tagName.toUpperCase() !== 'INPUT') {
            alert('Invalid parameter for jquery.Autocompleter, jQuery object with one element with INPUT tag expected');
            return;
        }

        /**
         * Switch off the native autocomplete
         */
        $elem.attr('autocomplete', 'off');

        /**
         * Init and sanitize options
         */
        if (typeof options === 'string') {
            this.options = {url:options};
        } else {
            this.options = options;
        }
        this.options.minChars = parseInt(this.options.minChars, 10);
        if (isNaN(this.options.minChars) || this.options.minChars < 1) {
            this.options.minChars = 2;
        }

        this.options.maxItemsToShow = parseInt(this.options.maxItemsToShow, 10);
        if (isNaN(this.options.maxItemsToShow) || this.options.maxItemsToShow < 1) {
            this.options.maxItemsToShow = 10;
        }

        this.options.maxCacheLength = parseInt(this.options.maxCacheLength, 10);
        if (isNaN(this.options.maxCacheLength) || this.options.maxCacheLength < 1) {
            this.options.maxCacheLength = 10;
        }

        /**
         * Init DOM elements repository
         */
        this.dom = {};

        /**
         * Store the input element we're attached to in the repository, add class
         */
        this.dom.$elem = $elem;
        if (this.options.inputClass) {
            this.dom.$elem.addClass(this.options.inputClass);
        }

        /**
         * Create DOM element to hold results
         */
        this.dom.$results = $('<div></div>').hide();
        if (this.options.resultsClass) {
            this.dom.$results.addClass(this.options.resultsClass);
        }
        this.dom.$results.css({
            position: 'absolute'
        });
        $('body').append(this.dom.$results);

        /**
         * Shortcut to self
         */
        var self = this;

        /**
         * Attach keyboard monitoring to $elem
         */
        $elem.keydown(function(e) {
            self.lastKeyPressed_ = e.keyCode;
            switch(self.lastKeyPressed_) {

                case 38: // up
                    e.preventDefault();
                    if (self.active_) {
                        self.focusPrev();
                    } else {
                        self.activate();
                    }
                    return false;

                case 40: // down
                    e.preventDefault();
                    if (self.active_) {
                        self.focusNext();
                    } else {
                        self.activate();
                    }
                    return false;

                case 9: // tab
                    if (self.active_) {
                        self.selectCurrent();
                        if (self.options.preventDefaultTab) {
                            e.preventDefault();
                            return false;
                        }
                    }
                break;

                case 13: // return
                    if (self.active_) {
                        self.selectCurrent();
                        if (self.options.preventDefaultReturn) {
                            e.preventDefault();
                            return false;
                        }
                    }
                break;

                case 27: // escape
                    if (self.active_) {
                        e.preventDefault();
                        self.finish();
                        return false;
                    }
                break;
				
				case 32: // space
                    if ( self.active_ && self.options.OnSpaceSelect ) {
                        self.selectCurrent();
                        //return false;
						self.activate();
                    }
                break;

                default:
                    self.activate();

            }
        });
        $elem.blur(function() {
            if (self.finishOnBlur_) {
                setTimeout(function() {self.finish();}, 200);
            }
        });

    };

    /**
     * Position output DOM elements
     */
    $.Autocompleter.prototype.position = function() {
        var offset = this.dom.$elem.offset();
        this.dom.$results.css({
            top: offset.top + this.dom.$elem.outerHeight(),
            left: offset.left
        });
    };

    /**
     * Read from cache
     */
    $.Autocompleter.prototype.cacheRead = function(filter) {
        var filterLength, searchLength, search, maxPos, pos;
        if (this.options.useCache) {
            filter = String(filter);
            filterLength = filter.length;
            if (this.options.matchSubset) {
                searchLength = 1;
            } else {
                searchLength = filterLength;
            }
            while (searchLength <= filterLength) {
                if (this.options.matchInside) {
                    maxPos = filterLength - searchLength;
                } else {
                    maxPos = 0;
                }
                pos = 0;
                while (pos <= maxPos) {
                    search = filter.substr(0, searchLength);
                    if (this.cacheData_[search] !== undefined) {
                        return this.cacheData_[search];
                    }
                    pos++;
                }
                searchLength++;
            }
        }
        return false;
    };

    /**
     * Write to cache
     */
    $.Autocompleter.prototype.cacheWrite = function(filter, data) {
        if (this.options.useCache) {
            if (this.cacheLength_ >= this.options.maxCacheLength) {
                this.cacheFlush();
            }
            filter = String(filter);
            if (this.cacheData_[filter] !== undefined) {
                this.cacheLength_++;
            }
            this.cacheData_[filter] = data;
            return this.cacheData_[filter];
        }
        return false;
    };

    /**
     * Flush cache
     */
    $.Autocompleter.prototype.cacheFlush = function() {
        this.cacheData_ = {};
        this.cacheLength_ = 0;
    };

    /**
     * Call hook
     */
    $.Autocompleter.prototype.callHook = function(hook, data) {
        var f = this.options[hook];
        if (f && $.isFunction(f)) {
            return f(data, this);
        }
        return false;
    };

    /**
     * Set timeout to activate autocompleter
     */
    $.Autocompleter.prototype.activate = function() {
        var self = this;
        var activateNow = function() {
            self.activateNow();
        };
        var delay = parseInt(this.options.delay, 10);
        if (isNaN(delay) || delay <= 0) {
            delay = 250;
        }
        if (this.keyTimeout_) {
            clearTimeout(this.keyTimeout_);
        }
        this.keyTimeout_ = setTimeout(activateNow, delay);
    };

	$.Autocompleter.prototype.GetParts = function() {
		
	};

    /**
     * Activate autocompleter immediately
     */
    $.Autocompleter.prototype.activateNow = function() {
        var value = this.dom.$elem.val().replace(/^\s+/,"");;
		var space = value != $.trim(value);
		
		if ( this.options.multiple ) {
			for ( var i=0; i < this.options.excludeWords.length; i++ ) {
				value = value.replace(new RegExp(this.options.excludeWords[i],'gi'), '');
			}
			
			if ( $.trim(value) == '' ) {
				this.options.data = [];
			}
			
			value = value.replace(/ /gi, ',').split(this.options.multipleSeparator);
			value = $.grep(value,function(n){return(n)});

			this.options.multipleParts = value;
			if ( this.options.multipleData.length > this.options.multipleParts.length ) {
				this.options.multipleData.length = this.options.multipleParts.length;
			}
			// if selected from the line start and not empty
			if ( this.dom.$elem[0].selectionStart == 0 && this.dom.$elem[0].selectionStart != this.dom.$elem[0].selectionEnd ) {
				this.options.multipleData.length = 0;
				this.options.data = [];
			}
			if ( space ) {
				value.push('');
			}
			value = value[value.length-1];
			if ( value == undefined ) {
				value = '';
			}
		}
        
		if (value !== this.lastProcessedValue_ && value !== this.lastSelectedValue_) {
			//console.info(1);
            if ( value.length >= this.options.minChars) {
				//console.info(11);
                this.lastProcessedValue_ = value;
                this.fetchData(value);
				return;
            }
        }
		if ( this.options.multiple ) {
			//console.info(2);
			//console.info(this.options.data);
			if ( (this.options.data && value.length >= this.options.minChars) || this.options.data.length > 0 ) {
				//console.info(21);
				this.lastProcessedValue_ = value;
				this.fetchData(value);
			}
		}
    };

    /**
     * Get autocomplete data for a given value
     */
    $.Autocompleter.prototype.fetchData = function(value) {
		//console.info(3);
        if ( this.options.data && this.options.data.length > 0 ) {
			//console.info(31);
			//console.info(this.options.data);
            this.filterAndShowResults(this.options.data, value);
        } else {
			//console.info(32);
            var self = this;
            this.fetchRemoteData(value, function(remoteData) {
				if ( self.options.jsonPrepare && self.options.jsonPrepare instanceof Function ) {
					//console.info(321);
					self.options.data = self.options.jsonPrepare.call(this, remoteData);
					self.filterAndShowResults(self.options.data, value);
				} else {
					//console.info(322);
					self.filterAndShowResults(remoteData, value);
				}
            });
        }
    };

    /**
     * Get remote autocomplete data for a given value
     */
    $.Autocompleter.prototype.fetchRemoteData = function(filter, callback) {
        var data = this.cacheRead(filter);
        if (data) {
            callback(data);
        } else {
            var self = this;
            this.dom.$elem.addClass(this.options.loadingClass);
            var ajaxCallback = function(data) {
                var parsed = false;
                if (data !== false) {
                    parsed = self.parseRemoteData(data);
                    self.cacheWrite(filter, parsed);
                }
                self.dom.$elem.removeClass(self.options.loadingClass);
                callback(parsed);
            };
            $.ajax({
                url: this.makeUrl(filter),
                success: ajaxCallback,
                error: function() {
                    ajaxCallback(false);
                },
                dataType: 'text'
            });
        }
    };

    /**
     * Create or update an extra parameter for the remote request
     */
    $.Autocompleter.prototype.setExtraParam = function(name, value) {
        var index = $.trim(String(name));
        if (index) {
            if (!this.options.extraParams) {
                this.options.extraParams = {};
            }
            if (this.options.extraParams[index] !== value) {
                this.options.extraParams[index] = value;
                this.cacheFlush();
            }
        }
    };

    /**
     * Build the url for a remote request
     */
    $.Autocompleter.prototype.makeUrl = function(param) {
        var self = this;
        var url = this.options.url;
        var params = $.extend({}, this.options.extraParams);
        // If options.queryParamName === false, append query to url
        // instead of using a GET parameter
        if (this.options.queryParamName === false) {
            url += encodeURIComponent(param);
        } else {
            params[this.options.queryParamName] = param;
        }

        if (this.options.limitParamName && this.options.maxItemsToShow) {
            params[this.options.limitParamName] = this.options.maxItemsToShow;
        }

        var urlAppend = [];
        $.each(params, function(index, value) {
            urlAppend.push(self.makeUrlParam(index, value));
        });
        if (urlAppend.length) {
            url += url.indexOf('?') === -1 ? '?' : '&';
            url += urlAppend.join('&');
        }
        return url;
    };

    /**
     * Create partial url for a name/value pair
     */
    $.Autocompleter.prototype.makeUrlParam = function(name, value) {
        return [name, encodeURIComponent(value)].join('=');
    };

    /**
     * Parse data received from server
     */
    $.Autocompleter.prototype.parseRemoteData = function(remoteData) {
        var remoteDataType = this.options.remoteDataType;
        if (remoteDataType == 'json') {
            return this.parseRemoteJSON(remoteData);
        }
        return this.parseRemoteText(remoteData);
    };

    /**
     * Parse data received in text format
     */
    $.Autocompleter.prototype.parseRemoteText = function(remoteData) {
        var results = [];
        var text = String(remoteData).replace('\r\n', this.options.lineSeparator);
        var i, j, data, line, lines = text.split(this.options.lineSeparator);
        var value;
        for (i = 0; i < lines.length; i++) {
            line = lines[i].split(this.options.cellSeparator);
            data = [];
            for (j = 0; j < line.length; j++) {
                data.push(unescape(line[j]));
            }
            value = data.shift();
            results.push({value: unescape(value), data: data});
        }
        return results;
    };

    /**
     * Parse data received in JSON format
     */
    $.Autocompleter.prototype.parseRemoteJSON = function(remoteData) {
        return $.parseJSON(remoteData);
    };

    $.Autocompleter.prototype.filterAndShowResults = function(results, filter) {
        this.showResults(this.filterResults(results, filter), filter);
    };

    $.Autocompleter.prototype.filterResults = function(results, filter) {
        var filtered = [];
        var value, data, i, result, type, include;
        var regex, pattern, foldedPattern, testValue;
		var filterFunction = this.options.filterFunction;
		
		if ( !$.isFunction(filterFunction) ) {
			filterFunction = null;
        }

        for (i = 0; i < results.length; i++) {
            result = results[i];
			//console.info(result);
            type = typeof result;
            if (type === 'string') {
                value = result;
                data = {};
            } else if ($.isArray(result)) {
                value = result[0];
                data = result.slice(1);
            } else if (type === 'object') {
                value = result.value;
                data = result.data;
            }
            value = String(value);
            if (value > '') {
                if (typeof data !== 'object') {
                    data = {};
                }
                if (this.options.filterResults) {
                    pattern = this.matchStringConvertor(filter);
                    testValue = this.matchStringConvertor(value);
                    if (!this.options.matchCase) {
                        pattern = pattern.toLowerCase();
                        testValue = testValue.toLowerCase();
                    }
                    include = testValue.indexOf(pattern);
                    if (this.options.matchInside) {
                        include = include > -1;
                    } else {
                        include = include === 0;
                    }
                } else {
                    include = true;
                }
                if (include) {
					// additional hook
					if ( filterFunction ) {
						include = filterFunction.call(this, value, data, this.options.multipleData[this.options.multipleData.length-1]);
					}
				}
				if (include) {
                    filtered.push({value: value, data: data});
                }
            }
        }

        if (this.options.sortResults) {
            filtered = this.sortResults(filtered, filter);
        }

        if (this.options.maxItemsToShow > 0 && this.options.maxItemsToShow < filtered.length) {
            filtered.length = this.options.maxItemsToShow;
        }
        return filtered;

    };

    $.Autocompleter.prototype.sortResults = function(results, filter) {
        var self = this;
        var sortFunction = this.options.sortFunction;
        if (!$.isFunction(sortFunction)) {
            sortFunction = function(a, b, f) {
                return self.sortValueAlpha(a, b, f);
            };
        }
        results.sort(function(a, b) {
            return sortFunction(a, b, filter);
        });
        return results;
    };

    $.Autocompleter.prototype.sortValueAlpha = function(a, b, filter) {
        a = String(a.value);
        b = String(b.value);
        if (!this.options.matchCase) {
            a = a.toLowerCase();
            b = b.toLowerCase();
        }
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    };

    $.Autocompleter.prototype.matchStringConvertor = function(s, a, b) {
        var convertor = this.options.matchStringConvertor;
        if ($.isFunction(convertor)) {
            s = convertor(s, a, b);
        }
        return s;
    };

    $.Autocompleter.prototype.showResults = function(results, filter) {
        var numResults = results.length;
        if (numResults === 0) {
            return this.finish();
        }
        var self = this;
        var $ul = $('<ul></ul>');
        var i, result, $li, extraWidth, first = false, $first = false;
        for (i = 0; i < numResults; i++) {
            result = results[i];
			if ( this.options.multiple ) {
				$li = $('<li>' + this.showResult(this.options.multipleParts[this.options.multipleParts.length-1], result.data) + '</li>');
			} else {
				$li = $('<li>' + this.showResult(result.value, result.data) + '</li>');
			}
            $li.data('value', result.value);
            $li.data('data', result.data);
            $li.click(function() {
                var $this = $(this);
                self.selectItem($this);
            }).mousedown(function() {
                self.finishOnBlur_ = false;
            }).mouseup(function() {
                self.finishOnBlur_ = true;
            });
            $ul.append($li);
            if (first === false) {
                first = String(result.value);
                $first = $li;
                $li.addClass(this.options.firstItemClass);
            }
            if (i === numResults - 1) {
                $li.addClass(this.options.lastItemClass);
            }
        }

        // Alway recalculate position before showing since window size or
        // input element location may have changed.
        this.position();

        this.dom.$results.html($ul).show();
        extraWidth = this.dom.$results.outerWidth() - this.dom.$results.width();
        this.dom.$results.width(this.dom.$elem.outerWidth() - extraWidth);
        $('li', this.dom.$results).hover(
            function() {self.focusItem(this);},
            function() { /* void */ }
        );
        if (this.autoFill(first, filter) || this.options.selectFirst || (this.options.selectOnly && numResults == 1)) {
            this.focusItem($first);
        }
        this.active_ = true;
    };

    $.Autocompleter.prototype.showResult = function(value, data) {
        if ($.isFunction(this.options.showResult)) {
            return this.options.showResult(value, data);
        } else {
            return value;
        }
    };

    $.Autocompleter.prototype.autoFill = function(value, filter) {
        var lcValue, lcFilter, valueLength, filterLength;
        if (this.options.autoFill && this.lastKeyPressed_ !== 8) {
            lcValue = String(value).toLowerCase();
            lcFilter = String(filter).toLowerCase();
            valueLength = value.length;
            filterLength = filter.length;
            if (lcValue.substr(0, filterLength) === lcFilter) {
                this.dom.$elem.val(value);
                this.selectRange(filterLength, valueLength);
                return true;
            }
        }
        return false;
    };

    $.Autocompleter.prototype.focusNext = function() {
        this.focusMove(+1);
    };

    $.Autocompleter.prototype.focusPrev = function() {
        this.focusMove(-1);
    };

    $.Autocompleter.prototype.focusMove = function(modifier) {
        var $items = $('li', this.dom.$results);
        modifier = parseInt(modifier, 10);
        for (var i = 0; i < $items.length; i++) {
            if ($($items[i]).hasClass(this.selectClass_)) {
                this.focusItem(i + modifier);
                return;
            }
        }
        this.focusItem(0);
    };

    $.Autocompleter.prototype.focusItem = function(item) {
        var $item, $items = $('li', this.dom.$results);
        if ($items.length) {
            $items.removeClass(this.selectClass_).removeClass(this.options.selectClass);
            if (typeof item === 'number') {
                item = parseInt(item, 10);
                if (item < 0) {
                    item = 0;
                } else if (item >= $items.length) {
                    item = $items.length - 1;
                }
                $item = $($items[item]);
            } else {
                $item = $(item);
            }
            if ($item) {
                $item.addClass(this.selectClass_).addClass(this.options.selectClass);
            }
        }
    };

    $.Autocompleter.prototype.selectCurrent = function() {
        var $item = $('li.' + this.selectClass_, this.dom.$results);
        if ($item.length === 1) {
            this.selectItem($item);
        } else {
            this.finish();
        }
    };

    $.Autocompleter.prototype.selectItem = function($li) {
        var value = $li.data('value');
        var data = $li.data('data');
        var displayValue = this.displayValue(value, data);
        this.lastProcessedValue_ = displayValue;
        this.lastSelectedValue_ = displayValue;
        this.dom.$elem.val(displayValue).focus();
        this.setCaret(displayValue.length);
        this.callHook('onItemSelect', {value: value, data: data});
		
		if ( this.options.multiple ) {
			this.options.multipleParts.push(value);
			//this.options.multipleData.push(data[0]);
			
		}
		this.options.Selected = data[0];

        this.finish();
    };

    $.Autocompleter.prototype.displayValue = function(value, data) {
        if ($.isFunction(this.options.displayValue)) {
            return this.options.displayValue(value, data);
        } else {
            return value;
        }
    };

    $.Autocompleter.prototype.finish = function() {
        if (this.keyTimeout_) {
            clearTimeout(this.keyTimeout_);
        }
        if (this.dom.$elem.val() !== this.lastSelectedValue_) {
            if (this.options.mustMatch) {
                this.dom.$elem.val('');
            }
            this.callHook('onNoMatch');
        }
        this.dom.$results.hide();
        this.lastKeyPressed_ = null;
        this.lastProcessedValue_ = null;
        if (this.active_) {
            this.callHook('onFinish');
        }
        this.active_ = false;
    };

    $.Autocompleter.prototype.selectRange = function(start, end) {
        var input = this.dom.$elem.get(0);
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(start, end);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    };

    $.Autocompleter.prototype.setCaret = function(pos) {
        this.selectRange(pos, pos);
    };

    /**
     * jQuery autocomplete plugin
     */
    $.fn.autocomplete = function(options) {
        if (typeof options === 'string') {
            options = {
                url: options
            };
        }
        var o = $.extend({}, $.fn.autocomplete.defaults, options);
        return this.each(function() {
            var $this = $(this);
            var ac = new $.Autocompleter($this, o);
            $this.data('autocompleter', ac);
        });

    };

    /**
     * Default options for autocomplete plugin
     */
    $.fn.autocomplete.defaults = {

        inputClass: 'acInput',
        loadingClass: 'acLoading',
        resultsClass: 'acResults',
        selectClass: 'acSelect',
        queryParamName: 'q',
        limitParamName: 'limit',
        extraParams: {},
        remoteDataType: false,
        lineSeparator: '\n',
        cellSeparator: '|',
        minChars: 2,
        maxItemsToShow: 10,
        delay: 400,
        useCache: true,
        maxCacheLength: 10,
        matchSubset: true,
        matchCase: false,
        matchInside: true,
        mustMatch: false,
        selectFirst: false,
        selectOnly: false,
        showResult: null,
        preventDefaultReturn: true,
        preventDefaultTab: false,
        autoFill: false,
        filterResults: true,
        sortResults: true,
        sortFunction: null,
        onItemSelect: null,
        onNoMatch: null,
        onFinish: null,
        matchStringConvertor: null,
		
		multiple: false,
		multipleParts: [],
		multipleData: [],
		multipleSeparator: ',',
		filterFunction: null,
		jsonPrepare: null, // callback for json rework
		excludeWords: [],
		OnSpaceSelect: false,
		Selected: null
    };

})(jQuery);


/**
 * Places autocompleter
 */
function SetAutoPlaces ( input, options ) {
	var ac_fld_id        = 'i'; // item id
	var ac_fld_name      = 'n'; // name
	var ac_fld_lowname   = 'l'; // name lowercase
	var ac_fld_data      = '#'; // data wrapper
	var ac_fld_zones     = 'z'; // areas (область)
	var ac_fld_regions   = 'r'; // regions
	var ac_fld_subzones  = 's'; // subzones
	var ac_fld_cities    = 'c'; // cities
	var ac_fld_pgt       = 'p'; // pgt
	var ac_fld_towns     = 't'; // towns
	var ac_fld_villages  = 'v'; // villages
	var ac_fld_districts = 'd'; // districts
	var ac_fld_parent    = 'u'; // pointer to the upper node

	var defaults = {
		data: [],
		url: '/places/slice/',
		multiple:true,
		hidden_val: null,
		hidden_last: null,
		selectFirst:true,
		sortResults:false,
		minChars:3,
		maxItemsToShow:20,
		matchInside:false,
		OnSpaceSelect:true,
		queryParamName:false,
		limitParamName:false,
		remoteDataType:'json',
		excludeWords: ['область', 'город', 'район', 'село', 'пгт', 'поселок'],
		jsonPrepare: function(data) {
			var result = [];
			var data_a = [];
			var data_b = [];
			var data_c = [];

			for ( var country_id in data ) {
				var country = data[country_id];
				var country_title = country[ac_fld_name];

				// страна
				data_a.push([country_title, {
					id         : country_id,
					title      : country_title,
					country_id : country_id
				}]);

				for ( var zone_id in country[ac_fld_zones] ) {
					var zone       = country[ac_fld_zones][zone_id];
					var zone_title = country_title + ', ' + zone[ac_fld_name] + (country_id == 2222 ? ' область' : '');

					if ( zone_id == "1190" ) {
						zone[ac_fld_name] = 'Крым';
						zone_title   = 'АР Крым';
					}
					// город
					if ( zone[ac_fld_cities] ) {
						// big city
						if ( zone.bigCity ) {
							//var city = zone[ac_fld_cities][zone.bigCity];
							data_a.push([zone[ac_fld_cities][zone.bigCity][ac_fld_name], {
								id         : zone.bigCity,
								title      : zone_title + ', город ' + zone[ac_fld_cities][zone.bigCity][ac_fld_name],
								country_id : country_id,
								zone_id    : zone_id,
								city_id    : zone.bigCity
							}]);
						}
						// all other cities
						for ( var city_id in zone[ac_fld_cities] ) {
							var city       = zone[ac_fld_cities][city_id];
							var city_title = zone_title + (country_id == 2222 ? ', город ' : ', ') + city[ac_fld_name];

							if ( !zone.bigCity || zone.bigCity != city_id ) {
								data_a.push([city[ac_fld_name], {
									id         : city_id,
									country_id : country_id,
									title      : city_title,
									zone_id    : zone_id,
									city_id    : city_id
								}]);
							}
							// район города
							if ( city[ac_fld_subzones] ) {
								for ( var subzone_id in city[ac_fld_subzones] ) {
									// check if there are districts
//									if ( city[ac_fld_subzones][subzone_id][ac_fld_districts] ) {
										// районы
										var subzone = city[ac_fld_subzones][subzone_id];
										data_c.push([subzone[ac_fld_name], {
											id         : subzone_id,
											title      : city_title + ', ' + subzone[ac_fld_name] + ' район',
											country_id : country_id,
											zone_id    : zone_id,
											city_id    : city_id,
											subzone_id : subzone_id
										}]);

										// микрорайоны
										if ( subzone[ac_fld_districts] ) {
											for ( var district_id in subzone[ac_fld_districts] ) {
												var district = subzone[ac_fld_districts][district_id];
												data_c.push([district[ac_fld_name], {
													id          : district_id,
													title       : city_title + ', ' + subzone[ac_fld_name] + ' район, ' + district[ac_fld_name],
													country_id  : country_id,
													zone_id     : zone_id,
													city_id     : city_id,
													subzone_id  : subzone_id,
													district_id : district_id
													//search      : district[ac_fld_name]
												}]);
											}
										}
//									} else {
//										// районы без микрорайонов
//										var subzone = city[ac_fld_subzones][subzone_id];
//										data_c.push([subzone[ac_fld_name], {
//											id         : subzone_id,
//											title      : city_title + ', ' + subzone[ac_fld_name] + ' район',
//											country_id : country_id,
//											zone_id    : zone_id,
//											city_id    : city_id,
//											subzone_id : subzone_id
//										}]);
//									}
								}
							}
						}
					}
					// район области
					if ( zone[ac_fld_regions] ) {
						for ( var region_id in zone[ac_fld_regions] ) {
							var region       = zone[ac_fld_regions][region_id];
							var region_title = zone_title + (country_id == 2222 ? ', район ' : ', ') + region[ac_fld_name];

							data_c.push([region[ac_fld_name], {
								id         : region_id,
								title      : region_title,
								country_id : country_id,
								zone_id    : zone_id,
								region_id  : region_id

							}]);
							// города области
							for ( var city_id in region[ac_fld_cities] ) {
								data_c.push([region[ac_fld_cities][city_id][ac_fld_name], {
									id         : city_id,
									title      : region_title + ', город ' + region[ac_fld_cities][city_id][ac_fld_name],
									country_id : country_id,
									zone_id    : zone_id,
									region_id  : region_id,
									rcity_id   : city_id
									//search     : region[ac_fld_cities][city_id][ac_fld_name]
								}]);
							}
							// пгт
							for ( var pgt_id in region[ac_fld_pgt] ) {
								data_c.push([region[ac_fld_pgt][pgt_id][ac_fld_name], {
									id         : pgt_id,
									title      : region_title + ', пгт ' + region[ac_fld_pgt][pgt_id][ac_fld_name],
									country_id : country_id,
									zone_id    : zone_id,
									region_id  : region_id,
									pgt_id     : pgt_id
									//search     : region[ac_fld_pgt][pgt_id][ac_fld_name]
								}]);
							}
							// села
							for ( var village_id in region[ac_fld_villages] ) {
								data_c.push([region[ac_fld_villages][village_id][ac_fld_name], {
									id         : village_id,
									title      : region_title + ', село ' + region[ac_fld_villages][village_id][ac_fld_name],
									country_id : country_id,
									zone_id    : zone_id,
									region_id  : region_id,
									village_id : village_id
									//search     : region[ac_fld_villages][village_id][ac_fld_name]
								}]);
							}
							// поселки
							for ( var town_id in region[ac_fld_towns] ) {
								data_c.push([region[ac_fld_towns][town_id][ac_fld_name], {
									id         : town_id,
									title      : region_title + ', поселок ' + region[ac_fld_towns][town_id][ac_fld_name],
									country_id : country_id,
									zone_id    : zone_id,
									region_id  : region_id,
									town_id    : town_id
									//search     : region[ac_fld_towns][town_id][ac_fld_name]
								}]);
							}
						}
					}
					// область
					data_b.push([zone[ac_fld_name], {
						id         : zone_id,
						title      : zone_title,
						country_id : country_id,
						zone_id    : zone_id
					}]);
				}
			}
			result = result.concat(data_a, data_b, data_c);
			//console.info(data_c);
			return result;
		},
		showResult: function(value, data) {
			//console.info(this);
			if ( value ) {
				// filtered list with entered value selected
				return data[0]['title'].replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + value.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
			} else {
				// initial full list
				return data[0]['title'];
			}
		},
		onItemSelect: function(item){
			var auto = $(input).data('autocompleter');
			var data = item.data[0];
			console.info('selected: ', data);
			$(input).val(data['title']);

			if ( data.search ) {
				$(auto.options.hidden_last).val(data.search);
			} else {
				$(auto.options.hidden_last).val('');
			}
			$(auto.options.hidden_val).val(data.id);
			
			// emulate options selections
			if ( data.zone_id ) {
				$("#formfield_places_province").val(data.zone_id);
				$("#formfield_places_province").change();
			}
			if ( !data.city_id && !data.subzone_id && !data.region_id ) {
				$('#formfield_places_type-all').click();
			}
			if ( !data.city_id && data.region_id ) {
				$('#formfield_places_type-region').click();
			}
			if ( data.city_id ) {
				$("#formfield_places_zone_select").val(data.city_id);
				$("#formfield_places_zone_select").change();
			}
			if ( data.subzone_id ) {
				$("#formfield_places_subzone_select").val(data.subzone_id);
				$("#formfield_places_subzone_select").change();
			}
			if ( data.region_id ) {
				$("#formfield_places_zone_select").val(data.region_id);
				$("#formfield_places_zone_select").change();
			}
			// make breadcrumbs
			auto.options.multipleData = [];
			if ( data.country_id ) {
				auto.options.multipleData.push({country_id:data.country_id});
			}
			if ( data.zone_id ) {
				auto.options.multipleData.push({country_id:data.country_id, zone_id:data.zone_id});
			}
			if ( data.city_id ) {
				auto.options.multipleData.push({country_id:data.country_id, zone_id:data.zone_id, city_id:data.city_id});
			}
			if ( data.subzone_id ) {
				auto.options.multipleData.push({country_id:data.country_id, zone_id:data.zone_id, city_id:data.city_id, subzone_id:data.subzone_id});
			}
			if ( data.district_id ) {
				auto.options.multipleData.push({country_id:data.country_id, zone_id:data.zone_id, city_id:data.city_id, subzone_id:data.subzone_id, district_id:data.district_id});
			}
			if ( data.region_id ) {
				auto.options.multipleData.push({country_id:data.country_id, zone_id:data.zone_id, region_id:data.region_id});
			}
			//console.info('multipleData: ', auto.options.multipleData);

			auto.activateNow();
		},
		filterFunction: function(value, data, select){
			//return true;
			data = data[0];
			// filter by previously selected zone, city or region
			if ( select ) {
				if (( select.country_id && select.country_id != data.country_id ) ||
					( select.zone_id    && select.zone_id    != data.zone_id ) ||
					( select.region_id  && select.region_id  != data.region_id ) || 
					( select.city_id    && select.city_id    != data.city_id ) ||
					( select.subzone_id && select.subzone_id != data.subzone_id ))
				{
					return false;
				}
			}
			return true;
		}
	};
	if ( options ) {
		// rewrite if necessary
		$.extend(defaults, options);
	}
	return $(input).autocomplete(defaults);
}
