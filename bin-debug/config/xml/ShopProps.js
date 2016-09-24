/**
 * Created by wwb on 2016/9/19.
 */
var ShopProps = (function (_super) {
    __extends(ShopProps, _super);
    function ShopProps() {
        _super.call(this);
    }
    var d = __define,c=ShopProps,p=c.prototype;
    d(ShopProps, "getInstance"
        ,function () {
            if (ShopProps._instance == null) {
                ShopProps._instance = new ShopProps();
            }
            return ShopProps._instance;
        }
    );
    p.init = function (data) {
        _super.prototype.init.call(this, data);
    };
    return ShopProps;
}(BaseConfig));
egret.registerClass(ShopProps,'ShopProps');
//# sourceMappingURL=ShopProps.js.map