/*
* room
*attributes：
*data []所有信息 readonly 
*methods:
*	get(id)
*	handle()
*	join(id)
*	leave(id)
*	count()
*	initMember
*	loadMember
*	addMember
*	removeMember
*	members(id)
*	member_cont(id)
*
*events:
*	join
*	leave
*	block
*	unblock
*	addMember
*	removeMember
*
*
*/
(function(){
	model("room", {
		urls:{
			join: "/webim/join",
			leave: "/webim/leave",
			member: "/webim/members"
		}
	},{
		_init: function(){
			var self = this;
			self.data = self.data || [];
			self.dataHash = {};
			if(self.options.jsonp)
				self.request = jsonp;
			else
				self.request = ajax;
		},
		get: function(id){
			return this.dataHash[id];
		},
		block: function(id){
			var self = this, d = self.dataHash[id];
			if(d && !d.blocked){
				d.blocked = true;
				var list = [];
				each(self.dataHash,function(n,v){
					if(v.blocked) list.push(v.id);
				});
				self.trigger("block",[id, list]);
			}
		},
		unblock: function(id){
			var self = this, d = self.dataHash[id];
			if(d && d.blocked){
				d.blocked = false;
				var list = [];
				each(self.dataHash,function(n,v){
					if(v.blocked) list.push(v.id);
				});
				self.trigger("unblock",[id, list]);
			}
		},
		handle: function(d){
			var self = this, data = self.data, dataHash = self.dataHash, status = {};
			each(d,function(k,v){
				var id = v.id;
				if(id){
					v.members = v.members || [];
					v.count = v.count || 0;
					v.all_count = v.all_count || 0;
					if(!dataHash[id]){
						dataHash[id] = v;
						data.push(v);
					}
					else extend(dataHash[id], v);
					self.trigger("join",[dataHash[id]]);
				}

			});
		},
		addMember: function(room_id, info){
			var self = this;
			if(isArray(info)){
				each(info, function(k,v){
					self.addMember(room_id, v);
				});
				return;
			};
			var room = self.dataHash[room_id];
			if(room){
				var members = room.members, member;
				for (var i = members.length; i--; i){
					if (members[i].id == info.id) {
						member = members[i];
					}
				}
				if(!member){
					info.nick = info.nick;
					members.push(info);
					room.count = members.length;
					self.trigger("addMember",[room_id, info]);
				}
			}
		},
		removeMember: function(room_id, member_id){
			var room = this.dataHash[room_id];
			if(room){
				var members = room.members, member;
				for (var i = members.length; i--; i){
					if (members[i].id == member_id) {
						member = members[i];
						members.splice(i, 1);
						room.count--;
					}
				}
				member && self.trigger("removeMember",[room_id, member]);
			}
		},
		initMember: function(id){
			var room = this.dataHash[id];
			if(room && !room.initMember){
				room.initMember = true;
				this.loadMember(id);
			}
		},
		loadMember: function(id){
			var self = this, options = self.options;
			self.request({
				type: "get",
				async: true,
				cache: false,
				url: options.urls.member,
				dataType: "json",
				data: {
					ticket: options.ticket,
					id: id
				},
				success: function(data){
					self.addMember(id, data);
				}
			});
		},
		join:function(id){
			var self = this, options = self.options, user = options.user;

			self.request({
				cache: false,
				type: "post",
				async: true,
				url: options.urls.join,
				dataType: "json",
				data: {
					ticket: options.ticket,
					id: id,
					nick: user.nick
				},
				success: function(data){
					//self.trigger("join",[data]);
					self.initMember(id);
					self.handle([data]);
				}
			});
		},
		leave: function(id){
			var self = this, options = self.options, d = self.dataHash[id], user = options.user;
			if(d){
				d.initMember = false;
				self.request({
					cache: false,
					type: "post",
					url: options.urls.leave,
					data: {
						ticket: options.ticket,
						id: id,
						nick: user.nick
					}
				});
				self.trigger("leave",[d]);
			}
		},
		clear:function(){
		}
	});
})();
