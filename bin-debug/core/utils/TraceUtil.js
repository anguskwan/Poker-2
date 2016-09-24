/**
 * Created by wwb on 2016/9/19.
 */
var TraceUtil = (function (_super) {
    __extends(TraceUtil, _super);
    function TraceUtil() {
        _super.call(this);
    }
    var d = __define,c=TraceUtil,p=c.prototype;
    TraceUtil.listTrace = function (param1, param2, param3) {
        if (param2 === void 0) { param2 = null; }
        if (param3 === void 0) { param3 = "┣"; }
        var flag = "";
        if (param2 == null) {
            flag = flag + "----------start----------\n";
        }
        else {
            flag = flag + ("----------" + param2 + " start----------\n");
        }
        if (typeof (param1) == "string") {
            flag = flag + (param1 + "\n");
            flag = flag + "----------end----------";
            console.log(flag);
            return flag;
        }
        flag = flag + (param1 + "\n");
        flag = flag + TraceUtil.forwadTrace(param1, param3);
        flag = flag + "----------end----------";
        console.log(flag);
        return flag;
    };
    TraceUtil.forwadTrace = function (param1, param2) {
        if (param2 === void 0) { param2 = "┣"; }
        var data = null;
        if (typeof (param1) == "string") {
            return "";
        }
        if (typeof (param1) == "xml") {
            return "";
        }
        var str = "";
        for (data in param1) {
            str = str + (param2 + data + ": " + param1[data] + "\n");
            str = str + TraceUtil.forwadTrace(param1[data], "\t" + param2);
        }
        return str;
    };
    return TraceUtil;
}(Object));
egret.registerClass(TraceUtil,'TraceUtil');
//# sourceMappingURL=TraceUtil.js.map