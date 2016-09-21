var moduleArr = [];

function loadJavaScript(fileName)
{
    console.log(moduleArr.length)
    if (moduleArr.length>0)
    {
        console.log("已经加载过了")
        return;
    }    
    var moduleName = fileName + "Module"; 

    fileName = fileName.charAt(0).toUpperCase() + fileName.substr(1, fileName.length - 1) + "";
	var script = document.createElement("script");
	script.type = "text/javascript";
    script.onload = function () {
        console.log("JS加载完成", fileName);
        moduleArr.push(fileName);
        JsCallbackEvent.JsCallbackEvent();
    };
    script.src = "./bin-debug/com/module/" + moduleName + "/" + fileName + ".js";
    document.getElementsByTagName("head")[0].appendChild(script);
}


//var a = new exampleA.A();//去掉 a 的类型
//a.callEgretMethod("method");