/**
 * Created by wwb on 2016/9/18.
 */
var MainBase = (function (_super) {
    __extends(MainBase, _super);
    function MainBase() {
        _super.call(this);
        this.analyConfig = new AnalyticalConfig();
        this.createChildren();
    }
    var d = __define,c=MainBase,p=c.prototype;
    d(p, "xmlConfig"
        ,function () {
            return this.analyConfig;
        }
    );
    p.startApplication = function (appData) {
    };
    /**
     * 创建游戏层级
     */
    p.createChildren = function () {
        this.touchEnabled = false;
        this._uiLayer = new egret.Sprite();
        this._uiLayer.touchEnabled = false;
        this.addChild(this._uiLayer);
        this._popUpLayer = new egret.Sprite();
        this._popUpLayer.touchEnabled = false;
        this.addChild(this._popUpLayer);
        this._noticeLayer = new egret.Sprite();
        this._noticeLayer.touchEnabled = false;
        WindowManager.init(this._popUpLayer);
    };
    d(p, "uiLayer"
        ,function () {
            return this._uiLayer;
        }
    );
    d(p, "popUpLayer"
        ,function () {
            return this._popUpLayer;
        }
    );
    d(p, "noticeLayer"
        ,function () {
            return this._noticeLayer;
        }
    );
    return MainBase;
}(egret.Sprite));
egret.registerClass(MainBase,'MainBase');
//# sourceMappingURL=MainBase.js.map