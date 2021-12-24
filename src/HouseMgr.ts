import { EntFactory } from "./EntFactory";
import { ISceneParam } from "./ISceneParam";

export class HouseMgr{
    private isPushnextHouse: boolean = true;
    private _scene: g.Scene = null;
    private _entFactry: EntFactory = null;
    constructor(scene: g.Scene, iSceneParam: ISceneParam){
        this._scene = scene;
        this._entFactry = new EntFactory(scene);
        // this._entFactry = iSceneParam.entFactory;
    }

    public onUpdate = ()=> {
        let t = g.game.random.generate()*100;
        t = Math.floor(t);
        if(this.isPushnextHouse && (t > 95)) {
            this.isPushnextHouse = false;
            const house = this.createHouse();
            this._scene.append(house);
            this._scene.setTimeout(()=>{
                this.isPushnextHouse = true;
            },
            1000);
        }
    }

    private createHouse = ()=> {
        return this._entFactry.createHouse();
    }

    
}

