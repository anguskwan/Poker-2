var SocketUtil = (function () {
    function SocketUtil() {
    }
    var d = __define,c=SocketUtil,p=c.prototype;
    //拷贝内存
    SocketUtil.CopyMemory = function (dst, src, length, dst_offset, src_offset) {
        if (length === void 0) { length = 0; }
        if (dst_offset === void 0) { dst_offset = 0; }
        if (src_offset === void 0) { src_offset = 0; }
        var old_pos = src.position;
        src.position = src_offset;
        src.readBytes(dst, dst_offset, length);
        src.position = old_pos;
    };
    //新建数组
    SocketUtil.NewArray = function (length, c) {
        if (c === void 0) { c = null; }
        var result = new Array(length);
        if (c != null) {
            for (var i = 0; i < length; i++) {
                result[i] = new c;
            }
        }
        return result;
    };
    //新建数组且初始化
    SocketUtil.NewArrayAndSetValue = function (length, v) {
        if (v === void 0) { v = 0; }
        var result = new Array(length);
        for (var i = 0; i < length; i++) {
            result[i] = v;
        }
        return result;
    };
    //新建数组通过拷贝
    SocketUtil.NewArrayByCopy = function (src, length, src_offset) {
        if (length === void 0) { length = 0; }
        if (src_offset === void 0) { src_offset = 0; }
        if (src == null || length == 0)
            length = src.length;
        var result = new Array(length);
        for (var i = 0; i < length; i++) {
            result[i] = src[src_offset + i];
        }
        return result;
    };
    //拷贝数组
    SocketUtil.CopyArray = function (dst, src, length, dst_offset, src_offset) {
        if (length === void 0) { length = 0; }
        if (dst_offset === void 0) { dst_offset = 0; }
        if (src_offset === void 0) { src_offset = 0; }
        if (length == 0 && src != null)
            length = src.length;
        for (var i = 0; i < length; i++) {
            dst[dst_offset + i] = src[src_offset + i];
        }
    };
    //数组元素执行函数
    SocketUtil.EachArray = function (dst, func) {
        if (dst == null || func == null)
            return;
        for (var i = 0; i < dst.length; i++) {
            if (dst[i]) {
                func(dst[i]);
            }
        }
    };
    //拷贝二维数组
    SocketUtil.CopyTwoDimensionArray = function (dst, src, length, dst_offset, src_offset) {
        if (length === void 0) { length = 0; }
        if (dst_offset === void 0) { dst_offset = 0; }
        if (src_offset === void 0) { src_offset = 0; }
        if (src == null)
            return;
        for (var i = 0; i < length; i++) {
            dst[dst_offset + i] = src[src_offset + i];
        }
    };
    //二维数组元素执行函数
    SocketUtil.EachTwoDimensionArray = function (dst, func) {
        if (dst == null || func == null)
            return;
        for (var i = 0; i < dst.length; i++) {
            if (dst[i]) {
                for (var k = 0; k < dst[i].length; k++) {
                    if (dst[i][k]) {
                        func(dst[i][k]);
                    }
                }
            }
        }
    };
    //设置二维数组元素
    SocketUtil.FreeTwoDimensionArray = function (dst, val, func) {
        if (val === void 0) { val = null; }
        if (func === void 0) { func = null; }
        if (dst == null)
            return;
        for (var i = 0; i < dst.length; i++) {
            if (dst[i]) {
                for (var k = 0; k < dst[i].length; k++) {
                    if (dst[i][k] && func != null) {
                        func(dst[i][k]);
                    }
                    dst[i][k] = val;
                }
                dst[i] = null;
            }
        }
    };
    //清空数组
    SocketUtil.ZeroArray = function (src, val, func, length) {
        if (val === void 0) { val = 0; }
        if (func === void 0) { func = null; }
        if (length === void 0) { length = 0; }
        if (src == null)
            return;
        if (length <= 0)
            length = src.length;
        for (var i = 0; i < length; i++) {
            if (func != null && src[i]) {
                func(src[i]);
            }
            src[i] = val;
        }
    };
    //清空二维数组
    SocketUtil.ZeroTwoDimensionArray = function (src, val, func) {
        if (val === void 0) { val = 0; }
        if (func === void 0) { func = null; }
        if (src == null)
            return;
        for (var i = 0; i < src.length; i++) {
            if (src[i]) {
                var a = src[i];
                if (a) {
                    for (var j = 0; j < a.length; j++) {
                        if (func != null && a[j]) {
                            func(a[j]);
                        }
                        a[j] = val;
                    }
                }
            }
        }
    };
    //清空三维数组
    SocketUtil.ZeroThreeDimensionArray = function (src, val, func) {
        if (val === void 0) { val = 0; }
        if (func === void 0) { func = null; }
        if (src == null)
            return;
        for (var i = 0; i < src.length; i++) {
            if (src[i]) {
                var a = src[i];
                if (a) {
                    for (var j = 0; j < a.length; j++) {
                        var a0 = a[j];
                        if (a0) {
                            for (var k = 0; k < a0.length; k++) {
                                if (func != null && a0[k]) {
                                    func(a0[k]);
                                }
                                a0[k] = val;
                            }
                        }
                    }
                }
            }
        }
    };
    //数组长度
    SocketUtil.CountArray = function (src) {
        if (src == null) {
            return 0;
        }
        return src.length;
    };
    //拷贝数组
    SocketUtil.CloneArray = function (src, beginIndex) {
        if (src == null)
            return null;
        var result = new Array;
        var n = 0;
        for (var i = beginIndex; i < src.length; i++) {
            result[n] = src[i];
            n++;
        }
        return result;
    };
    //移动数组单元
    SocketUtil.MoveArray = function (dst, src, length, dst_offset, src_offset) {
        if (length === void 0) { length = 0; }
        if (dst_offset === void 0) { dst_offset = 0; }
        if (src_offset === void 0) { src_offset = 0; }
        for (var i = 0; i < length; i++) {
            dst[dst_offset + i] = src[src_offset + i];
        }
    };
    //移动内存字节流
    SocketUtil.MoveMemory = function (dst, src, length, dst_offset, src_offset) {
        if (length === void 0) { length = 0; }
        if (dst_offset === void 0) { dst_offset = 0; }
        if (src_offset === void 0) { src_offset = 0; }
        var old_pos = src.position;
        src.position = src_offset;
        src.readBytes(dst, dst_offset, length);
        src.position = old_pos;
    };
    //设置内存字节流
    SocketUtil.memset = function (dst, val, size, pos) {
        if (pos === void 0) { pos = 0; }
        var old_pos = dst.position;
        dst.position = pos;
        for (var i = 0; i < size; i++) {
            dst.writeByte(val);
        }
        dst.position = old_pos;
    };
    //设置内存字节流通过内存字节流
    SocketUtil.memsetByByteArray = function (dst, val, length, dst_offset, val_offset) {
        if (length === void 0) { length = 0; }
        if (dst_offset === void 0) { dst_offset = 0; }
        if (val_offset === void 0) { val_offset = 0; }
        var old_pos = dst.position;
        dst.position = dst_offset;
        var old_pos1 = val.position;
        val.position = val_offset;
        dst.writeBytes(val, val_offset, length);
        val.position = old_pos1;
        dst.position = old_pos;
    };
    //写入文本到内存字节流
    SocketUtil.writeStringToByteArray = function (dst, val, length) {
        var nValLen = val.length;
        dst.writeUTFBytes(val);
        for (var i = 0; i < (length - nValLen); i++) {
            dst.writeByte(0);
        }
    };
    //读取文本从内存字节流
    SocketUtil.readStringByByteArray = function (dst, length) {
        if (length > (dst.length - dst.position))
            length = dst.length - dst.position;
        return dst.readUTFBytes(length);
    };
    //新建内存字节流
    SocketUtil.newLitteEndianByteArray = function () {
        var result = new egret.ByteArray;
        result.endian = egret.Endian.LITTLE_ENDIAN;
        return result;
    };
    //断言
    SocketUtil.ASSERT = function (b) {
    };
    //获取高字节
    SocketUtil.HIBYTE = function (w) {
        return (w & 0x0000ff00) >> 8;
    };
    //获取低字节
    SocketUtil.LOBYTE = function (w) {
        return (w & 0x000000ff);
    };
    //判断大小
    SocketUtil.__min = function (a, b) {
        return (((a) < (b)) ? (a) : (b));
    };
    //判断大小
    SocketUtil.__max = function (a, b) {
        return (((a) > (b)) ? (a) : (b));
    };
    return SocketUtil;
}());
egret.registerClass(SocketUtil,'SocketUtil');
//# sourceMappingURL=SocketUtil.js.map