// TypeScript file
/**
 * 前端与后端对应的指令
 */
var CommandType = (function () {
    function CommandType() {
    }
    var d = __define,c=CommandType,p=c.prototype;
    CommandType.CLIENT_COMMAND_LOGIN = 0x1001; //登录
    CommandType.CLIENT_COMMAND_BUY_LUCKY_WHEEL_NEW2 = 0x107A; //新大转盘购买(配置)
    CommandType.SERVER_COMMAND_LOGIN_SUCCESS = 0x4003; //登录成功
    CommandType.SERVER_COMMAND_LUCKY_WHEEL_RESULT_NEW2 = 0x40D2; //大转盘结果(配置)
    return CommandType;
}());
egret.registerClass(CommandType,'CommandType');
//# sourceMappingURL=CommandType.js.map