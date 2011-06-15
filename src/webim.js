/*
*
* Depends:
* 	core.js
*
* options:
*
* attributes:
* 	data
* 	status
* 	setting
* 	history
* 	buddy
* 	connection
*
*
* methods:
* 	online
* 	offline
* 	autoOnline
* 	sendMsg
* 	sendStatus
* 	setStranger
*
* events:
* 	ready
* 	go
* 	stop
*
* 	message
* 	presence
* 	status
*
* 	sendMsg
*/


function webim(element, options){
	var self = this;
	self.options = extend({}, webim.defaults, options);
	this._init(element, options);
}

extend(webim.prototype, objectExtend,{
	_init: function(){
		var self = this, options = self.options;
		//Default user status info.
		var user = {presence: 'offline', show: 'unavailable'};
		if(options.jsonp)
			self.request = jsonp;
		else
			self.request = ajax;
		self.data = {user: user};
		self.status = new webim.status();
		self.setting = new webim.setting(null, {jsonp: options.jsonp});
		self.buddy = new webim.buddy(null, {active: self.status.get("b"), jsonp: options.jsonp});
		self.room = new webim.room(null, {user: user, jsonp: options.jsonp});
		self.history = new webim.history(null, {user: user, jsonp: options.jsonp});
		self.connection = new comet(null,{jsonp:true});
		self._initEvents();
		//self.online();
	},
	user: function(info){
		extend(this.data.user, info);
	},
	_ready: function(post_data){
		var self = this;
		self._unloadFun = window.onbeforeunload;
		window.onbeforeunload = function(){
			self._refresh();
		};
		self.trigger("ready", [post_data]);
	},
	_go: function(){
		var self = this, data = self.data, history = self.history, buddy = self.buddy, room = self.room;
		history.option("userInfo", data.user);
		var ids = [];
		data.buddies && each(data.buddies, function(n, v){
			history.init("unicast", v.id, v.history);
		});
		buddy.handle(data.buddies);
		//rooms
		data.rooms && each(data.rooms, function(n, v){
			history.init("multicast", v.id, v.history);
		});
		//blocked rooms
		var b = self.setting.get("blocked_rooms"), roomData = data.rooms;
		isArray(b) && roomData && each(b,function(n,v){
			roomData[v] && (roomData[v].blocked = true);
		});
		roomData && room.handle(roomData);
		room.options.ticket = data.connection.ticket;
		self.trigger("go",[data]);
		self.connection.connect(data.connection);
		//handle new messages at last
		var n_msg = data.new_messages;
		if(n_msg && n_msg.length){
			each(n_msg, function(n, v){
				v["new"] = true;
			});
			self.trigger("message",[n_msg]);
		}
	},
	_stop: function( type, msg ){
		var self = this;
		window.onbeforeunload = self._unloadFun;
		self.data.user.presence = "offline";
		self.data.user.show = "unavailable";
		self.buddy.clear();
		self.trigger("stop", [type, msg] );
	},
	autoOnline: function(){
		return !this.status.get("o");
	},
	_initEvents: function(){
		var self = this, status = self.status, setting = self.setting, history = self.history, connection = self.connection, buddy = self.buddy;
		connection.bind("connect",function(e, data){
		}).bind("data",function(data){
			self.handle(data);
		}).bind("error",function(data){
			self._stop("connect", "Connect Error");
		}).bind("close",function(data){
			!self.options.disableDisconnect && self._stop("connect", "Disconnect");
		});
		self.bind("message", function(data){
			var online_buddies = [], l = data.length, uid = self.data.user.id, v, id, type;
			//When revice a new message from router server, make the buddy online.
			for(var i = 0; i < l; i++){
				v = data[i];
				type = v["type"];
				id = type == "unicast" ? (v.to == uid ? v.from : v.to) : v.to;
				v["id"] = id;
				if(type == "unicast" && !v["new"]){
					var msg = {id: id, presence: "online"};
					//update nick.
					if(v.nick)msg.nick = v.nick;
					online_buddies.push(msg);
				}
			}
			if(online_buddies.length){
				buddy.presence(online_buddies);
				//the chat window will pop out, need complete info
				buddy.complete();
			}
			history.handle(data);
		});
		function mapFrom(a){ 
			var d = {id: a.from, presence: a.type}; 
			if(a.show)d.show = a.show;
			if(a.nick)d.nick = a.nick;
			if(a.status)d.status = a.status;
			return d;
		}

		self.bind("presence",function(data){
			buddy.presence(map(data, mapFrom));
			//online.length && buddyUI.notice("buddyOnline", online.pop()["nick"]);
		});
	},
	handle: function(data){
		var self = this;
		data.messages && data.messages.length && self.trigger("message",[data.messages]);
		data.presences && data.presences.length && self.trigger("presence",[data.presences]);
		data.statuses && data.statuses.length && self.trigger("status",[data.statuses]);
	},
	sendMsg: function(msg){
		var self = this;
		msg.ticket = self.data.connection.ticket;
		self.trigger("sendMsg",[msg]);
		self.request({
			type: 'post',
			url: self.options.urls.message,
			cache: false,
			data: msg
		});
	},
	sendStatus: function(msg){
		var self = this;
		msg.ticket = self.data.connection.ticket;
		self.request({
			type: 'post',
			url: self.options.urls.status,
			cache: false,
			data: msg
		});
	},
	sendPresence: function(msg){
		var self = this;
		msg.ticket = self.data.connection.ticket;
		//save show status
		self.data.user.show = msg.show;
		self.status.set("s", msg.show);
		self.request({
			type: 'post',
			url: self.options.urls.presence,
			cache: false,
			data: msg
		});
	},
	//setStranger: function(ids){
	//	this.stranger_ids = idsArray(ids);
	//},
	//stranger_ids: [],
	online:function(params){
		var self = this, status = self.status;
		var buddy_ids = [], room_ids = [], tabs = status.get("tabs"), tabIds = status.get("tabIds");
		if(tabIds && tabIds.length && tabs){
			each(tabs, function(k,v){
				if(k[0] == "b") buddy_ids.push(k.slice(2));
				if(k[0] == "r") room_ids.push(k.slice(2));
			});
		}
		params = extend({                                
			//stranger_ids: self.stranger_ids.join(","),
			buddy_ids: buddy_ids.join(","),
			room_ids: room_ids.join(","),
			show: status.get("s") || "available"
		}, params);
		self._ready(params);
		//set auto open true
		status.set("o", false);
		status.set("s", params.show);

		self.request({
			type:"post",
			dataType: "json",
			data: params,
			url: self.options.urls.online,
			success: function( data ){
				if( !data ){
					self._stop( "online", "Not Found" );
				}else if( !data.success ) {
					self._stop( "online", data.error_msg );
				}else{
					data.user = extend(self.data.user, data.user, {presence: "online"});
					self.data = data;
					self._go();
				}
			},
			error: function(data){
				self._stop( "online", "Not Found" );
			}
		});
	},
	offline:function(){
		var self = this, data = self.data;
		self.status.set("o", true);
		self.connection.close();
		self._stop("offline", "offline");
		self.request({
			type: 'post',
			url: self.options.urls.offline,
			type: 'post',
			cache: false,
			data: {
				status: 'offline',
				ticket: data.connection.ticket
			}
		});

	},
	_refresh:function(){
		var self = this, data = self.data;
		if(!data || !data.connection || !data.connection.ticket) return;
		self.request({
			type: 'post',
			url: self.options.urls.refresh,
			type: 'post',
			cache: false,
			data: {
				ticket: data.connection.ticket
			}
		});
	}

});
function idsArray(ids){
	return ids && ids.split ? ids.split(",") : (isArray(ids) ? ids : (parseInt(ids) ? [parseInt(ids)] : []));
}
function model(name, defaults, proto){
	function m(data,options){
		var self = this;
		self.data = data;
		self.options = extend({}, m.defaults,options);
		isFunction(self._init) && self._init();
	}
	m.defaults = defaults;
	extend(m.prototype, objectExtend, proto);
	webim[name] = m;
}
//_webim = window.webim;
window.webim = webim;

extend(webim,{
	version:"@VERSION",
	defaults:{
		urls:{
			online: "webim/online",
			offline: "webim/offline",
			message: "webim/message",
			presence: "webim/presence",
			refresh: "webim/refresh",
			status: "webim/status"
		}
	},
	log:log,
	idsArray: idsArray,
	now: now,
	isFunction: isFunction,
	isArray: isArray,
	isObject: isObject,
	trim: trim,
	makeArray: makeArray,
	extend: extend,
	each: each,
	inArray: inArray,
	grep: grep,
	map: map,
	JSON: JSON,
	ajax: ajax,
	jsonp: jsonp,
	comet: comet,
	model: model,
	objectExtend: objectExtend
});
