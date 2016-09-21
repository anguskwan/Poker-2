class MySocket extends egret.EventDispatcher{
	private webSocket: egret.WebSocket;
	private socketPacket_arr: egret.ByteArray;
	private socketPacketLength: number = 0;
	private socketPacketBody_arr: egret.ByteArray;
	private readSocketPacket_arr: egret.ByteArray;
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

		this.socketPacket_arr.endian = egret.Endian.LITTLE_ENDIAN;
		this.socketPacketBody_arr.endian = egret.Endian.LITTLE_ENDIAN;
		this.readSocketPacket_arr.endian = egret.Endian.LITTLE_ENDIAN;

		this.sendByteMap_arr = new egret.ByteArray();
		this.sendByteMap_arr.endian = egret.Endian.LITTLE_ENDIAN;
		this.recvByteMap_arr = new egret.ByteArray();
		this.recvByteMap_arr.endian = egret.Endian.LITTLE_ENDIAN;
		SocketEncrypt.InitEncrypt(this.sendByteMap_arr, this.recvByteMap_arr);
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
	public wirteEnd():void{
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
	private socketConnect(e: egret.Event): void {
		this.isConnected=true;
		this.webSocket.removeEventListener(egret.Event.CONNECT,this.socketConnect,this);
		this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.getSocketData,this);
		this.dispatchEvent(new SocketEvent(SocketEvent.CONNECT));
	}
	private getSocketData(e:egret.ProgressEvent):void{
		console.log("on receive message")
	}
	private reset():void{
		this.readSocketPacket_arr.position=0;
		this.readSocketPacket_arr.length=0;
	}
}