interface INotifier {

    /**
     * 注册回调函数
     */
    registerCallBack(message: string, callback: Function): void;

    /**
	 * 注册命令
	 **/
    registerCommand(message: string, command:GameCommand): void;

    /**
	 * 发送通知
	 **/
    sendNotification(message: string, ...contents): void;

    /**
	 *  移除指定观察者
	 **/
    removeObserver(message: string): void;

    /**
	 *  移除 Callback
	 **/
    removeCallBack(message: string, callback: Function): void;

    /**
	 * 清除当前对象所有的callback notification
	 **/
    clearAll(): void;
    
    /**
	 *  移除 Command
	 **/
    removeCommand(message: string, command:GameCommand): void;
}