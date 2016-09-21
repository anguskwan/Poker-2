/**
 * UI基类
 */
class UIBase extends eui.Component {
    protected instanceStyle: Object;
    //protected classShareStyles: Object;
    protected invalidHash: Object;
    protected _width: number;
    protected _height: number;
    protected _enabled: boolean = true;
    constructor() {
        super();
        this.instanceStyle = {};
        //this.classShareStyles = {};
        this.invalidHash = {};
        this.configUI();
        this.invalidateState();
    }

    protected configUI(): void {
        var width: number = super.$getWidth();
        var height: number = super.$getHeight();
        var scale: number = 1.0;
        this.scaleY = 1.0;
        this.scaleX = scale;
        this.setSize(width, height);
        this.resetShape();
    }

    public resetShape(): void {
        if (this.numChildren > 0) {
            this.removeChildAt(0);
        }
    }

    public setSize(width: number, height: number): void {
        if (this._width == width && this._height == height)
            return;
        this._width = width;
        this._height = height;
        this.invalidateState();
    }

    public get enabled(): boolean {
        return this._enabled;
    }

    public set enabled(enable: boolean) {
        if (enable == this._enabled)
            return;
        this._enabled = enable;
        this.$invalidate(true);
    }

    public get displayWidth(): number {
        return super.$getWidth();
    }

    public get displayHeight(): number {
        return super.$getHeight();
    }

    public get width(): number {
        return this._width == 0 ? (this.displayWidth) : (this.width);
    }

    public set width(param: number) {
        if (this._width == param)
            return;
        this.setSize(param, this.height)
    }

    public get height(): number {
        return this._height == 0 ? (this.displayHeight) : (this.height);
    }

    public set height(param: number) {
        if (this._height == param)
            return;
        this.setSize(this.width, param);
    }

    public setStyle(style: string, format: any): void {
        if (this.instanceStyle[style] == format) {
            return;
        }
    }

    protected drawNow(): void {
        this.draw();
    }

    protected draw(): void {
        this.$invalidate();
    }

    protected validate(): void {
        this.invalidHash = {};
    }

    public invalidate(type: string, data: boolean = true): void {
        this.invalidate[type] = true;
        if (data) {
            this.callLater(null);
        }
    }

    protected callLater(fun: Function): void {
        if (this.stage != null) {
            this.stage.addEventListener(egret.Event.RENDER, this.callLaterDispatcher, this);
            this.stage.invalidate();
        } else {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.callLaterDispatcher, this);
        }
    }

    private callLaterDispatcher(evt: egret.Event): void {
        if (evt.type == egret.Event.ADDED_TO_STAGE) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.callLaterDispatcher, this);
            this.stage.addEventListener(egret.Event.RENDER, this.callLaterDispatcher, this);
            this.stage.invalidate();
        }
        evt.target.removeEventListener(egret.Event.RENDER, this.callLaterDispatcher, this);
        this.draw();
    }
}