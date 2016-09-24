class PreloadMainUI extends WindowBase {
    public bg: eui.Image;
    public progressTxt: eui.Label;
    constructor() {
        super();
        this.addEventListener(egret.Event.COMPLETE, this.init, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/assets/pc/preload/preload.res.json", "resource/");
    }
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadGroup("preload");
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, function (evt: RES.ResourceEvent): void {
            this.skinName = "resource/assets/pc/preload/PreloadSkin.exml";
        }, this);
    }

    private onTouch(evt: egret.TouchEvent): void {
     
    }

    private init(evt: egret.Event) {
        this.dispatchEvent(new egret.Event("initOk"));
    }

    protected createChildren(): void {
        super.createChildren();
    }

    public setProgressTxt(percent: string): void {

         this.progressTxt.text = percent;
    }
}