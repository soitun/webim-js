module("buddy");

test("webim.buddy - basic method", 7, function() {
	stop(3000);
	var buddy = new webim.buddy(buddies, {loadDelay: true});
	buddy.bind("online", function(data){
		ok(true, "online event");
		if(data[0]["id"] == 4)start();
	});
	buddy.bind("offline", function(data){
		ok(data[0], "offline event");
	});
	buddy.bind("onlineDelay", function(data){
		ok(data.length == 2, "onlineDelay event");
	});
	ok(buddy.get(2), "get");
	buddy.clear();
	ok(!buddy.get(2), "clear");
	buddy.online("2,3");
	buddy.offline("3");
	ok(!buddy.get(2), "delay");
	buddy.loadDelay();
	buddy.option("loadDelay", false);
	buddy.online(4);
});
