<html lang="en">
<head>
	<title>FortNotes</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<meta name="keywords" content="security online password manager AES encryption"/>
	<meta name="description" content="FortNotes Online Password Manager is a highly secure private information storing platform based on the AES encryption in the browser. Fort Knox for your notes."/>
	<link rel="icon" type="image/gif" href="img/castle.png"/>
	<link rel="stylesheet" type="text/css" href="css/all.css"/>
	<script type="text/javascript" src="js/all.js"></script>
	<script type="text/javascript">
		// the DOM is ready
		$(function() {
			$.modal.defaults.opacity = 50;
		});

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
	<style type="text/css">
		.top {
			position:absolute;
			top:40;
			width: 100%;
			height: 740px;
		}
		.iblocks { width:1000px; height:650px; margin:20 auto; }
		.iblocks td.main { padding: 0 20px; width:430px; vertical-align:top }
		.iblock {
			height:125px;
			padding:10px;
			background-color:#fff;
			opacity:0.8;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
		}
		.iblock:hover {
			opacity:0.95;
		}
		.iblock table { height:100%; width:100%; }
		.iblock .caption { height:32px }
		.iblock .caption .img { width:42px }
		.iblock .caption td { font-size:16px; font-weight:bold; color:#555 }
		.iblock .body td { padding-top:8px }
		.iblock .more { height:15px; text-align:right }
		.btn { padding:8px; border:0px solid #ddd; background-color:#E4FFE4; width:100px; display:inline-block; box-shadow: 0 0 2px rgba(0, 0, 0, 0.5); }
		.btn:hover { background-color:#befcbe }
	</style>
	<?php response::template('dlg.user.login') ?>
	<?php response::template('dlg.user.register') ?>
</head>
<body>
	<table class="maxh maxw" style="background-color:#eee">
		<tr style="height:800px">
			<td class="body_wrapper" style="padding:10px 100px;">
				<table class="body_content" style="width:800px; height:800px">
					<tr class="fade" style="height:30px;">
						<td align="left" style="padding:0px 5px">
							<a href="/">
								<span style="font-size:17px; color:#aaa; font-weight:normal; text-shadow:0 1px 2px #666">
									<span style="font-size:19px; color:#333; font-weight:bold">F</span>ort
									<span style="font-size:19px; color:#333; font-weight:bold">N</span>otes
								</span>
							</a>
						</td>
						<td style="font-size:14px; color:#888; padding:5px">
							highly secure online password manager based on the AES encryption in the browser
						</td>
					</tr>
					<tr>
						<td colspan="2" style="text-align:center; position:relative">
							<img id="img_logo" src="img/windsor_castle.jpg" style="opacity:0.4;filter:alpha(opacity=40)" onmouseover="this.style.opacity=1;if(this.filters)this.filters.alpha.opacity=100" onmouseout="this.style.opacity=0.4;if(this.filters)this.filters.alpha.opacity=40"/>
						</td>
					</tr>
					<tr style="height:30px; text-align:center; color:#999">
						<td colspan="2">
							<b style="color:#FF6600">Fort Knox for your notes</b><br><br>
						</td>
					</tr>
					<tr class="fade" style="height:30px; text-align:center; color:#999">
						<td colspan="2">Copyright © 2012 FortNotes. All rights reserved.</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td style="text-align:center; padding-bottom:10px; vertical-align:top">
				<table style="margin:0 auto">
					<tr>
						<td style="padding:0 8px"><a href="http://www.lighttpd.net/"><img style="opacity:0.7;" src="img/logo.lighttpd.png"/></a></td>
						<td style="padding:0 0px"><a style="opacity:0.7; color:#666699; font-size:19px; font-style:italic; font-weight:bold;" href="http://php.net/">&nbsp;php&nbsp;</a></td>
						<td style="padding:0 0px"><a style="opacity:0.7; color:#666699" href="http://php.net/">&nbsp;<span style="color:#4f5f83;font-size:19px">My</span><span style="color:#ad8931;font-size:19px">SQL</span>&nbsp;</a></td>
						<td style="padding:0 8px"><a href="http://jquery.com/"><img style="opacity:0.4; height:27px;" src="img/logo.jquery.png"/></a></td>
						<td style="padding:0 5px"><a href="http://crypto.stanford.edu/sjcl/">
							<span style="color:#aaa;font-size:18px;font-weight:bold;line-height:10px">AES</span><br>
							<span style="color:#aaa;font-size:10px;margin:0 6px">256b</span>
						</a></td>
					</tr>
				</table>
			</td>
		</tr>
	</table>

	<div class="top">
		<div style="padding:10px; text-align:center">
			<b style="color:#FF6600">Start using it now!</b><br><br>
			<a onclick="DlgUserLogin.Show()"><div class="btn"><b>Login</b></div></a>
			&nbsp; or &nbsp;
			<a onclick="DlgUserRegister.Show()"><div class="btn"><b>Register</b></div></a>
		</div>
		<table class="iblocks">
			<tr>
				<td class="main">
					<div class="iblock">
						<table>
							<tr class="caption">
								<td class="img"><img src="img/question.png"></td>
								<td>What is this about?</td>
							</tr>
							<tr class="body">
								<td colspan="2">
									It's all about safety. Everybody today has a lot of private information. Emails, credit cards, phones, sites and so on. It all has to be organized, easily accessible from anywhere and secure.
									<b>Now you can have it</b>.
									<a onclick="DlgUserRegister.Show()"><b>Join now</b></a>.
								</td>
							</tr>
							<tr class="more">
								<td colspan="2"><a href="http://fortnotes.com/forum/viewtopic.php?id=4">read more ...</a></td>
							</tr>
						</table>
					</div>
				</td>
				<td></td>
				<td class="main">
					<div class="iblock">
						<table>
							<tr class="caption">
								<td class="img"><img src="img/star.png"></td>
								<td>Flexibility</td>
							</tr>
							<tr class="body">
								<td colspan="2">
									Not only you can safely store your private data in the system but you can also fully customize it. There are only general templates for the start, everything further you can change or reorganize according to your taste or necessity.
								</td>
							</tr>
							<tr class="more">
								<td colspan="2"><a href="http://fortnotes.com/forum/viewtopic.php?id=4">read more ...</a></td>
							</tr>
						</table>
					</div>
				</td>
			</tr>
			<tr>
				<td class="main">
					<div class="iblock">
						<table>
							<tr class="caption">
								<td class="img"><img src="img/options.png"></td>
								<td>How it works</td>
							</tr>
							<tr class="body">
								<td colspan="2">
									All the magic is in your browser. It's a <b>BlackBox</b> - everything is encrypted and decrypted right in the browser and to the server is just a mess data sending. So nobody can see your data except you having the master password.
								</td>
							</tr>
							<tr class="more">
								<td colspan="2"><a href="http://fortnotes.com/forum/viewtopic.php?id=4">read more ...</a></td>
							</tr>
						</table>
					</div>
				</td>
				<td></td>
				<td class="main">
					<div class="iblock">
						<table>
							<tr class="caption">
								<td class="img"><img src="img/group.png"></td>
								<td>Active development and community</td>
							</tr>
							<tr class="body">
								<td colspan="2">
									It's a young active project with big plans and growing community. Anybody can join it, share ideas or skills. Modern technologies are used so participating in it can give great experience and will help making the world a safer place.
								</td>
							</tr>
							<tr class="more">
								<td colspan="2"><a href="http://fortnotes.com/forum/viewtopic.php?id=4">read more ...</a></td>
							</tr>
						</table>
					</div>
				</td>
			</tr>
			<tr>
				<td class="main">
					<div class="iblock">
						<table>
							<tr class="caption">
								<td class="img"><img src="img/money.png"></td>
								<td>It's free</td>
							</tr>
							<tr class="body">
								<td colspan="2">
									No tariff plans, no payments. All user have all the system features at full scale. We hope it will be this way as long as ever possible. At the same time we would greatly appreciate any help or donations to maintain this project.
								</td>
							</tr>
							<tr class="more">
								<td colspan="2"><a href="http://fortnotes.com/forum/viewtopic.php?id=4">read more ...</a></td>
							</tr>
						</table>
					</div>
				</td>
				<td></td>
				<td class="main">
					<div class="iblock">
						<table>
							<tr class="caption">
								<td class="img"><img src="img/question.png"></td>
								<td>Still not convinced?</td>
							</tr>
							<tr class="body">
								<td colspan="2">
									If for some reasons you believe we won't be able to provide the desired level of security you <b>can do it yourself</b>. The project is open-source and available to everybody so you can download it and install to your own server.
								</td>
							</tr>
							<tr class="more">
								<td colspan="2"><a href="http://fortnotes.com/forum/viewtopic.php?id=3">read more ...</a></td>
							</tr>
						</table>
					</div>
				</td>
			</tr>
		</table>
	</div>
</body>
</html>