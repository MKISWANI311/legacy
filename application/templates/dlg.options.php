<script type="text/javascript">
	var DlgOptions = null;

	// the DOM is ready
	$(function(){
		DlgOptions = new DialogModal({
			width    : 650,
			title    : 'Options',
			hint     : 'Here you can create/restore backups and export all your data.',

			onCreate : function(){
				var file = element('input', {type:'file', name:'file', id:'file-upload', onchange:function(){
					if ( this.files[0].type === 'application/zip' ) {
						hint.innerHTML = this.value;
						fbtn.value = 'File selected';
					} else {
						alert('The selected file has an invalid type. Please select a zip archive package.');
					}
				}});
				var fbtn = element('input', {type:'button', className:'button long', value:'Choose file ...', onclick:function(){
					$(file).trigger('click');
				}});
				var hint = element('div', {className:'fhint'});

				this.SetContent([
					element('div', {className:'desc'}, "Backup is an archived package of all your encrypted data. It can't be read by human but can be used to restore your account info or setup a copy on some other FortNotes instance."),
					element('input', {type:'button', className:'button long', value:'Create backup', onclick:function(){
						window.location = 'user/export/zip';
					}}),
					element('div', {className:'desc'}, "Please specify your previuosly downloaded backup package and then press the \"Restore backup\" button. It will upload your backup to the server and replace all your current data with the data from this backup. Warning: this operation can't be reverted!"),
					element('div', {}, [
						element('input', {type:'button', className:'button long', value:'Restore backup', onclick:function(){
							// file selected
							if ( file.files.length === 0 || file.files[0].type !== 'application/zip' ) {
								alert('Please select a zip file with backup data first.');
								return;
							}
							var btn = this;
							btn.value = 'Uploading ...';
							btn.disabled = true;
							var data = new FormData();
							data.append('file', file.files[0]);
							$.ajax({
								url: 'user/import/zip',
								data: data,
								cache: false,
								contentType: false,
								processData: false,
								type: 'POST',
								dataType: 'json',
								success: function(data) {
									btn.value = 'Restore backup';
									btn.disabled = false;
									if ( data && data.error ) {
										alert('Restore from backup failed. Error: ' + data.error);
									} else {
										alert('The restore process has completed successfully and now the page will be reloaded to apply the restored data.');
										// We must reload the whole page to update data_tags
										window.location.reload();
									}
								}
							});
						}}), ' ',
						fbtn,
						hint
					]),
					element('div', {className:'desc'}, "It's possible to export all the data in a human readable form in order to print it or save in file on some storage. It'll give all the data in plain unencrypted form. The password is required."),
					element('input', {type:'button', className:'button long', value:'Export data', onclick:function(){
						var btn = this;
						btn.value = 'Loading ...';
						btn.disabled = true;
						$.get('user/export/plain', function(data) {
							btn.value = 'Export data';
							btn.disabled = false;
							export_data = data;
							App.ExpirePass();
						});
					}})
				]);
			},

			/**
			 * close the subscriber
			 * master password is expired and cleared
			 * clear all the decrypted data
			 */
			EventClose : function () {
				DlgOptions.Close();
			},

			controls : {
				'Close' : {
					main    : true,
					onClick : function(){
						this.modal.Close();
					}
				}
			}
		});

		App.Subscribe(DlgOptions);
	});
</script>
