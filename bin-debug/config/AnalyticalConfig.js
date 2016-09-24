/**
 * Created by wwb on 2016/9/19.
 */
var AnalyticalConfig = (function (_super) {
    __extends(AnalyticalConfig, _super);
    function AnalyticalConfig() {
        _super.call(this);
        this.configs = new Array();
        //GlobalAPI.gameObserver.registerCallBack(MainNote.ANALYTICAL_CONFIG, this.onAnalyitcalConfig);
    }
    var d = __define,c=AnalyticalConfig,p=c.prototype;
    p.onAnalyitcalConfig = function (data) {
        this.configs = [
            { name: FileConfig.LEVEL_DATA, method: LevelData.getInstance.init },
            { name: FileConfig.SHOP_CHEST, method: ShopChest.getInstance.init },
            { name: FileConfig.SHOP_CONFIG_CHEST_TREASURE, method: ShopConfigChestTreasure.getInstance.init },
            { name: FileConfig.SHOP_EXP_CARD, method: ShopExpCard.getInstance.init },
            { name: FileConfig.SHOP_INTERACTFACE, method: ShopInteractFace.getInstance.init },
            { name: FileConfig.SHOP_PROPS, method: ShopProps.getInstance.init },
            { name: FileConfig.SHOP_VIP_CARD, method: ShopVipCard.getInstance.init },
            { name: FileConfig.SHOP_VIP_CARD2, method: ShopVipCard2.getInstance.init },
            { name: FileConfig.SHOP_VIP_EXP_CARD, method: ShopVipExpCard.getInstance.init },
        ];
        var storage = data.storage;
        var length = this.configs.length;
        for (var i = 0; i < length; i++) {
            this.configs[i]["method"](storage.getValue(this.configs[i]["name"]));
        }
    };
    return AnalyticalConfig;
}(Object));
egret.registerClass(AnalyticalConfig,'AnalyticalConfig');
//# sourceMappingURL=AnalyticalConfig.js.map