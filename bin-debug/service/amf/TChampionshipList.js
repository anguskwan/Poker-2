var TChampionshipList = (function (_super) {
    __extends(TChampionshipList, _super);
    function TChampionshipList(startIndexNum, lengthNum, onComplete) {
        _super.call(this);
        this.startIndexNum = startIndexNum;
        this.lengthNum = lengthNum;
        this.onCompleteFun = onComplete;
    }
    var d = __define,c=TChampionshipList,p=c.prototype;
    p.execute = function () {
        _super.prototype.callAmf.call(this, "TexasPoker.championshipList", this.userKey, this.startIndexNum, this.lengthNum);
    };
    p.onComplete = function (result) {
        TexasPoker.championshipList = result["data"];
        this.onCompleteFun();
    };
    return TChampionshipList;
}(TransactionBase));
egret.registerClass(TChampionshipList,'TChampionshipList');
//# sourceMappingURL=TChampionshipList.js.map