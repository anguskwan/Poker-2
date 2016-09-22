class Transaction {
	public isImportant: Boolean;
	//public startUTC:Number;
	//private const NO_ERROR:String = "0";
	//private m_functionName:String;
	//public static const ON_AMF_ERROR: String = "on_amf_error";
	
	public constructor() {
	}
	
	protected onComplete(result:Object):void {
	}

	protected onFault(type:String, errorData:String):void {
	}
    
	//protected callAmf(functionName:String, ... _args):void {
        //m_functionName = functionName;
        //TransactionManager.call(functionName, _args, onAmfComplete, onAmfFault);
    //}
}