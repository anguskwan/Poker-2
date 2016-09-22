class AmfManager {
	private static instance: AmfManager;
	private amfArr:Array<any>;
	//重试
	public static timeOut:number = 5000;
	private static timeID:number;
	public static tries:number = 0;
	public static maxtries:number = 2;
	//心跳时间
	public static heartTimeout:number = 240000;
	public static heartFunc:Function;
	public static heartID:number;
	
	private static gateway: String;
	private static amfClient: any;
	
	public constructor() {
		this.amfArr = [];
	}
	
	public static getInstance(): AmfManager {
        if (AmfManager.instance == null) {
            AmfManager.instance = new AmfManager();
        }
        return AmfManager.instance;
    }

	//初始化连接
	public static init(url: string): void {
		this.gateway = url;
		this.amfClient = this.amfClient || new amf.Client("amfphp", "http://local.texas.playshoo.com/flashapi/gateway.php", "300");
	}

	/*public static addTransaction(action:Transaction, isImportant:Boolean = false):void {
			//trace("添加交互,有交互正在执行:",action, isLoading,isImportant);
			action.isImportant = isImportant;
			if (!isLoading || action is TError)
			{
				m_currentAction = action;
				action.execute();
			}
			else 
			{
                m_transactions.push(action);
			}
	}
		
	public static call(source: string, operation: string, params: Array<any>, onResult: Function, onStatus: Function, token: any = null, holdQueue: any = null): void {
		this.amfClient.invoke(source, operation, params, onResult, onStatus, token, holdQueue);
	}*/
}