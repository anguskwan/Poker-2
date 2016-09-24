/**
 * Created by wwb on 2016/9/13.
 */
var AutoRetryURLLoader = (function (_super) {
    __extends(AutoRetryURLLoader, _super);
    function AutoRetryURLLoader(autoRetry, retryTimes, param) {
        if (autoRetry === void 0) { autoRetry = false; }
        if (retryTimes === void 0) { retryTimes = 3; }
        if (param === void 0) { param = null; }
        _super.call(this, param);
        this._retriedTimes = 0;
        this.lastProgressTime = 0;
        this._autoRetry = autoRetry;
        this._retryTimes = retryTimes;
    }
    var d = __define,c=AutoRetryURLLoader,p=c.prototype;
    p.load = function (request) {
        this.originalRequest = request;
        this.originalUrl = request.url;
        this._load(request);
    };
    p._load = function (param) {
        _super.prototype.load.call(this, param);
        if (this.autoRetry) {
            this.startTimeOutCheck();
        }
        else {
            this.stopTimeOutCheck();
        }
    };
    d(p, "autoRetry"
        ,function () {
            return this._autoRetry;
        }
        ,function (param) {
            this._autoRetry = param;
        }
    );
    d(p, "retryTimes"
        ,function () {
            return this._retryTimes;
        }
        ,function (param) {
            this._retryTimes = param;
        }
    );
    /**
     * 开始时间次数检测，并添加监听文件加载
     */
    p.startTimeOutCheck = function () {
        this.lastProgressTime = egret.getTimer();
        this.addEventListener(egret.ProgressEvent.PROGRESS, this.onLoadProgress, this);
        this.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadIoError, this);
        this.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        if (this.timeOutTimer == null) {
            this.timeOutTimer = new egret.Timer(AutoRetryURLLoader.DELAY);
            this.timeOutTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        }
        else {
            this.timeOutTimer.reset();
        }
        this.timeOutTimer.start();
    };
    p.onTimer = function (evt) {
        if (egret.getTimer() - this.lastProgressTime > AutoRetryURLLoader.OFFEST) {
            this.checkToReload();
        }
    };
    /**
     * 检测重新加载
     */
    p.checkToReload = function () {
        this._retriedTimes = this._retryTimes + 1;
        if (this._retryTimes < this.retryTimes) {
            //是否需要重新处理下url，因为会带有版本号
            this._load(this.originalRequest);
        }
        else {
            this.stopTimeOutCheck();
        }
    };
    p.onLoadProgress = function (evt) {
        this.lastProgressTime = egret.getTimer();
    };
    p.onLoadIoError = function (evt) {
        this.checkToReload();
    };
    p.onLoadComplete = function (evt) {
        this.stopTimeOutCheck();
    };
    /**
     * 停止时间次数检测，并销毁监听
     */
    p.stopTimeOutCheck = function () {
        if (this.timeOutTimer != null) {
            this.timeOutTimer.stop();
            this.timeOutTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this.timeOutTimer = null;
        }
        this.lastProgressTime = 0;
        this.removeEventListener(egret.ProgressEvent.PROGRESS, this.onLoadProgress, this);
        this.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadIoError, this);
        this.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
    };
    AutoRetryURLLoader.DELAY = 2000;
    AutoRetryURLLoader.OFFEST = 7000;
    return AutoRetryURLLoader;
}(ParamableURLLoader));
egret.registerClass(AutoRetryURLLoader,'AutoRetryURLLoader');
//# sourceMappingURL=AutoRetryURLLoader.js.map