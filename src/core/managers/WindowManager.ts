class WindowManager extends egret.HashObject {
    static popupLayer: egret.DisplayObjectContainer;
    static forbid: egret.Sprite;
    static windowDic: Object = {};
    static windowOfName: Object = {};
    static modeBackFun: Function = null;
    private static error_no_popupLayer: string = "init() method must be called first";
    public static init(container: egret.DisplayObjectContainer, fun: Function = null): void {
        WindowManager.popupLayer = container;
        if (container.stage != null) {
            this.onPopupLayerAddToStage();
        } else {
            container.addEventListener(egret.Event.ADDED_TO_STAGE, this.onPopupLayerAddToStage, this);
        }
        WindowManager.modeBackFun = fun;
    }

    /**
     * 添加窗口
     */
    public static popupWindow(myWindow: IWindow, centerDisplay: boolean = true, modeState: boolean = false, windowName: string = null): void {
        var window: any = <any>myWindow as egret.DisplayObject;
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
    }

    /**
     * 窗口移动到最前面
     */
    public static bringToFront(display: egret.DisplayObject): void {
        if (display) {
            if (WindowManager.popupLayer == null) {
                throw new Error(WindowManager.error_no_popupLayer);
            }
            WindowManager.popupLayer.addChild(display);
            this.updateWindowList();
        }
    }

    /**
     * 窗口移动到最后面
     */
    public static bringToBack(display: egret.DisplayObject): void {
        if (display) {
            if (WindowManager.popupLayer == null) {
                throw new Error(WindowManager.error_no_popupLayer);
            }
            WindowManager.popupLayer.addChildAt(display, 0);
            var _win: IWindow = <any>display as IWindow;
            if (WindowManager.windowDic[_win.getName()]["mode"]) {
                this.updateWindowList();
            }
        }
    }

    /**
     * 关闭所有的窗口
     */
    public static removeAllWindow(): void {
        var modeObj: Object = null;
        for (var str in WindowManager.windowDic) {
            modeObj = WindowManager.windowDic[str];
            if (modeObj["window"] != null) {
                var window: IWindow = modeObj["window"] as IWindow;
                window.tryToClose();
            }
        }
    }

    public static getWindowByName(name: string): IWindow {
        return WindowManager.windowOfName[name];
    }

    /**
     * 更新窗口列表
     */
    private static updateWindowList(): void {
        var modeObj: Object = null;
        var display: egret.DisplayObject;
        var winArr: Array<Object> = [];
        var _modeAlpha: number;
        for (var str in WindowManager.windowDic) {
            modeObj = WindowManager.windowDic[str];
            display = modeObj["window"];
            if (display != null) {
                winArr.push({ win: display, idx: WindowManager.popupLayer.getChildIndex(display),mode:modeObj["mode"]});
            }
        }
        if (WindowManager.forbid != null && WindowManager.forbid.parent != null) {
            WindowManager.forbid.parent.removeChild(WindowManager.forbid);
        }
        if (winArr.length > 0) {
            winArr.sort(function (a: Object, b: Object): number {
                return a["idx"] - b["idx"];
            });
            display = winArr[0]["win"];
            var _win: any = <any>display as IWindow;
            _modeAlpha = _win.getModeAlpha;
            if (isNaN(_modeAlpha)) {
                _modeAlpha = 0.5;
            }
            if(winArr[0]["mode"]){
               WindowManager.forbid = this.getModeBack();
               WindowManager.popupLayer.addChild(display);
               WindowManager.forbid.alpha = _modeAlpha;
               WindowManager.popupLayer.addChildAt(WindowManager.forbid, Math.max(0, WindowManager.popupLayer.getChildIndex(display)));
            }
        } else {
            WindowManager.forbid = null;
        }
    }

    /**
     * 获取模态窗口
     */
    public static get haveModeWindow(): boolean {
        return WindowManager.forbid != null;
    }

    private static getModeBack(): egret.Sprite {
        if (WindowManager.forbid == null) {
            WindowManager.forbid = new egret.Sprite();
            WindowManager.forbid.graphics.beginFill(0, 1);
            WindowManager.forbid.graphics.drawRect(0, 0, 100, 100);
            WindowManager.forbid.graphics.endFill();   
            WindowManager.forbid.addEventListener(egret.Event.ADDED_TO_STAGE, this.onDrawLayer, this);
        }
        return WindowManager.forbid;
    }

    /**
     * 调用面板到最后面
     */
    private static onRequestToBack(evt: MyWindowEvent): void {
        var window: egret.DisplayObject = evt.target as egret.DisplayObject;
        WindowManager.bringToBack(window);
    }

    /**
     * 调用面板到最前后
     */
    private static onRequestToFront(evt: MyWindowEvent): void {
        var window: egret.DisplayObject = evt.target as egret.DisplayObject;
        WindowManager.bringToFront(window);
    }

    private static onWindowRemove(evt: egret.Event): void {
        var window: IWindow = evt.target as IWindow;
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
    }

    private static onPopupLayerAddToStage(): void {
        WindowManager.popupLayer.stage.addEventListener(egret.Event.RESIZE, this.onDrawLayer, this);
    }

    private static onDrawLayer(evt: egret.Event): void {
        if (WindowManager.forbid!=null&&WindowManager.forbid.parent != null) {
            WindowManager.forbid.graphics.clear();
            WindowManager.forbid.graphics.beginFill(0, 1);
            WindowManager.forbid.graphics.drawRect(0,0,WindowManager.forbid.stage.stageWidth,WindowManager.forbid.stage.stageHeight);
            WindowManager.forbid.graphics.endFill();
        }
    }

    private static onWindowResize(evt: MyWindowEvent): void {
        var display: egret.DisplayObject = evt.target as egret.DisplayObject;
        var window: IWindow = <any>display as IWindow;
        if (window.getCenterDisplay()) {
            DisplayUtil.centerDisplay(display);
        }
    }
}
