class TChampionshipList extends TransactionBase{
	private startIndexNum:number;
	private lengthNum: number;
	private onCompleteFun: Function;

	public constructor(startIndexNum:number, lengthNum:number,onComplete:Function) {
		super();
		this.startIndexNum = startIndexNum;
		this.lengthNum = lengthNum;
		this.onCompleteFun = onComplete;
	}

	public execute(): void{
		super.callAmf("TexasPoker.championshipList", this.userKey, this.startIndexNum, this.lengthNum);
	}

	public onComplete(result: Object): void {
		TexasPoker.championshipList = result["data"];
		this.onCompleteFun();
	}
}