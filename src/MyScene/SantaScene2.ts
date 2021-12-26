import { DynamicAssetConfiguration, HandlerFunction, Scene, SceneParameterObject } from "@akashic/akashic-engine";
import { santaAssetsIds } from "../assetids";
import { EntFactory } from "../EntFactory";
import { HouseMgr } from "../HouseMgr";
import { RPGAtsumaruWindow } from "../parameterObject";
import { AbsExtScene } from "./AbsExtScene";
import { MyExtSceneParameterObject } from "./MyExtSceneParameterObject";

export class SantaScene2 extends AbsExtScene {
    
    protected stateSceneName: string[];
    protected assetIds: (string | DynamicAssetConfiguration)[];
    constructor(param: MyExtSceneParameterObject){
        
        super(param);
        // this.scene = new g.Scene(param as SceneParameterObject);
        // this.window = param.window;
        // this.time = param.time;
        // this.isAtumaru = param.isAtumaru;
        this.setOnLoadAdd(this.onLoadAdd);
        
    }
    protected setAssetsIds(): string[] {
        return santaAssetsIds;
    }

    // private setOnLoadAdd(_fnc: () => void): void {
    //     this.scene.onLoad.add(this.onLoadAdd);
    // }

    protected createStateScene = () => {



    }

    onLoadAdd = ():void => {
		// ここからゲーム内容を記述します

		// entFactory
		const eFactry = new EntFactory(this.scene);
		// 各アセットオブジェクトを取得します
		const playerImageAsset = this.scene.asset.getImageById("gsanta");
		const shotImageAsset = this.scene.asset.getImageById("shot");
		const bgImageAsset = this.scene.asset.getImageById("bg-santa1");
		const presentImageAsset = this.scene.asset.getAllImages("present-box1");
		const seAudioAsset = this.scene.asset.getAudioById("se");

		// バックグラウンドを生成します
		const bg = new g.Sprite({
			scene: this.scene,
			src: bgImageAsset,
			width: bgImageAsset.width,
			height: bgImageAsset.height
		});
		this.scene.append(bg);

		const player = eFactry.createPlayer();

		// プレイヤーの初期座標を、画面の中心に設定します
		player.x = (g.game.width - player.width) / 2 -400;
		player.y = (g.game.height - player.height) / 2 -500;
		player.onUpdate.add(() => {
			// 毎フレームでY座標を再計算し、プレイヤーの飛んでいる動きを表現します
			// ここではMath.sinを利用して、時間経過によって増加するg.game.ageと組み合わせて
			player.y = (g.game.height - player.height) / 2 + Math.sin(g.game.age % (g.game.fps * 10) / 4) * 10;

			// プレイヤーの座標に変更があった場合、 modified() を実行して変更をゲームに通知します
			player.modified();
		});
		this.scene.append(player);

		// const damy = eFactry.createPresent();
		// scene.append(damy);

		// フォントの生成
		const font = new g.DynamicFont({
			game: g.game,
			fontFamily: "sans-serif",
			size: 48
		});

		// スコア表示用のラベル
		const scoreLabel = new g.Label({
			scene: this.scene,
			text: "SCORE: 0",
			font: font,
			fontSize: font.size / 2,
			textColor: "black"
		});
		this.scene.append(scoreLabel);

		// 残り時間表示用ラベル
		const timeLabel = new g.Label({
			scene: this.scene,
			text: "TIME: 0",
			font: font,
			fontSize: font.size / 2,
			textColor: "black",
			x: 0.65 * g.game.width
		});
		this.scene.append(timeLabel);

		//HouseMgr
		const houseMgr = new HouseMgr(this.scene);

		// 画面をタッチしたとき、SEを鳴らします
		this.scene.onPointDownCapture.add(() => {
			// 制限時間以内であればタッチ1回ごとにSCOREに+1します
			if (this.time > 0) {
				g.game.vars.gameState.score++;
				scoreLabel.text = "SCORE: " + g.game.vars.gameState.score;
				scoreLabel.invalidate();
			}
			seAudioAsset.play();

			const pr = eFactry.createPresent();
			pr.x = player.x + 100;
			pr.y = player.y + 48;
			this.scene.append(pr);
		});

			
		const updateHandler = (): void => {
			const buildHouse = ()=> {
				return eFactry.createHouse();
				

			}

			

			if (this.time <= 0) {
				// ゲームアツマール環境であればランキングを表示します
				if (this.isAtumaru) {
					const boardId = 1;
					this.window.RPGAtsumaru.experimental.scoreboards.setRecord(boardId, g.game.vars.gameState.score).then(function () {
						this.window.RPGAtsumaru.experimental.scoreboards.display(boardId);
					});
				}
				this.scene.onUpdate.remove(updateHandler); // カウントダウンを止めるためにこのイベントハンドラを削除します
			}

			houseMgr.onUpdate();

			// カウントダウン処理
			this.time -= 1 / g.game.fps;
			timeLabel.text = "TIME: " + Math.ceil(this.time);
			timeLabel.invalidate();
		};
		this.scene.onUpdate.add(updateHandler);
		// ここまでゲーム内容を記述します
	};

}