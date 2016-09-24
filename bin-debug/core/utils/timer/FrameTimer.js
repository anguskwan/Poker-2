/**
 * Created by wwb on 2016/9/22.
 * 帧计时器，构造函数传入的参数，说明是隔多久执行回调函数
 * egret getTimer() 是毫秒级别的
 */
var FrameTimer = (function () {
    function FrameTimer(rate) {
        if (rate === void 0) { rate = FrameTimer.FRAME; }
        this._rate = 0;
        this._rate = rate;
    }
    var d = __define,c=FrameTimer,p=c.prototype;
    /**
     * 添加监听
     * @param interval 间隔时间
     * @param times  执行次数  -1代表无限次数执行，
     * @param callBack 回调
     * @param args  参数
     */
    p.addListener = function (interval, callBack, times, args) {
        if (interval === void 0) { interval = 1000; }
        if (times === void 0) { times = -1; }
        if (args === void 0) { args = null; }
        this._callBack = callBack;
        this._args = args;
        this._interval = interval;
        this._times = times;
        this._registerTime = egret.getTimer();
        FrameTimerManager.getInstance.addFrameTimer(this);
    };
    p.removeFrameTimerListener = function () {
        FrameTimerManager.getInstance.removeFrameTimer(this);
    };
    /**
     * 启动帧计时器
     */
    p.start = function () {
        FrameTimerManager.getInstance.addFrameTimer(this);
    };
    /**
     * 关闭帧计时器
     */
    p.stop = function () {
        this.removeFrameTimerListener();
    };
    /**
     * 销毁帧计时器
     */
    p.destroy = function () {
        this.stop();
        this._args = null;
        this._callBack = null;
        this._interval = 0;
        this._times = 0;
    };
    /**
     * 执行函数
     */
    p.applyFunction = function () {
        var time = egret.getTimer();
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
    };
    FrameTimer.FRAME = 1;
    return FrameTimer;
}());
egret.registerClass(FrameTimer,'FrameTimer');
//# sourceMappingURL=FrameTimer.js.map