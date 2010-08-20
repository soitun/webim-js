<?php

$connection = array(
	"domain" => "www.nextim.cn",
	"ticket" => "8633d182-b7fe-42a3-8466-0c4134cfebf2",
	"server" => "data/packets.php"
);

$user = array(
	"id" => 1,
	"nick" => "Jack",
	"pic_url" => "images/a.jpg",
	"default_pic_url" => "http://mat1.gtimg.com/www/mb/images/head_50.jpg",
	"url" => "#1",
	"show" => "available",
	"status" => "I'm free.",
	"status_time" => "10:55"
);

$buddies = array(
	array(
		"id" => 2,
		"nick" => "Susan",
		"group" => "friend",
		"pic_url" => "images/b.jpg",
		"default_pic_url" => "http://mat1.gtimg.com/www/mb/images/head_50.jpg",
		"url" => "#2",
		"presence" => "online",
		"show" => "available",
		"status" => "I'm free.",
		"status_time" => "10:55"
	),
	array(
		"id" => 3,
		"nick" => "Lily",
		"group" => "stronger",
		"pic_url" => "images/c.jpg",
		"default_pic_url" => "http://mat1.gtimg.com/www/mb/images/head_50.jpg",
		"url" => "#3",
		"presence" => "online",
		"show" => "available",
		"status" => "I'm free.",
		"status_time" => "10:55"
	),
	array(
		"id" => 4,
		"nick" => "Janet",
		"group" => "schoolmete",
		"pic_url" => "images/im.png",
		"default_pic_url" => "http://mat1.gtimg.com/www/mb/images/head_50.jpg",
		"url" => "#4",
		"presence" => "online",
		"show" => "available",
		"status" => "I'm free.",
		"status_time" => "10:55"
	),
	array(
		"id" => 5,
		"nick" => "Lucy",
		"group" => "friend",
		"pic_url" => "images/e.jpg",
		"default_pic_url" => "http://mat1.gtimg.com/www/mb/images/head_50.jpg",
		"url" => "#4",
		"presence" => "offline",
		"show" => "available",
		"status" => "I'm free.",
		"status_time" => "10:55"
	)
);

$rooms = array(
	array(
		"id" => 1,
		"nick" => "Happy Day",
		"pic_url" => "images/m.jpg",
		"default_pic_url" => "http://mat1.gtimg.com/www/mb/images/head_50.jpg",
		"url" => "#4",
		"all_count" => 5,
		"count" => 2,
		"blocked" => false
	),
	array(
		"id" => 2,
		"nick" => "Happy Week",
		"pic_url" => "images/n.jpg",
		"default_pic_url" => "http://mat1.gtimg.com/www/mb/images/head_50.jpg",
		"url" => "#4",
		"all_count" => 5,
		"count" => 2,
		"blocked" => false
	)
);

$members = array(
	array(
		"id" => 2,
		"nick" => "Susan"
	),
	array(
		"id" => 3,
		"nick" => "Lily"
	),
	array(
		"id" => 4,
		"nick" => "Janet"
	),
	array(
		"id" => 5,
		"nick" => "Josh"
	)
);

$histories = array(
	"unicast" => array(
		),
		"multicast" => array(
			)
		);

foreach($buddies as $i => $o){
	$histories["unicast"][$o["id"]] = array(
		array(
			"type" => "unicast",
			"to" => 1,
			"nick" => $o["nick"],
			"from" => $o["id"],
			"style" => "",
			"body" => "Hello world.",
			"timestamp" => 1246883572400
		),
		array(
			"type" => "unicast",
			"nick" => "Jack",
			"from" => 1,
			"to" => $o["id"],
			"style" => "",
			"body" => "Hello kitty.",
			"timestamp" => 1246883582400
		)
	);
}

foreach($rooms as $i => $o){
	$histories["multicast"][$o["id"]] = array(
		array(
			"type" => "multicast",
			"nick" => "Jack",
			"from" => 1,
			"to" => $o["id"],
			"style" => "",
			"body" => "Is anyone here?",
			"timestamp" => 1246883572400
		),
		array(
			"type" => "unicast",
			"nick" => "Susan",
			"from" => 2,
			"to" => $o["id"],
			"style" => "",
			"body" => "Ok.",
			"timestamp" => 1246883582400
		)
	);
}
?>
