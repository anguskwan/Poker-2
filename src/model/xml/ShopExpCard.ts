/**
 * Created by wwb on 2016/9/19.
 */
class ShopExpCard extends BaseConfig{
    private static _instance:ShopExpCard;
    constructor(){
        super();
    }

    public static get getInstance():ShopExpCard{
        if(ShopExpCard._instance==null){
            ShopExpCard._instance = new ShopExpCard();
        }
        return ShopExpCard._instance;
    }

    public init(data:string):void{
        super.init(data);
    }
}
