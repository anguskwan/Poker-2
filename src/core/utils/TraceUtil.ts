/**
 * Created by wwb on 2016/9/19.
 */
class TraceUtil extends Object{
    constructor(){
        super();
    }

     public static  listTrace(param1:any, param2:Object = null, param3:string = "┣") : string
        {
            var flag:string = "";
            if (param2 == null)
            {
                flag = flag + "----------start----------\n";
            }
            else
            {
                flag = flag + ("----------" + param2 + " start----------\n");
            }
            if (typeof(param1) == "string")
            {
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
        }

		private static  forwadTrace(param1:any, param2:String = "┣") : string
        {
            var data:string = null;
            if (typeof(param1) == "string")
            {
                return "";
            }
            if (typeof(param1) == "xml")
            {
                return "";
            }
            var str:string = "";
            for (data in param1)
            {
                
                str = str + (param2 + data + ": " + param1[data] + "\n");
                str = str + TraceUtil.forwadTrace(param1[data], "\t" + param2);
            }
            return str;
        }
}
