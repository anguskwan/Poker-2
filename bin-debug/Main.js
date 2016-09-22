var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Main,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.popup = new egret.Sprite();
        this.addChild(this.popup);
        WindowManager.init(this.popup);
        //注入自定义的素材解析器
        this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/base.res.json", "resource/");
    };
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        var theme = new eui.Theme("resource/base.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    };
    p.onThemeLoadComplete = function () {
        this.createScene();
    };
    p.createScene = function () {
        //开始调用模块PreLoad;
        GlobalAPI.moduleMgr = new ModuleManager();
        GlobalAPI.gameObserver = new Notifier();
        //GlobalAPI.amfMgr = new AmfManager();
        GlobalAPI.moduleMgr.startModule(ModuleNote.PRELOAD, {});
    };
    return Main;
}(eui.UILayer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map