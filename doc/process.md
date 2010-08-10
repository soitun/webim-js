
打开页面时，获得页面陌生人stranger\_ids，从cookie获取当前已打开的窗口buddy\_ids、 room\_ids，上线webim/online获得在线buddy\_online\_ids和已打开窗口的信息和历史记录。此时不用获得所有在线好友信息以减少每次刷新页面读取好友表。setting信息存在session里减少查询。

刷新页面webim/refresh 退出当前client。


