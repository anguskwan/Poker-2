class PreloadMainUI extends WindowBase {
    public bg:eui.Image;
    public progress_txt:eui.Label;
    public refreshTitle:eui.Label;
    public refreshBtn:eui.Button;

    constructor() {
        super();
        this.skinName = "resource/assets/pc/module/preload/PreloadSkin.exml";
        this.addEventListener(egret.Event.COMPLETE, this.init, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
    }

    private onTouch(evt: egret.TouchEvent): void {
        //this.tryToClose();
        //GlobalAPI.gameObserver.sendNotification(MainNote.GET_USER_DATA, "8.0");
        //GlobalAPI.moduleMgr.startModule(ModuleNote.SHOP, {});
    }

    private init() {
    }

    protected createChildren(): void {
        super.createChildren();
    }

    public setProgressTxt(percent:number,total:number):void{
        this.progress_txt.text = `Loading...${percent}/${total}`;
    }
}