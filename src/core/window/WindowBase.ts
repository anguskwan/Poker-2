// TypeScript file
class WindowBase extends UIBase implements IWindow {

    protected _dragAble: boolean = false;
    protected _dragMc: egret.DisplayObject;
    protected _dragRect: egret.Rectangle;
    protected _offestMouse: egret.Point;
    protected _stage: egret.Stage;
    protected _centerDisplay: boolean;
    protected _modeAlpha: number;
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }

    protected draw(): void {
        //todo
    }

    public set dragAble(drag: boolean) {
        this._dragAble = drag;
        this._dragMc = this.getDragMc();
        if (this._dragMc == null)
            return;
        if (this._dragAble) {
            this._dragMc.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            if (this.stage != null) {
                this.getDragRect();
            }
        } else {
            this._dragMc.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.removeDragListener();
        }
    }

    protected getDragMc(): egret.DisplayObject {
        return null;
    }

    /**
     * 关闭界面
     */
    public tryToClose(): void {
        this.dispatchEvent(new egret.Event(MyWindowEvent.TRY_TO_CLOSE));
        this.close();
    }

    public close(): void {
        if (this.parent != null)
            this.parent.removeChild(this);
        this.dispatchEvent(new egret.Event(MyWindowEvent.TRY_TO_CLOSE));
    }

    public show(): void {
        this.visible = true;
        this.bringToFront();
    }

    public bringToFront(): void {
        this.dispatchEvent(new egret.Event(MyWindowEvent.BRING_TO_FRONT));
    }

    public bringToBack():void{
        this.dispatchEvent(new egret.Event(MyWindowEvent.BRING_TO_BACK));
    }

    public setCenterDisplay(data: boolean): void {
        this._centerDisplay = data;
    }

    public getCenterDisplay(): boolean {
        return this._centerDisplay;
    }

    public setModeAlpha(data: number): void {
        this._modeAlpha = data;
    }

    public getModeAlpha(): number {
        return this._modeAlpha;
    }

    public setName(content: string): void {

    }

    public getName(): string {
        return "";
    }

    private onTouchTap(evt: egret.TouchEvent): void {
        this.bringToFront();
    }

    private onAddToStage(evt: egret.Event): void {
        this._stage = this.stage;
        this.getDragRect();
    }

    private onRemoveFromStage(evt: egret.Event): void {
        this.removeDragListener();

    }

    private onTouchBegin(evt: egret.TouchEvent): void {
        this._offestMouse = new egret.Point(this.x - evt.stageX, this.y - evt.stageY);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }

    private onTouchMove(evt: egret.TouchEvent): void {
        var _x: number = evt.stageX + this._offestMouse.x;
        var _y: number = evt.stageY + this._offestMouse.y;
        if (_x > this._dragRect.right) {
            _x = this._dragRect.right;
        }
        else if (_x < this._dragRect.left) {
            _x = this._dragRect.left;
        }
        if (_y > this._dragRect.bottom) {
            _y = this._dragRect.bottom;
        }
        if (_y < this._dragRect.top) {
            _y = this._dragRect.top;
        }
        this.x = _x;
        this.y = _y;
        evt.updateAfterEvent();
    }

    private onTouchEnd(evt: egret.TouchEvent): void {
        this.removeDragListener();
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }

    private getDragRect(): void {
        if (this._dragMc == null)
            return;
        if (this.stage == null) {
            return;
        }
        var rect: egret.Rectangle = this._dragMc.getBounds();
        this._dragRect = new egret.Rectangle();
        this._dragRect.right = this.stage.stageWidth - rect.left - 10;
        this._dragRect.bottom = this.stage.stageHeight - rect.top - 10;
        this._dragRect.left = -rect.right + 10;
        this._dragRect.top = -rect.bottom + 10;
    }

    private removeDragListener(): void {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }


}