// TypeScript file
var WindowManager = (function (_super) {
    __extends(WindowManager, _super);
    function WindowManager() {
        _super.apply(this, arguments);
    }
    var d = __define,c=WindowManager,p=c.prototype;
    WindowManager.init = function (container, fun) {
        if (fun === void 0) { fun = null; }
        WindowManager.popupLayer = container;
        if (container.stage != null) {
            this.onPopupLayerAddToStage();
        }
        else {
            container.addEventListener(egret.Event.ADDED_TO_STAGE, this.onPopupLayerAddToStage, this);
        }
        WindowManager.modeBackFun = fun;
    };
    /**
     * 添加窗口
     */
    WindowManager.popupWindow = function (myWindow, centerDisplay, modeState, windowName) {
        if (centerDisplay === void 0) { centerDisplay = true; }
        if (modeState === void 0) { modeState = false; }
        if (windowName === void 0) { windowName = null; }
        var window = myWindow;
        if (myWindow == null)
            return;
        myWindow.setCenterDisplay(centerDisplay);
        if (WindowManager.popupLayer == null) {
            throw new Error(WindowManager.error_no_popupLayer);
        }
        myWindow.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onWindowRemove, this);
        myWindow.addEventListener(MyWindowEvent.BRING_TO_FRONT, this.onRequestToFront, this);
        myWindow.addEventListener(MyWindowEvent.BRING_TO_BACK, this.onRequestToBack, this);
        myWindow.addEventListener(MyWindowEvent.RESIZE, this.onWindowResize, this);
        WindowManager.windowDic[myWindow.getName()] = { mode: modeState, window: myWindow };
        if (windowName) {
            if (WindowManager.windowOfName[windowName]) {
                throw Error("the window has exist,name=" + windowName);
            }
            WindowManager.windowDic[myWindow.getName()]["windowName"] = windowName;
            WindowManager.windowOfName[windowName] = myWindow;
        }
        WindowManager.popupLayer.addChild(window);
        if (window.height > 0) {
            DisplayUtil.centerDisplay(window);
        }
        this.bringToFront(window);
    };
    /**
     * 窗口移动到最前面
     */
    WindowManager.bringToFront = function (display) {
        if (display) {
            if (WindowManager.popupLayer == null) {
                throw new Error(WindowManager.error_no_popupLayer);
            }
            WindowManager.popupLayer.addChild(display);
            this.updateWindowList();
        }
    };
    /**
     * 窗口移动到最后面
     */
    WindowManager.bringToBack = function (display) {
        if (display) {
            if (WindowManager.popupLayer == null) {
                throw new Error(WindowManager.error_no_popupLayer);
            }
            WindowManager.popupLayer.addChildAt(display, 0);
            var _win = display;
            if (WindowManager.windowDic[_win.getName()]["mode"]) {
                this.updateWindowList();
            }
        }
    };
    /**
     * 关闭所有的窗口
     */
    WindowManager.removeAllWindow = function () {
        var modeObj = null;
        for (var str in WindowManager.windowDic) {
            modeObj = WindowManager.windowDic[str];
            if (modeObj["window"] != null) {
                var window = modeObj["window"];
                window.tryToClose();
            }
        }
    };
    WindowManager.getWindowByName = function (name) {
        return WindowManager.windowOfName[name];
    };
    /**
     * 更新窗口列表
     */
    WindowManager.updateWindowList = function () {
        var modeObj = null;
        var display;
        var winArr = [];
        var _modeAlpha;
        for (var str in WindowManager.windowDic) {
            modeObj = WindowManager.windowDic[str];
            display = modeObj["window"];
            if (display != null) {
                winArr.push({ win: display, idx: WindowManager.popupLayer.getChildIndex(display), mode: modeObj["mode"] });
            }
        }
        if (WindowManager.forbid != null && WindowManager.forbid.parent != null) {
            WindowManager.forbid.parent.removeChild(WindowManager.forbid);
        }
        if (winArr.length > 0) {
            winArr.sort(function (a, b) {
                return a["idx"] - b["idx"];
            });
            display = winArr[0]["win"];
            var _win = display;
            _modeAlpha = _win.getModeAlpha;
            if (isNaN(_modeAlpha)) {
                _modeAlpha = 0.5;
            }
            if (winArr[0]["mode"]) {
                WindowManager.forbid = this.getModeBack();
                WindowManager.popupLayer.addChild(display);
                WindowManager.forbid.alpha = _modeAlpha;
                WindowManager.popupLayer.addChildAt(WindowManager.forbid, Math.max(0, WindowManager.popupLayer.getChildIndex(display)));
            }
        }
        else {
            WindowManager.forbid = null;
        }
    };
    d(WindowManager, "haveModeWindow"
        /**
         * 获取模态窗口
         */
        ,function () {
            return WindowManager.forbid != null;
        }
    );
    WindowManager.getModeBack = function () {
        if (WindowManager.forbid == null) {
            WindowManager.forbid = new egret.Sprite();
            WindowManager.forbid.graphics.beginFill(0, 1);
            WindowManager.forbid.graphics.drawRect(0, 0, 100, 100);
            WindowManager.forbid.graphics.endFill();
            WindowManager.forbid.addEventListener(egret.Event.ADDED_TO_STAGE, this.onDrawLayer, this);
        }
        return WindowManager.forbid;
    };
    /**
     * 调用面板到最后面
     */
    WindowManager.onRequestToBack = function (evt) {
        var window = evt.target;
        WindowManager.bringToBack(window);
    };
    /**
     * 调用面板到最前后
     */
    WindowManager.onRequestToFront = function (evt) {
        var window = evt.target;
        WindowManager.bringToFront(window);
    };
    WindowManager.onWindowRemove = function (evt) {
        var window = evt.target;
        if (window != null) {
            window.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onWindowRemove, this);
            window.removeEventListener(MyWindowEvent.BRING_TO_FRONT, this.onRequestToFront, this);
            window.removeEventListener(MyWindowEvent.BRING_TO_BACK, this.onRequestToBack, this);
            window.removeEventListener(MyWindowEvent.RESIZE, this.onWindowResize, this);
            if (WindowManager.windowDic[window.getName()]) {
                delete WindowManager.windowDic[window.getName()];
                delete WindowManager.windowOfName[window.getName()];
            }
        }
        this.updateWindowList();
    };
    WindowManager.onPopupLayerAddToStage = function () {
        WindowManager.popupLayer.stage.addEventListener(egret.Event.RESIZE, this.onDrawLayer, this);
    };
    WindowManager.onDrawLayer = function (evt) {
        if (WindowManager.forbid != null && WindowManager.forbid.parent != null) {
            WindowManager.forbid.graphics.clear();
            WindowManager.forbid.graphics.beginFill(0, 1);
            WindowManager.forbid.graphics.drawRect(0, 0, WindowManager.forbid.stage.stageWidth, WindowManager.forbid.stage.stageHeight);
            WindowManager.forbid.graphics.endFill();
        }
    };
    WindowManager.onWindowResize = function (evt) {
        var display = evt.target;
        var window = display;
        if (window.getCenterDisplay()) {
            DisplayUtil.centerDisplay(display);
        }
    };
    WindowManager.windowDic = {};
    WindowManager.windowOfName = {};
    WindowManager.modeBackFun = null;
    WindowManager.error_no_popupLayer = "init() method must be called first";
    return WindowManager;
}(egret.HashObject));
egret.registerClass(WindowManager,'WindowManager');
//# sourceMappingURL=WindowManager.js.map