// TypeScript file
class HashMap {

    private _length:number;
    private content:Object;
    constructor() {
       this.content = new Object();
    }

    //-------------------公共方法--------------------

 	/**
  	 * 返回长度
  	 */
 	public  get length():number{
  		return this._length;
 	}

 	/**
  	 * 返回是否为空
  	 */
 	public  isEmpty():Boolean{
  		return (this._length==0);
 	}

 	/**
  	 * 返回所有键
  	 */
 	public  keys():Array<any>{
  		var temp:Array<any> = new Array<any>();
  		var index:number = 0;
  		for(var i in this.content){
   			temp[index] = i;
   			index ++;
  		}
  		return temp;
 	}
 	
 	/**
 	 * 函数执行每一个键
 	 * @param 函数
 	 */
 	public  eachKey(func:Function):void{
  		for(var i in this.content){
  			func(i);
  		}
 	}
 	
 	/**
 	 * 函数执行每一个值
 	 * @param 函数
 	 */ 	
 	public  eachValue(func:Function):void{
  		for(var i in this.content){
  			func(i);
  		}
 	}
 	
 	/**
  	 * 数组形式返回map内容
  	 */
 	public  values():Array<any>{
  		var temp:Array<any> = new Array<any>();
  		var index:number = 0;
  		for(var i in this.content){
   			temp[index] = i;
   			index ++;
  		}
  		return temp;
 	}
 	
 	/**
  	 * 检查是否存在某值
  	 */
 	public  containsValue(value:any):Boolean{
  		for(var i in this.content){
   			if(i == value){
    			return true;
   			}
  		}
 		return false;
 	}

 	/**
  	 * 检查是否存在某键
  	 */
 	public  containsKey(key:any):Boolean{
 		if(this.content[key] != undefined){
 			return true;
 		}
  		return false;
 	}

 	/**
 	 * 按键返回值
	 * 字符键速度最快
 	 */
 	public  get(key:any):any{
 		var value:any = this.content[key];
 		if(value !== undefined){
 			return value;
 		}
  		return null;
 	}
 	
 	/**
 	 * 获取键值
 	 */
 	public  getValue(key:any):any{
 		return this.get(key);
 	}

 	/**
 	 * 加入元素
	 * 新值替换旧值；空则删；返回旧值
  	 */
 	public  put(key:any, value:any):any{
  		if(key == null){
   			throw new Error("cannot put a value with undefined or null key!");
  		}else if(value == null){
  			return this.remove(key);
  		}else{
  			var exist:Boolean = this.containsKey(key);
 			if(!exist){
   				this._length++;
 			}
 			var oldValue:any = this.get(key);
   			this.content[key] = value;
   			return oldValue;
  		}
 	}

 	/**
     * 移除键及内容
  	 */
 	public  remove(key:any):any{
 		var exist:Boolean = this.containsKey(key);
 		if(!exist){
 			return null;
 		}
  		var temp:any = this.content[key];
		this.content[key] = null;
   		delete this.content[key];
   		this._length--;
  		return temp;
 	}
 	
 	/**
 	 * 清除所有
 	 */
 	public  clear():void{
  		this._length = 0;
  		this.content = new Object();
 	}

 	/**
 	 * 克隆
 	 */
 	public  clone():HashMap{
  		var temp:HashMap = new HashMap();
  		for(var i in this.content){
   			temp.put(i, this.content[i]);
  		}
  		return temp;
 	}

	/**
	 * 打印字符串形式
	 * @return
	 */
 	public  toString():string{
  		var ks:Array<any> = this.keys();
  		var vs:Array<any> = this.values();
  		var temp:string = "HashMap Content:\n";
  		for(var i:number=0; i<ks.length; i++){
   			temp += ks[i]+" -> "+vs[i] + "\n";
  		}
  		return temp;
 	}


}