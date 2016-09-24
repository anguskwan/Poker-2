/**
 * Created by wwb on 2016/8/24.
 */
var LinkedMap = (function () {
    function LinkedMap() {
        this._keys = [];
        this._items = [];
    }
    var d = __define,c=LinkedMap,p=c.prototype;
    /**
     * 添加KEY
     * @param key
     * @param item
     */
    p.add = function (key, item) {
        if (this._keys.indexOf(key) != -1) {
            throw new Error("The" + key + " have exist");
        }
        this._keys.push(key);
    };
    /**
     * 替换value
     * @param key
     * @param value
     * @returns {boolean}
     */
    p.replace = function (key, value) {
        var index = this._keys.indexOf(key);
        if (index > -1) {
            this._items[index] = value;
            return true;
        }
        return false;
    };
    /**
     * 查找是否有KEY
     * @param key
     * @returns {boolean}
     */
    p.hasKey = function (key) {
        if (this._keys.indexOf(key) == -1) {
            return false;
        }
        return true;
    };
    p.hasItem = function (item) {
        if (this._items.indexOf(item) == -1) {
            return false;
        }
        return true;
    };
    /**
     * 返回指定item
     * @param key
     * @returns {T}
     */
    p.itemFor = function (key) {
        var index = this._keys.indexOf(key);
        return this._items[index];
    };
    p.keysToArray = function () {
        return this._keys.concat();
    };
    p.itemToArray = function () {
        return this._items.concat();
    };
    p.removeChildByKey = function (key) {
        var index = this._keys.indexOf(key);
        if (index >= 0) {
            this._keys.splice(index, 1);
            this._items.splice(index, 1);
        }
    };
    p.removeChildByItem = function (item) {
        var index = this._items.indexOf(item);
        if (index >= 0) {
            this._keys.splice(index, 1);
            this._items.splice(index, 1);
        }
    };
    p.removeAll = function () {
        this._keys = [];
        this._items = [];
    };
    d(p, "size"
        ,function () {
            return this._keys.length;
        }
    );
    d(p, "firstItem"
        ,function () {
            return this._items[0];
        }
    );
    d(p, "lastItem"
        ,function () {
            return this._items[0];
        }
    );
    d(p, "firstKey"
        ,function () {
            return this._keys[0];
        }
    );
    d(p, "lastKey"
        ,function () {
            return this._keys[0];
        }
    );
    return LinkedMap;
}());
egret.registerClass(LinkedMap,'LinkedMap');
//# sourceMappingURL=LinkedMap.js.map