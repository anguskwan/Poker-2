/**
 * Created by wwb on 2016/9/21.
 */
class MovieClipUtil extends egret.DisplayObjectContainer {
    private mcDataFactory: egret.MovieClipDataFactory;
    private mc: egret.MovieClip;

    constructor(data: any, asset: egret.Texture, movieClipName: string) {
        super();
        this.mcDataFactory = new egret.MovieClipDataFactory(data, asset);
        this.mc = new egret.MovieClip(this.mcDataFactory.generateMovieClipData(movieClipName));
        this.addChild(this.mc);
    }

    public gotoAndStop(frame: any): void {
        if (this.mc != null) {
            this.mc.gotoAndStop(frame);
        }
    }

    public gotoAndPlay(frame: any, playTimes?: number): void {
        if (this.mc != null) {
            this.mc.gotoAndPlay(frame, playTimes);
        }
    }

    public nextFrame(): void {
        if (this.mc != null) {
            this.mc.nextFrame();
        }
    }

    public prevFrame(): void {
        if (this.mc != null) {
            this.mc.prevFrame();
        }
    }

    public stop(): void {
        if (this.mc != null) {
            this.mc.stop();
        }
    }

    public play(playTimes?: number): void {
        if (this.mc != null) {
            this.mc.play(playTimes);
        }
    }

    public dispose(): void {
        if (this.mc != null) {
            this.mc.stop();
            this.mc = null;
            this.mcDataFactory = null;
        }
    }
}
