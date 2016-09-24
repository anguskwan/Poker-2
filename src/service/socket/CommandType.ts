// TypeScript file
/**
 * 前端与后端对应的指令
 */
class CommandType{
    public static CLIENT_COMMAND_LOGIN: number = 0x1001;//登录
    public static CLIENT_COMMAND_BUY_LUCKY_WHEEL_NEW2: number = 0x107A;//新大转盘购买(配置)

    public static SERVER_COMMAND_LOGIN_SUCCESS: number = 0x4003;//登录成功
    public static SERVER_COMMAND_LUCKY_WHEEL_RESULT_NEW2: number = 0x40D2;//大转盘结果(配置)
}