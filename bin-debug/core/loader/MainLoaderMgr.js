/**
 * Created by wwb on 2016/9/13.
 */
var MainLoaderMgr = (function (_super) {
    __extends(MainLoaderMgr, _super);
    function MainLoaderMgr() {
        _super.call(this);
        this._loaderDic = new HashMap();
        this._completeHandlerDic = new HashMap();
        this._progressHandlerDic = new HashMap();
    }
    var d = __define,c=MainLoaderMgr,p=c.prototype;
    /**
     * 加载配置
     * @param url 路径
     * @param complete 加载完成回调
     * @param progress 加载进度回调
     * @param binary  二进制加载
     */
    p.loadData = function (url, complete, progress, binary) {
        if (binary === void 0) { binary = false; }
        url = FileConfig.getAssetUrl(url, 4);
        //url = "resource/config/"+url;
        var loader = this.getLoader(url);
        if (loader == null) {
            loader = new AutoRetryURLLoader(true, 3, url);
            if (binary) {
                loader.dataFormat = egret.URLLoaderDataFormat.BINARY;
            }
            this._loaderDic.put(url, loader);
            loader.addEventListener(egret.Event.COMPLETE, this.onLoadDataComplete, this);
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoaderDataFail, this);
            loader.addEventListener(egret.ProgressEvent.PROGRESS, this.onLoadDataProgress, this);
        }
        this._completeHandlerDic.put(url, complete);
        this._progressHandlerDic.put(url, progress);
        loader.load(new egret.URLRequest(url));
    };
    p.getLoader = function (url) {
        if (this._loaderDic.containsKey(url) != null) {
            return this._loaderDic.get(url);
        }
        return null;
    };
    /**
     * 加载进度
     * @param evt
     */
    p.onLoadDataProgress = function (evt) {
        var loader = evt.target;
        if (loader == null)
            return;
        var url = loader.parameter.toString();
        var handler = this._progressHandlerDic.getValue(url);
        if (handler != null) {
            handler.dispatch(evt);
        }
    };
    /**
     * 加载失败
     * @param evt
     */
    p.onLoaderDataFail = function (evt) {
        var loader = evt.target;
        if (loader == null) {
            this.removeLoader(loader.parameter.toString());
        }
        console.log("LoadDataFaile:" + loader.parameter);
    };
    /**
     * 加载成功
     * @param evt
     */
    p.onLoadDataComplete = function (evt) {
        var loader = evt.target;
        if (loader == null)
            return;
        var url = loader.parameter.toString();
        var handler = this._completeHandlerDic.getValue(url);
        if (handler != null) {
            handler.dispatch(loader.data);
            this.removeLoader(url);
        }
    };
    p.removeLoader = function (url) {
        var loader = this._loaderDic.getValue(url);
        if (loader != null) {
            loader.removeEventListener(egret.Event.COMPLETE, this.onLoadDataComplete, this);
            loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoaderDataFail, this);
            loader.removeEventListener(egret.ProgressEvent.PROGRESS, this.onLoadDataProgress, this);
            this._loaderDic.remove(url);
            this._completeHandlerDic.remove(url);
            this._progressHandlerDic.remove(url);
        }
    };
    return MainLoaderMgr;
}(Object));
egret.registerClass(MainLoaderMgr,'MainLoaderMgr');
//# sourceMappingURL=MainLoaderMgr.js.map