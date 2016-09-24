var SocketEvent = (function (_super) {
    __extends(SocketEvent, _super);
    function SocketEvent(type) {
        _super.call(this, type);
    }
    var d = __define,c=SocketEvent,p=c.prototype;
    SocketEvent.CONNECT = "connect";
    SocketEvent.CLOSE = "close";
    SocketEvent.SYNC = "sync";
    SocketEvent.ERROR = "error";
    SocketEvent.SECURITYERROR = "securityerror";
    return SocketEvent;
}(egret.Event));
egret.registerClass(SocketEvent,'SocketEvent');
//# sourceMappingURL=SocketEvent.js.map