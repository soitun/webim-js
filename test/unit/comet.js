module("comet");

test("webim.comet connect", function() {
	expect( 1 );
	stop(6000);
	var comet = new webim.comet(null, {
		jsonp: true,
		server: _path + "data/packets.php"
	});
	comet.bind("data", function(d){
		ok(d, "receive data: " + webim.JSON.encode(d));
		comet.close();
		start();
	});
	comet.connect();
});
