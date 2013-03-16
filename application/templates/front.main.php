<html lang="en">
<head>
	<title>FortNotes Online Password Manager</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<meta name="keywords" content="security online password manager AES encryption"/>
	<meta name="description" content="FortNotes Online Password Manager is a highly secure open-source private information storing platform based on the AES encryption in the browser. Fort Knox for your notes."/>
	<link rel="icon" type="image/png" href="img/castle.png"/>
	<link rel="stylesheet" type="text/css" href="css/all.css"/>
	<script type="text/javascript" src="js/all.js"></script>
	<script type="text/javascript">
		// reference and dictionary data
		var data_entry_types      = <?php echo cache::db_entry_types() ?>;
		var data_templates        = <?php echo cache::db_templates() ?>;
		var data_template_entries = <?php echo cache::db_template_entries() ?>;

		// compacted list of all encoded tags with links and use counters
		var data_tags = <?php echo cache::db_tags() ?>;
		// need to correct type if empty
		if ( data_tags.data.length != undefined && data_tags.data.length == 0 )
			{ data_tags.data = {}; data_tags.defn = {name:0, links:1, uses:2}; }
		// decoded to these two lists
		var data_tags_nmlist = {}; // {note:1, site:2, email:3}
		var data_tags_idlist = {}; // {1:note, 2:site, 3:email}
		// they are filling on page loading and on note creation
		// if there are some new tags

		// contains encrypted data for export
		// if not null an export window appears
		var export_data = null;

		// list of tag names with title images
		var icon_tags = ['email', 'ftp', 'ssh', 'icq', 'note', 'site', 'skype', 'jabber', 'msn', 'database'];

		App.SetPassHash(<?php echo !empty($_SESSION['user']['hash']) ? "'{$_SESSION['user']['hash']}'" : 'null' ?>);

		// the DOM is ready
		$(function() {
			$.modal.defaults.opacity = 20;

			// set menu to home
			MenuItemClick($('div#menu_item_home a')[0]);

			// main components initialization
			NoteFilter.
				Init({handle:document.querySelector('div.notefilter')});
			NoteList.
				Init({handle:document.querySelector('div.notelist')});
			TemplateList.
				Init({handle:document.querySelector('div.templatelist')});
			NoteEditor.
				Init({handle:document.querySelector('div.noteeditor')});

			// to receive password change events
			App.Subscribe(TagManager);
			App.Subscribe(TemplateList);
			App.Subscribe(NoteList);
			App.Subscribe(NoteFilter);
			App.Subscribe(NoteEditor);

			// start entropy collection
			sjcl.random.startCollectors();
			// check each 5 sec if has enough
			var collect_timer = setInterval(function(){
				if ( sjcl.random.isReady() ) {
					fb('Entropy collected');
					// has enough
					sjcl.random.stopCollectors();
					// stop checking
					clearInterval(collect_timer);
				}
			}, 5000);
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

		function CacheClear ( param ) {
			$.post('/front/clear/' + param, function(){});
		}

		// Google Analytics
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-31029268-1']);
		_gaq.push(['_trackPageview']);
		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	</script>

	<?php response::template('dlg.export') ?>
	<?php response::template('dlg.options') ?>
	<?php response::template('dlg.pass.get') ?>
</head>
<body>
	<table class="maxh maxw"><tr><td class="body_wrapper">
		<table class="body_content">
			<tr class="fade" style="height:30px; border-bottom:1px solid #EEEEEE">
				<td align="left" style="padding:0px 5px; width:150px">
					<a href="/">
						<span style="font-size:17px; color:#aaa; font-weight:normal; text-shadow: 0 1px 2px #666666;">
							<span style="font-size:19px; color:#333; font-weight:bold">F</span>ort
							<span style="font-size:19px; color:#333; font-weight:bold">N</span>otes
						</span>
					</a>
				</td>
				<td align="left" style="padding:0px 10px">
<!--					<img src="http://www.google.com/help/hc/images/adsense/adsense_185679_adformat-link_468x15_en.png"/>-->
				</td>
				<td align="right" style="padding:0px 10px; width:500px">
					<div style="position:relative;">
						<div id="block_welcome">
							<?php if ( !empty($_SESSION['user']['time']) ) echo '<span style="color:grey">session was started</span>&nbsp;&nbsp;<span style="font-weight:bold;font-size:10px;color:#333">' . date('Y.m.d H:i', $_SESSION['user']['time']) . '</span>'?>
<!--							&nbsp;<span style="color:#ccc;">|</span>&nbsp;
							<a href="javascript:Settings()"><b>Settings</b></a>
							&nbsp;<span style="color:#ccc;">|</span>&nbsp;
							<a href="javascript:CacheClear()"><b>Clear all</b></a>-->
							&nbsp;<span style="color:#ccc;">|</span>&nbsp;
							<a href="javascript:DlgOptions.Show()"><b>Options</b></a>
							&nbsp;<span style="color:#ccc;">|</span>&nbsp;
							<a href="javascript:App.ExpirePass()"><b>Lock</b></a>
							&nbsp;<span style="color:#ccc;">|</span>&nbsp;
							<a href="javascript:SignOut()"><b>Exit</b></a>
						</div>
					</div>
				</td>
			</tr>
			<tr style="display:none">
				<td id="block_menu" colspan="3" style="background-color:#eee; height:30px; vertical-align:bottom">
					<div style="float:left" id="menu_items">
						<div id="menu_item_home"   class="menu-item"><a onclick="MenuItemClick(this); return false">Home</a></div>
						<div id="menu_item_config" class="menu-item"><a onclick="MenuItemClick(this); return false">Settings</a></div>
						<div id="menu_item_audit"  class="menu-item"><a onclick="MenuItemClick(this); return false">Audit</a></div>
					</div>
				</td>
			</tr>
			<tr>
				<td colspan="3" style="background-color:white">
					<div class="menu-item-body" id="menu_item_home_body">
						<table class="maxw">
							<tr>
								<td style="padding:10px; vertical-align:top">
									<div class="notefilter"></div>
									<div class="notelist"></div>
<!--									<div style="text-align:center">
										<script type="text/javascript">
										google_ad_client = "ca-pub-9617280891760602";
										/* fortnotes.bottom */
										google_ad_slot = "1383117777";
										google_ad_width = 468;
										google_ad_height = 60;
										//
										</script>
										<script type="text/javascript"
										src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
										</script>
									</div>-->
								</td>
								<td style="padding:10px; width:400px; vertical-align:top; min-height:800px;">
									<div class="templatelist"></div>
									<div class="noteeditor"></div>
<!--									<div style="margin: 20px 0px; text-align:center">
										<script type="text/javascript">
											google_ad_client = "ca-pub-9617280891760602";
											/* fortnotes.side */
											google_ad_slot = "3540815500";
											google_ad_width = 300;
											google_ad_height = 250;
										</script>
										<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>
									</div>-->
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
				<td colspan="3" style="border-top: 1px solid #eee;">Copyright © 2012 FortNotes. All rights reserved.</td>
			</tr>
			<tr><td class="gradient" style="height:30px" colspan="3">
				&nbsp;
			</td></tr>
		</table>
	</td></tr>
	</table>
</body>
</html>