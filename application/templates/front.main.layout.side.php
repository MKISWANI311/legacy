<style type="text/css">
	#ui-layout-east-tplist table {
		border: 10px solid white;
	}
	#ui-layout-east-tplist td {
		padding: 10px;
	}
	#ui-layout-east-tplist td.hint {
		height: 65px;
	}
	#ui-layout-east-tplist td.list {
		vertical-align: top;
	}
	#ui-layout-east-tplist #handle_template_list {
		height: 100%;
		margin: 0 0px;
	}

	#ui-layout-east-data.scroller {
		overflow-y:auto;
		height: 100%;
	}
	#template_help {
		background-color: #F9F9F9;
		border: 1px solid #EEEEEE;
		margin: 0 0px 10px;
		padding: 5px;
		color: #aaa;
	}
</style>

<script type="text/javascript">
	var TpList  = null;

	// the DOM is ready
	$(function(){
//		TpList = new CTemplateList({
//			handle : document.getElementById('handle_ctemplatelist'),
//			onclick : function(){
//				$('#ui-layout-east-tplist').hide();
//				$('#ui-layout-east-data').show();
//				fb(this.data);
//				NoteEditor.Create(this.data);
//			}
//		});

//		var gr1 = TpList.AddGroup('Templates');
		//var gr2 = TpList.AddGroup('My personal templates');

//		for ( var i = 0; i < data_templates.data.length; i++ ) {
//			//fb(data_templates.data[i]);
//			if ( data_templates.data[i][data_templates.defn.sys] == 1 ) {
//				TpList.AddItem(gr1, data_templates.data[i]);
//				//TpList.AddItem(gr1, data_templates.data[i][data_templates.defn.id], data_templates.data[i][data_templates.defn.name], data_templates.data[i][data_templates.defn.description]);
//			} else {
//				//TpList.AddItem(gr2, data_templates.data[i]);
//				//TpList.AddItem(gr2, data_templates.data[i][data_templates.defn.id], data_templates.data[i][data_templates.defn.name], data_templates.data[i][data_templates.defn.description]);
//			}
//		}
	});

	function back () {
		$('#ui-layout-east-tplist').show();
		$('#ui-layout-east-data').hide();
	}
</script>

<div id="ui-layout-east-tplist">
	<div style="padding:10px">
<!--		<div id="template_help">
			<div class="message hint">In the list below please select a template to be used to create your new note.</div>
		</div>

		<div id="handle_ctemplatelist"></div>

		<div id="template_help" style="margin-top:10px">
			hint
		</div>

		<br>
		<br>-->
		<div class="templatelist"></div>
	</div>


<!--
	<table class="maxw">
		<tr>
			<td class="hint">
				<div class="info">In the list below please select a template to be used to create your new note.</div>
			</td>
		</tr>
		<tr>
			<td class="list"><div id="handle_template_list"></div></td>
		</tr>
	</table>
	-->
</div>
<div id="ui-layout-east-data" class="scroller" style="display:none">
	<div id="handle_noteeditor"></div>
</div>
