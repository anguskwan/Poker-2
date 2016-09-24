/**
 * Created by wwb on 2016/9/19.
 */
var ShopVipCard2 = (function (_super) {
    __extends(ShopVipCard2, _super);
    function ShopVipCard2() {
        _super.call(this);
    }
    var d = __define,c=ShopVipCard2,p=c.prototype;
    d(ShopVipCard2, "getInstance"
        ,function () {
            if (ShopVipCard2._instance == null) {
                ShopVipCard2._instance = new ShopVipCard2();
            }
            return ShopVipCard2._instance;
        }
    );
    p.init = function (data) {
        _super.prototype.init.call(this, data);
    };
    return ShopVipCard2;
}(BaseConfig));
egret.registerClass(ShopVipCard2,'ShopVipCard2');
//# sourceMappingURL=ShopVipCard2.js.map