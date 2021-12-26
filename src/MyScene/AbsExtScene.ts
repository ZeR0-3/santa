import { DynamicAssetConfiguration, SceneParameterObject } from "@akashic/akashic-engine";
import { EntFactory } from "../EntFactory";
import { HouseMgr } from "../HouseMgr";
import { RPGAtsumaruWindow } from "../parameterObject";
import { MyExtSceneParameterObject } from "./MyExtSceneParameterObject";

export abstract class AbsExtScene {
    protected abstract assetIds: (string | DynamicAssetConfiguration)[];
    public scene: g.Scene;
    public window: RPGAtsumaruWindow;
    protected time: number;
    protected isAtumaru: boolean;
    constructor(param: MyExtSceneParameterObject){
        
        this.scene = new g.Scene({
            game: param.game,
            assetIds: param.assetIds,

        });
        this.window = param.window;
        this.time = param.time;
        this.isAtumaru = param.isAtumaru;
        
    }

    protected abstract onLoadAdd: () => void;

    protected createGScene(): g.Scene {
        return new g.Scene({
            //param as SceneParameterObject)
            game: g.game,
            assetIds: this.assetIds,
        });

    };

    protected setOnLoadAdd(_fnc: () => void): void {
        this.scene.onLoad.add(this.onLoadAdd);
    }
}
