var Transaction = (function () {
    function Transaction() {
    }
    var d = __define,c=Transaction,p=c.prototype;
    //给子类特殊处理
    p.execute = function () {
    };
    //交互完成处理，子类可覆写
    p.onComplete = function (result) {
    };
    //交互错误处理，子类可覆写
    p.onFault = function (result) {
    };
    //获取数据
    p.callAmf = function (functionName) {
        var _args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            _args[_i - 1] = arguments[_i];
        }
        this.m_functionName = functionName;
        TransactionManager.call(functionName, _args);
    };
    return Transaction;
}());
egret.registerClass(Transaction,'Transaction');
//# sourceMappingURL=Transaction.js.map