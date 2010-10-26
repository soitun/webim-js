
module("im.status");

test("get and set", function() {
	expect( 1 );
	var status = new webim.status( null, { key: "_test" } );
	status.set( "test", 5 );
	ok( status.get( "test" ) == 5, "get data" );
});

