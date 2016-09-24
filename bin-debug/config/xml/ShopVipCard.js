/**
 * Created by wwb on 2016/9/19.
 */
var ShopVipCard = (function (_super) {
    __extends(ShopVipCard, _super);
    function ShopVipCard() {
        _super.call(this);
    }
    var d = __define,c=ShopVipCard,p=c.prototype;
    d(ShopVipCard, "getInstance"
        ,function () {
            if (ShopVipCard._instance == null) {
                ShopVipCard._instance = new ShopVipCard();
            }
            return ShopVipCard._instance;
        }
    );
    p.init = function (data) {
        _super.prototype.init.call(this, data);
    };
    return ShopVipCard;
}(BaseConfig));
egret.registerClass(ShopVipCard,'ShopVipCard');
//# sourceMappingURL=ShopVipCard.js.map