/**
 * buddy //联系人
 * attributes：
 * 	data []所有信息 readonly 
 * methods:
 * 	get(id)
 * 	handle(data) //handle data and distribute events
 * 	presence(data) //handle buddy presence.
 * 	complete() //Complete info.
 * 	update(ids) 更新用户信息 有更新时触发events:update

 * events:
 * 	online  //  data:[]
 * 	offline  //  data:[]
 * 	update 
 */

model("buddy", {
	url:"/webim/buddy"
}, {
	_init: function(){
		var self = this;
		self.data = self.data || [];
		self.dataHash = {};
		self.handle(self.data);
	},
	clear:function(){
		var self =this;
		self.data = [];
		self.dataHash = {};
	},
	count: function(conditions){
		var data = this.dataHash, count = 0, t;
		for(var key in data){
			if(isObject(conditions)){
				t = true;
				for(var k in conditions){
					if(conditions[k] != data[key][k]) t = false;
				}
				if(t) count++;
			}else{
				count ++;
			}
		}
		return count;
	},
	get: function(id){
		return this.dataHash[id];
	},
	complete: function(){
		var self = this, data = self.dataHash, ids = [], v;
		for(var key in data){
			v = data[key];
			if(v.incomplete && v.presence == 'online')ids.push(key);
		}
		self.load(ids);
	},
	update: function(ids){
		this.load(ids);
	},
	presence: function(data){
		var self = this, dataHash = self.dataHash;
		data = isArray(data) ? data : [data];
		//Complete presence info.
		for(var i in data){
			var v = data[i];
			//Presence in [show,offline,online]
			v.presence = v.presence == "offline" ? "offline" : "online";
			v.show = v.show ? v.show : (v.presence == "offline" ? "unavailable" : "available");
			v.incomplete = !dataHash[v.id];
		}
		self.handle(data);
	},
	load: function(ids){
		ids = idsArray(ids);
		if(ids.length){
			var self = this, options = self.options;
			ajax({
				type: "get",
				url: options.url,
				cache: false,
				dataType: "json",
				data:{ ids: ids.join(",")},
				context: self,
				success: self.handle
			});
		}
	},
	handle: function(addData){
		var self = this, data = self.data, dataHash = self.dataHash, status = {};
		addData = addData || [];
		var l = addData.length , v, type, add;
		//for(var i = 0; i < l; i++){
		for(var i in addData){
			v = addData[i], id = v.id;
			if(id){
				if(!dataHash[id]){
					v.presence = v.presence || "online";
					v.show = v.show ? v.show : (v.presence == "offline" ? "unavailable" : "available");
					dataHash[id] = {};
					data.push(dataHash[id]);
				}
				v.incomplete = !!v.incomplete;
				add = checkUpdate(dataHash[id], v);
				if(add){
					type = add.presence || "update";
					status[type] = status[type] || [];
					extend(dataHash[id], add);
					status[type].push(dataHash[id]);
				}
			}
		}
		for (var key in status) {
			self.trigger(key, [status[key]]);
		}
		self.options.active && self.complete();
	}
});
