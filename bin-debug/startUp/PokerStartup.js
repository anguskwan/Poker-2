/**
 * Created by wwb on 2016/9/21.
 */
var PokerStartup = (function () {
    function PokerStartup() {
    }
    var d = __define,c=PokerStartup,p=c.prototype;
    p.execute = function (appData) {
        //解析xml配置
        var poker = appData.main;
        poker.xmlConfig.onAnalyitcalConfig(appData);
        //执行连接webSocket
        PokerService.getInstance.execute(this.onConnected, this.onFault);
    };
    p.onFault = function () {
    };
    //连接成功
    p.onConnected = function () {
    };
    d(PokerStartup, "getInstance"
        ,function () {
            if (PokerStartup._instance == null) {
                PokerStartup._instance = new PokerStartup();
            }
            return PokerStartup._instance;
        }
    );
    return PokerStartup;
}());
egret.registerClass(PokerStartup,'PokerStartup');
//# sourceMappingURL=PokerStartup.js.map