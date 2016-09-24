// TypeScript file
class NotificationManager {
    private static _instance: NotificationManager;
    private _notificationMap: HashMap = new HashMap();

    constructor() {

    }

    public static getInstance(): NotificationManager {
        if (NotificationManager._instance == null) {
            NotificationManager._instance = new NotificationManager();
        }
        return NotificationManager._instance;
    }

    /**
     * 注册回调函数
     * @param message 消息名字
     * @param callback 回调函数
     */
    public registerCallBack(message: string, callBack: Function): void {
        var callBacks: Array<any> = (this._notificationMap.get(message)) || new Array<any>();
        callBacks.push(callBack);
        this._notificationMap.put(message, callBacks);
    }

    /**
     * 注册命令
     * @param message 消息名字
     * @param command 命令
     */
    public registerCommand(message: string, command: GameCommand): void {
        var commands: Array<any> = (this._notificationMap.get(message)) || new Array<any>();
        commands.push(command);
        this._notificationMap.put(message, commands);
    }

    /**
     * 执行Notification
     * @param message 消息名字
     * @param contents 参数，可以无限多个
     */
    public sendNotification(message: string, ...contents): void {
        this.sendNotificationByArray(message, contents);
    }

    /**
     * 执行Notification， 参数以数组形式传递。
     * @param message 消息名字
     * @param contents 参数，可以无限多个
     */
    public sendNotificationByArray(message: string, contents: Array<Object>): void {
        var observer: Array<any> = this._notificationMap.get(message);
        if (observer == null)
            return;
        var length: number = observer.length;
        for (var i: number = 0; i < length; i++) {
            var obj: any = observer[i];
            if (obj instanceof GameCommand) {
                var command: GameCommand = <any>obj as GameCommand;
                command.execute();
            }
            else if (obj instanceof Function) {
                var fun: Function = <any>obj as Function;
                fun.apply(null, contents);
            }
        }
    }

    /**
     * 删除指定观察者
     * @param message 消息名字
     */
    public removeObserver(message: String): void {
        this._notificationMap.remove(message);
    }

    /**
     *  移除 Callback
     **/
    public removeCallBack(message: string, callback: Function): void {
        var callbacks: Array<any> = this._notificationMap.get(message);
        if (callbacks == null)
            return;
        var callBackIndex: number = callbacks.indexOf(callback);
        if (callBackIndex >= 0) {
            callbacks.splice(callBackIndex, 1);
            if (callbacks.length <= 0) {
                this._notificationMap.remove(message);
            }
        }

    }

    /**
     *  移除 Command
     **/
    public removeCommand(message: string, command: GameCommand): void {
        var commands: Array<any> = this._notificationMap.get(message);
        if (commands == null)
            return;
        var commandIndex: number = commands.indexOf(command);
        if (commandIndex >= 0) {
            commands.splice(commandIndex, 1);
            if (commands.length <= 0) {
                this._notificationMap.remove(message);
            }
        }
    }

    /**
     *  调试 检查 Notification
     *    指定message时 检查指定message触发的callback数
     *  否则 显示所有的 Notification
     * @param message 信息名字
     */
    public debug(message: string = null): void {
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
    }
}