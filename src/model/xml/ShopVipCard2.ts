/**
 * Created by wwb on 2016/9/19.
 */
class ShopVipCard2 extends BaseConfig{
    private static _instance:ShopVipCard2;
    constructor(){
        super();
    }

    public static get getInstance():ShopVipCard2{
        if(ShopVipCard2._instance==null){
            ShopVipCard2._instance = new ShopVipCard2();
        }
        return ShopVipCard2._instance;
    }

    public init(data:string):void{
        super.init(data);
    }
}
