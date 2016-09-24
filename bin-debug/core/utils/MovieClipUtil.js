/**
 * Created by wwb on 2016/9/21.
 */
var MovieClipUtil = (function (_super) {
    __extends(MovieClipUtil, _super);
    function MovieClipUtil(data, asset, movieClipName) {
        _super.call(this);
        this.mcDataFactory = new egret.MovieClipDataFactory(data, asset);
        this.mc = new egret.MovieClip(this.mcDataFactory.generateMovieClipData(movieClipName));
        this.addChild(this.mc);
    }
    var d = __define,c=MovieClipUtil,p=c.prototype;
    p.gotoAndStop = function (frame) {
        if (this.mc != null) {
            this.mc.gotoAndStop(frame);
        }
    };
    p.gotoAndPlay = function (frame, playTimes) {
        if (this.mc != null) {
            this.mc.gotoAndPlay(frame, playTimes);
        }
    };
    p.nextFrame = function () {
        if (this.mc != null) {
            this.mc.nextFrame();
        }
    };
    p.prevFrame = function () {
        if (this.mc != null) {
            this.mc.prevFrame();
        }
    };
    p.stop = function () {
        if (this.mc != null) {
            this.mc.stop();
        }
    };
    p.play = function (playTimes) {
        if (this.mc != null) {
            this.mc.play(playTimes);
        }
    };
    p.dispose = function () {
        if (this.mc != null) {
            this.mc.stop();
            this.mc = null;
            this.mcDataFactory = null;
        }
    };
    return MovieClipUtil;
}(egret.DisplayObjectContainer));
egret.registerClass(MovieClipUtil,'MovieClipUtil');
//# sourceMappingURL=MovieClipUtil.js.map