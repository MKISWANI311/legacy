/**
 * List of tags with managing
 * @param params list of configuration parameters
 */
var TagManager = new function () {
	// for limited scopes
	var self = this;

	// max length of each tag, will be truncated on exceed
	var maxlength_tag = 100;

	// component state flag
	// true  - everything is decoded
	// false - no plain data, everything is encrypted
	this.open = true;

	/**
	 * Open the subscriber
	 * master password is accessible
	 * decrypt all the data and show it
	 */
	this.EventOpen = function () {
		fb('TagManager: EventOpen');
		if ( console.time ) console.time('TagManager: decrypt tags');
		// decrypt tags
		for ( var id in data_tags.data ) {
			var name = App.Decode(data_tags.data[id][data_tags.defn.name]);
			// fill service lookup tables of tags by id and by name
			data_tags_nmlist[name] = id = parseInt(id, 10);
			data_tags_idlist[id] = name;
		}
		if ( console.timeEnd ) console.timeEnd('TagManager: decrypt tags');
	};

	/**
	 * Close the subscriber
	 * master password is expired and cleared
	 * clear all the decrypted data
	 */
	this.EventClose = function () {
		fb('TagManager: EventClose');
		// clear service lookup tables
		data_tags_nmlist = {};
		data_tags_idlist = {};
	};

	/**
	 * Adds new tag id and enc/dev values to the global lookup tables
	 * @param id of the new tag
	 * @param enc encrypted tag name value
	 * @param dec optional decrypted tag name value, decrypted from enc if omitted
	 */
	this.Add = function ( id, enc, dec ) {
		// decrypt name if necessary
		dec = dec || App.Decode(enc, true);
		data_tags.data[id] = [enc, [], 1];
		data_tags_nmlist[dec] = id;
		data_tags_idlist[id] = dec;
	};

	/**
	 * Returns the sorted list of tag ids by usage
	 * first ids the most used
	 */
	this.SortByUses = function () {
		var result = [];
		// prepare list of id/usage
		for ( var id in data_tags.data ) {
			result.push({id:parseInt(id, 10), uses:data_tags.data[id][data_tags.defn.uses]});
		}
		// custom sort
		result.sort(function(a,b){return b.uses-a.uses});
		// rework output, get rid of objects
		for ( var i = 0; i < result.length; i++ ) {
			result[i] = result[i].id;
		}
		return result;
	};

	/**
	 * Converts the array of tags ids to tags names
	 * @param data array of tags (integers or encrypted strings)
	 * @return tags names array
	 * @example [1,2,'***encrypted string***',3] -> ['ftp','note','ssh','site']
	 */
	this.IDs2Names = function ( data ) {
		var name, result = [];
		// check input
		if ( data && data instanceof Array )
			// get tag names from ids
			for ( var i = 0; i < data.length; i++ ) {
				// check type
				if ( isNaN(data[i]) ) {
					// seems this is a real-time encrypted string
					if ( (name = App.Decode(data[i], true)) !== false ) result.push(name);
				} else {
					// seems normal tag id
					if ( data_tags_idlist[data[i]] )
						// tag found in the global list
						result.push(data_tags_idlist[data[i]]);
				}
			}
		return result.sort();
	};

	/**
	 * Returns the string of tag names from the tags ids
	 * @example [1,2,3] -> "note site ftp"
	 */
	this.IDs2Str = function ( data ) {
		data = this.IDs2Names(data);
		return data.length > 0 ? data.join(' ') : '';
	};

	/**
	 * Converts a tags names array to array of ids or encrypted strings
	 * @param data tags string
	 * @param skip_new optional flag to exclude all new not encrypted values
	 * @return array of tags (integers or encrypted strings)
	 * @example skip_new=true  ['ftp','note','ssh','site'] -> [1,2,3]
	 * @example skip_new=false ['ftp','note','ssh','site'] -> [1,2,'***encrypted string***',3]
	 */
	this.Names2IDs = function ( data, skip_new ) {
		var result = [];
		// check input
		if ( data && data instanceof Array ) {
			// list of unique tag names
			var words = [], enc = null;
			// iterate words in the input string
			for ( var i = 0; i < data.length; i++ ) {
				// shorten too long lines
				var name = data[i].slice(0, maxlength_tag);
				// check if this word already processed
				if ( !words.has(name) ) {
					if ( data_tags_nmlist[name] ) {
						// tag found in the global data
						result.push(data_tags_nmlist[name]);
					} else {
						// not found so encrypt if not skipped
						if ( !skip_new && (enc = App.Encode(name, true)) !== false ) {
							result.push(enc);
						}
					}
					// add word
					words.push(name);
				}
			}
		}
		return result;
	};

	/**
	 * Converts a tags string to array of ids or encrypted strings
	 * @param data tags string
	 * @param skip_new optional flag to exclude all new not encrypted values
	 * @return array of tags (integers or encrypted strings)
	 * @example skip_new=true  "ftp note ssh site" -> [1,2,3]
	 * @example skip_new=false "ftp note ssh site" -> [1,2,'***encrypted string***',3]
	 */
	this.Str2IDs = function ( data, skip_new ) {
		var result = [];
		// check input
		if ( data && data.match ) {
			// do convert
			result = this.Names2IDs(data.match(/(\S+)/g), skip_new);
		}
		return result;
	};

	this.NamesMissed = function ( names, data ) {
		var result = [];
		// check input
		if ( data && data.match ) {
			// split to separate words
			data = data.match(/(\S+)/g);
			if ( data && data instanceof Array ) {
				// iterate words in the input string
				for ( var i = 0; i < data.length; i++ ) {
					if ( !names.has(data[i]) ) {
						result.push(data[i]);
					}
				}
			}
		}
		return result;
	};

	this.Str2Names = function ( data ) {
		var result = [];
		// check input
		if ( data && data.match ) {
			//
			data = data.match(/(\S+)/g);
			if ( data && data instanceof Array ) {
				// iterate words in the input string
				for ( var i = 0; i < data.length; i++ ) {
					if ( !result.has(data[i]) ) {
						result.push(data[i]);
					}
				}
			}
		}
		return result;
	};

	this.ParseStr = function ( data ) {
		var tinc = [];  // array of included tags ids
		var texc = [];  // array of excluded tags ids
		var winc = [];  // array of included words
		var wexc = [];  // array of excluded words

		// check input
		if ( data && data.match ) {
			// split to separate words
			data = data.match(/(\S+)/g);
			if ( data && data instanceof Array ) {
				data.sort();
				// iterate words in the input string
				for ( var i = 0; i < data.length; i++ ) {
					var fexc = ( data[i].charAt(0) == '-' );
					var word = fexc ? data[i].slice(1) : data[i];
					var tid  = data_tags_nmlist[word];
					// tag id found in the global data
					if ( tid ) {
						if ( fexc ) { if ( !texc.has(tid) ) texc.push(tid); }
						else if ( !tinc.has(tid) ) tinc.push(tid);
					} else {
						// tag id not found so it's just a word
						if ( fexc ) { if ( !wexc.has(word) ) wexc.push(word); }
						else if ( !winc.has(word) ) winc.push(word);
					}
				}
			}
		}
		return {tinc:tinc, texc:texc, winc:winc, wexc:wexc};
	}

};