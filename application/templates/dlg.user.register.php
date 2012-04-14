<style type="text/css">
	.cline {
		width:161px !important;
		margin-top:5px;
	}
</style>
<script type="text/javascript">
	var DlgUserRegister = null;

	// the DOM is ready
	$(function(){
		DlgUserRegister = new DialogModal({
			width    : 500,
			title    : 'Registration',
			hint     : "You are going to register in the system. Please enter your name and password. They will be used only to login. To start working with your secret data you will be asked for a master password. Please keep that password utmost safe.",
			data     : {attempts:0},

			onShow : function(){
				var self = this;
				$.post('/user/captcha', function(data){
					self.data.cimg.src = data.src;
				});
			},

			onCreate : function(){
				this.data.fldlist = new FieldList({
					cols: [
						{className:'colname'},
						{className:'colvalue'}],
					attr: {}
				});
				this.data.name = element('input', {'type':'text',     className:'line'});
				this.data.pass = element('input', {'type':'password', className:'line'});
				this.data.cimg = element('img', {width:161, height:75});
				this.data.code = element('input', {'type':'text', className:'line cline', title:'case insensitive code above'});

				onEnterFocus(this.data.name, this.data.pass);
				onEnterFocus(this.data.pass, this.data.code);
				onEnterClick(this.data.code, this.params.controls['Register'].dom);

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
				this.data.fldlist.AddRow([
					[element('span', {className:'fldname'}, 'captcha'),
						element('br'),
						element('span', {className:'fldwhint'}, 'enter the code on the image to make sure this is not an automated registration')],
					[this.data.cimg, element('br'), this.data.code]
				], {});
				this.SetContent(this.data.fldlist.dom.table);
			},

			controls : {
				'Cancel' : {
					onClick : function(){
						this.modal.Close();
					}
				},
				'Register' : {
					main    : true,
					onClick : function(){
						var modal  = this.modal;
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
							$.post('/user/auth', {name:username, pass:password, code:modal.data.code.value, mode:'register'}, function(data){
								if ( data ) {
									if ( data.code !== false ) {
										// check returned data
										if ( data && data.id ) {
											// reset values
											modal.data.name.value = '';
											modal.data.pass.value = '';
											if ( modal.data.attempts > 1 ) {
												modal.SetMessage("Operation was completed successfully.", 'ok');
											}
											modal.SetHint();
											modal.SetContent();
											modal.SetMessage("Registration was completed successfully.", 'ok');
											// redirect to home with delay
											setTimeout(function(){
												window.location.href = window.location.href;
											}, 1000);
											return;
										} else {
											modal.data.attempts++;
											if ( modal.data.attempts == 1 )
												modal.SetMessage(['Invalid user name or password.', element('br'), 'There maybe already a user with the same name or there are some technical problems on the server.'], 'error');
											else
												modal.SetMessage(['Invalid user name or password.', element('br'), 'Logged attempts: ' + modal.data.attempts], 'error');
										}
									} else {
										modal.SetMessage('Invalid captcha code. Please correct it and try once again.');
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