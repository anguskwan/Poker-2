// TypeScript file
var Notifier = (function () {
    function Notifier() {
        /**
         * 信息管理器
         */
        this._notification_manager = NotificationManager.getInstance();
        this._notificationKeys = {}; // 用于记录当前对象所注册的 callback notification. 以便清除
    }
    var d = __define,c=Notifier,p=c.prototype;
    /**
     * 注册回调函数
     */
    p.registerCallBack = function (message, callBack) {
        if (this.hasRegistered(message)) {
            throw new Error('回调函数已被同名的message "' + message + ' "注册过');
        }
        this._notificationKeys[message] = true;
        this._notification_manager.registerCallBack(message, callBack);
    };
    /**
     * 注册命令
     **/
    p.registerCommand = function (message, command) {
        if (this.hasRegistered(message)) {
            throw new Error('命令类已被同名的message "' + message + ' "注册过');
        }
        this._notificationKeys[message] = true;
        this._notification_manager.registerCommand(message, command);
    };
    /**
     * 发送通知
     **/
    p.sendNotification = function (message) {
        var contents = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            contents[_i - 1] = arguments[_i];
        }
        this._notification_manager.sendNotificationByArray(message, contents);
    };
    /**
     *  移除指定观察者
     **/
    p.removeObserver = function (message) {
        this._notificationKeys[message] = null;
        delete this._notificationKeys[message];
        this._notification_manager.removeObserver(message);
    };
    /**
     *  移除 Callback
     **/
    p.removeCallBack = function (message, callback) {
        this._notificationKeys[message] = null;
        delete this._notificationKeys[message];
        this._notification_manager.removeCallBack(message, callback);
    };
    /**
     * 清除当前对象所有的callback notification
     **/
    p.clearAll = function () {
        for (var i in this._notificationKeys) {
            if (typeof this._notificationKeys[i] == "Function") {
                this._notification_manager.removeCallBack(i, this._notificationKeys[i]);
            }
            else if (typeof this._notificationKeys[i] == "GameCommand") {
                this._notification_manager.removeCommand(i, this._notificationKeys[i]);
            }
        }
        this._notificationKeys = null;
    };
    /**
     *  移除 GameCommand
     **/
    p.removeCommand = function (message, command) {
        this._notificationKeys[message] = null;
        delete this._notificationKeys[message];
        this._notification_manager.removeCommand(message, command);
    };
    /**
     * 是否已注册过(同一个类不允许出现同名的函数和命令类)
     * @param message 消息名字
     * @return 有或者没有
     **/
    p.hasRegistered = function (message) {
        if (this._notificationKeys[message]) {
            return true;
        }
        else {
            return false;
        }
    };
    return Notifier;
}());
egret.registerClass(Notifier,'Notifier',["INotifier"]);
//# sourceMappingURL=Notifier.js.map