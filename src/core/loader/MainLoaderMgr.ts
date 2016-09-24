/**
 * Created by wwb on 2016/9/13.
 */
class MainLoaderMgr extends Object {
    private _loaderDic: HashMap;
    private _completeHandlerDic: HashMap;
    private _progressHandlerDic: HashMap;

    constructor() {
        super();
        this._loaderDic = new HashMap();
        this._completeHandlerDic = new HashMap();
        this._progressHandlerDic = new HashMap();
    }

    /**
     * 加载配置
     * @param url 路径
     * @param complete 加载完成回调
     * @param progress 加载进度回调
     * @param binary  二进制加载
     */
    public loadData(url: string, complete: Handler, progress: Handler, binary: boolean = false): void {
        url = FileConfig.getAssetUrl(url,4);
        //url = "resource/config/"+url;
        var loader: ParamableURLLoader = this.getLoader(url) as ParamableURLLoader;
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
    }

    private getLoader(url: string): Object {
        if (this._loaderDic.containsKey(url) != null) {
            return this._loaderDic.get(url);
        }
        return null;
    }

    /**
     * 加载进度
     * @param evt
     */
    private onLoadDataProgress(evt: egret.ProgressEvent): void {
        var loader: ParamableURLLoader = evt.target as ParamableURLLoader;
        if (loader == null)
            return;
        var url: string = loader.parameter.toString();
        var handler: Handler = this._progressHandlerDic.getValue(url);
        if (handler != null) {
            handler.dispatch(evt);
        }
    }

    /**
     * 加载失败
     * @param evt
     */
    private onLoaderDataFail(evt: egret.IOErrorEvent): void {
        var loader: ParamableURLLoader = evt.target as ParamableURLLoader;
        if (loader == null){
            this.removeLoader(loader.parameter.toString())
        }
        console.log("LoadDataFaile:"+loader.parameter);
    }

    /**
     * 加载成功
     * @param evt
     */
    private onLoadDataComplete(evt: egret.Event): void {
        var loader: ParamableURLLoader = evt.target as ParamableURLLoader;
        if (loader == null)
            return;
        var url: string = loader.parameter.toString();
        var handler: Handler = this._completeHandlerDic.getValue(url);
        if (handler != null) {
            handler.dispatch(loader.data);
            this.removeLoader(url);
        }
    }

    private removeLoader(url: string): void {
        var loader:ParamableURLLoader = this._loaderDic.getValue(url);
        if(loader!=null){
            loader.removeEventListener(egret.Event.COMPLETE, this.onLoadDataComplete,this);
            loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoaderDataFail,this);
            loader.removeEventListener(egret.ProgressEvent.PROGRESS, this.onLoadDataProgress,this);
            this._loaderDic.remove(url);
            this._completeHandlerDic.remove(url);
            this._progressHandlerDic.remove(url);
        }
    }
}
