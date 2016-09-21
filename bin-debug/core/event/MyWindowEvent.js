var MyWindowEvent = (function (_super) {
    __extends(MyWindowEvent, _super);
    function MyWindowEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=MyWindowEvent,p=c.prototype;
    MyWindowEvent.BRING_TO_FRONT = "bringToFront";
    MyWindowEvent.BRING_TO_BACK = "bringToBack";
    MyWindowEvent.TRY_TO_CLOSE = "tryToClose";
    MyWindowEvent.CLOSE = "close";
    MyWindowEvent.RESIZE = "resize";
    return MyWindowEvent;
}(egret.Event));
egret.registerClass(MyWindowEvent,'MyWindowEvent');
//# sourceMappingURL=MyWindowEvent.js.map