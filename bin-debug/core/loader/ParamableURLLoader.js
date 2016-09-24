/**
 * Created by wwb on 2016/9/13.
 */
var ParamableURLLoader = (function (_super) {
    __extends(ParamableURLLoader, _super);
    function ParamableURLLoader(param) {
        if (param === void 0) { param = null; }
        _super.call(this);
        this._parameter = param;
    }
    var d = __define,c=ParamableURLLoader,p=c.prototype;
    d(p, "parameter"
        ,function () {
            return this._parameter;
        }
    );
    return ParamableURLLoader;
}(egret.URLLoader));
egret.registerClass(ParamableURLLoader,'ParamableURLLoader');
//# sourceMappingURL=ParamableURLLoader.js.map