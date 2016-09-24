//import ResourceLoader = RES.ResourceLoader;
var DisplayObject = egret.DisplayObject;
var Sprite = egret.Sprite;
/**
 * 模块管理
 */
var ModuleManager = (function () {
    function ModuleManager() {
        this._modules = new Object();
        this._loadingMark = new Object();
    }
    var d = __define,c=ModuleManager,p=c.prototype;
    p.startModule = function (moduleName, data, loadType, resTags) {
        if (data === void 0) { data = null; }
        if (loadType === void 0) { loadType = 1; }
        if (resTags === void 0) { resTags = null; }
        if (!this.inLoad(moduleName)) {
            if (this._modules[moduleName] != null) {
                this._modules[moduleName].startModule(data);
            }
            else {
                RES.loadConfig(GlobalConfig.RESOURCE_PATH + "module/" + moduleName + "/" + moduleName + ".res.json", "resource/");
                RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, function () {
                    this.loadModuleRes(moduleName, data, this.loadModuleCallBack, loadType, resTags);
                }, this);
            }
        }
    };
    p.loadModuleRes = function (moduleName, data, complete, loadType, resTags) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, function (evt) {
            complete.apply(this, [moduleName, data]);
        }, this);
        switch (loadType) {
            case ModuleManager.LOAD_RES_FROM_JSON:
                RES.loadGroup(moduleName);
                break;
            case ModuleManager.LOAD_RES_FROM_FILE:
                RES.createGroup(moduleName, resTags);
                break;
        }
    };
    //全部加载完成
    p.loadModuleCallBack = function (moduleName, data) {
        if (this.inLoad(moduleName))
            return;
        var module;
        this._loadingMark[moduleName] = true;
        moduleName = moduleName.charAt(0).toUpperCase() + moduleName.substr(1, moduleName.length - 1) + "Main";
        var defineModule = egret.getDefinitionByName(moduleName);
        module = new defineModule();
        this._modules[moduleName] = module;
        module.setName(moduleName);
        this.addModuleCloseHandler(module);
        module.startModule(data);
        delete this._loadingMark[moduleName];
    };
    p.addModuleCloseHandler = function (module) {
        module.addEventListener("ModuleClose", this.onModuleClose, this);
    };
    /**
     * 获取模块
     * @param name
     * @returns {any}
     */
    p.getModule = function (name) {
        return this._modules[name];
    };
    /**
     * 监听模块关闭消息
     * @param evt
     */
    p.onModuleClose = function (evt) {
        evt.currentTarget.removeEventListener("ModuleClose", this.onModuleClose);
        var module = evt.currentTarget;
        delete this._modules[module.getName()];
        module = null;
    };
    /**
     * 避免重复加载API
     * @param moduleName
     * @returns {any}
     */
    p.inLoad = function (moduleName) {
        return this._loadingMark[moduleName];
    };
    /**
     * 移除模块
     */
    p.removeModule = function (moduleName) {
    };
    p.setModuleViewState = function (type, bob) {
    };
    ModuleManager.LOAD_RES_FROM_JSON = 1;
    ModuleManager.LOAD_RES_FROM_FILE = 2;
    return ModuleManager;
}());
egret.registerClass(ModuleManager,'ModuleManager',["IModuleManager"]);
//# sourceMappingURL=ModuleManager.js.map