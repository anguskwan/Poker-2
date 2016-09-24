/**
 * Created by wwb on 2016/9/22.
 */
class FrameTimerManager extends egret.Sprite{
    private static _instance: FrameTimerManager;
    private frameTimeList:Array<FrameTimer> = new Array<FrameTimer>();
    constructor() {
        super();
    }

    /**
     * 添加监听器
     * @param frame
     */
    public addFrameTimer(frame:FrameTimer):void{
        if(this.frameTimeList.indexOf(frame)<=-1){
            this.frameTimeList.push(frame);
            if(!this.hasEventListener(egret.Event.ENTER_FRAME)){
                this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
            }
        }
    }


    /**
     * 移除监听器
     * @param frame
     */
    public removeFrameTimer(frame:FrameTimer):void{
        var index:number = this.frameTimeList.indexOf(frame);
        if(index>1){
            this.frameTimeList.splice(index,1);
            if(this.frameTimeList.length==0){
                this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
            }
        }
    }

    /**
     * 单例模式
     * @returns {FrameTimerManager}
     */
    public static get getInstance(): FrameTimerManager {
        if (FrameTimerManager._instance == null) {
            FrameTimerManager._instance = new FrameTimerManager();
        }
        return FrameTimerManager._instance;
    }

    private onEnterFrame(evt:egret.Event):void{
        var length:number = this.frameTimeList.length;
        for(var i:number=0;i<length;i++){
            var frame:FrameTimer = this.frameTimeList[i];
            frame.applyFunction();
        }
    }
}
