// TypeScript file
class ConfigLoader extends MainLoader {
    public initXmlConfig(): void {
        this.addLoadItem("SHOP_VIP_EXP_CARD", 1, "vip体验卡",ShopVipExpCard.getInstance.init,"20160913");
        this.addLoadItem("SHOP_VIP_CARD2", 1, "新VIP卡配置",ShopVipCard2.getInstance.init,"20160913");
        this.addLoadItem("LEVEL_DATA", 1, "等级经验配置", LevelData.getInstance.init,"20160913");
        this.addLoadItem("SHOP_VIP_CARD", 1, "旧VIP卡配置", ShopVipCard.getInstance.init, "20160913");
        this.addLoadItem("SHOP_EXP_CARD", 1, "EXP配置", ShopExpCard.getInstance.init, "20160913");
        this.addLoadItem("SHOP_PROPS", 1, "vip体验卡", ShopProps.getInstance.init,"20160913");
        this.addLoadItem("SHOP_INTERACTFACE", 1, "互动表情配置", ShopInteractFace.getInstance.init,"20160913");
        this.addLoadItem("SHOP_CONFIG_CHEST_TREASURE", 1, "商店禮包詳細內容配置", ShopConfigChestTreasure.getInstance.init,"20160913");
        this.addLoadItem("SHOP_CHEST", 1, "禮包配置", ShopChest.getInstance.init,"20160913");
    }

    /**
     * 加载配置表
     * @param fileConfigProperty FilesConfig中定义的静态属性名
     * @param type  0:text  1.二进制
     * @param label 文件描述
     * @param version  版本号
     * @param fromServicesConfig 是否从服务端伺服程序配置目录中加载
     */
    protected addLoadItem(fileConfigProperty: string, type: number, label: string, method:Function,version: string, fromServicesConfig: boolean = false): void {
        if (!FileConfig[fileConfigProperty]) {
            throw Error("在FilesConfig中不存在文件定义" + fileConfigProperty);
        }
        //版本號
        // FileConfig[fileConfigProperty] += "?v=" + version;
        this.urlList.push({ url: FileConfig[fileConfigProperty], type: type, name: label ,method:method});
    }

    constructor() {
        super();
    }
}