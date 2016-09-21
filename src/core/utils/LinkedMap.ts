class LinkedMap<T,V> {
    private _keys: T[];
    private _items: V[];

    public constructor() {
        this._keys = [];
        this._items = [];
    }

    /**
     * 添加KEY
     * @param key
     * @param item
     */
    public  add(key: T, item: V) {
        if(this._keys.indexOf(key)!=-1){
            throw new Error("The"+key+" have exist");
        }
        this._keys.push(key);
    }

    /**
     * 替换value
     * @param key
     * @param value
     * @returns {boolean}
     */
    public replace(key:T,value:V):boolean{
        var index:number = this._keys.indexOf(key);
        if(index>-1){
            this._items[index] = value;
            return true;
        }
        return false;
    }

    /**
     * 查找是否有KEY
     * @param key
     * @returns {boolean}
     */
    public hasKey(key:T):boolean{
        if(this._keys.indexOf(key) == -1){
            return false;
        }
        return true;
    }

    public hasItem(item:V):boolean{
        if(this._items.indexOf(item) == -1){
            return false;
        }
        return true;
    }


    /**
     * 返回指定item
     * @param key
     * @returns {T}
     */
    public itemFor(key:T):V{
        var index:number = this._keys.indexOf(key);
        return this._items[index];
    }

    public keysToArray():T[]{
        return this._keys.concat();
    }

    public itemToArray():V[]{
        return this._items.concat();
    }

    public removeChildByKey(key:T){
        var index:number = this._keys.indexOf(key);
        if(index >=0){
            this._keys.splice(index,1);
            this._items.splice(index,1);
        }
    }

    public removeChildByItem(item:V){
        var index:number = this._items.indexOf(item);
        if(index >= 0){
            this._keys.splice(index,1);
            this._items.splice(index,1);
        }
    }

    public removeAll():void{
        this._keys =[];
        this._items = [];
    }

    public get size():number{
        return this._keys.length;
    }

    public get firstItem():V{
        return this._items[0];
    }

    public get lastItem():V{
        return this._items[0];
    }

    public get firstKey():T{
        return this._keys[0];
    }

    public get lastKey():T{
        return this._keys[0];
    }
}
