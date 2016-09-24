/**
 * Created by wwb on 2016/9/18.
 */
var Poker = (function (_super) {
    __extends(Poker, _super);
    function Poker() {
        _super.call(this);
        this.initGlobalApi();
    }
    var d = __define,c=Poker,p=c.prototype;
    p.startApplication = function (appData) {
        appData.main = this;
        PokerStartup.getInstance.execute(appData);
    };
    p.initUI = function () {
    };
    p.initGlobalApi = function () {
        GlobalAPI.gameObserver = new Notifier();
        GlobalAPI.moduleMgr = new ModuleManager();
    };
    return Poker;
}(MainBase));
egret.registerClass(Poker,'Poker');
//# sourceMappingURL=Poker.js.map