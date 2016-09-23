var TChampionshipList1 = (function (_super) {
    __extends(TChampionshipList1, _super);
    function TChampionshipList1(startIndexNum, lengthNum, onComplete) {
        _super.call(this);
        this.startIndexNum = startIndexNum;
        this.lengthNum = lengthNum;
        this.onCompleteFun = onComplete;
    }
    var d = __define,c=TChampionshipList1,p=c.prototype;
    p.execute = function () {
        _super.prototype.callAmf.call(this, "TexasPoker.champishipList", this.userKey, this.startIndexNum, this.lengthNum);
    };
    p.onComplete = function (result) {
        TexasPoker.championshipList = result["data"];
        this.onCompleteFun();
    };
    return TChampionshipList1;
}(TransactionBase));
egret.registerClass(TChampionshipList1,'TChampionshipList1');
//# sourceMappingURL=TChampionshipList1.js.map