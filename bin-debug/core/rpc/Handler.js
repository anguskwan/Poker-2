/**
 * Created by wwb on 2016/8/24.
 */
var Handler = (function (_super) {
    __extends(Handler, _super);
    function Handler(reference, method, arguement) {
        if (arguement === void 0) { arguement = null; }
        _super.call(this);
        this._reference = reference;
        this._method = method;
        this._arguement = arguement;
    }
    var d = __define,c=Handler,p=c.prototype;
    p.dispatch = function (param) {
        if (param === void 0) { param = null; }
        if (this._method != null) {
            this._method.apply(this._reference, [this._arguement, param]);
        }
    };
    d(p, "reference"
        ,function () {
            return this.reference;
        }
    );
    d(p, "method"
        ,function () {
            return this._method;
        }
    );
    d(p, "arguement"
        ,function () {
            return this._arguement;
        }
    );
    p.dispose = function () {
        this._method = null;
        this._reference = null;
        this._arguement = null;
    };
    return Handler;
}(egret.HashObject));
egret.registerClass(Handler,'Handler');
//# sourceMappingURL=Handler.js.map