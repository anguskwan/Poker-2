class SocketEvent extends egret.Event{
    public static CONNECT:string="connect";
    public static CLOSE:string="close";
    public static SYNC:string="sync";
    public static ERROR:string="error";
    public static SECURITYERROR:string = "securityerror";
	public constructor(type:string) {
        super(type);
	}
}