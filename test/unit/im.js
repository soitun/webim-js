module("new");
test("new", function() {
	expect(4);
	var im = new webim(null, {
		jsonp: true
	});
	stop(6000);
	im.bind("ready", function(){
		ok(true, "ready");
	});
	im.bind("message", function(msg){
		ok(msg, "message");
		im.offline();
	});
	im.bind("go", function(){
		ok(true, "go");
	});
	im.bind("stop", function(){
		ok(true, "stop");
		start();
	});
	im.buddy.option("loadDelay", true);
	im.online();
});
