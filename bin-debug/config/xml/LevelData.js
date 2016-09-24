/**
 * Created by wwb on 2016/9/19.
 */
var LevelData = (function (_super) {
    __extends(LevelData, _super);
    function LevelData() {
        _super.call(this);
    }
    var d = __define,c=LevelData,p=c.prototype;
    d(LevelData, "getInstance"
        ,function () {
            if (LevelData._instance == null) {
                LevelData._instance = new LevelData();
            }
            return LevelData._instance;
        }
    );
    p.init = function (data) {
        _super.prototype.init.call(this, data);
    };
    return LevelData;
}(BaseConfig));
egret.registerClass(LevelData,'LevelData');
//# sourceMappingURL=LevelData.js.map