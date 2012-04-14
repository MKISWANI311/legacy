<script type="text/javascript">
	var DlgPassGet = null;

	// the DOM is ready
	$(function(){
		DlgPassGet = new DialogModal({
			width    : 500,
			title    : 'Master password',
			hint     : 'Your master password session time has expired. Please enter it again and change the store time if necessary.',
			content  : document.getElementById('dlg_pass_get_content'),
			data     : {attempts:0},

			onCreate : function(){
				this.data.fldlist = new FieldList({
					cols: [
						{className:'colname'},
						{className:'colvalue'}],
					attr: {}
				});
				this.data.pass    = element('input', {'type':'password', className:'line'});
				this.data.linkset = element('a', {className:'combo', title:'click to change the password storing time'});
				onEnterClick(this.data.pass, this.params.controls['Continue'].dom);

				this.data.fldlist.AddRow([
					[element('span', {className:'fldname'}, 'password'),
						element('br'),
						element('span', {className:'fldhint'}, 'your secret key')],
					this.data.pass
				], {});
				this.data.fldlist.AddRow([null, ['remember password for ', this.data.linkset]], {});

				this.SetContent(this.data.fldlist.dom.table);
			},

			onShow   : function(){
				new LinkSet(DlgPassGet.data.linkset, {
					300:   {next:1200,  title: '5 minutes'},
					1200:  {next:3600,  title: '20 minutes'},
					3600:  {next:18000, title: '1 hour'},
					18000: {next:86400, title: '5 hours'},
					86400: {next:300,   title: '1 day'}
				}, App.Get('pass_store_time', 300));
			},

			/**
			 * close the subscriber
			 * master password is expired and cleared
			 * clear all the decrypted data
			 */
			EventClose : function () {
				DlgPassGet.Show({escClose:false});
			},

			controls : {
				'Continue' : {
					main    : true,
					onClick : function(){
						var modal = this.modal;
						var pass  = modal.data.pass.value;
						// check pass
						if ( App.CheckPass(pass) ) {
							if ( modal.data.linkset.value ) {
								//fb(modal.data.linkset.value);
								App.Set('pass_store_time', modal.data.linkset.value, true);
								App.SetPassTime(modal.data.linkset.value);
							}
							App.SetPass(pass);
							modal.data.attempts = 0;
							// reset value
							modal.data.pass.value = '';
							modal.Close();
							//NoteManager.FocusFilter();
							NoteFilter.SetFocus();
						} else {
							modal.data.pass.focus();
							modal.data.attempts++;
							if ( modal.data.attempts == 1 )
								modal.SetMessage('Master password is invalid!');
							else
								modal.SetMessage(['Master password is invalid!', element('br'), 'Logged attempts: ' + modal.data.attempts]);
						}
					}
				}
			}
		});

		// check if master password was ever set
		if ( App.HasHash() ) {
			// ask pass
			DlgPassGet.Show({escClose:false});
		} else {
			// suggest to create
			DlgPassSet.Show({escClose:false});
		}

		App.Subscribe(DlgPassGet);
	});
</script>