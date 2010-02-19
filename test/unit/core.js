module("core");

test("Basic requirements", function() {
	expect(4);
	ok( Array.prototype.push, "Array.push()" );
	ok( Function.prototype.apply, "Function.apply()" );
	ok( RegExp, "RegExp" );
	ok( webim, "webim" );
});
test("webim.isFunction", function() {
	expect(12);
	ok( webim.isFunction, "No Value" );
	ok( !webim.isFunction(null), "null Value" );
	ok( !webim.isFunction(undefined), "undefined Value" );
	ok( !webim.isFunction(""), "Empty Value" );

	ok( webim.isFunction(String), "String Function("+String+")" );
	ok( webim.isFunction(Array), "Array Function("+Array+")" );
	ok( webim.isFunction(Object), "Object Function("+Object+")" );
	ok( webim.isFunction(Function), "Function Function("+Function+")" );

	//When stringified, this could be misinterpreted
	var mystr = "function";
	ok( !webim.isFunction(mystr), "Function String" );

	// When stringified, this could be misinterpreted
	var myarr = [ "function" ];
	ok( !webim.isFunction(myarr), "Function Array" );

	// When stringified, this could be misinterpreted
	var myfunction = { "function": "test" };
	ok( !webim.isFunction(myfunction), "Function Object" );

	// Make sure normal functions still work
	var fn = function(){};
	ok( webim.isFunction(fn), "Normal Function" );

});

