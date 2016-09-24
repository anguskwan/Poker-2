/**
 * Created by wwb on 2016/9/12.
 */
class Rot128{
    constructor(){
        throw new Error("错误,该类不能实例化");
    }

    /**
     * 加密
     * @param	source    byteArray数据源
     * @param	maxbytes  byteArray最多前N个字节
     * @return
     */
    public static  encrypt(source:egret.ByteArray,maxbytes:number=-1):egret.ByteArray {
    //rot128算法交换顺序
    var i:number =(source.length<maxbytes)?source.length:maxbytes;
    while (i--)
    {
        source[i] += 128;
    }
    return source;
}
    /**
     * 解密
     * @param	source  byteArray数据源
     * @param	maxbytes  byteArray最多前N个字节
     * @return
     */
    public static  decrypt(source:Uint8Array,maxbytes:number=-1):Uint8Array {
    var i:number =(source.length<maxbytes)?source.length:maxbytes;
    while (i--)
    {
        source[i] += 128;
    }
    return source;
}
}
