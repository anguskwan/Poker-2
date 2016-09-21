var MySocket = (function (_super) {
    __extends(MySocket, _super);
    function MySocket() {
        _super.call(this);
        this.socketPacketLength = 0;
        this.SOCKET_HEADER_LENGTH = 8;
        this.SOCKET_BUFFER_LENGTH = 1024 * 6;
        this.SERVER_VERSIONS = 1;
        this.SERVER_AUXILIARY_VERSION = 19;
        this.isConnected = false;
        this.sendByteMap_arr = null; //字节映射表
        this.recvByteMap_arr = null;
        this.intLength = 4;
        this.shortLength = 2;
        this.byteLength = 1;
        this.readFunName = "";
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
    var d = __define,c=MySocket,p=c.prototype;
    p.writeBegin = function (cmd, cVer, cSubVer) {
        if (cVer === void 0) { cVer = 0; }
        if (cSubVer === void 0) { cSubVer = 0; }
        cVer = cVer || this.SERVER_VERSIONS;
        cSubVer = cSubVer || this.SERVER_AUXILIARY_VERSION;
        this.socketPacketLength = 0;
        this.socketPacket_arr.position = 0;
        this.socketPacket_arr.length = 0;
        this.socketPacketBody_arr.position = 0;
        this.socketPacketBody_arr.length = 0;
        this.socketPacket_arr.writeUTFBytes("LT");
        this.socketPacket_arr.writeShort(cmd);
        this.socketPacket_arr.writeByte(cVer);
        this.socketPacket_arr.writeByte(cSubVer);
    };
    p.wirteEnd = function () {
        this.socketPacket_arr.writeShort(this.socketPacketLength);
        this.socketPacket_arr.writeBytes(this.socketPacketBody_arr, 0, this.socketPacketLength);
    };
    p.sendcmd = function () {
        if (this.isConnected) {
            this.webSocket.writeBytes(this.socketPacket_arr, 0, this.socketPacketLength + this.SOCKET_HEADER_LENGTH);
            this.webSocket.flush();
        }
    };
    p.writeCode = function (val) {
        this.socketPacket_arr.position = 7;
        this.socketPacket_arr.writeByte(val);
    };
    p.writeInt = function (val) {
        this.socketPacketLength += this.intLength;
        this.socketPacketBody_arr.writeInt(val);
    };
    p.writeUint = function (val) {
        this.socketPacketLength += this.intLength;
        this.socketPacketBody_arr.writeUnsignedInt(val);
    };
    p.writeShort = function (val) {
        this.socketPacketLength += this.shortLength;
        this.socketPacketBody_arr.writeShort(val);
    };
    p.writeByte = function (val) {
        this.socketPacketLength += this.byteLength;
        this.socketPacketBody_arr.writeByte(val);
    };
    p.writeString = function (val) {
        var stringBody = new egret.ByteArray();
        stringBody.writeUTFBytes(val);
        this.socketPacketBody_arr.writeShort(stringBody.length);
        this.socketPacketLength += 2;
        this.socketPacketBody_arr.writeBytes(stringBody);
        this.socketPacketLength += stringBody.length;
        stringBody = null;
    };
    p.connect = function (_host, _port) {
        this.host = _host;
        this.port = _port;
        if (this.isConnected)
            this.webSocket.close();
        this.webSocket = new egret.WebSocket();
        this.webSocket.type = egret.WebSocket.TYPE_BINARY;
        this.webSocket.connect(this.host, this.port);
        this.reset();
        this.webSocket.addEventListener(egret.Event.CONNECT, this.socketConnect, this);
    };
    p.writeLong = function (val) {
        this.writeUint(val % Math.pow(2, 32));
        this.writeInt(val / Math.pow(2, 32));
    };
    p.socketConnect = function (e) {
        this.isConnected = true;
        this.webSocket.removeEventListener(egret.Event.CONNECT, this.socketConnect, this);
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.getSocketData, this);
        this.dispatchEvent(new SocketEvent(SocketEvent.CONNECT));
    };
    p.getSocketData = function (e) {
        console.log("on receive message");
    };
    p.reset = function () {
        this.readSocketPacket_arr.position = 0;
        this.readSocketPacket_arr.length = 0;
    };
    return MySocket;
}(egret.EventDispatcher));
egret.registerClass(MySocket,'MySocket');
//# sourceMappingURL=MySocket.js.map