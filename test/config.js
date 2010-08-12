var webim = window.webim, log = webim.log;
webim.defaults.urls = {
	online: _path + "data/online.php",
	offline: _path + "data/offline.php",
	message: _path + "data/message.php",
	refresh: _path + "data/refresh.php",
	status: _path + "data/status.php"
};
webim.setting.defaults.url = _path + "data/setting.php";
webim.history.defaults.urls = {
	load: _path + "data/history.php",
	clear: _path + "data/clear_history.php"
};
webim.buddy.defaults.url = _path + "data/buddies.php";
webim.notification.defaults.url = _path + "data/notifications.php";
webim.room.defaults.urls = {
	join: _path + "data/join.php",
	leave: _path + "data/leave.php",
	members: _path + "data/members.php"
};
