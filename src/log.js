function log() {

	var d = new Date(),  time = ['[', d.getHours(), ':', d.getMinutes(), ':', d.getSeconds(), '-', d.getMilliseconds(), ']'].join("");
	if ( window && window.console ) {
		window.console.log.apply( null, arguments );
	} else if ( window && window.runtime && window.air && window.air.Introspector ) {
		window.air.Introspector.apply( null, arguments );
	}

}
