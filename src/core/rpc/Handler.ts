/**
 * Created by wwb on 2016/8/24.
 */
class Handler extends egret.HashObject {
    private _reference: Object;
    private _method: Function;
    private _arguement: Object;

    constructor(reference: Object, method: Function, arguement: Object = null) {
        super();
        this._reference = reference;
        this._method = method;
        this._arguement = arguement;
    }

    public dispatch(param: Object = null) {
        if (this._method != null) {
            (this._method as Function).apply(this._reference, [this._arguement, param])
        }
    }

    public get reference(): Object {
        return this.reference;
    }

    public get method(): Function {
        return this._method;
    }

    public get arguement(): Object {
        return this._arguement;
    }

    public dispose(): void {
        this._method = null;
        this._reference = null;
        this._arguement = null;
    }
}
