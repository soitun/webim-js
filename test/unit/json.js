module("json");

test("webim.JSON.stringify()", function(){
	stringify = webim.JSON.stringify;
	expect( 2 );
	equals(stringify({c:1,b:"2",d:{a:0}}), "{\"c\":1,\"b\":\"2\",\"d\":{\"a\":0}}", "correct stringify"); 
	equals(stringify(2), "2", "string value");
});

test("webim.JSON.parse()", function(){
	parse = webim.JSON.parse;
	expect( 2 );
	same(parse("{\"c\":1,\"b\":\"2\",\"d\":{\"a\":0}}"), {c:1,b:"2",d:{a:0}}, "correct encode"); 
	equals(parse(2), "2", "string value");
});
