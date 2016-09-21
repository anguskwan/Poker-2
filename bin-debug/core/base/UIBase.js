/**
 * UI基类
 */
var UIBase = (function (_super) {
    __extends(UIBase, _super);
    function UIBase() {
        _super.call(this);
        this._enabled = true;
        this.instanceStyle = {};
        //this.classShareStyles = {};
        this.invalidHash = {};
        this.configUI();
        this.invalidateState();
    }
    var d = __define,c=UIBase,p=c.prototype;
    p.configUI = function () {
        var width = _super.prototype.$getWidth.call(this);
        var height = _super.prototype.$getHeight.call(this);
        var scale = 1.0;
        this.scaleY = 1.0;
        this.scaleX = scale;
        this.setSize(width, height);
        this.resetShape();
    };
    p.resetShape = function () {
        if (this.numChildren > 0) {
            this.removeChildAt(0);
        }
    };
    p.setSize = function (width, height) {
        if (this._width == width && this._height == height)
            return;
        this._width = width;
        this._height = height;
        this.invalidateState();
    };
    d(p, "enabled"
        ,function () {
            return this._enabled;
        }
        ,function (enable) {
            if (enable == this._enabled)
                return;
            this._enabled = enable;
            this.$invalidate(true);
        }
    );
    d(p, "displayWidth"
        ,function () {
            return _super.prototype.$getWidth.call(this);
        }
    );
    d(p, "displayHeight"
        ,function () {
            return _super.prototype.$getHeight.call(this);
        }
    );
    d(p, "width"
        ,function () {
            return this._width == 0 ? (this.displayWidth) : (this.width);
        }
        ,function (param) {
            if (this._width == param)
                return;
            this.setSize(param, this.height);
        }
    );
    d(p, "height"
        ,function () {
            return this._height == 0 ? (this.displayHeight) : (this.height);
        }
        ,function (param) {
            if (this._height == param)
                return;
            this.setSize(this.width, param);
        }
    );
    p.setStyle = function (style, format) {
        if (this.instanceStyle[style] == format) {
            return;
        }
    };
    p.drawNow = function () {
        this.draw();
    };
    p.draw = function () {
        this.$invalidate();
    };
    p.validate = function () {
        this.invalidHash = {};
    };
    p.invalidate = function (type, data) {
        if (data === void 0) { data = true; }
        this.invalidate[type] = true;
        if (data) {
            this.callLater(null);
        }
    };
    p.callLater = function (fun) {
        if (this.stage != null) {
            this.stage.addEventListener(egret.Event.RENDER, this.callLaterDispatcher, this);
            this.stage.invalidate();
        }
        else {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.callLaterDispatcher, this);
        }
    };
    p.callLaterDispatcher = function (evt) {
        if (evt.type == egret.Event.ADDED_TO_STAGE) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.callLaterDispatcher, this);
            this.stage.addEventListener(egret.Event.RENDER, this.callLaterDispatcher, this);
            this.stage.invalidate();
        }
        evt.target.removeEventListener(egret.Event.RENDER, this.callLaterDispatcher, this);
        this.draw();
    };
    return UIBase;
}(eui.Component));
egret.registerClass(UIBase,'UIBase');
//# sourceMappingURL=UIBase.js.map