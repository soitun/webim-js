<?php

include_once("common.php");

$buddy_ids = ids_array(gp("buddy_ids"));

$online_buddy_ids = join(",", array_map(function($b){
	return $b["id"];
}, $buddies));


$output_buddies = array();
foreach($buddies as $i => $b){
	if(in_array(($b["id"]), $buddy_ids)){
		array_push($output_buddies, $b);
	}
}

$output = array(
	"server_time" => microtime(true)*1000,
	"user" => $user,
	"connection" => $connection,
	"online_buddy_ids" => $online_buddy_ids,
	"buddies" => $output_buddies,
	"rooms" => $rooms,
	"new_messages" => array()
);

echo json_encode($output);
?>
