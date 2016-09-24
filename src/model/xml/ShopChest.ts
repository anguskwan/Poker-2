/**
 * Created by wwb on 2016/9/19.
 */
class ShopChest extends BaseConfig{
    private static _instance:ShopChest;
    constructor(){
       super();
    }

    public static get getInstance():ShopChest{
        if(ShopChest._instance==null){
            ShopChest._instance = new ShopChest();
        }
        return ShopChest._instance;
    }

    public  init(data:string):void{
       super.init(data);
    }
}