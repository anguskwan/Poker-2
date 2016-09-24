// TypeScript file
class Notifier implements INotifier {

    /**
     * 信息管理器
     */
    protected _notification_manager: NotificationManager = NotificationManager.getInstance();
    protected _notificationKeys: Object = {};  // 用于记录当前对象所注册的 callback notification. 以便清除
    constructor(){
        
    }

    /**
     * 注册回调函数
     */
    public registerCallBack(message: string, callBack: Function): void {
        if (this.hasRegistered(message)) {
            throw new Error('回调函数已被同名的message "' + message + ' "注册过');
        }
        this._notificationKeys[message] = true;
        this._notification_manager.registerCallBack(message, callBack);
    }

    /**
	 * 注册命令
	 **/
    public registerCommand(message: string, command: GameCommand): void {
        if (this.hasRegistered(message)) {
            throw new Error('命令类已被同名的message "' + message + ' "注册过');
        }
        this._notificationKeys[message] = true;
        this._notification_manager.registerCommand(message, command);
    }

    /**
	 * 发送通知
	 **/
    public sendNotification(message: string, ...contents): void {
        this._notification_manager.sendNotificationByArray(message, contents);
    }

    /**
	 *  移除指定观察者
	 **/
    public removeObserver(message: string): void {
        this._notificationKeys[message] = null;
        delete this._notificationKeys[message];
        this._notification_manager.removeObserver(message);
    }

    /**
	 *  移除 Callback
	 **/
    public removeCallBack(message: string, callback: Function): void {
        this._notificationKeys[message] = null;
        delete this._notificationKeys[message];
        this._notification_manager.removeCallBack(message, callback);
    }

    /**
	 * 清除当前对象所有的callback notification
	 **/
    public clearAll(): void {
        for (var i in this._notificationKeys) {
            if (typeof this._notificationKeys[i] == "Function") {
                this._notification_manager.removeCallBack(i, this._notificationKeys[i]);
            }
            else if (typeof this._notificationKeys[i] == "GameCommand") {
                this._notification_manager.removeCommand(i, this._notificationKeys[i]);
            }
        }
        this._notificationKeys = null;
    }

    /**
	 *  移除 GameCommand
	 **/
    public removeCommand(message: string, command: GameCommand): void {
        this._notificationKeys[message] = null;
        delete this._notificationKeys[message];
        this._notification_manager.removeCommand(message, command);
    }

    /**
	 * 是否已注册过(同一个类不允许出现同名的函数和命令类)
	 * @param message 消息名字
	 * @return 有或者没有
	 **/
    public hasRegistered(message: string): Boolean {
        if (this._notificationKeys[message]) {
            return true;
        }
        else {
            return false;
        }
    }

}