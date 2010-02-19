module("json");

test("webim.JSON.encode()", function(){
	encode = webim.JSON.encode;
	expect( 2 );
	equals(encode({c:1,b:"2",d:{a:0}}), "{\"c\":1,\"b\":\"2\",\"d\":{\"a\":0}}", "correct encode"); 
	equals(encode(2), "2", "string value");
});

test("webim.JSON.decode()", function(){
	decode = webim.JSON.decode;
	expect( 2 );
	same(decode("{\"c\":1,\"b\":\"2\",\"d\":{\"a\":0}}"), {c:1,b:"2",d:{a:0}}, "correct encode"); 
	equals(decode(2), "2", "string value");
});
