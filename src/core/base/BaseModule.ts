/**
 * 模块基类
 */
class BaseModule extends egret.EventDispatcher implements IModule {
    protected moudleName: string;
    private _disposeDic:Array<Object>;
    constructor() {
        super();
        this._disposeDic = [];
    }

    /**
     * 销毁模块
     */
    public dispose(): void {
        this.dispatchEvent(new CustomDataEvent("ModuleClose"));
        
    }

    /**
     * 开启模块
     */
    public startModule(data: Object): void {
        this.initData(data);
    }

    /**
     * 设置模块名字
     */
    public setName(param: string): void {
        this.moudleName = param;
    }

    /**
     * 获取模块名字
     */
    public getName(): string {
        return this.moudleName;
    }

    /**
     * 添加显示对象
     * @param obj
     * @param isMode
     * @param contain
     * @param isNeedShow
     */
    public addDisplayObj(obj: DisplayObject, isMode: boolean = true, contain: Sprite = null, isNeedShow: Boolean = true): void {
        this._disposeDic.push({dis:obj,mode:isMode});
        var window: IWindow = <any>obj as IWindow;
        if(window!=null){
            window.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoveFromStage,this);
        }
        if(!isNeedShow)
            return;
        if(contain!=null){
            contain.addChild(obj);
        }else{
            WindowManager.popupWindow(window,true,isMode);
        }
    }

    /**
     * 初始化数据
     */
    public initData(data: Object): void {
    }

    private onRemoveFromStage(evt:egret.Event):void{
        var objArr:Array<Object>=[];
        var length:number = this._disposeDic.length;
        for(var i:number=0;i<length;i++){
            var obj:Object = objArr[i];
            if(evt.currentTarget!=obj){
                objArr.push(obj);
            }
        }
        this._disposeDic = objArr;
        objArr=null;
        if(this._disposeDic.length==0){
            this.dispose();
        }
    }
}