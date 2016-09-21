var PreloadMainUI = (function (_super) {
    __extends(PreloadMainUI, _super);
    function PreloadMainUI() {
        _super.call(this);
        this.skinName = "resource/assets/pc/module/preload/PreloadSkin.exml";
        this.addEventListener(egret.Event.COMPLETE, this.init, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }
    var d = __define,c=PreloadMainUI,p=c.prototype;
    p.onTouch = function (evt) {
        //this.tryToClose();
        //GlobalAPI.gameObserver.sendNotification(MainNote.GET_USER_DATA, "8.0");
        //GlobalAPI.moduleMgr.startModule(ModuleNote.SHOP, {});
    };
    p.init = function () {
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    p.setProgressTxt = function (percent, total) {
        this.progress_txt.text = "Loading..." + percent + "/" + total;
    };
    return PreloadMainUI;
}(WindowBase));
egret.registerClass(PreloadMainUI,'PreloadMainUI');
//# sourceMappingURL=PreloadMainUI.js.map