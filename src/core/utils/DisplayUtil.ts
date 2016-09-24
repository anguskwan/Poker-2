// TypeScript file
class DisplayUtil extends egret.HashObject {
    constructor() {
        super();
    }
    public static centerDisplay(display: egret.DisplayObject, obj: egret.DisplayObject = null, data: boolean = false): void {
        var _width: number;
        var _height: number;
        if (display.stage != null) {
            _width = display.stage.stageWidth;
            _height = display.stage.stageHeight
        }
        else if (obj != null) {
            _width = obj.width;
            _height = obj.height;
        }
        var rect: egret.Rectangle = display.getBounds();
        var dataWidth: number = data ? rect.width : display.width;
        var dataHeight: number = data ? rect.height : display.height;
        display.x = Math.round((_width - dataWidth) / 2);
        display.y = Math.round((_height - dataHeight) / 2);
        if (data) {
            display.x -= rect.left;
            display.y -= rect.top;
        }
    }
}