<?php
#error_reporting(E_ALL & ~E_NOTICE);
define('IM_ROOT', dirname(__FILE__).DIRECTORY_SEPARATOR);
include_once(IM_ROOT . "json.php");
include_once(IM_ROOT . "config.php");

if( !function_exists('json_encode') ) {
	function json_encode($data) {
		$json = new Services_JSON();
		return( $json->encode($data) );
	}
}

// Future-friendly json_decode
if( !function_exists('json_decode') ) {
	function json_decode($data) {
		$json = new Services_JSON();
		return( $json->decode($data) );
	}
}
function g($key = '') {
	return $key === '' ? $_GET : (isset($_GET[$key]) ? $_GET[$key] : null);
}

function p($key = '') {
	return $key === '' ? $_POST : (isset($_POST[$key]) ? $_POST[$key] : null);
}

function gp($key = '',$def = null) {
	$v = g($key);
	if(is_null($v)){
		$v = p($key);
	}
	if(is_null($v)){
		$v = $def;
	}
	return $v;
}

function ids_array($ids){
	return empty($ids) ? array() : (is_array($ids) ? array_unique($ids) : array_unique(explode(",", $ids)));
}

function ids_except($id, $ids){
	if(in_array($id, $ids)){
		array_splice($ids, array_search($id, $ids), 1);
	}
	return $ids;
}

$id = gp("id");
$ids = ids_array(gp("ids"));

?>
