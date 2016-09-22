
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
	"bin-debug/core/amf/AmfManager.js",
	"bin-debug/core/amf/Transaction.js",
	"bin-debug/core/base/BaseModule.js",
	"bin-debug/core/base/GlobalAPI.js",
	"bin-debug/core/base/UIBase.js",
	"bin-debug/core/base/WindowBase.js",
	"bin-debug/core/event/CustomDataEvent.js",
	"bin-debug/core/event/LoadEvent.js",
	"bin-debug/core/event/MyWindowEvent.js",
	"bin-debug/core/interfaces/IModule.js",
	"bin-debug/core/interfaces/IModuleManager.js",
	"bin-debug/core/interfaces/IWindow.js",
	"bin-debug/core/managers/ModuleManager.js",
	"bin-debug/core/managers/WindowManager.js",
	"bin-debug/core/notifications/Notifier.js",
	"bin-debug/core/notifications/GameCommand.js",
	"bin-debug/core/notifications/ICommand.js",
	"bin-debug/core/notifications/INotifier.js",
	"bin-debug/core/notifications/NotificationManager.js",
	"bin-debug/core/rpc/Handler.js",
	"bin-debug/core/socket/MySocket.js",
	"bin-debug/core/socket/SocketEncrypt.js",
	"bin-debug/core/socket/SocketEvent.js",
	"bin-debug/core/utils/DisplayUtil.js",
	"bin-debug/core/utils/HashMap.js",
	"bin-debug/core/utils/LinkedMap.js",
	"bin-debug/core/utils/SocketUtil.js",
	"bin-debug/core/utils/stringUtil.js",
	"bin-debug/global/GlobalConfig.js",
	"bin-debug/loading.js",
	"bin-debug/Main.js",
	"bin-debug/service/messageList/MainNote.js",
	"bin-debug/service/messageList/ModuleNote.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/view/module/preload/PreloadMain.js",
	"bin-debug/view/module/preload/PreloadMainUI.js",
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
		scaleMode: "noScall",
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