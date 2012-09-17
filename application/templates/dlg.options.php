<script type="text/javascript">
	var DlgOptions = null;

	// the DOM is ready
	$(function(){
		DlgOptions = new DialogModal({
			width    : 650,
			title    : 'Options',
			hint     : 'Here you can create/restore backups and export all your data.',

			onCreate : function(){
				this.SetContent([
					element('div', {}, "Backup is an archived package of all your encrypted data. It can't be read by human but can be used to restore your account info or setup a copy on some other FortNotes instance."),
					element('br'),
					element('input', {type:'button', className:'button long', value:'Create backup', onclick:function(){
						window.location = 'user/export/zip';
					}}), ' ',
					element('input', {type:'button', className:'button long', value:'Restore backup', onclick:function(){
						alert('Not implemented.');
					}}),
					element('br'),
					element('br'),
					element('div', {}, "It's possible to export all the data in a human readable form in order to print it or save in file on some storage. It'll give all the data in plain unencrypted form. The password is required."),
					element('br'),
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