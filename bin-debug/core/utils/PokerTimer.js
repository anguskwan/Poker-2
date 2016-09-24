/**
 * Created by wwb on 2016/9/23.
 */
var PokerTimer = (function () {
    function PokerTimer() {
        this._registServerTime = 0;
        this._registClientTime = 0;
    }
    var d = __define,c=PokerTimer,p=c.prototype;
    d(PokerTimer, "getInstance"
        ,function () {
            if (PokerTimer._instance == null) {
                PokerTimer._instance = new PokerTimer();
            }
            return PokerTimer._instance;
        }
    );
    d(p, "serverTime"
        ,function () {
            return this._registServerTime + Math.round((egret.getTimer() - this._registClientTime) / 1000);
        }
        ,function (v) {
            this._registServerTime = v;
            this._registClientTime = egret.getTimer();
        }
    );
    return PokerTimer;
}());
egret.registerClass(PokerTimer,'PokerTimer');
//# sourceMappingURL=PokerTimer.js.map