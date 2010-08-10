NextIM Server Protocol
======================

NextIM服务端接口协议为web浏览器和web服务器之间的通信协议，数据格式使用json。


##常用数据

###连接信息connection


	{
	        "domain": "www.uchome.com",
	        "ticket": "8633d182-b7fe-42a3-8466-0c4134cfebf2",
	        "server": "http://ucim.webim20.cn:8000"
	}


参数名			|类型	|必需	|描述
------------------------|-------|-------|------------
domain			|string	|true	|域名，API注册域名
ticket			|string	|true	|本次通信令牌，用于浏览器与消息服务器建立JSONP长连接
server			|string	|true	|im服务器地址

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


参数名			|类型	|必需	|描述
------------------------|-------|-------|----
id			|int	|true	|用户唯一ID
name			|string	|true	|用户唯一用户名，多为用户登录帐号，如果没有，可直接用id
nick			|string	|true	|用户昵称或姓名
pic\_url		|string	|false	|用户头像地址
default\_pic\_url	|string	|false	|用户头像默认地址，当头像加载失败时显示
show			|string	|false	|用户在线状态信息['available', 'away', 'chat', 'dnd', 'busy', 'invisible']
status			|string	|false	|用户状态
status\_time		|string	|false	|用户状态时间

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

参数名			|类型	|必需	|描述
------------------------|-------|-------|------------
type			|string	|true	|记录类型，unicast: 一对一, multicast: 多对多群组, broadcast: 全站广播
to			|int	|true	|接收消息用户ID
from			|int	|true	|发送消息用户ID
style			|string	|false	|消息css样式
body			|string	|true	|消息内容
timestamp		|int	|true	|消息发送时间，时间为javascript时间，php中使用microtime(true)\*1000

###聊天记录列表history

####示例

	[&logItem]
	
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
	        "status_time": "10:55",
		"history": &history
	}

参数名			|类型	|必需	|描述
------------------------|-------|-------|------------
id			|int	|true	|联系人唯一ID
name			|string	|true	|联系人唯一用户名，多为用户登录帐号，如果没有，可直接用id
nick			|string	|true	|联系人昵称或姓名
group			|string	|true	|联系人所属分组
presence		|string	|true	|联系人是在线离线["online", "offline"]
pic\_url		|string	|false	|联系人头像地址
default\_pic\_url	|string	|false	|联系人头像默认地址，当头像加载失败时显示
show			|string	|false	|联系人在线状态信息['available', 'away', 'chat', 'dnd', 'busy', 'invisible']
status			|string	|false	|联系人状态
status\_time		|string	|false	|联系人状态时间
history			|object	|false	|联系人和当前用户聊天记录，如果没有则会新建连接从webim/histories读取


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
	        "members": &members,
	        "history": &history 
	}

参数名			|类型	|必需	|描述
------------------------|-------|-------|------------
id			|int 	|true	|群组唯一ID
name			|string	|true	|群组唯一名称，可直接用id组成
nick			|string	|true	|群组名称
pic\_url		|string	|false	|群组图片地址
default\_pic\_url	|string	|false	|群组图片默认地址，当图片加载失败时显示
all\_count		|int 	|true	|群组所有用户数
count			|int 	|true	|群组在线用户数
blocked			|bool	|true	|是否被当前用户屏蔽
members			|object	|false	|群组在线成员，如果没有会新建连接从webim/members读取
history			|object	|false	|群组聊天记录，如果没有则会新建连接从webim/histories读取

###联系人列表buddies

####示例

	[&buddyInfo]

###群组列表rooms

####示例

	[&roomInfo]


##接口说明

###上线登录 POST webim/online

####请求参数

        {
		buddy_ids: "1,34,34",
		room_ids: "1,34,34",
		stranger_ids: "34,23"
        }

参数名			|类型	|必需	|描述
------------------------|-------|-------|------------
buddy\_ids		|string |false	|显示在tabs中的联系人列表，需要online后取得联系人信息和聊天记录
room\_ids		|string	|false	|显示在tabs中的群组列表，需要online后取得联系人信息和聊天记录
stranger\_ids		|string	|false	|当前网页显示的未知联系人，需要判断是否在线

####返回参数

        {
                server_time: 1281443447248, 
                user: &userInfo,
                connection: &connection,
                online_buddy_ids: "54,22",
                buddies: &buddies, 
                rooms: &rooms, 
                new_messages: []
        }

参数名			|类型	|必需	|描述
------------------------|-------|-------|------------
server\_time		|int	|true	|服务器当前时间，解决本地时差，返回js时间戳。microtime(true)\*1000
user			|object	|true	|当前用户信息
connection		|object	|true	|当前用户连接信息
online\_buddy\_ids	|string	|true	|在线好友列表，逗号分隔
buddies			|object	|true	|根据请求参数中buddy\_ids和离线消息取得联系人信息
rooms			|object	|true	|所有群组列表
new\_messages		|object	|true	|未收到的离线消息


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
                id: "1"
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
                ids:"1,2"
        }

####返回参数

        {
        	1: &members,
        	2: &members
	}

###获得历史记录 GET webim/histories

####请求参数

        {
                ids:"1,2",
		type: "unicast"
        }

参数名			|类型	|必需	|描述
------------------------|-------|-------|------------
ids			|string	|true	|需要取得的历史记录联系人或群组列表
type			|string	|true	|取得历史记录类型，unicast: 联系人, multicast: 群组


####返回参数

        {
        	1: &history,
        	2: &history
	}


###发送消息 POST webim/message

####请求参数

	&connection
        {
                type: "unicast", 
                offline: false, 
                to: "11",
                body: "sdf",
                style: "color:red"
        }

参数名			|类型	|必需	|描述
------------------------|-------|-------|------------
type			|string	|true	|记录类型，unicast: 一对一, multicast: 多对多群组, broadcast: 全站广播
offline			|bool	|true	|是否离线消息
to			|int	|true	|接收消息用户ID
style			|string	|false	|消息css样式
body			|string	|true	|消息内容


####返回参数

        ok

###清除历史记录 POST webim/clear_history

####请求参数

        {
                id: 2
        }

####返回参数

        ok

###发送状态 POST webim/status

####请求参数

	&connection
        {
                to: "11",
                show: "typing"
        }

####返回参数

        ok


###设置 POST webim/setting

####请求参数

        {
		play_sound: true,
		buddy_sticky: true,
		minimize_layout: false,
		msg_auto_pop: true
        }

参数名			|类型	|必需	|描述
------------------------|-------|-------|------------
play\_sound		|bool	|false	|是否播放提示音
buddy\_sticky		|bool	|false	|保持聊天窗口始终打开
minimize\_layout	|bool	|false	|收缩工具条
msg\_auto\_pop		|bool	|false	|新消息时自动弹出聊天窗口

####返回参数

        ok

