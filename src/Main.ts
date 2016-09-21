class Main extends eui.UILayer {
    private popup: egret.Sprite;

    protected createChildren(): void {
        super.createChildren();
        this.popup = new egret.Sprite();
        this.addChild(this.popup);
        WindowManager.init(this.popup);
        //注入自定义的素材解析器
        this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/base.res.json", "resource/");
    }

    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        var theme = new eui.Theme("resource/base.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }

    private onThemeLoadComplete(): void {
        this.createScene();
    }

    private outContainer: egret.Sprite;
    private inShape: egret.Shape;
    private createScene(): void {
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
    }

    private onRollOver(e: egret.TouchEvent): void {
        console.log("roll over " + e.target.name + "  " + e.bubbles);
    }
    private onRollOut(e: egret.TouchEvent): void {
        console.log("roll out " + e.target.name + "  " + e.bubbles);
    }
    private onMouseOver(e: egret.TouchEvent): void {
        console.log("mouse over " + e.target.name + "  " + e.bubbles);
    }
    private onMouseOut(e: egret.TouchEvent): void {
        console.log("mouse out " + e.target.name + "  " + e.bubbles);
    }
    private onRollOver2(e: egret.TouchEvent): void {
        console.log("roll over2 " + e.target.name + "  " + e.bubbles);
    }
    private onRollOut2(e: egret.TouchEvent): void {
        console.log("roll out2 " + e.target.name + "  " + e.bubbles);
    }
    private onMouseOver2(e: egret.TouchEvent): void {
    }
    private onMouseOut2(e: egret.TouchEvent): void {
    }
}
