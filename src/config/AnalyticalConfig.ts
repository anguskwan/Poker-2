/**
 * Created by wwb on 2016/9/19.
 */
class AnalyticalConfig extends Object {
    private configs: Array<any>;

    constructor() {
        super();
        this.configs = new Array<any>();
        //GlobalAPI.gameObserver.registerCallBack(MainNote.ANALYTICAL_CONFIG, this.onAnalyitcalConfig);
    }

    public onAnalyitcalConfig(data: AppData): void {
        this.configs=[
            {name:FileConfig.LEVEL_DATA,method:LevelData.getInstance.init},
            {name:FileConfig.SHOP_CHEST,method:ShopChest.getInstance.init},
            {name:FileConfig.SHOP_CONFIG_CHEST_TREASURE,method:ShopConfigChestTreasure.getInstance.init},
            {name:FileConfig.SHOP_EXP_CARD,method:ShopExpCard.getInstance.init},
            {name:FileConfig.SHOP_INTERACTFACE,method:ShopInteractFace.getInstance.init},
            {name:FileConfig.SHOP_PROPS,method:ShopProps.getInstance.init},
            {name:FileConfig.SHOP_VIP_CARD,method:ShopVipCard.getInstance.init},
            {name:FileConfig.SHOP_VIP_CARD2,method:ShopVipCard2.getInstance.init},
            {name:FileConfig.SHOP_VIP_EXP_CARD,method:ShopVipExpCard.getInstance.init},
            ];

        var storage: HashMap = data.storage;
        var length: number = this.configs.length;
        for(var i:number=0;i<length;i++){
            this.configs[i]["method"](storage.getValue(this.configs[i]["name"]));
        }
    }
}
