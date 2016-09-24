/**
 * Created by wwb on 2016/9/19.
 */
class ShopVipCard extends BaseConfig{
    private static _instance:ShopVipCard;
    constructor(){
        super();
    }

    public static get getInstance():ShopVipCard{
        if(ShopVipCard._instance==null){
            ShopVipCard._instance = new ShopVipCard();
        }
        return ShopVipCard._instance;
    }


    public init(data:string):void{
        super.init(data); 
    }
}
