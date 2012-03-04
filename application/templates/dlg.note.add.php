<style type="text/css">
	.dialogmodal .title .select {
		text-align: right;
	}
	.dialogmodal .title .select .typelist {
		width: 100px;
		color: #0066CC;
		font-size: 14px;
/*		font-weight: bold;*/
		height: 20px;
	}
	.dialogmodal .title .options {
		padding-left: 10px;
		width: 20px;
	}
</style>

<script type="text/javascript">
	var	DlgNoteAdd = null;

	function onNoteTypeChange ( type_id ) {
		fb(this.value);
		fb(type_id);
		type_id = this.value || type_id;
		fb(data_templates.data[type_id]);
		fb(data_template_entries.data[type_id]);

		DlgNoteAdd.data.fldlist = new FieldList({
			cols: [
				//{className:'colname'},
				//{className:'colimg'},
				{className:'colvalue'},
				//{className:'colcount'},
				//{className:'coltype'}
			],
			attr: {}
		});
		DlgNoteAdd.data.pass1 = element('input', {'type':'password', className:'line'});
		DlgNoteAdd.data.pass2 = element('input', {'type':'password', className:'line'});

		//onEnterFocus(DlgNoteAdd.data.pass1, DlgNoteAdd.data.pass2);
		//onEnterClick(DlgNoteAdd.data.pass2, DlgNoteAdd.params.controls['Create'].dom);

		//DlgNoteAdd.data.fldlist.AddDivider();

		var tpl_rows = data_template_entries.data[type_id];
		for ( var tpl_id in tpl_rows ) {
			fb(tpl_rows[tpl_id]);
			var id_type = tpl_rows[tpl_id][data_template_entries.defn.id_type];
			var title   = tpl_rows[tpl_id][data_template_entries.defn.title];
			var desc    = data_entry_types.data[id_type][data_entry_types.defn.description];
			var hinttbl = table(1,2, {className:'hinttbl'});
			var input   = null;

			if ( id_type == 6 ) {
				input = element('textarea', {className:'text'});
			} else {
				input = element('input', {type:'text', className:'line'});
			}

			var fldname = element('span', {className:'fldname'}, title);
			fldname.onclick = function(){
				var edit = element('input', {type:'text', className:'fldedit', value:this.innerHTML})
				elclear(this);
				elchild(this, edit);
				edit.focus();
			};
//			DlgNoteAdd.data.fldlist.AddRow([
//				[fldname,
//					element('br'),
//					element('span', {className:'fldhint'}, desc)],
//				[input,
//					//element('br'),
//					//element('span', {className:'fldhint'}, desc)
//				],
//				'0',
//				//element('span', {className:'fldtype'}, data_entry_types.data[id_type][data_entry_types.defn.name])
//				//element('img', {src:'img/edit.png'})
//				element('img', {src:'img/config.png'})
//			], {className:'row'});

			input.counter = element('span', {className:'fldhint'}, '0');
			elchild(hinttbl.rows[0].cells[0], element('span', {className:'fldhint'}, desc));
			elchild(hinttbl.rows[0].cells[1], input.counter);
			hinttbl.rows[0].cells[1].width = 5;

			input.onkeyup = function(){
				this.counter.innerHTML = this.value.length;
			};
			input.onkeydown = input.onkeyup;

			var title = table(1,4, {className:'tbltitle'});
			elchild(title.rows[0].cells[0], element('img', {src:'img/field_' + data_entry_types.data[id_type][data_entry_types.defn.name] + '.png'}));
			//elchild(title.rows[0].cells[1], element('img', {src:'img/field_btn_up.png', className:'fldbtn'}));
			//elchild(title.rows[0].cells[2], element('img', {src:'img/field_btn_down.png', className:'fldbtn'}));
			elchild(title.rows[0].cells[3], fldname);

			DlgNoteAdd.data.fldlist.AddRow([
				//element('img', {src:'img/field_' + data_entry_types.data[id_type][data_entry_types.defn.name] + '.png'}),
				[title,
					input,
					element('br'),
					hinttbl],
				//element('span', {className:'fldtype'}, data_entry_types.data[id_type][data_entry_types.defn.name])
			], {className:'row'});
		}
		// tags row
		DlgNoteAdd.data.fldlist.AddDivider();

//		DlgNoteAdd.data.fldlist.AddRow([
//			[element('span', {className:'fldtag'}, 'tags'),
//				element('br'),
//				element('span', {className:'fldhint'}, 'list of associated tags')],
//			element('input', {type:'text', className:'line', value:data_templates.data[type_id][data_templates.defn.tag]}),
//			null,
//			null
//		], {});

		var title = table(1,2, {className:'tbltitle'});
		elchild(title.rows[0].cells[0], element('img', {src:'img/field_tag.png'}));
		elchild(title.rows[0].cells[1], element('span', {className:'fldname'}, 'tags'));

		// tags
		DlgNoteAdd.data.fldlist.AddRow([
			//element('img', {src:'img/field_tag.png'}),
			[/*element('img', {src:'img/field_tag.png'}),/**/ //element('span', {className:'fldname'}, 'tags'),
				title,
				element('input', {type:'text', className:'line', value:data_templates.data[type_id][data_templates.defn.tag]}),
				element('br'),
				element('span', {className:'fldhint'}, 'list of associated tags separated by space')
			],
			//null
		], {});

		//DlgNoteAdd.data.fldlist.AddDivider();

		DlgNoteAdd.SetContent(DlgNoteAdd.data.fldlist.dom.table);
		DlgNoteAdd.dom.content.focus();
//		elclear($('#block_record_edit')[0]);
//		elchild($('#block_record_edit')[0], DlgNoteAdd.data.fldlist.dom.table);
//		$('#ui-layout-east-hint').hide();
//		$('#ui-layout-east-data').show();


//		$(".dropdown img.flag").addClass("flagvisibility");
//
//		$(".dropdown dt a").click(function() {
//			$(".dropdown dd ul").toggle();
//		});
//
//		$(".dropdown dd ul li a").click(function() {
//			var text = $(this).find('div.title').html();
//			$(".dropdown dt a span").html(text);
//			$(".dropdown dd ul").hide();
//			$("#result").html("Selected value is: " + getSelectedValue("sample"));
//		});
//
//		function getSelectedValue(id) {
//			return $("#" + id).find("dt a span.value").html();
//		}
//
//		$(document).bind('click', function(e) {
//			var $clicked = $(e.target);
//			if (! $clicked.parents().hasClass("dropdown"))
//				$(".dropdown dd ul").hide();
//		});
//
//
//		$("#flagSwitcher").click(function() {
//			$(".dropdown img.flag").toggleClass("flagvisibility");
//		});
	}

	// the DOM is ready
	$(function(){
		// prepare title
//		var title  = table(1, 3, {className:'maxw'});
//		var select = element('select', {className:'typelist'});
//		elchild(title.rows[0].cells[0], 'New record');
//		elchild(title.rows[0].cells[1], select);
//		title.rows[0].cells[0].className = 'title';
//		title.rows[0].cells[1].className = 'select';
//		title.rows[0].cells[2].className = 'options';
//		var ddmenu = $(".dropdown dd ul")[0];
//		for ( var type_id in data_templates.data ) {
//			elchild(select, element('option', {value:type_id}, data_templates.data[type_id][data_templates.defn.name]));
//			elchild(ddmenu, element('li', {}, element('a', {}, [
//				element('div', {className:'title'}, data_templates.data[type_id][data_templates.defn.name]),
//				element('div', {className:'hint'}, data_templates.data[type_id][data_templates.defn.description]),
//				element('span', {className:'value'}, type_id)
//			])));
//		}
//		select.onchange = onNoteTypeChange;
//		elchild(title.rows[0].cells[2], element('img', {src:'img/save.png'}));
//
//		DlgNoteAdd = new DialogModal({
//			width    : 700,
//			title    : title,
//			//hint     : "To start working with notes please enter your master password. It will be used for all your data encoding. It won't be sent to the server and only its hash will be stored for the purpose of consistency. We don't know your password and will never ask you to send it to us but at the same time we won't be able to remind it for you.",
//
//			onCreate : function(){
//				 //onNoteTypeChange(1);
//			},
//
//			onShow : function(){
//				 onNoteTypeChange(1);
//			},
//
//			controls : {
//				'Cancel' : {
//					onClick : function(){
//						this.modal.Close();
//					}
//				},
//				'Create' : {
//					main    : true,
//					onClick : function(){
//						var modal = this.modal;
//						// get name and pass
//						var pass1 = modal.data.pass1.value;
//						var pass2 = modal.data.pass2.value;
//						// verification
//						if ( pass1 && pass2 && pass1 == pass2 ) {
//							if ( pass1.length >= 8 ) {
//								// calculating
//								var hash = App.CalcHash(pass1);
//								if ( hash ) {
//									// block all inputs and buttons
//									modal.EnableControls(false);
//									modal.data.pass1.disabled = true;
//									modal.data.pass2.disabled = true;
//									modal.SetLoading("Sending server request ...");
//									// ajax request
//									$.post('/user/hash/save', {hash:hash}, function(data){
//										// check result and set hash/pass
//										if ( data && data.ok ) {
//											// reset values
//											modal.data.pass1.value = '';
//											modal.data.pass2.value = '';
//											// actual set password
//											App.SetPass(pass1);
//											modal.SetMessage("Operation was completed successfully.", 'ok');
//											modal.Close(1000);
//										} else {
//											modal.SetMessage(data.message || "Was not able to set password!");
//										}
//										// unblock all inputs and buttons
//										modal.EnableControls(true);
//										modal.data.pass1.disabled = false;
//										modal.data.pass2.disabled = false;
//									});
//								}
//							} else {
//								modal.SetMessage("Entered password is too short. It's vital to use strong password here.");
//							}
//						} else {
//							modal.SetMessage("Empty one of the required field or password didn't match.");
//						}
//						return false;
//					}
//				}
//			}
//		});
	});
</script>