/**
 * Created by wwb on 2016/9/18.
 */
class MainBase extends egret.Sprite {
    /**
     * UI层
     */
    private _uiLayer:egret.Sprite;
    /**
     * 弹窗层
     */
    private _popUpLayer:egret.Sprite;
    /**
     * 公告层
     */
    private _noticeLayer:egret.Sprite;
    constructor() {
        super();
        this.createChildren();
    }

    public startApplication(appData: AppData): void {

    }

    /**
     * 创建游戏层级
     */
    private createChildren():void{
        this.touchEnabled=false;
        this._popUpLayer = new egret.Sprite();
        this._popUpLayer.touchEnabled=false;
        this.addChild(this._popUpLayer);
        this._uiLayer = new egret.Sprite();
        this._uiLayer.touchEnabled=false;
        this.addChild(this._uiLayer);
        this._noticeLayer = new egret.Sprite();
        this._noticeLayer.touchEnabled=false;
        WindowManager.init(this._popUpLayer);
    }

    public get uiLayer():egret.Sprite{
        return this._uiLayer;
    }

    public get popUpLayer():egret.Sprite{
        return this._popUpLayer
    }

    public get noticeLayer():egret.Sprite{
        return this._noticeLayer;
    }
}
