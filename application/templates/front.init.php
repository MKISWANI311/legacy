<html lang="en">
<head>
	<title>FortNotes</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<link rel="icon" type="image/gif" href="img/castle.png"/>
	<link rel="stylesheet" type="text/css" href="css/all.css"/>
	<script type="text/javascript" src="js/all.js"></script>
	<script type="text/javascript">
		// the DOM is ready
		$(function() {
			$.modal.defaults.opacity = 20;
		});
	</script>
	<?php response::template('dlg.user.login') ?>
	<?php response::template('dlg.user.register') ?>
</head>
<body>
	<table class="maxh maxw"><tr><td class="body_wrapper">
		<table class="body_content" style="width:800px">
			<tr class="fade" style="height:30px;">
				<td align="left" style="padding:0px 5px">
					<a href="/">
						<span style="font-size:17px; color:#aaa; font-weight:normal; text-shadow: 0 1px 2px #666666;">
							<span style="font-size:19px; color:#333; font-weight:bold">F</span>ort
							<span style="font-size:19px; color:#333; font-weight:bold">N</span>otes
						</span>
					</a>
				</td>
				<td align="right">
					Please
					<a onclick="DlgUserLogin.Show()"><b>login</b></a> or
					<a onclick="DlgUserRegister.Show()"><b>register</b></a>
				</td>
				<td align="right" style="width:30px"><img src="img/lock.png"/></td>
			</tr>
			<tr>
				<td colspan="3" style="text-align:center">
					<img id="img_logo" src="img/windsor_castle.jpg" style="opacity:0.4;filter:alpha(opacity=40)" onmouseover="this.style.opacity=1;if(this.filters)this.filters.alpha.opacity=100" onmouseout="this.style.opacity=0.4;if(this.filters)this.filters.alpha.opacity=40"/>
				</td>
			</tr>
			<tr class="fade" style="height:30px; text-align:center; color:#999">
				<td colspan="3">Copyright © 2012 DarkPark. All rights reserved. Simple test template.</td>
			</tr>
		</table>
	</td></tr>
	</table>
</body>
</html>