/**
 * Created by wwb on 2016/9/22.
 */
var FrameTimerManager = (function (_super) {
    __extends(FrameTimerManager, _super);
    function FrameTimerManager() {
        _super.call(this);
        this.frameTimeList = new Array();
    }
    var d = __define,c=FrameTimerManager,p=c.prototype;
    /**
     * 添加监听器
     * @param frame
     */
    p.addFrameTimer = function (frame) {
        if (this.frameTimeList.indexOf(frame) <= -1) {
            this.frameTimeList.push(frame);
            if (!this.hasEventListener(egret.Event.ENTER_FRAME)) {
                this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            }
        }
    };
    /**
     * 移除监听器
     * @param frame
     */
    p.removeFrameTimer = function (frame) {
        var index = this.frameTimeList.indexOf(frame);
        if (index > 1) {
            this.frameTimeList.splice(index, 1);
            if (this.frameTimeList.length == 0) {
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            }
        }
    };
    d(FrameTimerManager, "getInstance"
        /**
         * 单例模式
         * @returns {FrameTimerManager}
         */
        ,function () {
            if (FrameTimerManager._instance == null) {
                FrameTimerManager._instance = new FrameTimerManager();
            }
            return FrameTimerManager._instance;
        }
    );
    p.onEnterFrame = function (evt) {
        var length = this.frameTimeList.length;
        for (var i = 0; i < length; i++) {
            var frame = this.frameTimeList[i];
            frame.applyFunction();
        }
    };
    return FrameTimerManager;
}(egret.Sprite));
egret.registerClass(FrameTimerManager,'FrameTimerManager');
//# sourceMappingURL=FrameTimerManager.js.map