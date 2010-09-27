<?php

$date = isset( $_POST['date'] ) ? $_POST['date'] : "2005-3-4" ;

//header('Content-Disposition: attachment; filename="histories-'.$date.'.html"');

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="cn" lang="cn">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="robots" content="index, follow" />
		<title>WebIM聊天记录</title>
		<style type="text/css">
			body{
				font-size: 12px;
				font-family: Arial,sans-serif;
				margin:0;
				color: #333;
			}
			#header{
				background: #EEE;
				border-bottom: 1px solid #DDD;
				padding: 1em;

			}
			#header h3{
				font-size: 1.8em;
				margin:0;
				margin-right: .5em;
				padding: 0;
				display: inline;
			}
			#header h3 a{
				color: #3F9FFF;
				text-decoration: none;
			}
			#header h2{
				display: inline;
				font-size: 1.25em;
				margin-left: .5em;
				font-weight: normal;
				color: #555;
				letter-spacing: 0.05em;
			}

			#content{
				padding:0 1em;
			}
			#log{
				overflow:auto;
			}
			#loglist{
				margin: 0;
				list-style:none;
				padding: 0;
			}

			.log-item{
				margin: 0.5em 0;
				color: #000;
			}

		</style>
	</head>
	<body>
			<div id="header">
				<h3>WebIM</h3>
				<h2>聊天记录 <?php echo $date ?></h2>
			</div>
			<div id="content">
				<div id="log">
					<ul id="loglist">
						<li class="log-item"><span class="name">陌生人：</span><span>hello.</span></li>
						<li class="log-item"><span class="name">我：</span><span>en?</span></li>
					</ul>
				</div>
			</div>
	</body>
</html>
