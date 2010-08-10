<?php

include_once("common.php");

$output = array(
	"server_time" => microtime(true)*1000,
	"user" => $user,
	"connection" => $connection,
	"online_buddy_ids" => "2,3,4,5"
);

echo json_encode($output);

?>
