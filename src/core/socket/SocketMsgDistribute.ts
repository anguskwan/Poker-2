/**
 * Created by wwb on 2016/9/5.
 */
class SocketMsgDistribute {
    private handlers: Object;

    constructor() {
        this.handlers = {};
    }

    public addHandler(index: number, message: MessageHandler): void {
        if (this.handlers != null) {
            this.handlers[index] = message;
        }
    }

    public distribute(index: number, bytes: egret.ByteArray): void {
        var message: MessageHandler = this.handlers[index];
        if (message != null) {
            message.execute(index, bytes);
        }
        else if (this.handlers[index] instanceof Function) {
            (this.handlers[index] as Function).apply(this, [index, bytes]);
        }
    }
}
