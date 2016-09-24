class MySocket extends egret.EventDispatcher{
	private webSocket: egret.WebSocket;
	private socketPacket_arr: egret.ByteArray;
	private socketPacketLength: number = 0;
	private socketPacketBody_arr: egret.ByteArray;
	private readSocketPacket_arr: egret.ByteArray;
	private recvSocketByteArray:egret.ByteArray;
	private socketReadPosition:number=0;
	private readSocketBodyPosition:number=0;
	private readSocketLengthAlready:number=0;
	private socketBodyLength:number=0;
	private enCode:number=0;

	private socketStatus:String = "SOCKET_REQUEST";
	private SOCKET_REQUEST:String = "SOCKET_REQUEST";
	private SOCKET_HEADER:String = "SOCKET_HEADER";
	private SOCKET_BODY:String = "SOCKET_BODY";
	private SOCKET_DONE:String = "SOCKET_DONE";
	private SOCKET_PROCESS:String = "SOCKET_PROCESS";
	private SOCKET_ERROR:String = "SOCKET_ERROR";

	private SOCKET_HEADER_LENGTH: number = 8;
	private SOCKET_BUFFER_LENGTH: number = 1024 * 6;
	private SERVER_VERSIONS: number = 1;
	private SERVER_AUXILIARY_VERSION: number = 19;

	private host: string;
	private port: number;
	public isConnected: boolean = false;

	private sendByteMap_arr: egret.ByteArray = null;//字节映射表
	private recvByteMap_arr: egret.ByteArray = null;

	private intLength: number = 4;
	private shortLength: number = 2;
	private byteLength: number = 1;

	private readFunName: string = "";
	public constructor() {
		super();
		this.socketPacket_arr = new egret.ByteArray();
		this.socketPacketBody_arr = new egret.ByteArray();
		this.readSocketPacket_arr = new egret.ByteArray();
		this.recvSocketByteArray=new egret.ByteArray();
		this.socketPacket_arr.endian = egret.Endian.LITTLE_ENDIAN;
		this.socketPacketBody_arr.endian = egret.Endian.LITTLE_ENDIAN;
		this.readSocketPacket_arr.endian = egret.Endian.LITTLE_ENDIAN;

		this.sendByteMap_arr = new egret.ByteArray();
		this.sendByteMap_arr.endian = egret.Endian.LITTLE_ENDIAN;
		this.recvByteMap_arr = new egret.ByteArray();
		this.recvByteMap_arr.endian = egret.Endian.LITTLE_ENDIAN;
		SocketEncrypt.InitEncrypt(this.sendByteMap_arr, this.recvByteMap_arr);
	}

	public  get byteData():egret.ByteArray {
	    return this.readSocketPacket_arr;
	}

	public close():void{
		this.clearAllEvent();
		if(this.isConnected){
			this.isConnected=false;
			this.webSocket.close();
			this.webSocket=null;
		}
	}
	public writeBegin(cmd:number,cVer:number=0,cSubVer:number=0):void{
		cVer=cVer||this.SERVER_VERSIONS;
		cSubVer=cSubVer||this.SERVER_AUXILIARY_VERSION;
		this.socketPacketLength=0;
		this.socketPacket_arr.position=0;
		this.socketPacket_arr.length=0;
		this.socketPacketBody_arr.position=0;
		this.socketPacketBody_arr.length=0;
		this.socketPacket_arr.writeUTFBytes("LT");
		this.socketPacket_arr.writeShort(cmd);
		this.socketPacket_arr.writeByte(cVer);
		this.socketPacket_arr.writeByte(cSubVer);
	}
	public writeEnd():void{
		this.socketPacket_arr.writeShort(this.socketPacketLength);
		this.socketPacket_arr.writeBytes(this.socketPacketBody_arr,0,this.socketPacketLength)
	}
	public sendcmd():void{
		if(this.isConnected){
			this.webSocket.writeBytes(this.socketPacket_arr,0,this.socketPacketLength+this.SOCKET_HEADER_LENGTH);
			this.webSocket.flush()
		}
	}
	public writeCode(val:number):void{
		this.socketPacket_arr.position=7;
		this.socketPacket_arr.writeByte(val);
	}
	public writeInt(val:number):void{
		this.socketPacketLength+=this.intLength;
		this.socketPacketBody_arr.writeInt(val);
	}
	public writeUint(val:number):void{
		this.socketPacketLength+=this.intLength;
		this.socketPacketBody_arr.writeUnsignedInt(val);
	}
	public writeShort(val:number):void{
		this.socketPacketLength+=this.shortLength;
		this.socketPacketBody_arr.writeShort(val);
	}
	public writeByte(val:number):void{
		this.socketPacketLength+=this.byteLength;
		this.socketPacketBody_arr.writeByte(val);
	}
	public writeString(val:string):void{
		var stringBody:egret.ByteArray=new egret.ByteArray();
		stringBody.writeUTFBytes(val);
		this.socketPacketBody_arr.writeShort(stringBody.length);
		this.socketPacketLength+=2;
		this.socketPacketBody_arr.writeBytes(stringBody);
		this.socketPacketLength+=stringBody.length;
		stringBody=null;
	}
	public connect(_host: string, _port: number): void {
		this.host = _host;
		this.port = _port;

		if (this.isConnected) this.webSocket.close();              
		this.webSocket = new egret.WebSocket();
		this.webSocket.type=egret.WebSocket.TYPE_BINARY;
		this.webSocket.connect(this.host, this.port);
		this.reset();
		this.webSocket.addEventListener(egret.Event.CONNECT, this.socketConnect, this);
	}
	public writeLong(val:number):void{
		this.writeUint(val%Math.pow(2,32));
		this.writeInt(val/Math.pow(2,32));
	}
	//读取头
	private readHeader(len:number):boolean{
		while(this.socketReadPosition<this.SOCKET_HEADER_LENGTH&&this.readSocketLengthAlready<len){
			this.recvSocketByteArray.readBytes(this.readSocketPacket_arr,this.socketReadPosition,1);
			this.socketReadPosition++;
			this.readSocketLengthAlready++;
		}
		if(this.socketReadPosition<this.SOCKET_HEADER_LENGTH){
			return false;
		}
		return true;
	}
	//解析头
	private parseHeaderData():boolean{
		var ic:egret.ByteArray=new egret.ByteArray();
		ic.writeUTFBytes("LT");
		if(this.readSocketPacket_arr[0]!=ic[0]||this.readSocketPacket_arr[1]!=ic[1]){
			ic=null;
			return false;
		}
		ic=null;
		//获取命令号
		var ncmd:number=this.getCMD();
		PokerConfig.traceFun("指令号:"+ncmd);
		if(ncmd<=0||ncmd>=32000){
			return false;
		}
		//获取包体长度
		this.socketBodyLength=this.getBodyLen();
		//获取解析指令
		this.enCode=this.getCode();
		if(this.socketBodyLength>=0&&this.socketBodyLength<(this.SOCKET_BUFFER_LENGTH-this.SOCKET_HEADER_LENGTH)){
			return true;
		}
		return false;
	}
	//解析包体
	private parseBodyData(len:number):boolean{
		//需要读取的数据长度
		var needlength:number=this.socketBodyLength+this.SOCKET_HEADER_LENGTH-this.socketReadPosition;
		//缓冲区剩下的数据长度
		var bufferLength:number=len-this.readSocketLengthAlready;
		if(needlength<=0){
			return true;
		}
		if(bufferLength<=0){
			return false;
		}
		var readLength:number;
		if(bufferLength<needlength){
			readLength=bufferLength;
		}else{
			readLength=needlength;
		}
		//该包已经读取的长度+即将读取的长度,如果大于缓冲长度,继续读取
		if(this.readSocketPacket_arr.length+readLength>this.SOCKET_BUFFER_LENGTH){
			return false
		}
		//读取指定长度
		this.recvSocketByteArray.readBytes(this.readSocketPacket_arr,this.readSocketPacket_arr.position,readLength);
		this.socketReadPosition+=readLength;
		this.readSocketLengthAlready+=readLength;
		//如果已读取位置依然小于包总长度，返回继续读取
		if(this.socketReadPosition<(this.socketBodyLength+this.SOCKET_HEADER_LENGTH)){
			this.readSocketPacket_arr.position=this.socketReadPosition;
			return false;
		}
		return true;
	}
	public getCMD():number{
		this.readSocketPacket_arr.position=2;
		return this.readSocketPacket_arr.readShort();
	}
	public getVersion():number{
		this.readSocketPacket_arr.position=4;
		return this.readSocketPacket_arr.readByte();
	}
	public getSubversion():number{
		this.readSocketPacket_arr.position=5;
		return this.readSocketPacket_arr.readByte();
	}
	public getBodyLen():number{
		this.readSocketPacket_arr.position=6;
		return this.readSocketPacket_arr.readShort();
	}
	public getCode():number{
		this.readSocketPacket_arr.position=7;
		return this.readSocketPacket_arr.readByte();
	}
	public readBegin(funName:string=""):void{
		this.readFunName=funName;
		this.readSocketBodyPosition=this.SOCKET_HEADER_LENGTH;
	}
	public readInt(readVariable:string = ""):number{
		this.readSocketPacket_arr.position=this.readSocketBodyPosition;
		this.readSocketBodyPosition+=this.intLength;
		var num:number=0;
		try{
			num=this.readSocketPacket_arr.readInt();
		}catch(error){
			//deal error 暂时没做
		}
		return num;
	}
	public readUint(readVariable:string = ""):number{
		this.readSocketPacket_arr.position=this.readSocketBodyPosition;
		this.readSocketBodyPosition+=this.intLength;
		var num:number=0;
		try{
			num=this.readSocketPacket_arr.readUnsignedInt();
		}catch(error){
			//deal error 暂时没做
		}
		return num;
	}
	public readShort(readVariable:string = ""):number{
		this.readSocketPacket_arr.position=this.readSocketBodyPosition;
		this.readSocketBodyPosition+=this.shortLength;
		var num:number=0;
		try{
			num=this.readSocketPacket_arr.readShort();
		}catch(error){
			//deal error 暂时没做
		}
		return num;
	}
	public readByte(readVariable:string = ""):number{
		this.readSocketPacket_arr.position=this.readSocketBodyPosition;
		this.readSocketBodyPosition+=this.byteLength;
		var num:number=0;
		try{
			num=this.readSocketPacket_arr.readByte();
		}catch(error){
			//deal error 暂时没做
		}
		return num;
	}
	public readString(readVariable:string=""):string{
		this.readSocketPacket_arr.position=this.readSocketBodyPosition;
		var len:number=0;
		try{
			len=this.readSocketPacket_arr.readShort();
		}catch(error){
			//pass 
		}
		this.readSocketBodyPosition+=2;
		this.readSocketPacket_arr.position=this.readSocketBodyPosition;
		this.readSocketBodyPosition+=len;
		var str:string="";
		try{
			str=this.readSocketPacket_arr.readUTFBytes(len);
		}catch(error){
			//pass
		}
		return str;
	}
	public readStringByLen(len:number,readVariable:string=""):string{
		this.readSocketPacket_arr.position=this.readSocketBodyPosition;
		this.readSocketBodyPosition+=len;
		var str:string="";
		try{
			str=this.readSocketPacket_arr.readUTFBytes(len);
		}catch(error){
			//pass
		}
		return str;
	}
	public readLong(readVariable:string=""):number{
		var little:number=this.readUint(readVariable);
		var big:number=this.readInt(readVariable);
		var longResult:number=big*Math.pow(2,32)+little;
		return longResult;
	}
	private socketConnect(e: egret.Event): void {
		this.isConnected=true;
		this.webSocket.removeEventListener(egret.Event.CONNECT,this.socketConnect,this);
		this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.getSocketData,this);
		this.dispatchEvent(new SocketEvent(SocketEvent.CONNECT));
	}
	private closeConnect(e:egret.Event):void{
		this.isConnected=false;
		this.dispatchEvent(new SocketEvent(SocketEvent.CLOSE));
	}
	private getSocketData(e:egret.ProgressEvent):void{
		this.readSocketLengthAlready=0;
		this.recvSocketByteArray.length=0;
		this.recvSocketByteArray.position=0;
		this.webSocket.readBytes(this.recvSocketByteArray);
		var len:number=this.recvSocketByteArray.bytesAvailable;
		while(this.readSocketLengthAlready<len&&this.socketStatus!=this.SOCKET_ERROR){
			switch(this.socketStatus){
				case this.SOCKET_HEADER:
				case this.SOCKET_REQUEST:
					if(!this.readHeader(len)){
						break;
					}
					if(!this.parseHeaderData()){
						this.socketStatus=this.SOCKET_ERROR;
						break;
					}else{
						this.socketStatus=this.SOCKET_BODY;
					}
				case this.SOCKET_BODY:
					if(this.parseBodyData(len)){
						this.socketStatus=this.SOCKET_DONE;
					}
					break;
				default:
					return;
			}
			if(this.socketStatus==this.SOCKET_ERROR){
				return;
			}
			if(this.socketStatus==this.SOCKET_DONE){
				var eve:SocketEvent=new SocketEvent(SocketEvent.SYNC);
				this.dispatchEvent(eve);
				eve=null;
				this.reset();
			}
		}
	}
	private clearAllEvent():void{
		if(this.webSocket){
			if(this.webSocket.hasEventListener(egret.IOErrorEvent.IO_ERROR)) this.webSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.socketError,this);
			if(this.webSocket.hasEventListener(egret.ProgressEvent.SOCKET_DATA)) this.webSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.getSocketData,this);
			if(this.webSocket.hasEventListener(egret.Event.CONNECT)) this.webSocket.removeEventListener(egret.Event.CONNECT,this.socketConnect,this);
			if(this.webSocket.hasEventListener(egret.Event.CLOSE)) this.webSocket.removeEventListener(egret.Event.CLOSE,this.closeConnect,this);
		}
	}
	private socketError(e:egret.IOErrorEvent):void{
		this.close();
		this.dispatchEvent(new SocketEvent(SocketEvent.ERROR));
	}
	private reset():void{
		this.readSocketPacket_arr.position=0;
		this.readSocketPacket_arr.length=0;
		this.socketReadPosition=0;
		this.socketBodyLength=0;
		this.socketStatus=this.SOCKET_REQUEST;
	}
}