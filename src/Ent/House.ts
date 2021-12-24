import { SpriteParameterObject } from "@akashic/akashic-engine";

export class House extends g.Sprite {

    private movePtX: number = 0;
    public nextHouseOkFlg = false;
    public speed: number = 5;
    constructor(param: SpriteParameterObject){
        super(param);
        this.x = g.game.width;
        this.y = g.game.height - 100;

        this.onUpdate.add(this.onUpdateHandrer);
     }

    private onUpdateHandrer = ()=>{
        this.movePtX += 1;
        if (this.movePtX > this.srcWidth + 10) {
            this.nextHouseOkFlg = true;
        } //else {
        //     this.nextHouseOkFlg = false;
        // }

        this.x -= this.speed;
        if (this.x < 0 && !(this)) {
            this.destroy();
        }
        this.modified();
    }
}