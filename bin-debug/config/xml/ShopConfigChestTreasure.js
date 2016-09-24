/**
 * Created by wwb on 2016/9/19.
 */
var ShopConfigChestTreasure = (function (_super) {
    __extends(ShopConfigChestTreasure, _super);
    function ShopConfigChestTreasure() {
        _super.call(this);
    }
    var d = __define,c=ShopConfigChestTreasure,p=c.prototype;
    d(ShopConfigChestTreasure, "getInstance"
        ,function () {
            if (ShopConfigChestTreasure._instance == null) {
                ShopConfigChestTreasure._instance = new ShopConfigChestTreasure();
            }
            return ShopConfigChestTreasure._instance;
        }
    );
    p.init = function (data) {
        _super.prototype.init.call(this, data);
    };
    return ShopConfigChestTreasure;
}(BaseConfig));
egret.registerClass(ShopConfigChestTreasure,'ShopConfigChestTreasure');
//# sourceMappingURL=ShopConfigChestTreasure.js.map