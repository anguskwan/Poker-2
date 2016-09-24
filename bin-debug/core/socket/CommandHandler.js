/**
 * Created by wwb on 2016/9/5.
 */
var CommandHandler = (function () {
    function CommandHandler() {
        this.m_socket = PokerService.getInstance.socket;
    }
    var d = __define,c=CommandHandler,p=c.prototype;
    p.execute = function (obj) {
        if (obj === void 0) { obj = null; }
    };
    return CommandHandler;
}());
egret.registerClass(CommandHandler,'CommandHandler');
//# sourceMappingURL=CommandHandler.js.map