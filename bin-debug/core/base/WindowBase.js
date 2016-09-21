/**
 * 窗口视图基类
 */
var WindowBase = (function (_super) {
    __extends(WindowBase, _super);
    function WindowBase() {
        _super.call(this);
        this._dragAble = false;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }
    var d = __define,c=WindowBase,p=c.prototype;
    p.draw = function () {
        //todo
    };
    d(p, "dragAble",undefined
        ,function (drag) {
            this._dragAble = drag;
            this._dragMc = this.getDragMc();
            if (this._dragMc == null)
                return;
            if (this._dragAble) {
                this._dragMc.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                if (this.stage != null) {
                    this.getDragRect();
                }
            }
            else {
                this._dragMc.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                this.removeDragListener();
            }
        }
    );
    p.getDragMc = function () {
        return null;
    };
    /**
     * 关闭界面
     */
    p.tryToClose = function () {
        this.dispatchEvent(new egret.Event(MyWindowEvent.TRY_TO_CLOSE));
        this.close();
    };
    p.close = function () {
        if (this.parent != null)
            this.parent.removeChild(this);
        this.dispatchEvent(new egret.Event(MyWindowEvent.TRY_TO_CLOSE));
    };
    p.show = function () {
        this.visible = true;
        this.bringToFront();
    };
    p.bringToFront = function () {
        this.dispatchEvent(new egret.Event(MyWindowEvent.BRING_TO_FRONT));
    };
    p.bringToBack = function () {
        this.dispatchEvent(new egret.Event(MyWindowEvent.BRING_TO_BACK));
    };
    p.setCenterDisplay = function (data) {
        this._centerDisplay = data;
    };
    p.getCenterDisplay = function () {
        return this._centerDisplay;
    };
    p.setModeAlpha = function (data) {
        this._modeAlpha = data;
    };
    p.getModeAlpha = function () {
        return this._modeAlpha;
    };
    p.setName = function (content) {
    };
    p.getName = function () {
        return "";
    };
    p.onTouchTap = function (evt) {
        this.bringToFront();
    };
    p.onAddToStage = function (evt) {
        this._stage = this.stage;
        this.getDragRect();
    };
    p.onRemoveFromStage = function (evt) {
        this.removeDragListener();
    };
    p.onTouchBegin = function (evt) {
        this._offestMouse = new egret.Point(this.x - evt.stageX, this.y - evt.stageY);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    p.onTouchMove = function (evt) {
        var _x = evt.stageX + this._offestMouse.x;
        var _y = evt.stageY + this._offestMouse.y;
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
    };
    p.onTouchEnd = function (evt) {
        this.removeDragListener();
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    p.getDragRect = function () {
        if (this._dragMc == null)
            return;
        if (this.stage == null) {
            return;
        }
        var rect = this._dragMc.getBounds();
        this._dragRect = new egret.Rectangle();
        this._dragRect.right = this.stage.stageWidth - rect.left - 10;
        this._dragRect.bottom = this.stage.stageHeight - rect.top - 10;
        this._dragRect.left = -rect.right + 10;
        this._dragRect.top = -rect.bottom + 10;
    };
    p.removeDragListener = function () {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    return WindowBase;
}(UIBase));
egret.registerClass(WindowBase,'WindowBase',["IWindow","egret.IEventDispatcher"]);
//# sourceMappingURL=WindowBase.js.map