/**
 * Created by wwb on 2016/9/12.
 */
var FileConfig = (function () {
    function FileConfig() {
    }
    var d = __define,c=FileConfig,p=c.prototype;
    //获取资源真实地址
    /**
     *隊XML文件外，其他資源存放在CDN
     * @param    url
     * @param    type 1 game 2 mudule 3 assets 4 xml 5皮肤 6大老虎机
     * @return
     */
    FileConfig.getAssetUrl = function (url, type) {
        var path;
        var version = "?version=";
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
    };
    FileConfig.SHOP_VIP_EXP_CARD = "config_vip_experience_card.res";
    FileConfig.SHOP_VIP_CARD2 = "config_vip2.res";
    FileConfig.LEVEL_DATA = "config_level.res";
    FileConfig.SHOP_VIP_CARD = "config_vip.res";
    FileConfig.SHOP_EXP_CARD = "config_expcard.res";
    FileConfig.SHOP_PROPS = "config_props_new.res";
    FileConfig.SHOP_INTERACTFACE = "config_expression.res";
    FileConfig.SHOP_CONFIG_CHEST_TREASURE = "config_chest_treasure.res";
    FileConfig.SHOP_CHEST = "config_chest.res";
    //自己伺服器地址，XML配置文件存放伺服器
    FileConfig.BASE_PATH = "http://local.texas.playshoo.com/";
    //CDN地址，除XML資源以外的其他資源
    FileConfig.ASSETS_PATH = "http://local.texas.playshoo.com/";
    FileConfig.ASSET_BASE_PATH = "data/flash/";
    FileConfig.GAME_BASE_PATH = FileConfig.BASE_PATH + FileConfig.ASSET_BASE_PATH;
    FileConfig.GAME_ASSETS_PATH = FileConfig.ASSETS_PATH + FileConfig.ASSET_BASE_PATH;
    return FileConfig;
}());
egret.registerClass(FileConfig,'FileConfig');
//# sourceMappingURL=FileConfig.js.map