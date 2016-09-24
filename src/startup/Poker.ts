/**
 * Created by wwb on 2016/9/18.
 */
class Poker extends MainBase {
    constructor() {
        super();
        this.initGlobalApi();
        this.initGlobalData();
    }

    public startApplication(appData: AppData): void {
        appData.main = this;
        PokerStartup.getInstance.execute(appData);
    }


    public initUI(): void {

    }

    private initGlobalApi(): void {
        GlobalAPI.gameObserver = new Notifier();
        GlobalAPI.moduleMgr = new ModuleManager();
    }

    private initGlobalData():void{

    }
}