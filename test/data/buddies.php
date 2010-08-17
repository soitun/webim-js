<?php

include_once("common.php");

$output_buddies = array();
foreach($buddies as $i => $b){
	if(in_array(($b["id"]), $ids)){
		array_push($output_buddies, $b);
	}
}

echo json_encode($output_buddies);

?>
