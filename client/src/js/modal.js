/**
 * Modal window wrapper
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

function DialogModal ( params ) {
    this.params = params;
    this.data = params.data || {};

    // html elements of the dialog
    this.dom = {};

    this.SetWidth = function ( value ) {
        this.dom.body.style.width = value + 'px';
    };

    this.Show = function ( params ) {
        params = params || {};
        if ( this.params.onShow && this.params.onShow instanceof Function ) {
            this.params.onShow.call(this);
        }
        $(this.dom.main).modal(params);
    };

    this.Close = function ( delay ) {
        if ( delay ) {
            var self = this;
            setTimeout(function () {
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
            if ( this.dom.hint.childNodes.length === 0 ) {
                this.dom.hint.appendChild(element('div', {className: 'info'}, hint));
            }
            this.dom.hint.childNodes[0].innerHTML = hint;
            this.dom.hint.style.display = '';
        } else {
            this.dom.hint.style.display = 'none';
        }
    };

    this.SetMessage = function ( text, type ) {
        if ( text ) {
            type = type || 'warning';
            elchild(elclear(this.dom.message), element('div', {className: 'message ' + type}, text));
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
        this.dom.body = element('div', {className: 'body'}, [
            this.dom.title = element('div', {className: 'block title'}, this.params.title),
            this.dom.hint = element('div', {className: 'block hint'}),
            this.dom.content = element('div', {className: 'block content'}),
            this.dom.message = element('div', {className: 'block info'}),
            this.dom.footer = element('div', {className: 'block footer'})
        ]);

        this.dom.main = element('div', {className: 'dialogmodal'}, this.dom.body);

        if ( this.params.width ) this.SetWidth(this.params.width);

        this.SetHint(this.params.hint);
        this.SetMessage(this.params.message);

        if ( this.params.controls ) {
            for ( var cname in this.params.controls ) {
                var cdata = this.params.controls[cname];
                cdata.dom = element('input', {type: 'button', value: cname, className: 'button'});
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
        if ( this.params.EventOpen && this.params.EventOpen instanceof Function ) {
            this.EventOpen = this.params.EventOpen;
        }

        if ( this.params.content ) {
            this.params.content.style.display = '';
            this.dom.content.appendChild(this.params.content);
        }
    };
    this.Init();
}


// public
module.exports = DialogModal;
