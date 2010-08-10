<?php

$connection = array(
	"domain" => "www.nextim.cn",
	"ticket" => "8633d182-b7fe-42a3-8466-0c4134cfebf2",
	"server" => "packets.php"
);

$user = array(
	"id" => 1,
	"name" => "jack",
	"nick" => "Jack",
	"pic_url" => "http://t1.qlogo.cn/mbloghead/c39e95b85b1b6bcd6f84/50",
	"default_pic_url" => "http://mat1.gtimg.com/www/mb/images/head_50.jpg",
	"url" => "#1",
	"show" => "available",
	"status" => "I'm free.",
	"status_time" => "10:55"
);

$buddies = array(
	array(
		"id" => 2,
		"name" => "susan",
		"nick" => "Susan",
		"group" => "friend",
		"pic_url" => "http://t1.qlogo.cn/mbloghead/a061e4ecb5b1ecd6ccee/50",
		"default_pic_url" => "http://mat1.gtimg.com/www/mb/images/head_50.jpg",
		"url" => "#2",
		"presence" => "online",
		"show" => "available",
		"status" => "I'm free.",
		"status_time" => "10:55"
	),
	array(
		"id" => 3,
		"name" => "lily",
		"nick" => "Lily",
		"group" => "stronger",
		"pic_url" => "http://t3.qlogo.cn/mbloghead/75e6cf5f9a3fdad21794/50",
		"default_pic_url" => "http://mat1.gtimg.com/www/mb/images/head_50.jpg",
		"url" => "#3",
		"presence" => "online",
		"show" => "available",
		"status" => "I'm free.",
		"status_time" => "10:55"
	),
	array(
		"id" => 4,
		"name" => "janet",
		"nick" => "Janet",
		"group" => "schoolmete",
		"pic_url" => "http://t3.qlogo.cn/mbloghead/ad9f19633ee7f8012aac/50",
		"default_pic_url" => "http://mat1.gtimg.com/www/mb/images/head_50.jpg",
		"url" => "#4",
		"presence" => "online",
		"show" => "available",
		"status" => "I'm free.",
		"status_time" => "10:55"
	),
	array(
		"id" => 5,
		"name" => "josh",
		"nick" => "Josh",
		"group" => "friend",
		"pic_url" => "http://t3.qlogo.cn/mbloghead/9f48b84fc658ef74e2e2/50",
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
		"name" => "room_1",
		"nick" => "Happy Day",
		"pic_url" => "http://t0.qlogo.cn/mbloghead/11b25271cf9d3f4b176e/50",
		"default_pic_url" => "http://mat1.gtimg.com/www/mb/images/head_50.jpg",
		"url" => "#4",
		"all_count" => 5,
		"count" => 2,
		"blocked" => false
	),
	array(
		"id" => 2,
		"name" => "room_2",
		"nick" => "Happy Week",
		"pic_url" => "http://t0.qlogo.cn/mbloghead/11b25271cf9d3f4b176e/50",
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
		"name" => "susan",
		"nick" => "Susan"
	),
	array(
		"id" => 3,
		"name" => "lily",
		"nick" => "Lily"
	),
	array(
		"id" => 4,
		"name" => "janet",
		"nick" => "Janet"
	),
	array(
		"id" => 5,
		"name" => "josh",
		"nick" => "Josh"
	)
);

$histories = array(
	"unicast" => array(
		"2" => array(
			array(
				"type" => "unicast"
			)
		)
	),
	"multicast" => array(
		"1" => array(
			array(
				"type" => "multicast"
			)
		)
	)
);

?>
