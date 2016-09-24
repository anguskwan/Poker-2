/**
 * Created by wwb on 2016/9/2.
 */
class CustomDataEvent extends egret.Event {
    public data: Object;
    
    public constructor(type: string, obj: Object = null){
        super(type);
        this.data = obj;
    }
}
