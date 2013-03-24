<script type="text/javascript">
	var DlgExport = null;

	// the DOM is ready
	$(function(){
		DlgExport = new DialogModal({
			width    : 750,
			title    : 'Data export',
			hint     : 'Here you can get all your data unencrypted.',
			dom      : {},

			onCreate : function(){
				this.SetContent(this.dom.text = element('textarea', {className:'export'}));
			},

			/**
			 * Open the subscriber
			 * master password is accessible
			 * decrypt all the data and show it
			 */
			EventOpen : function () {
				if ( export_data ) {
					setTimeout(function(){
						DlgExport.Show();
						for ( var id_note in export_data.notes ) {
							// check type
							if ( export_data.notes[id_note] instanceof Array ) {
								export_data.notes[id_note].each(function(entry){
									var name = App.Decode(entry.name, true);
									var data = App.Decode(entry.data, true);
									if ( name && data ) {
										DlgExport.dom.text.value += name + ': ' + data + "\n";
									}
								});
							}
							// check type
							if ( export_data.note_tags[id_note] instanceof Array ) {
								var tags = [];
								export_data.note_tags[id_note].each(function(id_tag){
									if ( export_data.tags[id_tag] ) tags.push(App.Decode(export_data.tags[id_tag], true));
								});
								if ( tags.length > 0 ) {
									DlgExport.dom.text.value += 'tags: ' + tags.join(' ') + "\n";
								}
							}
							DlgExport.dom.text.value += "\n";
						}
						// strip
						DlgExport.dom.text.value = DlgExport.dom.text.value.trim();
						export_data = null;
					}, 50);
				}
			},

			/**
			 * close the subscriber
			 * master password is expired and cleared
			 * clear all the decrypted data
			 */
			EventClose : function () {
				DlgExport.Close();
			},

			controls : {
				'Close' : {
					main    : true,
					onClick : function(){
						//var modal = this.modal;
						this.modal.Close();
					}
				}
			}
		});

		App.Subscribe(DlgExport);
	});
</script>