class TransactionBase extends Transaction {
	public constructor() {
		super();
	}
	protected get userKey(): String {
		return "12345678";
	}
}