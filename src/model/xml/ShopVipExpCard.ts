/**
 * Created by wwb on 2016/9/19.
 */
class ShopVipExpCard extends BaseConfig{
    private static _instance:ShopVipExpCard;
    constructor(){
        super();
    }

    public static get getInstance():ShopVipExpCard{
        if(ShopVipExpCard._instance==null){
            ShopVipExpCard._instance = new ShopVipExpCard();
        }
        return ShopVipExpCard._instance;
    }

    public init(data:string):void{
       super.init(data);
    }
}
