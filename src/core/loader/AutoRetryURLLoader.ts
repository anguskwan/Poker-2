/**
 * Created by wwb on 2016/9/13.
 */
class AutoRetryURLLoader extends ParamableURLLoader {
    private _autoRetry: boolean;
    private _retryTimes: number;
    private _retriedTimes: number = 0;
    protected originalUrl: string;
    protected originalRequest: egret.URLRequest;
    protected lastProgressTime: number = 0;
    protected timeOutTimer: egret.Timer;
    protected static DELAY: number = 2000;
    protected static OFFEST: number = 7000;

    constructor(autoRetry: boolean = false, retryTimes: number = 3, param: Object = null) {
        super(param);
        this._autoRetry = autoRetry;
        this._retryTimes = retryTimes;
    }

    public load(request: egret.URLRequest): void {
        this.originalRequest = request;
        this.originalUrl = request.url;
        this._load(request);
    }

    protected  _load(param: egret.URLRequest): void {
        super.load(param);
        if (this.autoRetry) {
            this.startTimeOutCheck();
        } else {
            this.stopTimeOutCheck();
        }
    }

    public get autoRetry(): boolean {
        return this._autoRetry;
    }

    public set autoRetry(param: boolean) {
        this._autoRetry = param;
    }

    public get retryTimes(): number {
        return this._retryTimes;
    }

    public set retryTimes(param: number) {
        this._retryTimes = param;
    }

    /**
     * 开始时间次数检测，并添加监听文件加载
     */
    private startTimeOutCheck(): void {
        this.lastProgressTime = egret.getTimer();
        this.addEventListener(egret.ProgressEvent.PROGRESS, this.onLoadProgress, this);
        this.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadIoError, this);
        this.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        if (this.timeOutTimer == null) {
            this.timeOutTimer = new egret.Timer(AutoRetryURLLoader.DELAY);
            this.timeOutTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        } else {
            this.timeOutTimer.reset();
        }
        this.timeOutTimer.start();
    }

    private onTimer(evt: egret.TimerEvent): void {
        if (egret.getTimer() - this.lastProgressTime > AutoRetryURLLoader.OFFEST) {
            this.checkToReload();
        }
    }

    /**
     * 检测重新加载
     */
    private checkToReload(): void {
        this._retriedTimes = this._retryTimes+1;
        if(this._retryTimes<this.retryTimes){
            //是否需要重新处理下url，因为会带有版本号
            this._load(this.originalRequest);
        }else{
            this.stopTimeOutCheck();
        }
    }

    private onLoadProgress(evt: egret.ProgressEvent): void {
        this.lastProgressTime = egret.getTimer();
    }

    private onLoadIoError(evt: egret.IOErrorEvent): void {
        this.checkToReload();
    }

    private onLoadComplete(evt: egret.Event): void {
        this.stopTimeOutCheck();
    }

    /**
     * 停止时间次数检测，并销毁监听
     */
    private stopTimeOutCheck(): void {
        if (this.timeOutTimer != null) {
            this.timeOutTimer.stop();
            this.timeOutTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer,this);
            this.timeOutTimer = null;
        }
        this.lastProgressTime = 0;
        this.removeEventListener(egret.ProgressEvent.PROGRESS, this.onLoadProgress,this);
        this.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadIoError,this);
        this.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete,this);
    }
}
