var path = "";
//webim.extend(webim.setting.defaults.data,{});
//webim.extend(webim.setting.defaults.data,{block_list: ["1000001"]});
path = document.location.href.split("/webim");
path = path.length > 1 ? (path[0] + "/") : "";
var log = webim.log;
webim.defaults.urls = {
	online:path + "webim/online.php",
	offline:path + "webim/offline.php",
	refresh:path + "webim/refresh.php",
	message:path + "webim/message.php",
	status:path + "webim/status.php"
};
webim.setting.defaults.url = path + "webim/setting.php";
webim.history.defaults.urls = {
	load: path + "webim/histories.php",
	clear: path + "webim/clear_history.php"
};
webim.room.defaults.urls = {
	member: path + "webim/members.php",
	join: path + "webim/join.php",
	leave: path + "webim/leave.php"
};
webim.buddy.defaults.url = path + "webim/buddies.php";
webim.notification.defaults.url = path + "webim/notifications.php";
var im = new webim();

