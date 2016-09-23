var TransactionManager = (function () {
    function TransactionManager() {
    }
    var d = __define,c=TransactionManager,p=c.prototype;
    //添加请求
    TransactionManager.addTransaction = function (action, isImportant) {
        if (isImportant === void 0) { isImportant = false; }
        console.log("添加交互:", action);
        action.isImportant = isImportant;
        if (!this.isLoading) {
            this.m_currentAction = action;
            action.execute();
        }
        else {
            this.m_transactions.push(action);
        }
    };
    //处理当前请求
    TransactionManager.call = function (functionName, params) {
        console.log("执行交互:", functionName);
        this.m_connection = this.m_connection || new amf.Client("amfphp", GlobalConfig.gateWay, this.timeOut);
        this.isLoading = true;
        this.source = functionName.split(".")[0];
        this.operation = functionName.split(".")[1];
        this.m_connection.invoke(this.source, this.operation, params, this.resultCallback, this.statusCallback);
        clearTimeout(this.timeID);
        this.timeID = setTimeout(this.overTimeOut, this.timeOut);
    };
    //返回数据
    TransactionManager.resultCallback = function (result) {
        console.log(result, "IN Manager");
        if (result["returnNo"] == 0) {
            if (result["data"] != null) {
                TransactionManager.m_currentAction.onComplete(result);
            }
            TransactionManager.executeNext();
        }
    };
    //返回错误
    TransactionManager.statusCallback = function (result) {
        console.log(result, "IN Manager");
        switch (result["faultCode"]) {
            //未定义的接口
            case "AMFPHP_INEXISTANT_METHOD":
            case "AMFPHP_FILE_NOT_FOUND":
                TransactionManager.executeNext();
                break;
            case "-402":
                if (TransactionManager.tries < TransactionManager.maxtries) {
                    TransactionManager.retry();
                    return;
                }
            case 0:
                console.log("duanx");
                break;
        }
        if (TransactionManager.m_currentAction.isImportant) {
        }
        TransactionManager.m_currentAction.onFault(result);
    };
    //处理下一个请求
    TransactionManager.executeNext = function () {
        this.reset();
        if (this.m_transactions.length > 0) {
            this.m_currentAction = this.m_transactions.shift();
            this.m_currentAction.execute();
        }
    };
    //重试
    TransactionManager.retry = function () {
        clearTimeout(this.timeID);
        this.timeID = setTimeout(this.retryFun, this.timeOut);
    };
    //重试Handle
    TransactionManager.retryFun = function () {
        this.tries++;
        this.reset(true);
        this.m_currentAction.execute();
    };
    //重设
    TransactionManager.reset = function (isTimeOut) {
        if (isTimeOut === void 0) { isTimeOut = false; }
        this.isLoading = false;
        clearTimeout(this.timeID);
        if (this.m_connection && !isTimeOut) {
            this.tries = 0;
            this.m_connection = null;
        }
    };
    //心跳超时
    TransactionManager.overTimeOut = function () {
        console.log("超时");
    };
    TransactionManager.isLoading = false;
    //超时
    TransactionManager.timeOut = 240000;
    TransactionManager.timeDelay = 5000;
    TransactionManager.tries = 0;
    TransactionManager.maxtries = 2;
    TransactionManager.m_transactions = [];
    return TransactionManager;
}());
egret.registerClass(TransactionManager,'TransactionManager');
//# sourceMappingURL=TransactionManager.js.map