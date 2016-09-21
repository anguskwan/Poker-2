var DisplayUtil = (function (_super) {
    __extends(DisplayUtil, _super);
    function DisplayUtil() {
        _super.call(this);
    }
    var d = __define,c=DisplayUtil,p=c.prototype;
    DisplayUtil.centerDisplay = function (display, obj, data) {
        if (obj === void 0) { obj = null; }
        if (data === void 0) { data = false; }
        var _width;
        var _height;
        if (display.stage != null) {
            _width = display.stage.stageWidth;
            _height = display.stage.stageHeight;
        }
        else if (obj != null) {
            _width = obj.width;
            _height = obj.height;
        }
        var rect = display.getBounds();
        var dataWidth = data ? rect.width : display.width;
        var dataHeight = data ? rect.height : display.height;
        display.x = Math.round((_width - dataWidth) / 2);
        display.y = Math.round((_height - dataHeight) / 2);
        if (data) {
            display.x -= rect.left;
            display.y -= rect.top;
        }
    };
    return DisplayUtil;
}(egret.HashObject));
egret.registerClass(DisplayUtil,'DisplayUtil');
//# sourceMappingURL=DisplayUtil.js.map