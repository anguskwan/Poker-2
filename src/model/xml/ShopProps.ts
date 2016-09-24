/**
 * Created by wwb on 2016/9/19.
 */
class ShopProps extends BaseConfig{
    private static _instance:ShopProps;
    constructor(){
        super();
    }

    public static get getInstance():ShopProps{
        if(ShopProps._instance==null){
            ShopProps._instance = new ShopProps();
        }
        return ShopProps._instance;
    }

    public init(data:string):void{
       super.init(data);
    }
}
