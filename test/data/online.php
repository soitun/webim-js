<?php

include_once("common.php");

$buddy_ids = ids_array(gp("buddy_ids"));

$output_buddies = array();

$online_ids = array("4", "5");
foreach($buddies as $i => $b){
	if(in_array($b["id"], $online_ids)){
		$b["need_reload"] = true;
	}

	if(in_array(($b["id"]), $buddy_ids) || in_array($b["id"], $online_ids)){
		array_push($output_buddies, $b);
	}
}

$output = array(
	"server_time" => microtime(true)*1000,
	"user" => $user,
	"connection" => $connection,
	"buddies" => $output_buddies,
	"rooms" => $rooms,
	"new_messages" => array(
		array(
			"type" => "unicast",
			"to" => 1,
			"nick" => "Susan",
			"from" => 2,
			"style" => "",
			"body" => "Hello world.",
			"timestamp" => 1246883572400
		)
	)
);

echo json_encode($output);
?>
