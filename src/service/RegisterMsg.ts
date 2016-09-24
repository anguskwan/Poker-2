/**
 * Created by wwb on 2016/9/24.
 */
class RegisterMsg {
    private static _instance: RegisterMsg;

    public execute():void{
    }

    public static get getInstance(): RegisterMsg {
        if (RegisterMsg._instance == null) {
            RegisterMsg._instance = new RegisterMsg();
        }
        return RegisterMsg._instance;
    }
}
