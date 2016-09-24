
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/config/AnalyticalConfig.js",
	"bin-debug/config/BaseConfig.js",
	"bin-debug/config/FileConfig.js",
	"bin-debug/config/GlobalConfig.js",
	"bin-debug/config/PokerConfig.js",
	"bin-debug/config/xml/LevelData.js",
	"bin-debug/config/xml/ShopChest.js",
	"bin-debug/config/xml/ShopConfigChestTreasure.js",
	"bin-debug/config/xml/ShopExpCard.js",
	"bin-debug/config/xml/ShopInteractFace.js",
	"bin-debug/config/xml/ShopProps.js",
	"bin-debug/config/xml/ShopVipCard.js",
	"bin-debug/config/xml/ShopVipCard2.js",
	"bin-debug/config/xml/ShopVipExpCard.js",
	"bin-debug/core/amf/Transaction.js",
	"bin-debug/core/amf/TransactionBase.js",
	"bin-debug/core/amf/TransactionManager.js",
	"bin-debug/core/base/UIBase.js",
	"bin-debug/core/event/CustomDataEvent.js",
	"bin-debug/core/event/LoadEvent.js",
	"bin-debug/core/GlobalAPI.js",
	"bin-debug/core/loader/ParamableURLLoader.js",
	"bin-debug/core/loader/AutoRetryURLLoader.js",
	"bin-debug/core/loader/MainLoaderMgr.js",
	"bin-debug/core/module/BaseModule.js",
	"bin-debug/core/module/IModule.js",
	"bin-debug/core/module/IModuleManager.js",
	"bin-debug/core/module/ModuleManager.js",
	"bin-debug/core/notifications/Notifier.js",
	"bin-debug/core/notifications/GameCommand.js",
	"bin-debug/core/notifications/ICommand.js",
	"bin-debug/core/notifications/INotifier.js",
	"bin-debug/core/notifications/NotificationManager.js",
	"bin-debug/core/rpc/Handler.js",
	"bin-debug/core/socket/ByteArrayDataType.js",
	"bin-debug/core/socket/ByteArrayUtil.js",
	"bin-debug/core/socket/CommandHandler.js",
	"bin-debug/core/socket/MessageHandler.js",
	"bin-debug/core/socket/MySocket.js",
	"bin-debug/core/socket/SocketEncrypt.js",
	"bin-debug/core/socket/SocketEvent.js",
	"bin-debug/core/socket/SocketMsgDistribute.js",
	"bin-debug/core/utils/DisplayUtil.js",
	"bin-debug/core/utils/HashMap.js",
	"bin-debug/core/utils/LinkedMap.js",
	"bin-debug/core/utils/MovieClipUtil.js",
	"bin-debug/core/utils/PokerTimer.js",
	"bin-debug/core/utils/Rot128.js",
	"bin-debug/core/utils/SocketUtil.js",
	"bin-debug/core/utils/stringUtil.js",
	"bin-debug/core/utils/timer/FrameTimer.js",
	"bin-debug/core/utils/timer/FrameTimerManager.js",
	"bin-debug/core/utils/TraceUtil.js",
	"bin-debug/core/window/IWindow.js",
	"bin-debug/core/window/MyWindowEvent.js",
	"bin-debug/core/window/WindowBase.js",
	"bin-debug/core/window/WindowManager.js",
	"bin-debug/model/amfData/TexasPoker.js",
	"bin-debug/model/AppData.js",
	"bin-debug/service/amf/TChampionshipList.js",
	"bin-debug/service/message/MainNote.js",
	"bin-debug/service/message/ModuleNote.js",
	"bin-debug/service/PokerService.js",
	"bin-debug/service/socket/CommandType.js",
	"bin-debug/startUp/MainLoader.js",
	"bin-debug/startUp/ConfigLoader.js",
	"bin-debug/startUp/Main.js",
	"bin-debug/startUp/MainBase.js",
	"bin-debug/startUp/Poker.js",
	"bin-debug/startUp/PokerStartup.js",
	"bin-debug/startUp/PreLoaderNew.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/view/preload/PreloadMain.js",
	"bin-debug/view/preload/PreloadMainUI.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 980,
		contentHeight: 700,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};