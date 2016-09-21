var HashMap = (function () {
    function HashMap() {
        this.content = new Object();
    }
    var d = __define,c=HashMap,p=c.prototype;
    d(p, "length"
        //-------------------公共方法--------------------
        /**
         * 返回长度
         */
        ,function () {
            return this._length;
        }
    );
    /**
     * 返回是否为空
     */
    p.isEmpty = function () {
        return (this._length == 0);
    };
    /**
     * 返回所有键
     */
    p.keys = function () {
        var temp = new Array();
        var index = 0;
        for (var i in this.content) {
            temp[index] = i;
            index++;
        }
        return temp;
    };
    /**
     * 函数执行每一个键
     * @param 函数
     */
    p.eachKey = function (func) {
        for (var i in this.content) {
            func(i);
        }
    };
    /**
     * 函数执行每一个值
     * @param 函数
     */
    p.eachValue = function (func) {
        for (var i in this.content) {
            func(i);
        }
    };
    /**
     * 数组形式返回map内容
     */
    p.values = function () {
        var temp = new Array();
        var index = 0;
        for (var i in this.content) {
            temp[index] = i;
            index++;
        }
        return temp;
    };
    /**
     * 检查是否存在某值
     */
    p.containsValue = function (value) {
        for (var i in this.content) {
            if (i == value) {
                return true;
            }
        }
        return false;
    };
    /**
     * 检查是否存在某键
     */
    p.containsKey = function (key) {
        if (this.content[key] != undefined) {
            return true;
        }
        return false;
    };
    /**
     * 按键返回值
     * 字符键速度最快
     */
    p.get = function (key) {
        var value = this.content[key];
        if (value !== undefined) {
            return value;
        }
        return null;
    };
    /**
     * 获取键值
     */
    p.getValue = function (key) {
        return this.get(key);
    };
    /**
     * 加入元素
     * 新值替换旧值；空则删；返回旧值
     */
    p.put = function (key, value) {
        if (key == null) {
            throw new Error("cannot put a value with undefined or null key!");
        }
        else if (value == null) {
            return this.remove(key);
        }
        else {
            var exist = this.containsKey(key);
            if (!exist) {
                this._length++;
            }
            var oldValue = this.get(key);
            this.content[key] = value;
            return oldValue;
        }
    };
    /**
     * 移除键及内容
     */
    p.remove = function (key) {
        var exist = this.containsKey(key);
        if (!exist) {
            return null;
        }
        var temp = this.content[key];
        this.content[key] = null;
        delete this.content[key];
        this._length--;
        return temp;
    };
    /**
     * 清除所有
     */
    p.clear = function () {
        this._length = 0;
        this.content = new Object();
    };
    /**
     * 克隆
     */
    p.clone = function () {
        var temp = new HashMap();
        for (var i in this.content) {
            temp.put(i, this.content[i]);
        }
        return temp;
    };
    /**
     * 打印字符串形式
     * @return
     */
    p.toString = function () {
        var ks = this.keys();
        var vs = this.values();
        var temp = "HashMap Content:\n";
        for (var i = 0; i < ks.length; i++) {
            temp += ks[i] + " -> " + vs[i] + "\n";
        }
        return temp;
    };
    return HashMap;
}());
egret.registerClass(HashMap,'HashMap');
//# sourceMappingURL=HashMap.js.map