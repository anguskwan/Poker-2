//import ResourceLoader = RES.ResourceLoader;
import DisplayObject = egret.DisplayObject;
import Sprite = egret.Sprite;

declare function loadJavaScript(fileName:string);
/**
 * 模块管理
 */
class ModuleManager implements IModuleManager {
        private _modules: Object;
        private _loadingMark: Object;
        public static LOAD_RES_FROM_JSON: number = 1;
        public static LOAD_RES_FROM_FILE: number = 2;

        public constructor() {
            this._modules = new Object();
            this._loadingMark = new Object();
        }

        /**
         * 打开模块
         */
        private moduleData: Object;
        public startModule(moduleName: string, data: Object = null, loadType: number = 1, resTags: Array<string> = null): void {
            if (!this.inLoad(moduleName)) {
                if (this._modules[moduleName] != null) {
                    (this._modules[moduleName] as BaseModule).startModule(data);
                }
                else {
                    RES.loadConfig(GlobalConfig.RESOURCE_PATH + "module/" + moduleName + "/" +moduleName + ".res.json","resource/");
                    RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, function () {
                        this.loadModuleRes(moduleName, data, this.loadModuleCallBack, loadType, resTags);
                    }, this);
                }
            }
        }
        private loadModuleRes(moduleName: string, data: Object, complete: Function, loadType: number, resTags: Array<string>): void {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, function (evt: RES.ResourceEvent): void {
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
        }

        //全部加载完成
        private loadModuleCallBack(moduleName: string, data: Object): void {
            if (this.inLoad(moduleName))
                return;
            var module: BaseModule;
            this._loadingMark[moduleName] = true;
            moduleName = moduleName.charAt(0).toUpperCase() + moduleName.substr(1, moduleName.length - 1) + "Main";
            var defineModule: any = egret.getDefinitionByName(moduleName);
            module = new defineModule();
            this._modules[moduleName] = module;
            module.setName(moduleName);
            this.addModuleCloseHandler(module);
            module.startModule(data);
            delete this._loadingMark[moduleName];
        }

        private addModuleCloseHandler(module: BaseModule): void {
            module.addEventListener("ModuleClose", this.onModuleClose, this);
        }

        /**
         * 获取模块
         * @param name
         * @returns {any}
         */
        public getModule(name: string): BaseModule {
            return this._modules[name];
        }

        /**
         * 监听模块关闭消息
         * @param evt
         */
        private onModuleClose(evt: CustomEvent): void {
            evt.currentTarget.removeEventListener("ModuleClose", this.onModuleClose);
            var module: BaseModule = <any>evt.currentTarget as BaseModule;
            delete this._modules[module.getName()];
            module = null;
        }

        /**
         * 避免重复加载API
         * @param moduleName
         * @returns {any}
         */
        private inLoad(moduleName: string): boolean {
            return this._loadingMark[moduleName];
        }

        /**
         * 移除模块
         */
        public removeModule(moduleName: string): void {

        }

        public setModuleViewState(type: string, bob: boolean): void {

        }
    }