class PreloadMain extends BaseModule {
    constructor() {
        super();
    }

    /**
     * 开启模块
     */
    public startModule(data: Object): void {
        super.startModule(data);
    }

    /**
     * 初始化数据
     */
    public initData(data: Object): void {
        this.addDisplayObj(new PreloadMainUI());
    }
}