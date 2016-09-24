/**
 * Created by wwb on 2016/9/12.
 */
class FileConfig {
    public static SHOP_VIP_EXP_CARD: string = "config_vip_experience_card.res";
    public static SHOP_VIP_CARD2: string = "config_vip2.res";
    public static LEVEL_DATA:string="config_level.res";
    public static SHOP_VIP_CARD:string="config_vip.res";
    public static SHOP_EXP_CARD:string="config_expcard.res";
    public static SHOP_PROPS:string="config_props_new.res";
    public static SHOP_INTERACTFACE:string="config_expression.res";
    public static SHOP_CONFIG_CHEST_TREASURE:string="config_chest_treasure.res";
    public static SHOP_CHEST:string="config_chest.res";
    
    //自己伺服器地址，XML配置文件存放伺服器
    private static BASE_PATH: string = "http://local.texas.playshoo.com/";
    //CDN地址，除XML資源以外的其他資源
    private static ASSETS_PATH: string = "http://local.texas.playshoo.com/";
    private static ASSET_BASE_PATH: string = "data/flash/";
    private static GAME_BASE_PATH: string = FileConfig.BASE_PATH + FileConfig.ASSET_BASE_PATH;
    private static GAME_ASSETS_PATH: string = FileConfig.ASSETS_PATH + FileConfig.ASSET_BASE_PATH;
    

    //获取资源真实地址
    /**
     *隊XML文件外，其他資源存放在CDN
     * @param    url
     * @param    type 1 game 2 mudule 3 assets 4 xml 5皮肤 6大老虎机
     * @return
     */
    public static getAssetUrl(url: String, type: number): string {
        var path: string;
        var version: string = "?version=";
        if (type == 1) {
            path = FileConfig.GAME_ASSETS_PATH + "game/" + url;
            version += PokerConfig.versionArray[0];
        }
        else if (type == 2) {
            path = FileConfig.GAME_ASSETS_PATH + "game/" + url;
            version += PokerConfig.versionArray[1];
        }
        else if (type == 3) {
            path = FileConfig.GAME_ASSETS_PATH + "assets/" + url;
            version += PokerConfig.versionArray[2];
        }
        else if (type == 4) {
            path = FileConfig.GAME_BASE_PATH + "assets/config/" + url;
            version += PokerConfig.versionArray[3];
        }
        else if (type == 5) {
            path = FileConfig.GAME_ASSETS_PATH + "game/" + url;
            version += PokerConfig.versionArray[4];
        }
        else if (type == 6) {
            path = FileConfig.GAME_ASSETS_PATH + "game/" + url;
            version += PokerConfig.versionArray[5];
        }
        path = PokerConfig.getInstance().useLocalServer ? path : (path + version);
        return path;
    }

}
