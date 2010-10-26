WebIM JavaScript API
=====================================================

WebIM javascript lib for [WebIM server protocol][webim_server_protocol].

Server side: [Spidermonkey][spidermonkey], Rhino, V8

Web browser: IE 6.0+, FF 2+, Safari 3.0+, Chrome 

Hybrid application: Adobe AIR, Appcelerator Titanium


Object Structure
-----------------------------------------------------

###&user              

####Attributes

Name			|Description
------------------------|----
id			|Unique identifier 
nick			|Screen name
pic\_url		|Avatar url
default\_pic\_url	|Default avatar url
status			|Status text
show			|['available', 'away', 'chat', 'dnd', 'invisible']
status\_time		|Status time


###&buddy

####Attributes

Name			|Description
------------------------|------------
id			|Unique identifier
nick			|Screen name
presence		|["online", "offline"]
group			|
pic\_url		|Avatar url
default\_pic\_url	|Default avatar url
status			|Status text
show			|['available', 'away', 'chat', 'dnd', 'invisible']
status\_time		|Status time


###&room

####Attributes

Name			|Description
------------------------|------------
id			|Unique identifier
nick			|Screen name
pic\_url		|Avatar url
default\_pic\_url	|Default avatar url
all\_count		|Total number of members
count			|Total number of members online
blocked			|


###&member

####Attributes

Name			|Description
------------------------|------------
id			|Unique identifier
nick			|Screen name


###&message

####Attributes

Name			|Description
------------------------|------------
type			|['unicast', 'multicast']
to			|Receiver
from			|Sender
nick			|Sender screen name
style			|Message css text
body			|Message body
timestamp		|Message transmission time


###&status

####Attributes

Name			|Description
------------------------|------------
to			|Receiver
show			|Show status text, Example: typing


###&presence

####Attributes

Name			|Description
------------------------|------------
type			|['online', 'offline', 'show']
from			|Sender
nick			|Sender screen name
status			|Status text
show			|['available', 'away', 'chat', 'dnd', 'invisible']


Config
-----------------------------------------------------

###webim.route

####Attributes

Name			|Description
------------------------|----------------------------
online			|
offline			|
deactivate		|
message			|
presence		|
status			|
setting			|
history			|
clear			|
download		|
members			|
join			|
leave			|
buddies			|
notifications		|


Class Instances
-----------------------------------------------------

	var im = new webim();

###im

####Attributes

Name			|Type	|Description
------------------------|-------|------------
user			|&user	|
status			|status	|
setting			|setting|
history			|history|
buddy			|buddy	|
room			|room	|

####Events

Name			|Arguments	|Description
------------------------|---------------|------------
beforeOnline		|params		|
online			|		|
offline			|		|
message			|[&message]	|
presence		|[&presence]	|
status			|[&status]	|
sendMessage		|&message	|
sendPresence		|&presence	|
sendStatus		|&status	|

####Methods

Name				|Return	|Description
--------------------------------|-------|------------
setUser( &user )		|void	|
online( params )		|void	|
offline()			|void	|
sendMessage( &message )		|void	|
sendStatus( &status )		|void	|
sendPresence( &presence )	|void	|


###im.status

Ready switch to localStorage

Temporary data storage.

####Methods

Name			|Return		|Description
------------------------|---------------|------------
get( key )		|		|
set( key, value )	|		|
clear()			|		|

###im.setting

Permanent data storage.

####Methods

Name			|Return		|Description
------------------------|---------------|------------
get( key )		|		|
set( key, value )	|		|

####Events

Name			|Arguments	|Description
------------------------|---------------|------------
update			|key, value	|


###im.history

####Events

Name			|Arguments	|Description
------------------------|---------------|------------
unicast			|id, [&message]	|
multicast		|id, [&message]	|
clear			|type, id	|

####Methods

Name			|Return		|Description
------------------------|---------------|------------
set( [&message] )	|void		|
get( type, id )		|[&message]	|
load( type, id )	|void		|
clear( type, id )	|void		|


###im.buddy

####Events

Name			|Arguments	|Description
------------------------|---------------|------------
online			|&buddy		|
offline			|&buddy		|
update			|&buddy		|

####Methods

Name			|Return		|Description
------------------------|---------------|------------
set( buddies )		|void		|
get( id )		|&buddy		|
presence( buddies )	|void		|
update( ids )		|void		|
load( ids )		|void		|
complete()		|void		|
count( conditions )	|int		|
clear()			|void		|


###im.room

####Events

Name			|Arguments	|Description
------------------------|---------------|------------
join			|&room		|
leave			|&room		|
block			|&room		|
unblock			|&room		|

####Methods

Name			|Return		|Description
------------------------|---------------|------------
get( id )		|&room		|
set( rooms )		|void		|
join( id )		|void		|
leave( id )		|void		|
block( id )		|void		|
unblock( id )		|void		|
loadMember( id )	|void		|
addMember( id, info )	|void		|
removeMember( id, mid )	|void		|
initMember( id )	|void		|


[spidermonkey]: http://www.mozilla.org/js/spidermonkey/

[webim_server_protocol]: http://github.com/webim/webim/blob/master/doc/server_protocol.md
