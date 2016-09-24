/**
 * Created by wwb on 2016/9/12.
 */
class PokerConfig {
    private static _instance: PokerConfig;

    public static connectCount: number = 0;
    public static SecurityerrCount: number = 0;
    public static socketConnected: boolean = false;
    public useLocalServer: boolean = true;
    private static version: string = "";
    public static traceOpen: Boolean = true;//是否开启trace功能
    public static versionArray: Array<string> = PokerConfig.version.split("."); //解析出的版本数组
    constructor() {

    }
    public static getInstance(): PokerConfig {
        if (PokerConfig._instance == null) {
            PokerConfig._instance = new PokerConfig();
        }
        return PokerConfig._instance;
    }

    public static traceFun(...rest): void {
        if (this.traceOpen) {
            console.log(rest);
        }
    }
}
