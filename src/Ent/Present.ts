import { FrameSpriteParameterObject, SpriteParameterObject, Trigger } from "@akashic/akashic-engine";

export class Present extends g.FrameSprite {
    public speed: number = 6;
    public gravity: number = 0.3;
    private addY: number = -5;
    private stackPresentHeight: number = 0;
    private actScene: g.Scene = null;
    private limmitSceneY: number = null;

    constructor(param: FrameSpriteParameterObject, actSc?: g.Scene){
        super(param);
        //this.actScene = actSc;
        const tmp = Math.floor(g.game.random.generate() * 6 );
        this.frameNumber = tmp;
        this.addY = this.addY - 1.3*tmp;

        this.limmitSceneY = g.game.height;
        this.onUpdate.add(this.onUpdateHandrer);
    }

    private onUpdateHandrer = ()=>{
        // 重力加速度を加味して落下させるための計算
        this.addY += this.gravity;

        // Y座標計算＆画面下限なら破棄
        const nextY: number = this.y += this.addY;
        if (this.limmitSceneY < this.y) {
            if(!this) this.destroy();
        }
        // X座乗計算（何もしてないけど）
        this.x += this.speed;

        // 画面更新
        this.modified();
    };
        
    
}