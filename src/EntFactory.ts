import { ImageAsset } from "@akashic/akashic-engine";
import { House } from "./Ent/House";
import { Present } from "./Ent/Present";


export class EntFactory {

    scene: g.Scene = null;

    //ImageAsset
    // private imageAssetArr: {[assetName: string]: ImageAsset} = null;
    constructor(scene: g.Scene){
        this.scene = scene;
        // 各アセットオブジェクトを取得します
		// const playerImageAsset = scene.asset.getImageById("gsanta");
		// const shotImageAsset = scene.asset.getImageById("shot");
		// const bgImageAsset = scene.asset.getImageById("bg-santa1");
		// const presentImageAsset = scene.asset.getAllImages("present-box1");
		// const seAudioAsset = scene.asset.getAudioById("se");
        // this.imageAssetArr["gsanta"] = playerImageAsset;



    }

    public createPresent = ()=> {
        // const getSantaPosX = 
        return new Present({
            src: this.scene.asset.getImageById("present-box1"),
            scene: this.scene,
            width: 46,
            height: 48,
            srcWidth: 46,
            srcHeight: 48,
            frames: [0,1,2,3,4,5],
            frameNumber: 0,

        });
    }

    // プレイヤーを生成します
    public createPlayer = ()=>{
        const playerImageAsset = this.scene.asset.getImageById("gsanta");
		
        return  new g.Sprite({
			scene: this.scene,
			src: playerImageAsset,
			width: playerImageAsset.width,
			height: playerImageAsset.height
		});
    }

    // 家作ります
    public createHouse = ()=> {
        const house3_1ImageAsset = this.scene.asset.getImageById("house3-1");
        const house3 = new House({
            scene: this.scene,
            src: house3_1ImageAsset,
            width: house3_1ImageAsset.width,
            height: house3_1ImageAsset.height
            
        });

        return house3;

    }
}