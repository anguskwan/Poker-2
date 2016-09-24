// TypeScript file
var MainLoader = (function (_super) {
    __extends(MainLoader, _super);
    function MainLoader() {
        _super.call(this);
        this.curLoadIdx = 0;
        //this.touchEnabled = false;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this._storageMap = new HashMap();
        this.loadMgr = new MainLoaderMgr();
        GlobalConfig.setStage(this.stage);
        this.initLoadList();
    }
    var d = __define,c=MainLoader,p=c.prototype;
    p.startLoadMainApp = function () {
        this.loadNext();
    };
    p.initMainApp = function () {
    };
    p.initLoadList = function () {
        this.urlList = new Array();
    };
    /**
     * 加载配置
     */
    p.loadNext = function () {
        var obj = this.urlList[this.curLoadIdx];
        if (obj != null) {
            var path = obj["url"];
            var completeHandler = new Handler(this, this.onLoadItemComplete, path);
            var progressHandler = new Handler(this, this.onLoadItemProgress);
            switch (obj["type"]) {
                case 0:
                    this.loadMgr.loadData(path, completeHandler, progressHandler);
                    break;
                case 1:
                    this.loadMgr.loadData(path, completeHandler, progressHandler, true);
                    break;
                case 2:
                    break;
            }
        }
    };
    p.showItemProgress = function (percent) {
    };
    p.showLoadingData = function (data) {
    };
    p.onAddToStage = function (evt) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.stage.scaleMode = egret.StageScaleMode.NO_SCALE;
        this.stage.frameRate = 24;
    };
    /**
     * 单个配置加载完成
     * @param argument
     * @param param
     */
    p.onLoadItemComplete = function (argument, param) {
        this.curLoadIdx++;
        var path = argument.toString();
        if (param instanceof ArrayBuffer) {
            var aBuffer = (param);
            this._storageMap.put(path, this.getDecompress(aBuffer));
        }
        this.checkIsComplete();
    };
    /**
     * 配置表的解密解压缩
     * @param param
     * @returns {string}
     */
    p.getDecompress = function (param) {
        var str;
        var u8Arr = new Uint8Array(param);
        var rot = Rot128.decrypt(u8Arr, 100);
        var inflate = new zlib.Inflate(rot);
        var deplain = inflate.decompress();
        var length = deplain.length;
        var newDeplain = new Uint8Array(length);
        for (var i = 0; i < length; i++) {
            newDeplain[i] = deplain[i];
        }
        var lastbytes = newDeplain.buffer;
        str = this.ToUTF8String(lastbytes);
        //console.log(uft);
        //str = String.fromCharCode.apply(null, new Uint8Array(lastbytes));
        return str;
    };
    p.ToUTF8String = function (buffer, byteOffset, byteLength) {
        if ('TextDecoder' in window) {
            var dataView = new DataView(buffer, byteOffset, byteLength);
            var decoder = new window['TextDecoder']('utf-8');
            var decodedString = decoder.decode(dataView);
            return decodedString;
        }
        else {
            console.error('Your browser does not support the Encoding API.');
        }
    };
    /**
     * 检测配置加载完成
     */
    p.checkIsComplete = function () {
        this.showLoadingData(this.curLoadIdx + "/" + this.urlList.length);
        if (this.curLoadIdx >= this.urlList.length) {
            //初始化主程序
            this.initMainApp();
        }
        else {
            this.loadNext();
        }
    };
    /**
     * 配置加载进度
     * @param argument
     * @param param
     */
    p.onLoadItemProgress = function (argument, param) {
        var evt = param;
        var obj = this.urlList[this.curLoadIdx];
        this.showItemProgress((evt.bytesLoaded / evt.bytesTotal) * 100);
    };
    return MainLoader;
}(egret.Sprite));
egret.registerClass(MainLoader,'MainLoader');
//# sourceMappingURL=MainLoader.js.map