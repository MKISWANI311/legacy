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
	 * Open the subscriber
	 * master password is accessible
	 * decrypt all the data and show it
	 */
	this.EventOpen = function () {
		this.Fill();
		// component state flag
		this.open = true;
	};

	/**
	 * Close the subscriber
	 * master password is expired and cleared
	 * clear all the decrypted data
	 */
	this.EventClose = function () {
		// close only if opened at the moment
		if ( this.open ) {
			elclear(this.dom.list);
			// component state flag
			this.open = false;
		}
	};

	/**
	 * Fills the list with templates
	 */
	this.Fill = function () {
		// prepare
		elclear(self.dom.list);
		// iterate all templates
		data_templates.data.each(function(data){
			// template body
			var item = element('div', {className:'item', /*style:'display:none',*/ data:data},
				element('div', {className:'line'}, [
					element('div', {className:'name'}, data[data_templates.defn.name]),
					element('div', {className:'hint'}, data[data_templates.defn.description])
			]));
			// append
			elchild(self.dom.list, item);
			// template item handlers
			//$(item).click(function(){
			item.addEventListener('click', function () {
				self.Show(false);
				NoteEditor.Create(this.data);
			});
			//$(item).mouseenter(function(){
			item.addEventListener('mouseenter', function () {
				var list = [];
				data_template_entries.data[this.data[data_templates.defn.id]].each(function(entry){
					list.push('<b>' + entry[data_template_entries.defn.name] + '</b>');
				});
				self.dom.hint.innerHTML = hint_item + list.join(', ');
			});
		});
		this.Filter();
	};

	/**
	 * Filters by given text
	 * @param text string to search in each template name or description
	 */
	this.Filter = function ( text ) {
		text = text || this.dom.filter.value;
		text = text.toLowerCase();
		for ( var i = 0; i < self.dom.list.childNodes.length; i++ ) {
			// prepare
			var item = self.dom.list.childNodes[i];
			var name = item.data[data_templates.defn.name].toLowerCase();
			var desc = item.data[data_templates.defn.description].toLowerCase();
			// search substring and show/hide
			//$(item).toggle(name.indexOf(text) >= 0 || desc.indexOf(text) >= 0);
			item.classList.toggle('hidden', !(!text || name.indexOf(text) >= 0 || desc.indexOf(text) >= 0));
		}
	};

	/**
	 * Shows/hides the component
	 * @param state visibility flag: true - show, false - hide
	 */
	this.Show = function ( state ) {
		this.dom.handle.style.display = state ? 'block' : 'none';
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
		//$(this.dom.handle).mouseleave(function(){
		this.dom.handle.addEventListener('mouseleave', function () {
		    self.dom.hint.innerHTML = hint_main;
		});

		//this.dom.filter = element('input', {type:'text', value:hint_filter});
		this.dom.filter = element('input', {type:'text', placeholder: hint_filter});
		// watermark and filtering
		//watermark(this.dom.filter, hint_filter, '#000');
		//$(this.dom.filter).keyup(function(){
		this.dom.filter.addEventListener('keyup', function() {
		    self.Filter(this.value);
		});

		// title
		elchild(this.dom.title, [element('div', {className:'text'}, 'Templates'), this.dom.filter]);
	}
};
