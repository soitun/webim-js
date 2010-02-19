<?php 
$callback = empty($_GET["callback"]) ? "" : $_GET["callback"];
$timeout = empty($_GET["timeout"]) ? 5 : $_GET["timeout"];
//sleep( $timeout );
$data = '{"status": "ok", "messages": [], "statuses": [], "presences": []}';
if(empty($callback)){
	echo $data;
}else{
	echo $callback."(".$data.")";
}
?>
