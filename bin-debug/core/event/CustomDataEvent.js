/**
 * Created by wwb on 2016/9/2.
 */
var CustomDataEvent = (function (_super) {
    __extends(CustomDataEvent, _super);
    function CustomDataEvent(type, obj) {
        if (obj === void 0) { obj = null; }
        _super.call(this, type);
        this.data = obj;
    }
    var d = __define,c=CustomDataEvent,p=c.prototype;
    return CustomDataEvent;
}(egret.Event));
egret.registerClass(CustomDataEvent,'CustomDataEvent');
//# sourceMappingURL=CustomDataEvent.js.map