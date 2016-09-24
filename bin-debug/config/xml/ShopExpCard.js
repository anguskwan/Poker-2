/**
 * Created by wwb on 2016/9/19.
 */
var ShopExpCard = (function (_super) {
    __extends(ShopExpCard, _super);
    function ShopExpCard() {
        _super.call(this);
    }
    var d = __define,c=ShopExpCard,p=c.prototype;
    d(ShopExpCard, "getInstance"
        ,function () {
            if (ShopExpCard._instance == null) {
                ShopExpCard._instance = new ShopExpCard();
            }
            return ShopExpCard._instance;
        }
    );
    p.init = function (data) {
        _super.prototype.init.call(this, data);
    };
    return ShopExpCard;
}(BaseConfig));
egret.registerClass(ShopExpCard,'ShopExpCard');
//# sourceMappingURL=ShopExpCard.js.map