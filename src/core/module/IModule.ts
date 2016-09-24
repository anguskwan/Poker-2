// TypeScript file
interface IModule {
    getName(): string;
    dispose(): void;
    setName(param: string): void;
    addDisplayObj(obj: DisplayObject, isMode: boolean, contain: egret.Sprite, isNeedShow: boolean): void;
}