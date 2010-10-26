module("new");
test("new", function() {
	expect(4);
	var im = new webim();
	stop(6000);
	im.a("beforeOnline", function(){
		ok(true, "ready");
	});
	im.a("message", function(e, msg){
		ok(msg, "message");
		im.offline();
	});
	im.a("online", function(){
		ok(true, "go");
	});
	im.a("offline", function(){
		ok(true, "stop");
		start();
	});
	im.online();
});
