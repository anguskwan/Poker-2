class SocketUtil
{
	public constructor()
	{
	}

	//拷贝内存
	public static CopyMemory(dst: egret.ByteArray, src: egret.ByteArray, length: number = 0, dst_offset: number = 0, src_offset: number = 0): void
	{
		var old_pos:number = src.position;
		src.position = src_offset;
		src.readBytes(dst,dst_offset,length);
		src.position = old_pos;
	}
		
	//新建数组
	public static  NewArray(length:number,c:any = null):Array<any>
	{
		var result:Array<any> = new Array(length);
		if(c != null)
		{
			for(var i:number = 0; i < length; i ++)
			{
				result[i] = new c;
			}
		}
		return result;
	}
		
	//新建数组且初始化
	public static NewArrayAndSetValue(length:number,v:any = 0):Array<any>
	{
		var result:Array<any> = new Array(length);
		for(var i:number = 0; i < length; i ++)
		{
			result[i] = v;
		}
		return result;
	}
		
	//新建数组通过拷贝
	public static NewArrayByCopy(src:Array<any>,length:number = 0, src_offset:number = 0):Array<any>
	{
		if(src == null || length == 0)
			length = src.length;
		var result:Array<any> = new Array(length);
		for(var i:number = 0; i < length; i ++)
		{
			result[i] = src[src_offset + i];
		}
		
		return result;
	}
		
	//拷贝数组
	public static CopyArray(dst: Array<any>, src: Array<any>, length: number = 0, dst_offset: number = 0, src_offset: number = 0): void
	{
		if(length == 0 && src != null)
			length = src.length;
		for(var i:number = 0; i < length; i ++)
		{
			dst[dst_offset + i] = src[src_offset + i];
		}
	}
		
	//数组元素执行函数
	public static  EachArray(dst:Array<any>,func:Function):void 
	{
		if(dst == null || func == null)
			return;
		for(var i:number = 0; i < dst.length; i ++)
		{
			if(dst[i])
			{
				func(dst[i]);
			}
		}
	}
		
	//拷贝二维数组
	public static CopyTwoDimensionArray(dst: Array<any>, src: Array<any>, length: number = 0, dst_offset: number = 0, src_offset: number = 0): void
	{
		if(src == null)
			return;
		for(var i:number = 0; i < length; i ++)
		{
			dst[dst_offset + i] = src[src_offset + i];
		}
	}
	
	//二维数组元素执行函数
	public static  EachTwoDimensionArray(dst:Array<any>,func:Function):void 
	{
		if(dst == null || func == null)
			return;
		for(var i:number = 0; i < dst.length; i ++)
		{
			if(dst[i])
			{
				for(var k:number = 0; k < dst[i].length; k ++)
				{
					if(dst[i][k])
					{
						func(dst[i][k]);
					}
				}
			}
		}
	}
		
	//设置二维数组元素
	public static  FreeTwoDimensionArray(dst:Array<any>,val:any = null,func:Function = null):void 
	{
		if(dst == null)
			return;
		for(var i:number = 0; i < dst.length; i ++)
		{
			if(dst[i])
			{
				for(var k:number = 0; k < dst[i].length; k ++)
				{
					if(dst[i][k] && func != null)
					{
						func(dst[i][k]);
					}
					dst[i][k] = val;
				}
				dst[i] = null;
			}
		}
	}
		
	//清空数组
	public static  ZeroArray(src:Array<any>,val:any = 0,func:Function=null,length=0):void 
	{
		if(src == null)
			return;
		if(length <= 0)
			length = src.length;
		for(var i:number = 0; i < length; i ++)
		{
			if(func != null && src[i])
			{
				func(src[i]);
			}
			src[i] = val;
		}
	}
		
	//清空二维数组
	public static  ZeroTwoDimensionArray(src:Array<any>,val:any = 0,func:Function=null):void 
	{
		if(src == null)
			return;
		for (var i: number = 0; i < src.length; i++) {
			if (src[i]) {
				var a: Array<any> = src[i];
				if (a) {
					for (var j: number = 0; j < a.length; j++) {
						if (func != null && a[j]) {
							func(a[j]);
						}
						a[j] = val;
					}
				}
			}
		}
	}
		
	//清空三维数组
	public static  ZeroThreeDimensionArray(src:Array<any>,val:any = 0,func:Function=null):void 
	{
		if(src == null)
			return;
		for(var i:number = 0; i < src.length; i ++)
		{
			if(src[i])
			{
				var a:Array<any> = src[i];
				if(a)
				{
					for(var j:number = 0; j < a.length; j ++)
					{
						var a0:Array<any> = a[j];
						if(a0)
						{
							for(var k:number = 0; k < a0.length; k ++)
							{
								if(func != null && a0[k])
								{
									func(a0[k]);
								}
								a0[k] = val;
							}
						}
					}				
				}
			}		
		}
	}
		
	//数组长度
	public static  CountArray(src:Array<any>):number
	{
		if(src == null)
		{
			return 0;
		}
		return src.length;
	}
	
	//拷贝数组
	public static  CloneArray(src:Array<any>, beginIndex:number):Array<any>
	{
		if(src == null)
			return null;
		var result:Array<any> = new Array;
		var n:number = 0;
		for (var i: number = beginIndex; i < src.length; i++)
		{
			result[n] = src[i];
			n++;
		}
		return result;
	}
		
	//移动数组单元
	public static  MoveArray(dst:Array<any>,src:Array<any>,length:number = 0,dst_offset:number = 0, src_offset:number = 0):void 
	{
		for(var i:number = 0; i < length;i++)
		{
			dst[dst_offset + i] = src[src_offset + i];
		}
	}
		
	//移动内存字节流
	public static  MoveMemory(dst:egret.ByteArray,src:egret.ByteArray,length:number = 0,dst_offset: number = 0, src_offset: number = 0): void
	{
		var old_pos:number = src.position;
		src.position = src_offset;
		src.readBytes(dst,dst_offset,length);
		src.position = old_pos;
	}
		
	//设置内存字节流
	public static memset(dst: egret.ByteArray, val: number, size: number, pos: number = 0): void
	{
		var old_pos:number = dst.position;
		dst.position = pos;
		for (var i:number = 0; i < size; i ++) {
			dst.writeByte(val);
		}
		dst.position = old_pos;
	}
		
	//设置内存字节流通过内存字节流
	public static  memsetByByteArray(dst:egret.ByteArray,val:egret.ByteArray,length:number = 0,
							   dst_offset:number = 0, val_offset:number = 0):void {
		var old_pos:number = dst.position;
		dst.position = dst_offset;
		var old_pos1:number = val.position;
		val.position = val_offset;
		
		dst.writeBytes(val,val_offset,length);
		val.position = old_pos1;
		dst.position = old_pos;
	}
		
		//写入文本到内存字节流
		public static  writeStringToByteArray(dst:egret.ByteArray,val:string,length:number):void
		{
			var nValLen:number = val.length;
			dst.writeUTFBytes(val);
			for (var i:number = 0; i < (length - nValLen); i ++) {
				dst.writeByte(0);
			}
		}
		
		//读取文本从内存字节流
		public static  readStringByByteArray(dst:egret.ByteArray,length:number):String
		{
			if(length > (dst.length - dst.position))
				length =  dst.length - dst.position;
			return dst.readUTFBytes(length);
		}
		
		//新建内存字节流
		public static  newLitteEndianByteArray():egret.ByteArray
		{
			var result:egret.ByteArray = new egret.ByteArray;
			result.endian = egret.Endian.LITTLE_ENDIAN;
			return result;
		}
		
		//断言
		public static  ASSERT(b:Boolean):void
		{
			
		}
		
		//获取高字节
		public static  HIBYTE(w:number):number
		{
			return (w & 0x0000ff00) >> 8;
		}
		
		//获取低字节
		public static  LOBYTE(w:number):number
		{
			return (w & 0x000000ff);
		}
		
		//判断大小
		public static  __min(a:any,b:any):any
		{
			return (((a) < (b)) ? (a) : (b));
		}
		
		//判断大小
		public static  __max(a:any,b:any):any
		{
			return (((a) > (b)) ? (a) : (b));
		}
}