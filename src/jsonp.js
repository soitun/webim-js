/**
* 
* No dependencies.
*
* Safari and chrome not support async opiton, it aways async.
*
* Reference:
*
* http://forum.jquery.com/topic/scriptcommunicator-for-ajax-script-jsonp-loading
* http://d-tune.javaeye.com/blog/506074
*
* Opera: 10.01
* 	run sync.
* 	can't load sync.
* 	trigger onload when load js file with content.
* 	trigger error when src is invalid.
* 	don't trigger any event when src is valid and load error.
* 	don't trigger any event when js file is blank.
*
* Chrome: 6.0
* 	run async when use createElement.
* 	run sync when use document.writeln.
* 	prefect onload and onerror event.
*
* Safari: 5.0
* 	run async.
* 	prefect onload and onerror event.
* 
* Firefox: 3.6
* 	run sync.
* 	support async by set script.async = true.
* 	prefect onload and onerror event.
*
*/
var jsonpSettings = {
	url: location.href,
	timeout: 5000,
	jsonp:"callback",
	async: false
};

var jsonpSupport = window.jsonpSupport = {
	//Firefox 3.6 and chrome 6 support script async attribute.
	async: typeof( document.createElement("script").async ) == "boolean",
	//Opera may not trigger events when script load. 
	events: false,
	// Webkit run script async when create script by createElement.
	defaultAsync: false,
	// IE can async load script in fragment.
	fragmentProxy: false
};
(function(){
	var ua = navigator.userAgent.toLowerCase();
	jsonpSupport.events = !/(opera)(?:.*version)?[ \/]([\w.]+)/.exec( ua );
	jsonpSupport.defaultAsync = !!/(webkit)[ \/]([\w.]+)/.exec( ua );
/*
var head = document.getElementsByTagName("head")[0] || document.createElement,
script = document.createElement("script"),
script2 = document.createElement("script"),
text = "window.jsonpSupport.defaultAsync = false;";
script.src = "javascript:false";
script.onload = function(e) {
jsonpSupport.defaultAsync = true;
jsonpSupport.events = true;
};                

script.onerror = function(e) {
jsonpSupport.defaultAsync = true;
jsonpSupport.events = true;
};               
script.onreadystatechange = function() {
// ie defaultAsync = true
jsonpSupport.events = true;
};
head.appendChild( script );
try{
script2.appendChild( document.createTextNode( text ) );
} catch( e ){
script2.text = text;
}
head.appendChild( script2 );
setTimeout(function(){
script.onload = script.onerror = script.onreadystatechange = null;
head.removeChild( script );
head.removeChild( script2 );
head = script = script2 = null;
}, 1000);
*/
	//Check fragment proxy
	var frag = document.createDocumentFragment(),
	script3 = document.createElement('script');
	text = "window.jsonpSupport.fragmentProxy = true";
	try{
		script3.appendChild( document.createTextNode( text ) );
	} catch( e ){
		script3.text = text;
	}
	frag.appendChild( script3 );
	frag = script3 = null;
})();

//setTimeout(function(){
//alert( JSON.encode( jsonpSupport ) );
//alert( !jsonpSupport.fragmentProxy && !jsonpSupport.defaultAsync && !jsonpSupport.async );
//}, 300);

function jsonp(s){
	s = extend({}, jsonpSettings, s);
	var data = "",
	r20 = /%20/g,
	callbackContext = s.context || window,
	jsonp = "jsonp" + jsc++,
	jsonpError = jsonp + "error",
	script,
	errorScript,
	win = window,
	head,
	proxy,
	inIframe = s.async && !jsonpSupport.fragmentProxy && !jsonpSupport.defaultAsync && !jsonpSupport.async;
	if ( typeof s.data == "object" ) {
		var ar = [];
		for (var key in s.data) {
			ar[ ar.length ] = encodeURIComponent(key) + '=' + encodeURIComponent(s.data[key]);
		}
		// Serialize data
		data = data + ar.join("&").replace(r20, "+");
	} else {
		data = data + s.data;
	}
	data = (data ? (data + "&") : "") + (s.jsonp || "callback") + "=" + (inIframe ? "parent." : "" ) + jsonp;
	s.url += (/\?/.test( s.url ) ? "&" : "?") + data;

	// Handle Script loading
	var done = false;
	window[ jsonp ] = function( tmp ) {
		s.success && s.success.call( callbackContext, tmp, "success" );
		destroy();
	};

	//Handle script error callback, the script will run once.
	window[ jsonpError ] = function(tmp){
		if ( !done ) {
			error( "error" );
			destroy();
		}
	};

	// Handle timeout
	if ( s.timeout > 0 ) {
		setTimeout( function() {
			if ( !done ){
				error( "timeout" );
				destroy();
				// The script may be loading.
				window[ jsonp ] = jsonpEmptyFunction;
			}
		}, s.timeout );
	}
	if( s.async && !jsonpSupport.defaultAsync && jsonpSupport.fragmentProxy ) {
		proxy = document.createDocumentFragment();
		head = proxy;
		//proxy[ jsonp ] = window[ jsonp ];
		//proxy.appendChild( script );
	}
	if ( inIframe ) {
		// Opera need url path in iframe
		var location = window.location;
		if( s.url.slice(0, 1) == "/" ) {
			s.url = location.protocol + "//" + location.host + (location.port ? (":" + location.port) : "" ) + s.url;
		}
		else if( !/^https?:\/\//i.test( s.url ) ){
			var href = location.href,
		ex = /([^?#]+)\//.exec( href );
		s.url = ( ex ? ex[1] : href ) + "/" + s.url;
		}
		proxy = document.createElement( "iframe" );
		proxy.style.position = "absolute";
		proxy.style.left = "-100px";
		proxy.style.top = "-100px";
		proxy.style.height = "1px";
		proxy.style.width = "1px";
		proxy.style.visibility = "hidden";
		document.body.appendChild( proxy );
		win = proxy.contentWindow;
	}
	inIframe ? setTimeout( function() { create() }, 0 ) : create();
	return undefined;
	function create() {
		// We handle everything using the script element injection
		var doc = win.document;
		head = head || doc.getElementsByTagName("head")[0] || doc.documentElement;
		script = doc.createElement("script");
		script.src = s.url;
		if ( jsonpSupport.async ) {
			script.async = s.async;
		}
		if ( s.scriptCharset ) {
			script.charset = s.scriptCharset;
		}
		// Attach handlers for all browsers
		script.onload = script.onerror = script.onreadystatechange = function(e){
			if(!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")){
				//error
				error("error");
				destroy();
			}
		};
		// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
		head.insertBefore( script, head.firstChild );

		// Call error script When the script has not events and run sync.
		if ( !jsonpSupport.defaultAsync && !jsonpSupport.events ) {
			var sc = doc.createElement("script");
			var text = "try{" + ( inIframe ? "parent." : "" ) + jsonpError + "()}catch(e){};";
			sc.appendChild( document.createTextNode( text ) );
			head.insertBefore( sc, head.firstChild );
			//head.removeChild( sc );
			head = sc = null;
		}
	}

	function destroy(){
		done = true;
		// Garbage collect
		window[ jsonp ] = undefined;
		try{ delete window[ jsonp ]; } catch(e){}
		window[ jsonpError ] = undefined;
		try{ delete window[ jsonpError ]; } catch(e){}
		// Handle memory leak in IE
		script.onload = script.onreadystatechange = null;
		script.parentNode && script.parentNode.removeChild( script );
		proxy && proxy.parentNode && proxy.parentNode.removeChild( proxy );
		script = proxy = head = null;
	}

	function error( status ) {
		s.error && s.error.call( callbackContext, status );
	}
}

function jsonpEmptyFunction() {
}
