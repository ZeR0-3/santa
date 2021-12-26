import { SceneParameterObject } from "@akashic/akashic-engine";
import { GameMainParameterObject, RPGAtsumaruWindow } from "../parameterObject";

export interface MyExtSceneParameterObject extends SceneParameterObject{
    window: RPGAtsumaruWindow;
    isAtumaru: boolean;
    time: number;
}