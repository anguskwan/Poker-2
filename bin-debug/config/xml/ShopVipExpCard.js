/**
 * Created by wwb on 2016/9/19.
 */
var ShopVipExpCard = (function (_super) {
    __extends(ShopVipExpCard, _super);
    function ShopVipExpCard() {
        _super.call(this);
    }
    var d = __define,c=ShopVipExpCard,p=c.prototype;
    d(ShopVipExpCard, "getInstance"
        ,function () {
            if (ShopVipExpCard._instance == null) {
                ShopVipExpCard._instance = new ShopVipExpCard();
            }
            return ShopVipExpCard._instance;
        }
    );
    p.init = function (data) {
        _super.prototype.init.call(this, data);
    };
    return ShopVipExpCard;
}(BaseConfig));
egret.registerClass(ShopVipExpCard,'ShopVipExpCard');
//# sourceMappingURL=ShopVipExpCard.js.map