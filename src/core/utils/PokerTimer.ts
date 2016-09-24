/**
 * Created by wwb on 2016/9/23.
 */
class PokerTimer {
    private static _instance: PokerTimer;
    private _registServerTime: number = 0;
    private _registClientTime: number = 0;

    constructor() {

    }

    public static get getInstance(): PokerTimer {
        if (PokerTimer._instance == null) {
            PokerTimer._instance = new PokerTimer();
        }
        return PokerTimer._instance;
    }

    public  set serverTime(v: number) {
        this._registServerTime = v;
        this._registClientTime = egret.getTimer();

        
    }

    public  get serverTime(): number {
        return this._registServerTime + Math.round((egret.getTimer() - this._registClientTime) / 1000);
    }
}
