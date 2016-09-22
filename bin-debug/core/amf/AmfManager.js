var AmfManager = (function () {
    function AmfManager() {
        this.amfArr = [];
    }
    var d = __define,c=AmfManager,p=c.prototype;
    AmfManager.getInstance = function () {
        if (AmfManager.instance == null) {
            AmfManager.instance = new AmfManager();
        }
        return AmfManager.instance;
    };
    //初始化连接
    AmfManager.init = function (url) {
        this.gateway = url;
        this.amfClient = this.amfClient || new amf.Client("amfphp", "http://local.texas.playshoo.com/flashapi/gateway.php", "300");
    };
    //重试
    AmfManager.timeOut = 5000;
    AmfManager.tries = 0;
    AmfManager.maxtries = 2;
    //心跳时间
    AmfManager.heartTimeout = 240000;
    return AmfManager;
}());
egret.registerClass(AmfManager,'AmfManager');
//# sourceMappingURL=AmfManager.js.map