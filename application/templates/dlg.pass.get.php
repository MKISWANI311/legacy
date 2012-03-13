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
					60:    {next:300,   title: '1 minute'},
					300:   {next:1200,  title: '5 minutes'},
					1200:  {next:3600,  title: '20 minutes'},
					3600:  {next:18000, title: '1 hour'},
					18000: {next:86400, title: '5 hours'},
					86400: {next:60,   title: '1 day'}
				}, App.Get('pass_store_time', 60));
			},

			/**
			 * close the subscriber
			 * master password is expired and cleared
			 * clear all the decrypted data
			 */
			EventClose : function () {
				fb('EventClose: DlgPassGet');
				DlgPassGet.Show({escClose:false});
			},

			controls : {
				/*'Cancel' : {
					onClick : function(){
						this.modal.Close();
					}
				},/**/
				'Continue' : {
					main    : true,
					onClick : function(){
						var modal = this.modal;
						var pass  = modal.data.pass.value;

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

							//fb('decrypt tags');
//							var text_tag_list = document.getElementById('text_tag_list');
//							text_tag_list.value = '';
//							console.time('decode tags');
//							// decode tags
//							var name = '';
//							for ( var id in data_tags_encoded.data ) {
//								name = App.Decode(data_tags_encoded.data[id][data_tags_encoded.defn.name]);
//								//fb(name, data_tags_encoded.data[id][data_tags_encoded.defn.name]);
//								data_tags_nmlist[name] = parseInt(id, 10);
//								data_tags_idlist[id] = name;
//								//localStorage[sjcl.decrypt('ptmp', data_tags_encoded.data[id][data_tags_encoded.defn.name])] = parseInt(id, 10);
//								//text_tag_list.value += name + "\n";
//								text_tag_list.value += id + ':' + name + "\n";
//							}
//							// clear to minimaze memory
//							//delete data_tags_encoded.data;
//							console.timeEnd('decode tags');

//							NoteTable.data = {};
//							for ( var i = 0; i < data_notes_latest.length; i++) {
//								NoteTable.data[data_notes_latest[i].id] = data_notes_latest[i];
//							}
//							NoteTableFill();

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

		//DlgPassGet.Show({escClose:false});
		App.Subscribe(DlgPassGet);
//		App.RequestPass = function(){
//			DlgPassGet.Show({escClose:false});
//		};
	});
</script>