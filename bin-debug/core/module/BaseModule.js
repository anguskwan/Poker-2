/**
 * 模块基类
 */
var BaseModule = (function (_super) {
    __extends(BaseModule, _super);
    function BaseModule() {
        _super.call(this);
        this._disposeDic = [];
    }
    var d = __define,c=BaseModule,p=c.prototype;
    /**
     * 销毁模块
     */
    p.dispose = function () {
        this.dispatchEvent(new CustomDataEvent("ModuleClose"));
    };
    /**
     * 开启模块
     */
    p.startModule = function (data) {
        this.initData(data);
    };
    /**
     * 设置模块名字
     */
    p.setName = function (param) {
        this.moudleName = param;
    };
    /**
     * 获取模块名字
     */
    p.getName = function () {
        return this.moudleName;
    };
    /**
     * 添加显示对象
     * @param obj
     * @param isMode
     * @param contain
     * @param isNeedShow
     */
    p.addDisplayObj = function (obj, isMode, contain, isNeedShow) {
        if (isMode === void 0) { isMode = true; }
        if (contain === void 0) { contain = null; }
        if (isNeedShow === void 0) { isNeedShow = true; }
        this._disposeDic.push({ dis: obj, mode: isMode });
        var window = obj;
        if (window != null) {
            window.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }
        if (!isNeedShow)
            return;
        if (contain != null) {
            contain.addChild(obj);
        }
        else {
            WindowManager.popupWindow(window, true, isMode);
        }
    };
    /**
     * 初始化数据
     */
    p.initData = function (data) {
    };
    p.onRemoveFromStage = function (evt) {
        var objArr = [];
        var length = this._disposeDic.length;
        for (var i = 0; i < length; i++) {
            var obj = objArr[i];
            if (evt.currentTarget != obj) {
                objArr.push(obj);
            }
        }
        this._disposeDic = objArr;
        objArr = null;
        if (this._disposeDic.length == 0) {
            this.dispose();
        }
    };
    return BaseModule;
}(egret.EventDispatcher));
egret.registerClass(BaseModule,'BaseModule',["IModule"]);
//# sourceMappingURL=BaseModule.js.map