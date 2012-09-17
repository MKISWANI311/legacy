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
				this.SetContent([
					this.dom.text = element('textarea', {className:'export'}),
				]);
			},

			/**
			 * Open the subscriber
			 * master password is accessible
			 * decrypt all the data and show it
			 */
			EventOpen : function () {
				fb('DlgExport opened');
				if ( export_data ) {
					setTimeout(function(){
						DlgExport.Show();
						fb(export_data);
						for ( var id_note in export_data.notes ) {
							var note = export_data.notes[id_note];
							//fb(note);
							note.each(function(entry){
								//fb(entry);
								var name = App.Decode(entry.name, true);
								var data = App.Decode(entry.data, true);
								if ( name && data ) {
									DlgExport.dom.text.value += name + ': ' + data + "\n";
								}
							});
							if ( export_data.note_tags[id_note] ) {
								var tags = [];
								export_data.note_tags[id_note].each(function(id_tag){
									if ( export_data.tags[id_tag] ) tags.push(App.Decode(export_data.tags[id_tag], true));
								});
								if ( tags.length > 0 ) {
									DlgExport.dom.text.value += 'tags: ' + tags.join(', ') + "\n";
								}
							}
							DlgExport.dom.text.value += "\n";
						}
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