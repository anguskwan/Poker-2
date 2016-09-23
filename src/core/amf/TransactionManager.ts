class TransactionManager {
	private static isLoading: boolean = false;
	//超时
	public static timeOut: number = 240000;
	private static timeDelay: number = 5000;
	private static timeID: number;
	public static tries: number = 0;
	public static maxtries: number = 2;
	//Client
	private static m_connection: any;
	public static m_currentAction: Transaction;
	private static m_transactions: Array<Transaction> = [];
	private static source: string;
	private static operation: string;

	public constructor() {
	}

	//添加请求
	public static addTransaction(action: Transaction, isImportant: boolean = false): void {
		console.log("添加交互:", action);

		action.isImportant = isImportant;
		if (!this.isLoading) {
			this.m_currentAction = action;
			action.execute();
		}
		else {
			this.m_transactions.push(action);
		}
	}

	//处理当前请求
	public static call(functionName: string, params: Array<any>): void {
		console.log("执行交互:", functionName);

		this.m_connection = this.m_connection || new amf.Client("amfphp", GlobalConfig.gateWay, this.timeOut);
		this.isLoading = true;
		this.source = functionName.split(".")[0];
		this.operation = functionName.split(".")[1];
		this.m_connection.invoke(this.source, this.operation, params, this.resultCallback, this.statusCallback);

		clearTimeout(this.timeID);
		this.timeID = setTimeout(this.overTimeOut, this.timeOut);
	}

	//返回数据
	public static resultCallback(result: Object): void {
		console.log(result, "IN Manager");
		if (result["returnNo"] == 0) {
            if (result["data"] != null) {
				TransactionManager.m_currentAction.onComplete(result);
			}
			TransactionManager.executeNext();
		}
	}

	//返回错误
	public static statusCallback(result: Object): void {
		console.log(result, "IN Manager");
		switch (result["faultCode"]) {
			//未定义的接口
			case "AMFPHP_INEXISTANT_METHOD":
			case "AMFPHP_FILE_NOT_FOUND":	
				TransactionManager.executeNext();
				break;
			//暂未测试
			case "-402":
				if (TransactionManager.tries < TransactionManager.maxtries) {
					TransactionManager.retry();
					return;
				}
			//断线
			case 0:
				console.log("duanx");
				break;
		}

		if (TransactionManager.m_currentAction.isImportant)
		{
			//弹窗
		}	
		TransactionManager.m_currentAction.onFault(result);
	}

	//处理下一个请求
	public static executeNext(): void {
		this.reset();
		if (this.m_transactions.length > 0) {
			this.m_currentAction = this.m_transactions.shift();
			this.m_currentAction.execute();
		}
	}

	//重试
	public static retry(): void {
		clearTimeout(this.timeID);
		this.timeID = setTimeout(this.retryFun, this.timeOut);
	}

	//重试Handle
	private static retryFun(): void {
		this.tries++;
		this.reset(true);
		this.m_currentAction.execute();
	}

	//重设
	private static reset(isTimeOut: Boolean = false): void {
		this.isLoading = false;
		clearTimeout(this.timeID);
		if (this.m_connection && !isTimeOut) {
			this.tries = 0;
			this.m_connection = null;
		}
	}

	//心跳超时
	private static overTimeOut(): void {
		console.log("超时");
	}
}