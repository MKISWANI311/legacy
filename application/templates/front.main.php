<html lang="en">
<head>
	<title>FortNotes</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<link rel="icon" type="image/png" href="img/castle.png"/>
	<link rel="stylesheet" type="text/css" href="css/all.css"/>
	<script type="text/javascript" src="js/all.js"></script>
	<script type="text/javascript">
		// reference and dictionary data
		var data_entry_types      = <?php echo cache::db_entry_types() ?>;
		var data_templates        = <?php echo cache::db_templates() ?>;
		var data_template_entries = <?php echo cache::db_template_entries() ?>;
		var data_notes_latest     = <?php echo cache::db_notes_latest() ?>;
		//var data_note_entries     = <?php //echo json_encode($note_entries, JSON_NUMERIC_CHECK) ?>;

		// compacted list of all encoded tags with links and use counters
		var data_tags = <?php echo cache::db_tags() ?>;
		// decoded to these two lists
		var data_tags_nmlist = {}; // {note:1, site:2, email:3}
		var data_tags_idlist = {}; // {1:note, 2:site, 3:email}
		// they are filling on page loading and on note creation
		// if there are some new tags

		// list of tag names with title images
		var icon_tags = ['email', 'ftp', 'ssh', 'icq', 'note', 'site', 'skype', 'jabber', 'msn', 'database'];

		App.SetPassHash(<?php echo !empty($_SESSION['user']['hash']) ? "'{$_SESSION['user']['hash']}'" : 'null' ?>);

		// the DOM is ready
		$(function() {
			$.modal.defaults.opacity = 20;
			// master password hash from server

			// set menu to home
			MenuItemClick($('div#menu_item_home a')[0]);

			NoteManager.Init({handle:document.getElementById('handle_notemanager')});

			TemplateList.Init({handle:document.querySelector('div.templatelist')});

			NoteEditor.Init({
				handle   : document.getElementById('handle_noteeditor'),
				onsave   : function(){},
				oncancel : function(){
					$('#ui-layout-east-tplist').show();
					$('#ui-layout-east-data').hide();
				}
			});

			// to receive pass change events
			App.Subscribe(TagManager);
			//App.Subscribe(TagLst);
			App.Subscribe(NoteManager);
			App.Subscribe(NoteEditor);

		});


		// logoff
		function SignOut () {
			$.modal('<div><h1>Logged off</h1></div>');
			$.post('/user/signout', function(){
				window.location.href = window.location.href;
			});
		}

		// menu item handler
		function MenuItemClick ( item ) {
			$('div#menu_items .menu-item').each(function(index, it) {
				if ( !item || it.id != item.id ) {
					$('a', it).css('font-weight', 'normal');
					$(it).css('background-color', '#F9F9F9');
					$(it).css('border-bottom', '1px solid #eee');
					$('div#' + it.id + '_body').hide();
				}
			});
			if ( item ) {
				$(item).css('font-weight', 'bold');
				$(item.parentNode).css('background-color', 'white');
				$(item.parentNode).css('border-bottom', '1px solid white');
				$('div#' + item.parentNode.id + '_body').show();
			}
		}

		function AddNoteDialogShow () {
			$("#dlg_pass_set").modal();
		}

		function MasterPasswordSet () {
			var field = $('#block_pass_get #auth_password');
			var pass = $.trim(field.val());

			if ( App.CheckPass(pass) && App.SetPass(pass) ) {
				field.val('');
				var pass_store_time = document.getElementById('link_pass_store_time').value;
				//fb(pass_store_time);
				if ( pass_store_time ) {
					App.Set('pass_store_time', pass_store_time, true);
				}
				$.modal.close();
			} else {
				alert('Master password is invalid!');
			}
		}

		function CacheClear ( param ) {
			$.post('/front/clear/' + param, function(){});
		}

	</script>
	<style type="text/css">
		.ui-layout-resizer {
			width:5px !important;
			background-color: #eee !important;
		}
		.ui-layout-toggler {
			background-color: #ddd !important;
		}
		.ui-layout-pane {
			border-style: none !important;
			padding: 0px !important;
		}
	</style>
	<?php response::template('dlg.pass.set') ?>
	<?php response::template('dlg.pass.get') ?>
	<?php response::template('dlg.note.add') ?>
</head>
<body>
	<table class="maxh maxw"><tr><td class="body_wrapper">
		<table class="body_content">
			<tr class="fade" style="height:30px">
				<td align="left" style="padding:0px 5px">
					<a href="/">
						<span style="font-size:17px; color:#aaa; font-weight:normal; text-shadow: 0 1px 2px #666666;">
							<span style="font-size:19px; color:#333; font-weight:bold">F</span>ort
							<span style="font-size:19px; color:#333; font-weight:bold">N</span>otes
						</span>
					</a>
				</td>
				<td align="right" style="padding:0px 10px">
					<div style="position:relative;">
						<div id="block_welcome">
							<?php if ( !empty($_SESSION['user']['time']) ) echo '<span style="color:grey">session was started</span>&nbsp;&nbsp;<span style="font-weight:bold;font-size:10px;color:#333">' . date('Y.m.d H:i', $_SESSION['user']['time']) . '</span>'?>
							&nbsp;<span style="color:#ccc;">|</span>&nbsp;
							<a href="javascript:Settings()"><b>Settings</b></a>
							&nbsp;<span style="color:#ccc;">|</span>&nbsp;
							<a href="javascript:CacheClear()"><b>Clear all</b></a>
							&nbsp;<span style="color:#ccc;">|</span>&nbsp;
							<a href="javascript:CacheClear('user')"><b>Clear user</b></a>
							&nbsp;<span style="color:#ccc;">|</span>&nbsp;
							<a href="javascript:App.ExpirePass()"><b>Close</b></a>
							&nbsp;<span style="color:#ccc;">|</span>&nbsp;
							<a href="javascript:SignOut()"><b>Exit</b></a>
						</div>
					</div>
				</td>
			</tr>
			<tr>
				<td id="block_menu" colspan="2" style="background-color:#eee; height:30px; vertical-align:bottom">
					<div style="float:left" id="menu_items">
						<div id="menu_item_home"   class="menu-item"><a onclick="MenuItemClick(this); return false">Home</a></div>
						<div id="menu_item_config" class="menu-item"><a onclick="MenuItemClick(this); return false">Settings</a></div>
						<div id="menu_item_audit"  class="menu-item"><a onclick="MenuItemClick(this); return false">Audit</a></div>
					</div>
				</td>
			</tr>
			<tr>
				<td colspan="2" style="background-color:white">
					<div class="menu-item-body" id="menu_item_home_body">
						<table class="maxw">
							<tr>
								<td style="vertical-align:top">
									<?php response::template('front.main.layout.main') ?>
								</td>
								<td style="width:400px; vertical-align:top; min-height: 800px;">
									<?php response::template('front.main.layout.side') ?>
								</td>
							</tr>
						</table>
					</div>
					<div class="menu-item-body" id="menu_item_config_body">
						<div style="padding:10px">
							give it some time :)
						</div>
					</div>
					<div class="menu-item-body" id="menu_item_audit_body">
						<div style="padding:10px">
							yep! the same here :)
						</div>
					</div>
				</td>
			</tr>
			<tr class="fade" style="height:30px; text-align:center; color:#999;">
				<td colspan="2" style="border-top: 1px solid #eee;">Copyright © 2012 DarkPark. All rights reserved. Simple test template.</td>
			</tr>
			<tr><td class="gradient" style="height:30px" colspan="2">
				&nbsp;
			</td></tr>
		</table>
	</td></tr>
	</table>
</body>
</html>