/**
 * Created by wwb on 2016/9/21.
 */
var PokerService = (function () {
    function PokerService() {
        this.msgDistribute = new SocketMsgDistribute();
    }
    var d = __define,c=PokerService,p=c.prototype;
    p.execute = function (onSuc, onFault) {
        if (onSuc === void 0) { onSuc = null; }
        if (onFault === void 0) { onFault = null; }
        this.initWebSocket(onSuc, onFault);
    };
    p.addHandler = function (index, message) {
        if (this.msgDistribute != null) {
            this.msgDistribute.addHandler(index, message);
        }
    };
    /*
     * 连接服务器
     * host:	IP地址
     * port:	端口
     */
    p.connect = function (host, port) {
        this.m_socket.connect(host, port);
        PokerConfig.connectCount++;
        PokerConfig.SecurityerrCount++;
        PokerConfig.traceFun("主机 端口:", host, port);
    };
    d(p, "socket"
        /**
         * 提供外部接口socket，供解析
         */
        ,function () {
            return this.m_socket;
        }
    );
    d(PokerService, "getInstance"
        /**
         * 单例模式
         */
        ,function () {
            if (PokerService._instance == null) {
                PokerService._instance = new PokerService();
            }
            return PokerService._instance;
        }
    );
    /**
     * 初始化通讯
     */
    p.initWebSocket = function (onSuc, onFault) {
        if (onSuc === void 0) { onSuc = null; }
        if (onFault === void 0) { onFault = null; }
        this.m_socket = new MySocket();
        this.m_connectSuc = onSuc;
        this.m_connectFault = onFault;
        this.m_socket.addEventListener(SocketEvent.CONNECT, this.onConnect, this);
        this.m_socket.addEventListener(SocketEvent.ERROR, this.onErr, this);
        this.m_socket.addEventListener(SocketEvent.SYNC, this.onData, this);
        this.m_socket.addEventListener(SocketEvent.CLOSE, this.onClose, this);
        this.m_socket.addEventListener(SocketEvent.SECURITYERROR, this.onSecurityerr, this);
        this.connect(PokerService.SOCKET_IP, PokerService.SOCKET_PORT);
    };
    /**
     * 安全策划错误
     */
    p.onSecurityerr = function (e) {
        if (e.type == "securityerror") {
            if (PokerConfig.SecurityerrCount <= 3) {
                PokerConfig.traceFun("安全策略出错，正在尝试重新连接 " + PokerConfig.SecurityerrCount);
            }
        }
    };
    p.onClose = function (e) {
        PokerConfig.traceFun("连接关闭");
        //如果已经有提示窗口显示，说明是服务器主动关闭了用户连接，不允许重连
        //todo 通讯关闭
        this.m_socket.close();
    };
    p.onData = function (e) {
        var cmd = this.m_socket.getCMD();
        this.onMsg(cmd, this.m_socket.byteData);
    };
    p.onErr = function (e) {
        PokerConfig.traceFun("网络出错");
        this.m_connectFault && this.m_connectFault();
        if (PokerConfig.connectCount <= 3) {
            PokerConfig.traceFun("网络出错，正在尝试重新连接" + PokerConfig.connectCount);
        }
    };
    p.onConnect = function (e) {
        if (this.m_socket.isConnected) {
            console.log("连接成功");
            PokerConfig.socketConnected = true;
            PokerConfig.connectCount = 0;
            PokerConfig.SecurityerrCount = 0;
            this.m_connectSuc && this.m_connectSuc();
        }
        else {
            console.log("连接失败");
            PokerConfig.socketConnected = false;
            this.m_connectFault && this.m_connectFault();
        }
    };
    p.onMsg = function (index, bytes) {
        if (this.msgDistribute != null) {
            this.msgDistribute.distribute(index, bytes);
        }
    };
    PokerService.SOCKET_IP = "172.16.5.200";
    PokerService.SOCKET_PORT = 9999;
    return PokerService;
}());
egret.registerClass(PokerService,'PokerService');
//# sourceMappingURL=PokerService.js.map