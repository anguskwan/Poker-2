/**
 * Created by wwb on 2016/9/13.
 */
class ParamableURLLoader extends egret.URLLoader {
    private _parameter: Object;

    constructor(param: Object = null) {
        super();
        this._parameter = param;
    }

    public get parameter():Object{
        return this._parameter;
    }

}
