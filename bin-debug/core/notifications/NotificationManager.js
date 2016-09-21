var NotificationManager = (function () {
    function NotificationManager() {
        this._notificationMap = new HashMap();
    }
    var d = __define,c=NotificationManager,p=c.prototype;
    NotificationManager.getInstance = function () {
        if (NotificationManager._instance == null) {
            NotificationManager._instance = new NotificationManager();
        }
        return NotificationManager._instance;
    };
    /**
     * 注册回调函数
     * @param message 消息名字
     * @param callback 回调函数
     */
    p.registerCallBack = function (message, callBack) {
        var callBacks = (this._notificationMap.get(message)) || new Array();
        callBacks.push(callBack);
        this._notificationMap.put(message, callBacks);
    };
    /**
     * 注册命令
     * @param message 消息名字
     * @param command 命令
     */
    p.registerCommand = function (message, command) {
        var commands = (this._notificationMap.get(message)) || new Array();
        commands.push(command);
        this._notificationMap.put(message, commands);
    };
    /**
     * 执行Notification
     * @param message 消息名字
     * @param contents 参数，可以无限多个
     */
    p.sendNotification = function (message) {
        var contents = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            contents[_i - 1] = arguments[_i];
        }
        this.sendNotificationByArray(message, contents);
    };
    /**
     * 执行Notification， 参数以数组形式传递。
     * @param message 消息名字
     * @param contents 参数，可以无限多个
     */
    p.sendNotificationByArray = function (message, contents) {
        var observer = this._notificationMap.get(message);
        if (observer == null)
            return;
        var length = observer.length;
        for (var i = 0; i < length; i++) {
            var obj = observer[i];
            if (obj instanceof GameCommand) {
                var command = obj;
                command.execute();
            }
            else if (obj instanceof Function) {
                var fun = obj;
                fun.apply(null, contents);
            }
        }
    };
    /**
     * 删除指定观察者
     * @param message 消息名字
     */
    p.removeObserver = function (message) {
        this._notificationMap.remove(message);
    };
    /**
     *  移除 Callback
     **/
    p.removeCallBack = function (message, callback) {
        var callbacks = this._notificationMap.get(message);
        if (callbacks == null)
            return;
        var callBackIndex = callbacks.indexOf(callback);
        if (callBackIndex >= 0) {
            callbacks.splice(callBackIndex, 1);
            if (callbacks.length <= 0) {
                this._notificationMap.remove(message);
            }
        }
    };
    /**
     *  移除 Command
     **/
    p.removeCommand = function (message, command) {
        var commands = this._notificationMap.get(message);
        if (commands == null)
            return;
        var commandIndex = commands.indexOf(command);
        if (commandIndex >= 0) {
            commands.splice(commandIndex, 1);
            if (commands.length <= 0) {
                this._notificationMap.remove(message);
            }
        }
    };
    /**
     *  调试 检查 Notification
     *    指定message时 检查指定message触发的callback数
     *  否则 显示所有的 Notification
     * @param message 信息名字
     */
    p.debug = function (message) {
        if (message === void 0) { message = null; }
        console.log('------------------NotificationObserver Dump---------------------');
        if (message) {
            if (this._notificationMap.containsKey(message)) {
                console.log(message + ': has ' + this._notificationMap.get(message).length + ' callbacks.');
            }
        }
        else {
            for (var j in this._notificationMap) {
                console.log(j + ': has ' + this._notificationMap.get(j).length + ' callbacks.');
            }
        }
        console.log('--------------------------Dump End-----------------------------');
    };
    return NotificationManager;
}());
egret.registerClass(NotificationManager,'NotificationManager');
//# sourceMappingURL=NotificationManager.js.map