NextIM Server Protocol
======================

NextIM服务端接口协议为web浏览器和web服务器之间的通信协议，数据格式使用json。

打开页面时，获得页面陌生人stranger\_ids，从cookie获取当前已打开的窗口buddy\_ids、 room\_ids，上线webim/online获得在线buddy\_online\_ids和已打开窗口的信息和历史记录。此时不用获得所有在线好友信息以减少每次刷新页面读取好友表。setting信息存在session里减少查询。

刷新页面webim/refresh 退出当前client。


##常用数据

###连接信息connection


	{
	        "domain": "www.uchome.com",
	        "ticket": "8633d182-b7fe-42a3-8466-0c4134cfebf2",
	        "server": "http://ucim.webim20.cn:8000"
	}


参数名			|类型	|描述
------------------------|-------|------------
domain			|string	|域名，API注册域名
ticket			|string	|本次通信令牌，用于浏览器与消息服务器建立JSONP长连接
server			|string	|im服务器地址


###用户信息userInfo

####示例

	{
		"id": 1,
	        "name": "jack",
	        "nick": "Jack",
	        "pic_url": "http://t1.qlogo.cn/mbloghead/c39e95b85b1b6bcd6f84/50",
	        "default_pic_url": "http://mat1.gtimg.com/www/mb/images/head_50.jpg",
	        "url": "space.php?uid=2",
	        "show": "available", 
	        "status": "I'm free.",
	        "status_time": "10:55"
	}


参数名			|类型	|描述
------------------------|-------|------------
id			|int	|用户唯一ID
name			|string	|用户唯一用户名，多为用户登录帐号，如果没有，可直接用id
nick			|string	|用户昵称或姓名
pic\_url		|string	|用户头像地址
default\_pic\_url	|string	|用户头像默认地址，当头像加载失败时显示
show			|string	|用户在线状态信息['available', 'away', 'chat', 'dnd', 'busy', 'invisible']
status			|string	|用户状态
status\_time		|string	|用户状态时间


###联系人信息buddyInfo

	{
		"id": 2,
	        "name": "susan",
	        "nick": "Susan",
	        "group": "friend", 
	        "pic_url": "http://t1.qlogo.cn/mbloghead/a061e4ecb5b1ecd6ccee/50",
	        "default_pic_url": "http://mat1.gtimg.com/www/mb/images/head_50.jpg",
	        "url": "space.php?uid=2",
	        "presence": "online",
	        "show": "available", 
	        "status": "I'm free.",
	        "status_time": "10:55"
	}

参数名			|类型	|描述
------------------------|-------|------------
id			|int	|用户唯一ID
name			|string	|用户唯一用户名，多为用户登录帐号，如果没有，可直接用id
nick			|string	|用户昵称或姓名
group			|string	|用户所属分组
pic\_url		|string	|用户头像地址
default\_pic\_url	|string	|用户头像默认地址，当头像加载失败时显示
presence		|string	|用户是在线离线["online", "offline"]
show			|string	|用户在线状态信息['available', 'away', 'chat', 'dnd', 'busy', 'invisible']
status			|string	|用户状态
status\_time		|string	|用户状态时间


###群组成员信息roomMemberInfo

####示例

	{
	        "id": 1,
	        "name": "jack",
	        "nick": "Jack"
	}

###群组成员列表members

####示例

	[&roomMemberInfo]

###群组信息roomInfo

####示例

	{
		"id": "2",
	        "name": "jack",
	        "nick": "Jack",
	        "pic_url": "http://www.uchome.com/uc/ucenter/avatar.php?uid=2&size=small&type=virtual",
		"default_pic_url": "",
	        "url": "group.php?uid=2",
		"all_count": 10,
	        "count": 5,
		"blocked": false,
	        "members": [&roomMemberInfo] 
	}

参数名			|类型		|描述
------------------------|---------------|------------
id			|int		|群组唯一ID
name			|string		|群组唯一名称，可直接用id组成
nick			|string		|群组名称
pic\_url		|string		|群组图片地址
default\_pic\_url	|string		|群组图片默认地址，当图片加载失败时显示
all\_count		|int		|群组所有用户数
count			|int		|群组在线用户数
blocked			|bool		|是否被当前用户屏蔽
members			|&amp;members	|群组在线成员

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
	        "to": 2,
	        "from": 1,
	        "style": "color:#bbb;",
	        "body": "Hello.",
	        "timestamp": 1246883572400
	}

参数名			|类型		|描述
------------------------|---------------|------------
type			|string		|记录类型，unicast: 一对一, multicast: 多对多群组, broadcast: 全站广播
to			|int		|接收消息用户ID
from			|int		|发送消息用户ID
style			|string		|消息css样式
body			|string		|消息内容
timestamp		|int		|消息发送时间，时间为javascript时间，php中使用microtime(true)\*1000


###聊天记录列表histories

####示例

	{
	        1: [&logItem],
	        2: [&logItem]
	}
	
##接口说明

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

