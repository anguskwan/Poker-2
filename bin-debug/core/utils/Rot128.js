/**
 * Created by wwb on 2016/9/12.
 */
var Rot128 = (function () {
    function Rot128() {
        throw new Error("错误,该类不能实例化");
    }
    var d = __define,c=Rot128,p=c.prototype;
    /**
     * 加密
     * @param	source    byteArray数据源
     * @param	maxbytes  byteArray最多前N个字节
     * @return
     */
    Rot128.encrypt = function (source, maxbytes) {
        if (maxbytes === void 0) { maxbytes = -1; }
        //rot128算法交换顺序
        var i = (source.length < maxbytes) ? source.length : maxbytes;
        while (i--) {
            source[i] += 128;
        }
        return source;
    };
    /**
     * 解密
     * @param	source  byteArray数据源
     * @param	maxbytes  byteArray最多前N个字节
     * @return
     */
    Rot128.decrypt = function (source, maxbytes) {
        if (maxbytes === void 0) { maxbytes = -1; }
        var i = (source.length < maxbytes) ? source.length : maxbytes;
        while (i--) {
            source[i] += 128;
        }
        return source;
    };
    return Rot128;
}());
egret.registerClass(Rot128,'Rot128');
//# sourceMappingURL=Rot128.js.map