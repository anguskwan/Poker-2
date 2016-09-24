/**
 * Created by wwb on 2016/9/21.
 */
class PokerStartup{
    private static _instance:PokerStartup;
    constructor(){

    }

    public execute(appData:AppData):void{
        //先注册主程序指令，模块的注册指令写到对应的模块中去
        RegisterMsg.getInstance.execute();
        //执行连接webSocket
        PokerService.getInstance.execute(this.onConnected,this.onFault);
    }

    private onFault(): void {

    }

    //连接成功
    private onConnected(): void {
        
       
    }

    public static get getInstance():PokerStartup{
        if(PokerStartup._instance==null){
            PokerStartup._instance = new PokerStartup();
        }
        return PokerStartup._instance;
    }
}
