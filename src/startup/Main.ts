class Main extends eui.UILayer {
    private popup: egret.Sprite;
    protected createChildren(): void {
        super.createChildren();
        //注入自定义的素材解析器
        this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        var a: PreLoaderNew = new PreLoaderNew();
        this.addChild(a);
    }

    //初始化各类基础组件
    //RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
    //RES.loadConfig("resource/base.res.json", "resource/");

    //RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
    //var theme = new eui.Theme("resource/base.thm.json", this.stage);
    //theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

}
