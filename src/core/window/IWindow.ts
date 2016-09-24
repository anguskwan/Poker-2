interface IWindow extends egret.IEventDispatcher{
      tryToClose():void;
      close():void;
      show():void;
      bringToFront():void;
      bringToBack():void;
      setCenterDisplay(data:boolean):void;
      getCenterDisplay():boolean;
      setModeAlpha(data:number):void;
      getModeAlpha():number;
      setName(content:string):void;
      getName():string;
}