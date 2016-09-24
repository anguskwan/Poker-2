var MySocket = (function (_super) {
    __extends(MySocket, _super);
    function MySocket() {
        _super.call(this);
        this.socketPacketLength = 0;
        this.socketReadPosition = 0;
        this.readSocketBodyPosition = 0;
        this.readSocketLengthAlready = 0;
        this.socketBodyLength = 0;
        this.enCode = 0;
        this.socketStatus = "SOCKET_REQUEST";
        this.SOCKET_REQUEST = "SOCKET_REQUEST";
        this.SOCKET_HEADER = "SOCKET_HEADER";
        this.SOCKET_BODY = "SOCKET_BODY";
        this.SOCKET_DONE = "SOCKET_DONE";
        this.SOCKET_PROCESS = "SOCKET_PROCESS";
        this.SOCKET_ERROR = "SOCKET_ERROR";
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
        this.recvSocketByteArray = new egret.ByteArray();
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
    d(p, "byteData"
        ,function () {
            return this.readSocketPacket_arr;
        }
    );
    p.close = function () {
        this.clearAllEvent();
        if (this.isConnected) {
            this.isConnected = false;
            this.webSocket.close();
            this.webSocket = null;
        }
    };
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
    p.writeEnd = function () {
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
    //读取头
    p.readHeader = function (len) {
        while (this.socketReadPosition < this.SOCKET_HEADER_LENGTH && this.readSocketLengthAlready < len) {
            this.recvSocketByteArray.readBytes(this.readSocketPacket_arr, this.socketReadPosition, 1);
            this.socketReadPosition++;
            this.readSocketLengthAlready++;
        }
        if (this.socketReadPosition < this.SOCKET_HEADER_LENGTH) {
            return false;
        }
        return true;
    };
    //解析头
    p.parseHeaderData = function () {
        var ic = new egret.ByteArray();
        ic.writeUTFBytes("LT");
        if (this.readSocketPacket_arr[0] != ic[0] || this.readSocketPacket_arr[1] != ic[1]) {
            ic = null;
            return false;
        }
        ic = null;
        //获取命令号
        var ncmd = this.getCMD();
        PokerConfig.traceFun("指令号:" + ncmd);
        if (ncmd <= 0 || ncmd >= 32000) {
            return false;
        }
        //获取包体长度
        this.socketBodyLength = this.getBodyLen();
        //获取解析指令
        this.enCode = this.getCode();
        if (this.socketBodyLength >= 0 && this.socketBodyLength < (this.SOCKET_BUFFER_LENGTH - this.SOCKET_HEADER_LENGTH)) {
            return true;
        }
        return false;
    };
    //解析包体
    p.parseBodyData = function (len) {
        //需要读取的数据长度
        var needlength = this.socketBodyLength + this.SOCKET_HEADER_LENGTH - this.socketReadPosition;
        //缓冲区剩下的数据长度
        var bufferLength = len - this.readSocketLengthAlready;
        if (needlength <= 0) {
            return true;
        }
        if (bufferLength <= 0) {
            return false;
        }
        var readLength;
        if (bufferLength < needlength) {
            readLength = bufferLength;
        }
        else {
            readLength = needlength;
        }
        //该包已经读取的长度+即将读取的长度,如果大于缓冲长度,继续读取
        if (this.readSocketPacket_arr.length + readLength > this.SOCKET_BUFFER_LENGTH) {
            return false;
        }
        //读取指定长度
        this.recvSocketByteArray.readBytes(this.readSocketPacket_arr, this.readSocketPacket_arr.position, readLength);
        this.socketReadPosition += readLength;
        this.readSocketLengthAlready += readLength;
        //如果已读取位置依然小于包总长度，返回继续读取
        if (this.socketReadPosition < (this.socketBodyLength + this.SOCKET_HEADER_LENGTH)) {
            this.readSocketPacket_arr.position = this.socketReadPosition;
            return false;
        }
        return true;
    };
    p.getCMD = function () {
        this.readSocketPacket_arr.position = 2;
        return this.readSocketPacket_arr.readShort();
    };
    p.getVersion = function () {
        this.readSocketPacket_arr.position = 4;
        return this.readSocketPacket_arr.readByte();
    };
    p.getSubversion = function () {
        this.readSocketPacket_arr.position = 5;
        return this.readSocketPacket_arr.readByte();
    };
    p.getBodyLen = function () {
        this.readSocketPacket_arr.position = 6;
        return this.readSocketPacket_arr.readShort();
    };
    p.getCode = function () {
        this.readSocketPacket_arr.position = 7;
        return this.readSocketPacket_arr.readByte();
    };
    p.readBegin = function (funName) {
        if (funName === void 0) { funName = ""; }
        this.readFunName = funName;
        this.readSocketBodyPosition = this.SOCKET_HEADER_LENGTH;
    };
    p.readInt = function (readVariable) {
        if (readVariable === void 0) { readVariable = ""; }
        this.readSocketPacket_arr.position = this.readSocketBodyPosition;
        this.readSocketBodyPosition += this.intLength;
        var num = 0;
        try {
            num = this.readSocketPacket_arr.readInt();
        }
        catch (error) {
        }
        return num;
    };
    p.readUint = function (readVariable) {
        if (readVariable === void 0) { readVariable = ""; }
        this.readSocketPacket_arr.position = this.readSocketBodyPosition;
        this.readSocketBodyPosition += this.intLength;
        var num = 0;
        try {
            num = this.readSocketPacket_arr.readUnsignedInt();
        }
        catch (error) {
        }
        return num;
    };
    p.readShort = function (readVariable) {
        if (readVariable === void 0) { readVariable = ""; }
        this.readSocketPacket_arr.position = this.readSocketBodyPosition;
        this.readSocketBodyPosition += this.shortLength;
        var num = 0;
        try {
            num = this.readSocketPacket_arr.readShort();
        }
        catch (error) {
        }
        return num;
    };
    p.readByte = function (readVariable) {
        if (readVariable === void 0) { readVariable = ""; }
        this.readSocketPacket_arr.position = this.readSocketBodyPosition;
        this.readSocketBodyPosition += this.byteLength;
        var num = 0;
        try {
            num = this.readSocketPacket_arr.readByte();
        }
        catch (error) {
        }
        return num;
    };
    p.readString = function (readVariable) {
        if (readVariable === void 0) { readVariable = ""; }
        this.readSocketPacket_arr.position = this.readSocketBodyPosition;
        var len = 0;
        try {
            len = this.readSocketPacket_arr.readShort();
        }
        catch (error) {
        }
        this.readSocketBodyPosition += 2;
        this.readSocketPacket_arr.position = this.readSocketBodyPosition;
        this.readSocketBodyPosition += len;
        var str = "";
        try {
            str = this.readSocketPacket_arr.readUTFBytes(len);
        }
        catch (error) {
        }
        return str;
    };
    p.readStringByLen = function (len, readVariable) {
        if (readVariable === void 0) { readVariable = ""; }
        this.readSocketPacket_arr.position = this.readSocketBodyPosition;
        this.readSocketBodyPosition += len;
        var str = "";
        try {
            str = this.readSocketPacket_arr.readUTFBytes(len);
        }
        catch (error) {
        }
        return str;
    };
    p.readLong = function (readVariable) {
        if (readVariable === void 0) { readVariable = ""; }
        var little = this.readUint(readVariable);
        var big = this.readInt(readVariable);
        var longResult = big * Math.pow(2, 32) + little;
        return longResult;
    };
    p.socketConnect = function (e) {
        this.isConnected = true;
        this.webSocket.removeEventListener(egret.Event.CONNECT, this.socketConnect, this);
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.getSocketData, this);
        this.dispatchEvent(new SocketEvent(SocketEvent.CONNECT));
    };
    p.closeConnect = function (e) {
        this.isConnected = false;
        this.dispatchEvent(new SocketEvent(SocketEvent.CLOSE));
    };
    p.getSocketData = function (e) {
        this.readSocketLengthAlready = 0;
        this.recvSocketByteArray.length = 0;
        this.recvSocketByteArray.position = 0;
        this.webSocket.readBytes(this.recvSocketByteArray);
        var len = this.recvSocketByteArray.bytesAvailable;
        while (this.readSocketLengthAlready < len && this.socketStatus != this.SOCKET_ERROR) {
            switch (this.socketStatus) {
                case this.SOCKET_HEADER:
                case this.SOCKET_REQUEST:
                    if (!this.readHeader(len)) {
                        break;
                    }
                    if (!this.parseHeaderData()) {
                        this.socketStatus = this.SOCKET_ERROR;
                        break;
                    }
                    else {
                        this.socketStatus = this.SOCKET_BODY;
                    }
                case this.SOCKET_BODY:
                    if (this.parseBodyData(len)) {
                        this.socketStatus = this.SOCKET_DONE;
                    }
                    break;
                default:
                    return;
            }
            if (this.socketStatus == this.SOCKET_ERROR) {
                return;
            }
            if (this.socketStatus == this.SOCKET_DONE) {
                var eve = new SocketEvent(SocketEvent.SYNC);
                this.dispatchEvent(eve);
                eve = null;
                this.reset();
            }
        }
    };
    p.clearAllEvent = function () {
        if (this.webSocket) {
            if (this.webSocket.hasEventListener(egret.IOErrorEvent.IO_ERROR))
                this.webSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.socketError, this);
            if (this.webSocket.hasEventListener(egret.ProgressEvent.SOCKET_DATA))
                this.webSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.getSocketData, this);
            if (this.webSocket.hasEventListener(egret.Event.CONNECT))
                this.webSocket.removeEventListener(egret.Event.CONNECT, this.socketConnect, this);
            if (this.webSocket.hasEventListener(egret.Event.CLOSE))
                this.webSocket.removeEventListener(egret.Event.CLOSE, this.closeConnect, this);
        }
    };
    p.socketError = function (e) {
        this.close();
        this.dispatchEvent(new SocketEvent(SocketEvent.ERROR));
    };
    p.reset = function () {
        this.readSocketPacket_arr.position = 0;
        this.readSocketPacket_arr.length = 0;
        this.socketReadPosition = 0;
        this.socketBodyLength = 0;
        this.socketStatus = this.SOCKET_REQUEST;
    };
    return MySocket;
}(egret.EventDispatcher));
egret.registerClass(MySocket,'MySocket');
//# sourceMappingURL=MySocket.js.map