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

        //console.log(TexasPoker.prototype.championshipList);
        setTimeout(this.tt, 3000);
       

        GlobalAPI.moduleMgr.startModule(ModuleNote.PRELOAD, {});
    }

    private tt(): void{
        TransactionManager.addTransaction(new TChampionshipList(1, 10, this.testComplete)); 
        TransactionManager.addTransaction(new TChampionshipList1(10, 20,this.testComplete));
    }
    private testComplete(): void
    {
        //console.log(TexasPoker.championshipList,"11")
    }
}
