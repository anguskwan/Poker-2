/**
 * Created by wwb on 2016/9/22.
 * 帧计时器，构造函数传入的参数，说明是隔多久执行回调函数
 * egret getTimer() 是毫秒级别的
 */
class FrameTimer {
    private static FRAME: number = 1;
    private _rate: number = 0;
    private _callBack: Function;
    private _args: Array<any>;
    private _interval: number;
    private _times: number;
    private _registerTime: number;

    constructor(rate: number = FrameTimer.FRAME) {
        this._rate = rate;
    }

    /**
     * 添加监听
     * @param interval 间隔时间
     * @param times  执行次数  -1代表无限次数执行，
     * @param callBack 回调
     * @param args  参数
     */
    public addListener(interval: number = 1000,callBack: Function,times: number = -1, args: Array<any> = null): void {
        this._callBack = callBack;
        this._args = args;
        this._interval = interval;
        this._times = times;
        this._registerTime = egret.getTimer();
        FrameTimerManager.getInstance.addFrameTimer(this);
    }

    public removeFrameTimerListener(): void {
        FrameTimerManager.getInstance.removeFrameTimer(this);
    }

    /**
     * 启动帧计时器
     */
    public start(): void {
        FrameTimerManager.getInstance.addFrameTimer(this);
    }

    /**
     * 关闭帧计时器
     */
    public stop(): void {
        this.removeFrameTimerListener();
    }

    /**
     * 销毁帧计时器
     */
    public destroy(): void {
        this.stop();
        this._args = null
        this._callBack = null;
        this._interval = 0;
        this._times = 0;
    }

    /**
     * 执行函数
     */
    public applyFunction(): void {
        var time: number = egret.getTimer();
        if (time - this._registerTime > this._interval) {
            if (this._times <= -1 || this._times > 0) {
                this._times = this._times - 1;
                this._registerTime = time;
                this._callBack.apply(null, this._args);
            }
        }
        if (this._times == 0) {
            this.destroy();
        }
    }
}
