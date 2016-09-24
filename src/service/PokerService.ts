/**
 * Created by wwb on 2016/9/21.
 */
class PokerService {
    private static _instance: PokerService;
    private m_socket: MySocket;
    private m_connectSuc: Function;
    private m_connectFault: Function;
    private static SOCKET_IP: string = "172.16.5.200";
    private static SOCKET_PORT: number = 9999;
    private msgDistribute:SocketMsgDistribute;
    constructor() {
        this.msgDistribute = new SocketMsgDistribute();
    }

    public execute(onSuc: Function = null, onFault: Function = null): void {
        this.initWebSocket(onSuc, onFault);
    }

    public addHandler(index:number,message:MessageHandler):void{
        if(this.msgDistribute!=null){
            this.msgDistribute.addHandler(index,message);
        }
    }

    /*
     * 连接服务器
     * host:	IP地址
     * port:	端口
     */
    private connect(host: string, port: number): void {
        this.m_socket.connect(host, port);
        PokerConfig.connectCount++;
        PokerConfig.SecurityerrCount++;
        PokerConfig.traceFun("主机 端口:", host, port);
    }
    
    /**
     * 提供外部接口socket，供解析
     */
    public get socket():MySocket{
        return this.m_socket;
    }
    
    /**
     * 单例模式
     */
    public static get getInstance(): PokerService {
        if (PokerService._instance == null) {
            PokerService._instance = new PokerService();
        }
        return PokerService._instance;
    }
    
    /**
     * 初始化通讯
     */
    private initWebSocket(onSuc: Function = null, onFault: Function = null): void {
        this.m_socket = new MySocket();
        this.m_connectSuc = onSuc;
        this.m_connectFault = onFault;
        this.m_socket.addEventListener(SocketEvent.CONNECT, this.onConnect, this);
        this.m_socket.addEventListener(SocketEvent.ERROR, this.onErr, this);
        this.m_socket.addEventListener(SocketEvent.SYNC, this.onData, this);
        this.m_socket.addEventListener(SocketEvent.CLOSE, this.onClose, this);
        this.m_socket.addEventListener(SocketEvent.SECURITYERROR, this.onSecurityerr, this);
        this.connect(PokerService.SOCKET_IP, PokerService.SOCKET_PORT);
    }
    
    /**
     * 安全策划错误
     */
    private onSecurityerr(e: SocketEvent): void {
        if (e.type == "securityerror") {
            if (PokerConfig.SecurityerrCount <= 3) {
                PokerConfig.traceFun("安全策略出错，正在尝试重新连接 " + PokerConfig.SecurityerrCount);
            }
        }
    }

    private onClose(e: SocketEvent): void {
        PokerConfig.traceFun("连接关闭");
        //如果已经有提示窗口显示，说明是服务器主动关闭了用户连接，不允许重连
        //todo 通讯关闭
        this.m_socket.close();
    }

    private onData(e: SocketEvent): void {
          var cmd:number = this.m_socket.getCMD();
          this.onMsg(cmd,this.m_socket.byteData);
    }

    private onErr(e: SocketEvent): void {
        PokerConfig.traceFun("网络出错");
        this.m_connectFault && this.m_connectFault();
        if (PokerConfig.connectCount <= 3) {
            PokerConfig.traceFun("网络出错，正在尝试重新连接" + PokerConfig.connectCount);
        }
    }


    private onConnect(e: SocketEvent): void {
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
    }

    private onMsg(index:number,bytes:egret.ByteArray):void{
        if(this.msgDistribute!=null){
            this.msgDistribute.distribute(index,bytes);
        }
    }
}
