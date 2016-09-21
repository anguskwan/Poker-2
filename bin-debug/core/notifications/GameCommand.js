var GameCommand = (function (_super) {
    __extends(GameCommand, _super);
    function GameCommand() {
        _super.call(this);
        this.step = -1;
    }
    var d = __define,c=GameCommand,p=c.prototype;
    p.execute = function () {
    };
    return GameCommand;
}(Notifier));
egret.registerClass(GameCommand,'GameCommand',["ICommand"]);
//# sourceMappingURL=GameCommand.js.map