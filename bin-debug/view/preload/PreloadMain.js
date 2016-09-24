var PreloadMain = (function (_super) {
    __extends(PreloadMain, _super);
    function PreloadMain() {
        _super.call(this);
    }
    var d = __define,c=PreloadMain,p=c.prototype;
    /**
     * 开启模块
     */
    p.startModule = function (data) {
        _super.prototype.startModule.call(this, data);
    };
    /**
     * 初始化数据
     */
    p.initData = function (data) {
        this.addDisplayObj(new PreloadMainUI());
    };
    return PreloadMain;
}(BaseModule));
egret.registerClass(PreloadMain,'PreloadMain');
//# sourceMappingURL=PreloadMain.js.map