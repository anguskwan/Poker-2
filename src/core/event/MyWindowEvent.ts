class MyWindowEvent extends egret.Event {
    public static BRING_TO_FRONT: string = "bringToFront";
    public static BRING_TO_BACK: string = "bringToBack";
    public static TRY_TO_CLOSE: string = "tryToClose";
    public static CLOSE: string = "close";
    public static RESIZE: string = "resize";
    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false) {
    		super(type,bubbles,cancelable);
		}

}