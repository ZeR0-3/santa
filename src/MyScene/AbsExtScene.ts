import { DynamicAssetConfiguration, SceneParameterObject } from "@akashic/akashic-engine";
import { EntFactory } from "../EntFactory";
import { HouseMgr } from "../HouseMgr";
import { RPGAtsumaruWindow } from "../parameterObject";
import { MyExtSceneParameterObject } from "./MyExtSceneParameterObject";

export abstract class AbsExtScene {
    protected abstract stateSceneName: string[];
    protected stateScene: {[key: string]: ()=>void} = null;
    protected abstract assetIds: (string | DynamicAssetConfiguration)[];
    public scene: g.Scene;
    public window: RPGAtsumaruWindow;
    protected time: number;
    protected isAtumaru: boolean;
    constructor(param: MyExtSceneParameterObject){
        
        // this.scene = new g.Scene({
        //     game: param.game,
        //     assetIds: param.assetIds,

        // });
        this.scene = this.createGScene(param);
        this.window = param.window;
        this.time = param.time;
        this.isAtumaru = param.isAtumaru;
        
    }

    protected abstract setAssetsIds(): string[];
    protected abstract onLoadAdd: ()=> void;
    protected abstract createStateScene: ()=> void;
    protected createGScene(param: MyExtSceneParameterObject): g.Scene {
        // const assetIds: string[] = [];
        // const ass = param.assetIds;
        this.assetIds = this.setAssetsIds();
        const scene: g.Scene = new g.Scene({
            
            game: g.game,
            assetIds: this.assetIds,
        });

        return scene;

    };

    protected setOnLoadAdd(_fnc: () => void): void {
        this.scene.onLoad.add(this.onLoadAdd);
    }
}
