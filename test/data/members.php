<?php
include_once("common.php");

if($id){
	echo json_encode($members);
}else{
	header("HTTP/1.0 404 Not Found");
}
?>
