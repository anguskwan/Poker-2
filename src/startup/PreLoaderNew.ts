// TypeScript file
/**
 * Created by wwb on 2016/9/21.
 */
class PreLoaderNew extends ConfigLoader {
    private initOk: boolean;
    private preloader: PreloadMainUI;
    constructor() {
        super();
        this.preloader = new PreloadMainUI();
        this.preloader.addEventListener("initOk",this.onComplete, this);
        this.addChild(this.preloader);
    }

    private onComplete(evt: egret.Event): void {
        this.initOk = true;
        this.startLoadMainApp();
    }

    /**
     * 初始化加载的配置表
     */
    protected initLoadList(): void {
        super.initLoadList();
        this.initXmlContent();
    }

    /**
     * 初始化xml配置
     */
    private initXmlContent(): void {
        this.initXmlConfig();
    }

    /**
     * 移除加载页
     */
    private removePreloader(): void {
        if (this.preloader != null && this.preloader.parent != null) {
            this.preloader.tryToClose();
            this.preloader = null;
        }
    }

    /**
     * 初始化App
     */
    protected initMainApp(): void {
        //this.removePreloader();

        //初始化主程序
        var poker: Poker = new Poker();
        this.addChild(poker);

        var appData: AppData = new AppData(this, null, this._storageMap);
        poker.startApplication(appData);

        this._storageMap.clear();
        this._storageMap = null;
    }

    protected showItemProgress(percent: number): void {
        // this.preloader.setProgressTxt(percent);
    }

    protected showLoadingData(data: string): void {
        if (this.initOk)
            this.preloader.setProgressTxt(data);
    }
}