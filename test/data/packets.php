<?php 
$callback = empty($_GET["callback"]) ? "" : $_GET["callback"];
$timeout = empty($_GET["timeout"]) ? 5 : $_GET["timeout"];
//sleep( $timeout );
$data = '{"status": "ok", "messages": [{"type":"unicast","to":"jack","from":"susan","nick":"Susan","style":"","body":"Hi.","timestamp":1246883572400}], "statuses": [], "presences": []}';
if(empty($callback)){
	echo $data;
}else{
	echo $callback."(".$data.")";
}
?>
