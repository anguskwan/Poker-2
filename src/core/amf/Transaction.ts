class Transaction {
	//public startUTC:Number;
	//private const NO_ERROR:String = "0";
	private m_functionName: String;
	//public static const ON_AMF_ERROR: String = "on_amf_error";
	public isImportant: boolean;

	public constructor() {
	}

	//给子类特殊处理
	public execute(): void {
	}

	//交互完成处理，子类可覆写
	public onComplete(result:Object):void
	{
    }
		
	//交互错误处理，子类可覆写
	public onFault(result:Object):void
	{
	}

	//获取数据
	protected callAmf(functionName: string, ..._args): void {
        this.m_functionName = functionName;
		TransactionManager.call(functionName, _args);
    }

	
}