/**
 * Created by wwb on 2016/9/19.
 */
class BaseConfig {
    public dataArr: Array<Object>;

    constructor() {

    }

    public init(data: string): void {
        this.dataArr = [];
        var levels: egret.XML = egret.XML.parse(data);
        var length: number = levels.children.length;
        for (var i: number = 0; i < length; i++) {
            var level: egret.XML = <egret.XML><any>levels.children[i];
            var childrenLength: number = level.children.length;
            var obj: Object = new Object();
            for (var j: number = 0; j < childrenLength; j++) {
                var child: egret.XML = <egret.XML><any>level.children[j];
                if (<egret.XMLText><any>child.children[0] != null) {
                    obj[child.localName] = (<egret.XMLText><any>child.children[0]).text;
                }
            }
            this.dataArr.push(obj);
        }
    }
}
