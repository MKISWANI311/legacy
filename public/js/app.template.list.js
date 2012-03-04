/**
 * List of note templates
 */
var TemplateList = new function () {
	// for limited scopes
	var self = this;

	var hint_main   = 'In the list above please select a template to be used to create your new note.';
	var hint_item   = 'This template will create a note with this set of entries:<br>';
	var hint_filter = 'filter by name or description ...';

	/**
	 * Fills the list with templates
	 */
	this.Fill = function () {
		// prepare
		elclear(self.dom.list);
		// iterate all templates
		data_templates.data.each(function(data){
			// template body
			var item = element('div', {className:'item', data:data},
				element('div', {className:'line'}, [
					element('div', {className:'name'}, data[data_templates.defn.name]),
					element('div', {className:'hint'}, data[data_templates.defn.description])
			]));
			// append
			elchild(self.dom.list, item);
			// template item handlers
			$(item).click(function(){
				$('#ui-layout-east-tplist').hide();
				$('#ui-layout-east-data').show();
				NoteEditor.Create(this.data);
			});
			$(item).mouseenter(function(){
				var list = [];
				data_template_entries.data[this.data[data_templates.defn.id]].each(function(entry){
					list.push('<b>' + entry[data_template_entries.defn.name] + '</b>');
				});
				self.dom.hint.innerHTML = hint_item + list.join(', ');
			});
		});
	}

	/**
	 * Filters by given text
	 * @param text string to search in each template name or description
	 */
	this.Filter = function ( text ) {
		text = text.toLowerCase();
		for ( var i = 0; i < self.dom.list.childNodes.length; i++ ) {
			// prepare
			var item = self.dom.list.childNodes[i]
			var name = item.data[data_templates.defn.name].toLowerCase();
			var desc = item.data[data_templates.defn.description].toLowerCase();
			// search substring and show/hide
			$(item).toggle(name.indexOf(text) >= 0 || desc.indexOf(text) >= 0);
		}
	}

	/**
	 * Main init method
	 * @param params list of configuration parameters
	 */
	this.Init = function ( params ) {
		// check input
		if ( !params.handle ) return;
		// html parent object
		this.dom = {handle:params.handle};
		// build main blocks together
		elchild(this.dom.handle, [
			this.dom.title = element('div', {className:'title'}),
			this.dom.list  = element('div', {className:'list'}),
			this.dom.hint  = element('div', {className:'hint'}, hint_main)
		]);
		// reset hint
		$(this.dom.handle).mouseleave(function(){self.dom.hint.innerHTML = hint_main;});

		this.dom.filter = element('input', {type:'text', value:hint_filter});
		// watermark and filtering
		$(this.dom.filter)
			.focus(function(){if(this.value==hint_filter)$(this).val('').css({color:'#999'});})
			.focusout(function(){if(!this.value)$(this).val(hint_filter).css({color:''});})
			.keyup(function(){self.Filter(this.value);});

		// title
		elchild(this.dom.title, [element('div', {className:'text'}, 'Templates'), this.dom.filter]);

		// build the list of templates
		this.Fill();
	}
}