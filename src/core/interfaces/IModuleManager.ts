interface IModuleManager{
    startModule(moduel:string,data:Object):void;
    getModule(moduleName:string):void;
    removeModule(moduleName:string):void;
    setModuleViewState(type:string,bob:boolean):void;
}