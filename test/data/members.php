<?php
include_once("common.php");

if($id){
	echo callback($members);
}else{
	header("HTTP/1.0 404 Not Found");
}
?>
