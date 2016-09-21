class SocketEvent extends egret.Event{
    public static CONNECT:string="connect";
    public static CLOSE:string="close";
	public constructor(type:string) {
        super(type);
	}
}