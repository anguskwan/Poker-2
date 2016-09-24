/**
 * 配置
 */
var GlobalConfig = (function () {
    function GlobalConfig() {
    }
    var d = __define,c=GlobalConfig,p=c.prototype;
    /**
     *舞台配置
     */
    //设置舞台
    GlobalConfig.setStage = function (param) {
        this._stage = param;
    };
    d(GlobalConfig, "stage"
        //获取舞台
        ,function () {
            return this._stage;
        }
    );
    /**
     *基础配置
     */
    GlobalConfig.os = "pc"; //设备
    GlobalConfig.release = "3.7"; //版本号
    /**
     *路径配置
     */
    GlobalConfig.RESOURCE_PATH = "./resource/assets/" + GlobalConfig.os + "/"; //资源路径
    GlobalConfig.SRC_PATH = "./bin-debug/view/module"; //模块路径
    GlobalConfig.LANG_PATH = "./lang"; //语言包路径
    /**
     *服务器配置
     */
    GlobalConfig.BASE_PATH = "http://local.texas.playshoo.com/";
    GlobalConfig.SERVICES_GATEWAY_PATH = "flashapi/gateway.php";
    GlobalConfig.gateWay = GlobalConfig.BASE_PATH + GlobalConfig.SERVICES_GATEWAY_PATH;
    return GlobalConfig;
}());
egret.registerClass(GlobalConfig,'GlobalConfig');
//# sourceMappingURL=GlobalConfig.js.map