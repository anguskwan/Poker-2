/**
 * Created by wwb on 2016/9/19.
 */
var BaseConfig = (function () {
    function BaseConfig() {
    }
    var d = __define,c=BaseConfig,p=c.prototype;
    p.init = function (data) {
        this.dataArr = [];
        var levels = egret.XML.parse(data);
        var length = levels.children.length;
        for (var i = 0; i < length; i++) {
            var level = levels.children[i];
            var childrenLength = level.children.length;
            var obj = new Object();
            for (var j = 0; j < childrenLength; j++) {
                var child = level.children[j];
                if (child.children[0] != null) {
                    obj[child.localName] = child.children[0].text;
                }
            }
            this.dataArr.push(obj);
        }
    };
    return BaseConfig;
}());
egret.registerClass(BaseConfig,'BaseConfig');
//# sourceMappingURL=BaseConfig.js.map