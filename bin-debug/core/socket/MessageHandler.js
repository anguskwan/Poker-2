/**
 * Created by wwb on 2016/9/5.
 */
var MessageHandler = (function () {
    function MessageHandler() {
        this.m_socket = PokerService.getInstance.socket;
    }
    var d = __define,c=MessageHandler,p=c.prototype;
    p.execute = function (index, msgBody) {
    };
    return MessageHandler;
}());
egret.registerClass(MessageHandler,'MessageHandler');
//# sourceMappingURL=MessageHandler.js.map