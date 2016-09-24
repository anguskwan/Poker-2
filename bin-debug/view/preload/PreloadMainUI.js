var PreloadMainUI = (function (_super) {
    __extends(PreloadMainUI, _super);
    function PreloadMainUI() {
        _super.call(this);
        this.addEventListener(egret.Event.COMPLETE, this.init, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/assets/pc/preload/preload.res.json", "resource/");
    }
    var d = __define,c=PreloadMainUI,p=c.prototype;
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadGroup("preload");
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, function (evt) {
            this.skinName = "resource/assets/pc/preload/PreloadSkin.exml";
            PokerConfig.traceFun(this.progressTxt == null);
        }, this);
    };
    p.onTouch = function (evt) {
    };
    p.init = function () {
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    p.setProgressTxt = function (percent) {
        //  this.progressTxt.text = percent;
    };
    return PreloadMainUI;
}(WindowBase));
egret.registerClass(PreloadMainUI,'PreloadMainUI');
//# sourceMappingURL=PreloadMainUI.js.map