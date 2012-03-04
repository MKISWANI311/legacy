<script type="text/javascript">
	var DlgPassSet = null;

	// the DOM is ready
	$(function(){
		DlgPassSet = new DialogModal({
			width    : 600,
			title    : 'Master password',
			hint     : "To start working with notes please enter your master password. It will be used for all your data encoding. It won't be sent to the server and only its hash will be stored for the purpose of consistency. We don't know your password and will never ask you to send it to us but at the same time we won't be able to remind it to you.",

			onCreate : function(){
				 this.data.fldlist = new FieldList({
					cols: [
						{className:'colname'},
						{className:'colvalue'}],
					attr: {}
				});
				this.data.pass1 = element('input', {'type':'password', className:'line'});
				this.data.pass2 = element('input', {'type':'password', className:'line'});

				onEnterFocus(this.data.pass1, this.data.pass2);
				onEnterClick(this.data.pass2, this.params.controls['Create'].dom);

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
				this.SetContent(this.data.fldlist.dom.table);
			},

			controls : {
//				'Cancel' : {
//					onClick : function(){
//						this.modal.Close();
//					}
//				},
				'Create' : {
					main    : true,
					onClick : function(){
						var modal = this.modal;
						// get name and pass
						var pass1 = modal.data.pass1.value;
						var pass2 = modal.data.pass2.value;
						// verification
						if ( pass1 && pass2 && pass1 == pass2 ) {
							if ( pass1.length >= 8 ) {
								// calculating
								var hash = App.CalcHash(pass1);
								if ( hash ) {
									// block all inputs and buttons
									modal.EnableControls(false);
									modal.data.pass1.disabled = true;
									modal.data.pass2.disabled = true;
									modal.SetLoading("Sending server request ...");
									// ajax request
									$.post('/user/hash/save', {hash:hash}, function(data){
										// check result and set hash/pass
										if ( data && data.ok ) {
											// reset values
											modal.data.pass1.value = '';
											modal.data.pass2.value = '';
											// actual set password
											App.SetPass(pass1);
											modal.SetMessage("Operation was completed successfully.", 'ok');
											modal.Close(1000);
										} else {
											modal.SetMessage(data.message || "Was not able to set password!");
										}
										// unblock all inputs and buttons
										modal.EnableControls(true);
										modal.data.pass1.disabled = false;
										modal.data.pass2.disabled = false;
									});
								}
							} else {
								modal.SetMessage("Entered password is too short. It's vital to use strong password here.");
							}
						} else {
							modal.SetMessage("Empty one of the required field or password didn't match.");
						}
						return false;
					}
				}
			}
		});
	});
</script>