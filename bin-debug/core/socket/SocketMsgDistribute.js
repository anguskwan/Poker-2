/**
 * Created by wwb on 2016/9/5.
 */
var SocketMsgDistribute = (function () {
    function SocketMsgDistribute() {
        this.handlers = {};
    }
    var d = __define,c=SocketMsgDistribute,p=c.prototype;
    p.addHandler = function (index, message) {
        if (this.handlers != null) {
            this.handlers[index] = message;
        }
    };
    p.distribute = function (index, bytes) {
        var message = this.handlers[index];
        if (message != null) {
            message.execute(index, bytes);
        }
        else if (this.handlers[index] instanceof Function) {
            this.handlers[index].apply(this, [index, bytes]);
        }
    };
    return SocketMsgDistribute;
}());
egret.registerClass(SocketMsgDistribute,'SocketMsgDistribute');
//# sourceMappingURL=SocketMsgDistribute.js.map