<?php
include_once("common.php");

$type = gp("type");

if($id && $type){
	echo json_encode($histories[$type][$id]);
}else{
	header("HTTP/1.0 404 Not Found");
}
?>
