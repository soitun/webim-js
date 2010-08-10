NextIM Server protocol
======================

打开页面时，获得页面陌生人stranger\_ids，从cookie获取当前已打开的窗口buddy\_ids、 room\_ids，上线webim/online获得在线buddy\_online\_ids和已打开窗口的信息和历史记录。此时不用获得所有在线好友信息以减少每次刷新页面读取好友表。setting信息存在session里减少查询。

刷新页面webim/refresh 退出当前client。


##常用数据

###链接信息connection

####示例

	{
	        "domain": "www.uchome.com",
	        "ticket": "8633d182-b7fe-42a3-8466-0c4134cfebf2",
	        "server": "http://ucim.webim20.cn:8000"
	}

####参数说明

参数名		|类型	|描述
----------------|-------|------------
domain		|string	|域名，API注册域名
ticket		|string	|本次通信令牌，用于浏览器与消息服务器建立JSONP长连接
server		|string	|im服务器地址


###用户信息userInfo

####示例

	{
		"id": "2",
	        "name": "susan",
	        "nick": "Susan",
	        "pic_url": "http://www.uchome.com/uc/ucenter/avatar.php?uid=2&size=small&type=virtual",
	        "url": "space.php?uid=2",
	        "show": "away",// ['available', 'away', 'chat', 'dnd', 'busy', 'invisible']
	        "status": "I'm not here right now.",
	        "status_time": "10:55"
	}

####参数说明

###联系人信息buddyInfo

####示例

	{
	        "id": "2",
	        "name": "jack",
	        "nick": "Jack",
	        "group": "friend", //["friend", "stranger"]
	        "pic_url": "http://www.uchome.com/uc/ucenter/avatar.php?uid=2&size=small&type=virtual",
		"default_pic_url": "", //默认显示图片
	        "url": "space.php?uid=2",
	        "presence": "online", //["online", "offline"]
	        "show": "away",// ['available', 'away', 'chat', 'dnd', 'busy', 'invisible']
	        "status": "I'm not here right now.",
	        "status_time": "10:55"
	}

###群组成员信息roomMemberInfo

####示例

	{
	        "name": "jack",
	        "nick": "Jack"
	}

###群组信息roomInfo

####示例

	{
		"id": "2",
	        "name": "jack",
	        "nick": "Jack",
	        "pic_url": "http://www.uchome.com/uc/ucenter/avatar.php?uid=2&size=small&type=virtual",
		"default_pic_url": "", //默认显示图片
	        "url": "group.php?uid=2",
		"all_count": 10, //all members count
	        "count": 5,//online members count
		"blocked": false,
	        "members": [&roomMemberInfo] // online members
	}

###联系人列表buddies

####示例

	[&buddyInfo]

###群组列表rooms

####示例

	[&roomInfo]

###聊天记录logItem

####示例

	{
	        "type": "unicast",
	        "to": "2",
	        "from": "2",
	        "style": "color:#bbb;", //
	        "body": "\uff1f",
	        "timestamp": "1246883572400"
	}

###聊天记录列表histories

####示例

	{
	        1: [&logItem],
	        2: [&logItem]
	}
	
##常用数据

###上线登录 POST webim/online

####请求参数

        {
		buddy_ids: "1,34,34",	//通过前端获得的buddy列表
		room_ids: "1,34,34",		//通过前端获得的room列表
		stranger_ids: "34,23"
        }

####返回参数

        {
                server_time: "", //服务器时间microtime(true)*1000
                user: &userInfo,
                connection: &connection,
                setting: {},
                buddy_online_ids: "54,22",	//在线buddy
                presence_buddies: &buddies, //根据presence_buddies参数和离线消息from ids取得联系人信息
                presence_rooms: &rooms, //根据presence_rooms参数取得群组信息
                histories: &histories, //根据presence_buddies , presence_rooms和离线消息from ids取得消息历史记录
                new_messages: []//未收到的离线消息
        }

###离线 POST webim/offline

####请求参数

	&connection

####返回参数

        ok

###刷新页面 POST webim/refresh

####请求参数

	&connection

####返回参数

        ok

###获取好友列表 GET webim/buddies

####请求参数

        {
                ids:"1,2"
        }

####返回参数

        &buddies


###获取房间列表 GET webim/rooms

####请求参数

        {
                ids:"1,2"
        }

####返回参数

        &rooms

###加入房间 POST webim/join

####请求参数

	&connection
	{
                id:"1"
        }

####返回参数

        &roomInfo

###离开房间 POST webim/leave

####请求参数

	&connection
        {
                id:"1"
        }

####返回参数

	ok

###获得房间成员 GET webim/members

####请求参数

	&connection
        {
                ids:"1"
        }

####返回参数
        {
        	10001:[&roomMemberInfo],
        	10002:[&roomMemberInfo]
	}

###获得历史记录 GET webim/histories

####请求参数

        {
                ids:"1,2",
		type: "unicast"
        }

####返回参数

        &histories

###发送消息 POST webim/message

####请求参数

	&connection
        {
                type: "unicast", //[unicast, multicast] 一对一buddy, 一对多room
                offline: 1, //to 离线消息
                to: "11",
                body: "sdf",
                style: "color:red"
        }

####返回参数

        ok

###清除历史记录 POST webim/clear_history

####请求参数

        {
                ids:"1,2"
        }

####返回参数

        ok


###发送状态 POST webim/status

####请求参数

	&connection
        {
                to: "11",
                show: "typing"	//[typing]
        }

####返回参数

        ok

//setting

###设置 POST webim/setting

####请求参数

        {
		play_sound: true,
		buddy_sticky: true,
		minimize_layout: false,
		msg_auto_pop: true
        }

####返回参数

        ok

