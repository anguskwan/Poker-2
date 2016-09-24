/**
 * Created by wwb on 2016/9/19.
 */
class LevelData extends BaseConfig {
    private static _instance: LevelData;
    constructor() {
        super();
    }

    public static get getInstance(): LevelData {
        if (LevelData._instance == null) {
            LevelData._instance = new LevelData();
        }
        return LevelData._instance;
    }

    public init(data: string): void {
        super.init(data);
    }
}
