/**
 * Created by wwb on 2016/9/19.
 */
class ShopConfigChestTreasure extends BaseConfig{
    private static _instance:ShopConfigChestTreasure;
    constructor(){
        super();
    }

    public static get getInstance():ShopConfigChestTreasure{
        if(ShopConfigChestTreasure._instance==null){
            ShopConfigChestTreasure._instance = new ShopConfigChestTreasure();
        }
        return ShopConfigChestTreasure._instance;
    }

    public init(data:string):void{
        super.init(data);
    }
}