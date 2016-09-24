/**
 * Created by wwb on 2016/9/18.
 */
class AppData{
    public  loader:egret.DisplayObject;
    public  main:egret.DisplayObject;
    public  storage:HashMap;
    constructor(_loader:egret.DisplayObject,_main:egret.DisplayObject,_storage:HashMap){
        this.loader = _loader;
        this.main = _main;
        this.storage = _storage;
    }
}
