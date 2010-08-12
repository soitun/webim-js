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
*/


function webim(element, options){
	var self = this;
	self.options = extend({}, webim.defaults, options);
	this._init(element, options);
}

extend(webim.prototype, objectExtend,{
	_init:function(){
		var self = this;
		self.data = {user:{}};
		self.status = new webim.status();
		self.setting = new webim.setting();
		self.buddy = new webim.buddy();
		self.room = new webim.room();
		self.history = new webim.history();
		self.connection = new comet(null,{jsonp:true});
		self._initEvents();
		//self.online();
	},
	_ready: function(){
		var self = this;
		self._unloadFun = window.onbeforeunload;
		window.onbeforeunload = function(){
			self._refresh();
		};
		self.trigger("ready");
	},
	_go: function(){
		var self = this, data = self.data, history = self.history, buddy = self.buddy, room = self.room;
		history.option("userInfo", data.user);
		buddy.handle(data.buddies);
		each(data.buddies, function(n, v){
			history.init("unicast", v.id, v.history);
		});
		//buddy load delay
		buddy.online(data.online_buddy_ids, true);
		//rooms
		each(data.buddies, function(n, v){
			history.init("multicast", v.id, v.history);
		});
		//blocked rooms
		var b = self.setting.get("blocked_rooms"), roomData = data.rooms;
		isArray(b) && roomData && each(b,function(n,v){
			roomData[v] && (roomData[v].blocked = true);
		});
		room.handle(roomData);
		room.options.ticket = data.connection.ticket;
		//handle new messages
		var n_msg = data.new_messages;
		if(n_msg && n_msg.length)
			self.trigger("message",[n_msg]);
		self.trigger("go",[data]);
		self.connection.connect(data.connection);
	},
	_stop: function(msg){
		var self = this;
		window.onbeforeunload = self._unloadFun;
		self.data.user.presence = "offline";
		self.buddy.clear();
		self.trigger("stop", msg);
	},
	autoOnline: function(){
		return !this.status.get("o");
	},
	_initEvents: function(){
		var self = this, status = self.status, setting = self.setting, history = self.history, connection = self.connection;
		connection.bind("connect",function(e, data){
		}).bind("data",function(data){
			self.handle(data);
		}).bind("error",function(data){
			self._stop("connect error");
		}).bind("close",function(data){
			self._stop("disconnect");
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
		ajax({
			type: 'post',
			url: self.options.urls.message,
			type: 'post',
			cache: false,
			data: msg
		});
	},
	sendStatus: function(msg){
		var self = this;
		msg.ticket = self.data.connection.ticket;
		ajax({
			type: 'post',
			url: self.options.urls.status,
			type: 'post',
			cache: false,
			data: msg
		});
	},
	setStranger: function(ids){
		this.stranger_ids = idsArray(ids);
	},
	stranger_ids: [],
	online:function(){
		var self = this, status = self.status, buddy_ids = [], room_ids = [], tabs = status.get("tabs"), tabIds = status.get("tabIds");
		//set auto open true
		status.set("o", false);
		self._ready();
		if(tabIds && tabIds.length && tabs){
			each(tabs, function(k,v){
				v["t"] == "buddy" && buddy_ids.push(k.slice(2));
			});
			each(tabs, function(k,v){
				v["t"] == "room" && room_ids.push(k.slice(2));
			});
		}
		ajax({
			type:"post",
			dataType: "json",
			data:{                                
				buddy_ids: buddy_ids.join(","),
				room_ids: room_ids.join(","),
				stranger_ids: self.stranger_ids.join(",")
			},
			url: self.options.urls.online,
			success: function(data){
				if(!data || !data.user || !data.connection){
					self._stop("online error");
				}else{
					data.user = extend(self.data.user, data.user);
					self.data = data;
					self._go();
				}
			},
			error: function(data){
				self._stop("online error");
			}
		});

	},
	offline:function(){
		var self = this, data = self.data;
		self.status.set("o", true);
		self.connection.close();
		self._stop("offline");
		ajax({
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
		ajax({
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
	defaults:{},
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
	comet: comet,
	model: model,
	objectExtend: objectExtend
});
