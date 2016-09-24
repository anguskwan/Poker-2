/**
 * Created by wwb on 2016/9/19.
 */
var ShopChest = (function (_super) {
    __extends(ShopChest, _super);
    function ShopChest() {
        _super.call(this);
    }
    var d = __define,c=ShopChest,p=c.prototype;
    d(ShopChest, "getInstance"
        ,function () {
            if (ShopChest._instance == null) {
                ShopChest._instance = new ShopChest();
            }
            return ShopChest._instance;
        }
    );
    p.init = function (data) {
        _super.prototype.init.call(this, data);
    };
    return ShopChest;
}(BaseConfig));
egret.registerClass(ShopChest,'ShopChest');
//# sourceMappingURL=ShopChest.js.map