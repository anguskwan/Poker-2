/**
 * Created by wwb on 2016/9/12.
 */
var PokerConfig = (function () {
    function PokerConfig() {
        this.useLocalServer = true;
    }
    var d = __define,c=PokerConfig,p=c.prototype;
    PokerConfig.getInstance = function () {
        if (PokerConfig._instance == null) {
            PokerConfig._instance = new PokerConfig();
        }
        return PokerConfig._instance;
    };
    PokerConfig.traceFun = function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i - 0] = arguments[_i];
        }
        if (this.traceOpen) {
            console.log(rest);
        }
    };
    PokerConfig.connectCount = 0;
    PokerConfig.SecurityerrCount = 0;
    PokerConfig.socketConnected = false;
    PokerConfig.version = "";
    PokerConfig.traceOpen = true; //是否开启trace功能
    PokerConfig.versionArray = PokerConfig.version.split("."); //解析出的版本数组
    return PokerConfig;
}());
egret.registerClass(PokerConfig,'PokerConfig');
//# sourceMappingURL=PokerConfig.js.map