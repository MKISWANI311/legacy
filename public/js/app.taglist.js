/**
 * List of tags with managing
 * @param params list of configuration parameters
 */
function TagList ( params ) {
	// for limited scopes
	var self = this;

	var maxlength_tag = 9;

	// html parent object
	this.dom = {
		handle:params.handle || null,
		input: params.input  || null
	};

	// component state flag
	// true - everything is decoded
	// false - no plain data, everything is encrypted
	this.open = false;

	/**
	 * Open the subscriber
	 * master password is accessible
	 * decrypt all the data and show it
	 */
	this.EventOpen = function () {
		//var text_tag_list = document.getElementById('text_tag_list');
		//text_tag_list.value = '';
		if ( console.time ) console.time('decode tags');
		// decode tags
		for ( var id in data_tags.data ) {
			var name = App.Decode(data_tags.data[id][data_tags.defn.name]);
			data_tags_nmlist[name] = id = parseInt(id, 10);
			data_tags_idlist[id] = name;
		}
		// clear to minimaze memory
		//delete data_tags.data;
		if ( console.timeEnd ) console.timeEnd('decode tags');

		var uses = [];
		for ( id in data_tags.data ) {
			uses.push({id:parseInt(id, 10), uses:data_tags.data[id][data_tags.defn.uses]});
		}
		uses.sort(function(a,b){
			return b.uses-a.uses;
		});
		//fb(uses);
		for ( var i = 0; i < uses.length; i++ ) {
			TagDraw(uses[i].id, data_tags_idlist[uses[i].id]);
		}
//		for ( name in data_tags_nmlist ) {
//			TagDraw(data_tags_nmlist[name], name);
//		}
	};

	/**
	 * Close the subscriber
	 * master password is expired and cleared
	 * clear all the decrypted data
	 */
	this.EventClose = function () {
		data_tags_nmlist = {};
		data_tags_idlist = {};

		elclear(self.dom.tags);
	};

	this.IDs2Names = function ( data ) {
		var result = [];
		// check input
		if ( data && data instanceof Array ) {
			// get tag names from ids
			for ( var i = 0; i < data.length; i++ ) {
				// seems normal tag id
				if ( data_tags_idlist[data[i]] )
					// tag found in the global list
					result.push(data_tags_idlist[data[i]]);
			}
		}
		return result;
	};
	this.IDs2Str = function ( data ) {
		var result = '';
		// check input
		if ( data && data instanceof Array ) {
			var i, list = [];
			// get tag names from ids and join them in line separated by spaces
			for ( i = 0; i < data.length; i++ ) {
				// seems normal tag id
				if ( data_tags_idlist[data[i]] )
					// tag found in the global list
					list.push(data_tags_idlist[data[i]]);
			}
			// there are some tags
			if ( list.length > 0 ) result = list.join(' ');
		}
		return result;
	};

	/**
	 * Converts a tags string to array of ids
	 * @param data tags string
	 * @return array of tags (integers or encrypted strings)
	 * @example [1,2,3] -> "email work important"
	 */
	this.TagsStr2IDs = function ( data ) {
		var result = [];
		// check input
		if ( data ) {
			data = data.match(/(\S+)/g);
			var i, words = [];
			// check parsed string
			if ( data && data instanceof Array ) {
				// sort data by name
				data = data.sort();
				// iterate words in the input string
				for ( i = 0; i < data.length; i++ ) {
					// shorten too long lines
					data[i] = data[i].slice(0, maxlength_tag);
					// check if this word already processed
					if ( words.indexOf(data[i]) < 0 ) {
						if ( data_tags_nmlist[data[i]] ) {
							// tag found in the global data
							result.push(data_tags_nmlist[data[i]]);
//						} else {
//							// not found so encrypt
//							result.push(App.Encode(data[i]));
						}
						// add word
						words.push(data[i]);
					}
				}
			}
		}
		return result;
	};

	var TagDraw = function ( id, name ) {
		//fb('id', id);
		var i, tag = element('span', {className:'tag', tagid:id, tagnm:name, title:id + ':' + data_tags.data[id][data_tags.defn.uses]},
			(( name.length > maxlength_tag ) ? name.slice(0, maxlength_tag) + '...' : name), {onclick:function(){
				if ( $(this).hasClass('inactive') ) return;
				$(this).toggleClass('select');
				if ( $(this).hasClass('select') ) {
					var text = $.trim(self.dom.input.value);
					self.dom.input.value = text + ( text ? ' ' : '' ) + this.tagnm;
					for ( i = 0; i < self.dom.tags.childNodes.length; i++ ) {
						if ( !data_tags.data[id][data_tags.defn.links].has(self.dom.tags.childNodes[i].tagid) && self.dom.tags.childNodes[i].tagid != id ) {
							$(self.dom.tags.childNodes[i]).addClass('inactive');
						}
					}
				} else {
					self.dom.input.value = self.dom.input.value.replace(this.tagnm, '').replace('  ', ' ').trim();
					for ( i = 0; i < self.dom.tags.childNodes.length; i++ ) {
						//if ( !data_tags.data[id][data_tags.defn.links].has(self.dom.tags.childNodes[i].tagid) && self.dom.tags.childNodes[i].tagid != id ) {
							$(self.dom.tags.childNodes[i]).removeClass('inactive');
						//}
					}
				}
				self.dom.input.focus();
				self.dom.input.selectionStart = self.dom.input.value.length;
				NoteTableFilter(self.dom.input.value);

			}
		});
		elchild(self.dom.tags, [tag,' ']);
	};

	/**
	 * Main init method
	 */
	var Init = function () {
		// check input
		if ( !self.dom.handle ) return;
		// set class for container
		self.dom.handle.className = 'taglist';

		elchild(self.dom.handle, self.dom.tags = element('div', {className:'tags'}));
	};
	// call on creation
	Init();
}