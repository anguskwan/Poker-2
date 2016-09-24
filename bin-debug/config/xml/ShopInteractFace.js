/**
 * Created by wwb on 2016/9/19.
 */
var ShopInteractFace = (function (_super) {
    __extends(ShopInteractFace, _super);
    function ShopInteractFace() {
        _super.call(this);
    }
    var d = __define,c=ShopInteractFace,p=c.prototype;
    d(ShopInteractFace, "getInstance"
        ,function () {
            if (ShopInteractFace._instance == null) {
                ShopInteractFace._instance = new ShopInteractFace();
            }
            return ShopInteractFace._instance;
        }
    );
    p.init = function (data) {
        _super.prototype.init.call(this, data);
    };
    return ShopInteractFace;
}(BaseConfig));
egret.registerClass(ShopInteractFace,'ShopInteractFace');
//# sourceMappingURL=ShopInteractFace.js.map