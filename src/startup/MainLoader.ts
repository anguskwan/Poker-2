// TypeScript file
class MainLoader extends egret.Sprite {
    protected _configInit: boolean;
    protected urlList: Array<Object>;
    protected loadMgr: MainLoaderMgr;
    protected isXmlLoading: boolean;
    protected curLoadIdx: number = 0;
    protected _storageMap: HashMap;

    constructor() {
        super();
        //this.touchEnabled = false;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this._storageMap = new HashMap();
        this.loadMgr = new MainLoaderMgr();
        GlobalConfig.setStage(this.stage);
        this.initLoadList();
    }

    /**
     * 开始加载主程序
     */
    protected startLoadMainApp(): void {
        this.loadNext();
    }

    protected initMainApp(): void {

    }

    protected initLoadList(): void {
        this.urlList = new Array<Object>();
    }

    /**
     * 加载配置
     */
    protected loadNext(): void {
        var obj: Object = this.urlList[this.curLoadIdx];
        if (obj != null) {
            var path: string = obj["url"];
            var completeHandler: Handler = new Handler(this, this.onLoadItemComplete, path);
            var progressHandler: Handler = new Handler(this, this.onLoadItemProgress);
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
    }

    protected showItemProgress(percent: number): void {

    }

    protected showLoadingData(data: string): void {

    }

    private onAddToStage(evt: egret.Event): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.stage.scaleMode = egret.StageScaleMode.NO_SCALE;
        this.stage.frameRate = 24;
    }

    /**
     * 单个配置加载完成
     * @param argument
     * @param param
     */
    private onLoadItemComplete(argument: Object, param: any): void {
        var path: string = argument.toString();
        if (param instanceof ArrayBuffer) {
            var aBuffer: ArrayBuffer = <ArrayBuffer><any>(param);
            var config: string = this.getDecompress(aBuffer);
            this._storageMap.put(path, config);
            (this.urlList[this.curLoadIdx])["method"](config);
        }
        this.curLoadIdx++;
        this.checkIsComplete();
    }

    public onParseConfig(param: string, complete: Function): void {
    }

    /**
     * 配置表的解密解压缩
     * @param param
     * @returns {string}
     */
    private getDecompress(param: ArrayBuffer): string {
        var str: string;
        var u8Arr: Uint8Array = new Uint8Array(param);
        var rot: Uint8Array = Rot128.decrypt(u8Arr, 100);
        var inflate = new zlib.Inflate(rot);
        var deplain: Uint8Array = inflate.decompress();
        var length: number = deplain.length;
        var newDeplain: Uint8Array = new Uint8Array(length);
        for (var i: number = 0; i < length; i++) {
            newDeplain[i] = deplain[i];
        }
        var lastbytes: ArrayBuffer = newDeplain.buffer;
        str = this.ToUTF8String(lastbytes);
        return str;
    }

    public ToUTF8String(buffer: ArrayBuffer, byteOffset?: number, byteLength?: number): string {
        if ('TextDecoder' in window) {
            var dataView = new DataView(buffer, byteOffset, byteLength);
            var decoder = new window['TextDecoder']('utf-8');
            var decodedString = decoder.decode(dataView);
            return decodedString;
        } else {
            console.error('Your browser does not support the Encoding API.');
        }
    }

    /**
     * 检测配置加载完成
     */
    private checkIsComplete(): void {
        this.showLoadingData(this.curLoadIdx + "/" + this.urlList.length);
        if (this.curLoadIdx >= this.urlList.length) {
            //xml全部已加载,初始化主程序
            this.initMainApp();
        } else {
            this.loadNext();
        }
    }

    /**
     * 配置加载进度
     * @param argument
     * @param param
     */
    private onLoadItemProgress(argument: Object, param: Object): void {
        var evt: egret.ProgressEvent = <any>param as egret.ProgressEvent;
        var obj: Object = this.urlList[this.curLoadIdx];
        this.showItemProgress((evt.bytesLoaded / evt.bytesTotal) * 100);
    }
}