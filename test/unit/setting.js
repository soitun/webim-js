module("setting");

test("webim.setting", function() {
	expect( 2 );
	var setting = new webim.setting({}, {url: url("data/setting.php")});
	setting.set("play_sound", false);
	ok(!setting.get("play_sound"), "arguments key,value");

	setting.set({"play_sound": true});
	ok(setting.get("play_sound"), "hash key,value");

});
