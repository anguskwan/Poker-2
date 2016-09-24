/**
 * Created by wwb on 2016/9/5.
 */
class MessageHandler {
    protected m_socket: MySocket;

    constructor() {
        this.m_socket = PokerService.getInstance.socket;
    }

    public execute(index: number, msgBody: egret.ByteArray): void {

    }
}
