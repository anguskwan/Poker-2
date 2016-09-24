/**
 * Created by wwb on 2016/9/19.
 */
class ShopInteractFace extends BaseConfig{
    private static _instance:ShopInteractFace;
    constructor(){
        super();
    }

    public static get getInstance():ShopInteractFace{
        if(ShopInteractFace._instance==null){
            ShopInteractFace._instance = new ShopInteractFace();
        }
        return ShopInteractFace._instance;
    }

    public init(data:string):void{
        super.init(data);
    }
}
