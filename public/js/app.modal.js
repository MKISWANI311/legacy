/**
 * Modal window wrapper
 */

function DialogModal ( params ) {
	this.params = params;
	this.data   = params.data || {};

	// html elements of the dialog
	this.dom  = {};

	this.SetWidth = function ( value ) {
		this.dom.body.style.width = value + 'px';
	};

	this.Show = function ( params ) {
		params = params || {};
		if ( this.params.onShow && this.params.onShow instanceof Function ) {
			//params.onShow = this.params.onShow;
			this.params.onShow.call(this);
		}
		$(this.dom.main).modal(params);
	};

	this.Close = function ( delay ) {
		if ( delay ) {
			var self = this;
			setTimeout(function(){
				$.modal.close();
				self.Reset();
			}, parseInt(delay, 10));
		} else {
			$.modal.close();
			this.Reset();
		}
	};

	this.Reset = function () {
		this.SetMessage();
	};

	this.SetTitle = function ( hint ) {

	};

	this.SetHint = function ( hint ) {
		if ( hint ) {
			if ( this.dom.hint.childNodes.length == 0 ) {
				//this.dom.hint.appendChild(table(1, 2, {})).rows[0].cells[0].appendChild(element('img', {src:'img/info.png'}));
				this.dom.hint.appendChild(element('div', {className:'info'}, hint));
			}
			//this.dom.hint.childNodes[0].rows[0].cells[1].innerHTML = hint;
			this.dom.hint.childNodes[0].innerHTML = hint;
			this.dom.hint.style.display = '';
		} else {
			this.dom.hint.style.display = 'none';
		}
	};

	this.SetMessage = function ( text, type ) {
		if ( text ) {
			type = type || 'warning';
//			img  = img  || 'message.' + type + '.png';
			elchild(elclear(this.dom.message), element('div', {className:'message ' + type}, text));
//			if ( this.dom.message.childNodes.length == 0 ) {
//				this.dom.message.appendChild(table(1, 2, {})).rows[0].cells[0].appendChild(element('img', {src:'img/message.info.png'}));
//			}
//			this.dom.message.childNodes[0].rows[0].cells[0].childNodes[0].src = 'img/' + img;
//			this.dom.message.childNodes[0].rows[0].cells[1].className = type;
//			this.dom.message.childNodes[0].rows[0].cells[1].innerHTML = text;
			this.dom.message.style.display = '';
		} else {
			this.dom.message.style.display = 'none';
		}
	};

	this.SetLoading = function ( text ) {
		this.SetMessage(text, 'loading');
	};

	this.SetContent = function ( content ) {
		if ( content ) {
			elclear(this.dom.content);
			elchild(this.dom.content, content);
		} else {
			this.dom.content.style.display = 'none';
		}
	};

	this.EnableControls = function ( state ) {
		if ( this.params.controls ) {
			for ( var cname in this.params.controls ) {
				this.params.controls[cname].dom.disabled = !state;
			}
		}
	};

	this.Init = function () {
		this.dom.body  = element('div', {className:'body'}, [
			this.dom.title   = element('div', {className:'block title'}, this.params.title),
			this.dom.hint    = element('div', {className:'block hint'}),
			this.dom.content = element('div', {className:'block content'}),
			this.dom.message = element('div', {className:'block info'}),
			this.dom.footer  = element('div', {className:'block footer'})
		]);

		this.dom.main = element('div', {className:'dialogmodal'}, this.dom.body);

		if ( this.params.width ) this.SetWidth(this.params.width);

		this.SetHint(this.params.hint);
		this.SetMessage(this.params.message);

		if ( this.params.controls ) {
			for ( var cname in this.params.controls ) {
				var cdata = this.params.controls[cname];
				cdata.dom = element('input', {type:'button', value:cname, className:'button'});
				// for inline indirect future use
				cdata.dom.modal = this;
				// default action
				if ( cdata.main ) cdata.dom.className += ' bold';
				// set callback
				if ( cdata.onClick && cdata.onClick instanceof Function ) {
					cdata.dom.onclick = cdata.onClick;
				}
				this.dom.footer.appendChild(cdata.dom);
			}
		}

		if ( this.params.onCreate && this.params.onCreate instanceof Function ) {
			this.params.onCreate.call(this);
		}

		if ( this.params.EventClose && this.params.EventClose instanceof Function ) {
			this.EventClose = this.params.EventClose;
		}

		if ( this.params.content ) {
			this.params.content.style.display = '';
			this.dom.content.appendChild(this.params.content);
		}
		//fb(this);
		//$(this.dom.body).draggable();
	};
	this.Init();
}