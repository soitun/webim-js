module("ajax");

test("webim.ajax() - success callbacks", function() {
	expect( 1 );
	stop();
	webim.ajax({
		url: _path + "data/ajax.html",
		success: function(text){ 
			ok(true, "success"); 
			start(); 
		}
	});
});
test("webim.ajax() - error callbacks", function() {
	expect( 1 );
	stop();
	webim.ajax({
		url: _path + "data/ajax_error.html",
		error: function(){ 
			ok(true, "error"); 
			start(); 
		}
	});
});

test("webim.ajax() - correct data", function() {
	expect( 1 );
	stop();
	webim.ajax({
		url: _path + "data/ajax.html",
		success: function(text){ 
			equals("success", webim.trim(text), "correct"); 
			start(); 
		}
	});
});
