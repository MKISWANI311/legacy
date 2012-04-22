<script type="text/javascript">
	var DlgUserLogin = null;

	// the DOM is ready
	$(function(){
		DlgUserLogin = new DialogModal({
			width : 500,
			title : 'Authentication',
			hint  : "Welcome back! Please authorize.",
			data  : {attempts:0},

			onCreate : function(){
				this.data.fldlist = new FieldList({
					cols: [
						{className:'colname'},
						{className:'colvalue'}],
					attr: {}
				});
				this.data.name = element('input', {className:'line', type:'text', value:App.Get('username_last_used', '')});
				this.data.pass = element('input', {className:'line', type:'password'});

				onEnterFocus(this.data.name, this.data.pass);
				onEnterClick(this.data.pass, this.params.controls['Login'].dom);

				this.data.fldlist.AddRow([
					[element('span', {className:'fldname'}, 'username'),
						element('br'),
						element('span', {className:'fldhint'}, 'your name or email')],
					this.data.name
				], {});
				this.data.fldlist.AddRow([
					[element('span', {className:'fldname'}, 'password'),
						element('br'),
						element('span', {className:'fldhint'}, 'your secret key')],
					this.data.pass
				], {});
				this.SetContent(this.data.fldlist.dom.table);
			},

			controls : {
				'Cancel' : {
					onClick : function(){
						this.modal.Close();
					}
				},
				'Login' : {
					main    : true,
					onClick : function(){
						var modal = this.modal;
						// get name and pass
						var username = modal.data.name.value;
						var password = modal.data.pass.value;
						// verification
						if ( username && password ) {
							// ajax request
							username = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(username));
							password = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(password));
							// block all inputs and buttons
							modal.EnableControls(false);
							modal.data.name.disabled = true;
							modal.data.pass.disabled = true;
							if ( modal.data.attempts > 1 ) {
								modal.SetLoading("Sending server request ...");
							}
							$.post('/user/auth', {name:username, pass:password, mode:'login'}, function(data){
								if ( data ) {
									// check returned data
									if ( data && data.id ) {
										// save user name of last login
										App.Set('username_last_used', modal.data.name.value, true);
										// reset values
										modal.data.name.value = '';
										modal.data.pass.value = '';
										modal.SetHint();
										modal.SetContent();
										$(modal.dom.footer).hide();
										modal.SetMessage(['Authentication was completed successfully.', element('br'), 'Entering secure private section ...'], 'auth');
										// redirect to home with delay
										setTimeout(function(){
											window.location.href = window.location.href;
										}, 200);
										return;
									} else {
										modal.data.attempts++;
										if ( modal.data.attempts == 1 )
											modal.SetMessage('Invalid user name or password.', 'error');
										else
											modal.SetMessage(['Invalid user name or password.', element('br'), 'Logged attempts: ' + modal.data.attempts], 'error');
									}
								} else {
									modal.SetMessage('Invalid responce from the server.');
								}
								// unblock all inputs and buttons
								modal.EnableControls(true);
								modal.data.name.disabled = false;
								modal.data.pass.disabled = false;
							});
						} else {
							modal.SetMessage('Empty user name or password.');
						}
					}
				}
			}
		});
	});
</script>