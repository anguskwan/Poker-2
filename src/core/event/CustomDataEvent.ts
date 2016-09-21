class CustomDataEvent extends egret.Event {
    public data: Object;
    
    public constructor(type: string, obj: Object = null){
        super(type);
        this.data = obj;
    }
}
