/**
 * Created by wwb on 2016/9/5.
 */
class CommandHandler{
    protected m_socket:MySocket;
    constructor() {
        this.m_socket = PokerService.getInstance.socket;
    }

    public execute(obj:Object=null):void{
        
    }
}