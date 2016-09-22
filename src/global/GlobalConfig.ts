/**
 * 配置
 */
class GlobalConfig {
	private static _stage: egret.Stage;

	/**
	 *基础配置
	 */
	public static os: string = "pc";//设备
	public static release: string = "3.7";//版本号

	/**
	 *路径配置
	 */
    public static RESOURCE_PATH: string = "./resource/assets/"+GlobalConfig.os+"/";//资源路径
    public static SRC_PATH: string = "./bin-debug/view/module";//模块路径
    public static LANG_PATH: string = "./lang";//语言包路径

	/**
	 *服务器配置
	 */
	public static BASE_PATH:String = "http://local.texas.playshoo.com/";
	public static SERVICES_GATEWAY_PATH: string = "flashapi/gateway.php";
	public static gateWay: string = GlobalConfig.BASE_PATH + GlobalConfig.SERVICES_GATEWAY_PATH;

	/**
	 *舞台配置
	 */
	//设置舞台
    public static setStage(param: egret.Stage): void {
        this._stage = param;
    }
    //获取舞台
    public static get stage(): egret.Stage {
        return this._stage;
    }

	/**
	 *版本设置
	 */
	
}