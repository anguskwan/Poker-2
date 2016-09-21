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
        GlobalAPI.moduleMgr.startModule(ModuleNote.PRELOAD, {});
        mouse.enable(this.stage);
        this.outContainer = new egret.Sprite();
        this.outContainer.name = "outContainer";
        this.outContainer.graphics.beginFill(0x00ff00);
        this.outContainer.graphics.drawRect(0, 0, 300, 300);
        this.outContainer.graphics.endFill();
        this.addChild(this.outContainer);
        this.outContainer.x = (this.stage.stageWidth - this.outContainer.width) / 2;
        this.outContainer.y = (this.stage.stageHeight - this.outContainer.height) / 2;
        //绘制里层显示对象
        this.inShape = new egret.Sprite();
        this.inShape.name = "inShape";
        this.inShape.graphics.beginFill(0xff0000);
        this.inShape.graphics.drawCircle(0, 0, 50);
        this.inShape.graphics.endFill();
        this.inShape.x = this.outContainer.width / 2;
        this.inShape.y = this.outContainer.height / 2;
        this.outContainer.addChild(this.inShape);
        //开启显示对象的触摸
        this.outContainer.touchEnabled = true;
        this.inShape.touchEnabled = true;
        //分别监听外层容器的 MouseEvent
        this.outContainer.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollOver, this);
        this.outContainer.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
        this.outContainer.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
        this.outContainer.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
        //分监听内层显示对象的 MouseEvent
        this.inShape.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollOver2, this);
        this.inShape.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut2, this);
        this.inShape.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver2, this);
        this.inShape.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut2, this);
    };
    p.onRollOver = function (e) {
        console.log("roll over " + e.target.name + "  " + e.bubbles);
    };
    p.onRollOut = function (e) {
        console.log("roll out " + e.target.name + "  " + e.bubbles);
    };
    p.onMouseOver = function (e) {
        console.log("mouse over " + e.target.name + "  " + e.bubbles);
    };
    p.onMouseOut = function (e) {
        console.log("mouse out " + e.target.name + "  " + e.bubbles);
    };
    p.onRollOver2 = function (e) {
        console.log("roll over2 " + e.target.name + "  " + e.bubbles);
    };
    p.onRollOut2 = function (e) {
        console.log("roll out2 " + e.target.name + "  " + e.bubbles);
    };
    p.onMouseOver2 = function (e) {
    };
    p.onMouseOut2 = function (e) {
    };
    return Main;
}(eui.UILayer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map