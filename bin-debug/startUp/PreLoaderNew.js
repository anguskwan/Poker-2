// TypeScript file
/**
 * Created by wwb on 2016/9/21.
 */
var PreLoaderNew = (function (_super) {
    __extends(PreLoaderNew, _super);
    function PreLoaderNew() {
        _super.call(this);
        this.preloader = new PreloadMainUI();
        this.addChild(this.preloader);
    }
    var d = __define,c=PreLoaderNew,p=c.prototype;
    /**
     * 初始化加载的配置表
     */
    p.initLoadList = function () {
        _super.prototype.initLoadList.call(this);
        this.initXmlContent();
        this.startLoadMainApp();
    };
    /**
     * 初始化xml配置
     */
    p.initXmlContent = function () {
        this.initXmlConfig();
    };
    /**
     * 移除加载页
     */
    p.removePreloader = function () {
        if (this.preloader != null && this.preloader.parent != null) {
            this.preloader.tryToClose();
            this.preloader = null;
        }
    };
    /**
     * 初始化App
     */
    p.initMainApp = function () {
        // this.removePreloader();
        //初始化主程序
        var poker = new Poker();
        this.addChild(poker);
        var appData = new AppData(this, null, this._storageMap);
        poker.startApplication(appData);
        this._storageMap.clear();
        this._storageMap = null;
    };
    p.showItemProgress = function (percent) {
        // this.preloader.setProgressTxt(percent);
    };
    p.showLoadingData = function (data) {
        this.preloader.setProgressTxt(data);
    };
    return PreLoaderNew;
}(ConfigLoader));
egret.registerClass(PreLoaderNew,'PreLoaderNew');
//# sourceMappingURL=PreLoaderNew.js.map