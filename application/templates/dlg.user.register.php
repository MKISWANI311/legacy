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
			width : 500,
			title : 'Registration',
			hint  : "You are going to register in the system. Please note that the password you are going to enter will be used not only to login but also to encrypt/decrypt your data so choose a strong and long password. Your registration data won't be sent to the server in plain unencrypted form. Only hashes are stored on the server. We don't know your password and will never ask you to send it to us but at the same time we won't be able to remind it to you so please keep that password utmost safe.",
			data  : {attempts:0},

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
				this.data.name  = element('input', {'type':'text',     className:'line'});
				this.data.pass1 = element('input', {'type':'password', className:'line'});
				this.data.pass2 = element('input', {'type':'password', className:'line'});
				this.data.cimg  = element('img', {width:161, height:75});
				this.data.code  = element('input', {'type':'text', className:'line cline', title:'case insensitive code above'});

				onEnterFocus(this.data.name,  this.data.pass1);
				onEnterFocus(this.data.pass1, this.data.pass2);
				onEnterFocus(this.data.pass2, this.data.code);
				onEnterClick(this.data.code,  this.params.controls['Register'].dom);

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
					this.data.pass1
				], {});
				this.data.fldlist.AddRow([
					[element('span', {className:'fldname'}, 'confirm password'),
						element('br'),
						element('span', {className:'fldhint'}, 'your secret key once more')],
					this.data.pass2
				], {});
				this.data.fldlist.AddRow([
					[element('span', {className:'fldname'}, 'captcha'),
						element('br'),
						element('span', {className:'fldwhint'}, 'enter the code on the image to make sure this is not an automated registration')],
					[this.data.cimg, element('br'), this.data.code]
				], {});
				$(this.dom.footer).hide();
				var self = this;
				this.SetContent(element('a', {}, "I understand that my password can't be restored and will keep it safe", {onclick:function(){
					self.SetHint('Keep your password safe - you are the only one who knows it so there is no way to restore it!');
					$('#simplemodal-container').css('top', ($('#simplemodal-container').css('top').replace('px','') - 80) + 'px');
					self.SetContent(self.data.fldlist.dom.table);
					$(self.dom.footer).show();
					self.data.name.focus();
				}}));
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
						var modal = this.modal;
						// get name and pass
						var password, username = modal.data.name.value;
						var pass1 = modal.data.pass1.value;
						var pass2 = modal.data.pass2.value;
						// verification
						if ( username && pass1 && pass2 && pass1 == pass2 ) {
							// make hash
							username = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(username));
							password = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(pass1));
							// block all inputs and buttons
							modal.EnableControls(false);
							modal.data.name.disabled = true;
							modal.data.pass1.disabled = true;
							modal.data.pass2.disabled = true;
							if ( modal.data.attempts > 1 ) {
								modal.SetLoading("Sending server request ...");
							}
							$.post('/user/auth', {name:username, pass:password, code:modal.data.code.value, mode:'register'}, function(data){
								if ( data ) {
									if ( data.code !== false ) {
										// check returned data
										if ( data && data.id ) {
											// save user name for future logins
											App.Set('username_last_used', modal.data.name.value, true);
											// reset values
											modal.data.name.value = '';
											modal.data.pass1.value = '';
											modal.data.pass2.value = '';
											modal.SetHint();
											modal.SetContent();
											$(modal.dom.footer).hide();
											modal.SetMessage(['Registration was completed successfully.', element('br'), 'Entering secure private section ...'], 'auth');
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
								modal.data.pass1.disabled = false;
								modal.data.pass2.disabled = false;
							});
						} else {
							modal.SetMessage("Empty one of the required field or passwords don't match.");
						}
					}
				}
			}
		});
	});
</script>