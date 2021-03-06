import { ExceptionFactory } from "@akashic/akashic-engine";
import { EntFactory } from "./EntFactory";
import { House } from "./Ent/House";
import { GameMainParameterObject, RPGAtsumaruWindow } from "./parameterObject";
import { Present } from "./Ent/Present";
import { HouseMgr } from "./HouseMgr";
import { SantaScene } from "./MyScene/SnataScene";
import { AbsExtScene } from "./MyScene/AbsExtScene";
import { SantaScene2 } from "./MyScene/SantaScene2";

declare const window: RPGAtsumaruWindow;

export function main(param: GameMainParameterObject): void {

	let time = 60;
	if (param.sessionParameter.totalTimeLimit) {
		time = param.sessionParameter.totalTimeLimit; // セッションパラメータで制限時間が指定されたらその値を使用します
	}
	const scene = new g.Scene({
		game: g.game,
		// このシーンで利用するアセットのIDを列挙し、シーンに通知します
		assetIds: ["player", "shot", "se", "gsanta", "bg-santa1", "present-box1",
					"house3-1"],
		// window: window,
		// time: time,
		// isAtumaru: param.isAtsumaru
	});
	const scene2 = new SantaScene2({
		game: g.game,
		assetIds: ["player", "shot", "se", "gsanta", "bg-santa1", "present-box1",
					"house3-1"],
		window: window,
		time: time,
		isAtumaru: param.isAtsumaru

	})

	// const scene = new SantaScene({
	// 	game: g.game,
	// 	// このシーンで利用するアセットのIDを列挙し、シーンに通知します
	// 	assetIds: ["player", "shot", "se", "gsanta", "bg-santa1", "present-box1",
	// 				"house3-1"],
	// 	window: window,
	// 	time: time,
	// 	isAtumaru: param.isAtsumaru
	// });
	// let time = 60; // 制限時間
	// if (param.sessionParameter.totalTimeLimit) {
	// 	time = param.sessionParameter.totalTimeLimit; // セッションパラメータで制限時間が指定されたらその値を使用します
	// }
	// 市場コンテンツのランキングモードでは、g.game.vars.gameState.score の値をスコアとして扱います
	g.game.vars.gameState = { score: 0 };
	// scene.onLoad.add(() => {
	// 	// ここからゲーム内容を記述します

	// 	// entFactory
	// 	const eFactry = new EntFactory(scene);
	// 	// 各アセットオブジェクトを取得します
	// 	const playerImageAsset = scene.asset.getImageById("gsanta");
	// 	const shotImageAsset = scene.asset.getImageById("shot");
	// 	const bgImageAsset = scene.asset.getImageById("bg-santa1");
	// 	const presentImageAsset = scene.asset.getAllImages("present-box1");
	// 	const seAudioAsset = scene.asset.getAudioById("se");

	// 	// バックグラウンドを生成します
	// 	const bg = new g.Sprite({
	// 		scene: scene,
	// 		src: bgImageAsset,
	// 		width: bgImageAsset.width,
	// 		height: bgImageAsset.height
	// 	});
	// 	scene.append(bg);

	// 	const player = eFactry.createPlayer();

	// 	// プレイヤーの初期座標を、画面の中心に設定します
	// 	player.x = (g.game.width - player.width) / 2 -400;
	// 	player.y = (g.game.height - player.height) / 2 -500;
	// 	player.onUpdate.add(() => {
	// 		// 毎フレームでY座標を再計算し、プレイヤーの飛んでいる動きを表現します
	// 		// ここではMath.sinを利用して、時間経過によって増加するg.game.ageと組み合わせて
	// 		player.y = (g.game.height - player.height) / 2 + Math.sin(g.game.age % (g.game.fps * 10) / 4) * 10;

	// 		// プレイヤーの座標に変更があった場合、 modified() を実行して変更をゲームに通知します
	// 		player.modified();
	// 	});
	// 	scene.append(player);

	// 	// const damy = eFactry.createPresent();
	// 	// scene.append(damy);

	// 	// フォントの生成
	// 	const font = new g.DynamicFont({
	// 		game: g.game,
	// 		fontFamily: "sans-serif",
	// 		size: 48
	// 	});

	// 	// スコア表示用のラベル
	// 	const scoreLabel = new g.Label({
	// 		scene: scene,
	// 		text: "SCORE: 0",
	// 		font: font,
	// 		fontSize: font.size / 2,
	// 		textColor: "black"
	// 	});
	// 	scene.append(scoreLabel);

	// 	// 残り時間表示用ラベル
	// 	const timeLabel = new g.Label({
	// 		scene: scene,
	// 		text: "TIME: 0",
	// 		font: font,
	// 		fontSize: font.size / 2,
	// 		textColor: "black",
	// 		x: 0.65 * g.game.width
	// 	});
	// 	scene.append(timeLabel);

	// 	//HouseMgr
	// 	const houseMgr = new HouseMgr(scene, this);

	// 	// 画面をタッチしたとき、SEを鳴らします
	// 	scene.onPointDownCapture.add(() => {
	// 		// 制限時間以内であればタッチ1回ごとにSCOREに+1します
	// 		if (time > 0) {
	// 			g.game.vars.gameState.score++;
	// 			scoreLabel.text = "SCORE: " + g.game.vars.gameState.score;
	// 			scoreLabel.invalidate();
	// 		}
	// 		seAudioAsset.play();

	// 		const pr = eFactry.createPresent();
	// 		pr.x = player.x + 100;
	// 		pr.y = player.y + 48;
	// 		scene.append(pr);
	// 	});

			
	// 	const updateHandler = (): void => {
	// 		const buildHouse = ()=> {
	// 			return eFactry.createHouse();
				

	// 		}

			

	// 		if (time <= 0) {
	// 			// ゲームアツマール環境であればランキングを表示します
	// 			if (param.isAtsumaru) {
	// 				const boardId = 1;
	// 				window.RPGAtsumaru.experimental.scoreboards.setRecord(boardId, g.game.vars.gameState.score).then(function () {
	// 					window.RPGAtsumaru.experimental.scoreboards.display(boardId);
	// 				});
	// 			}
	// 			scene.onUpdate.remove(updateHandler); // カウントダウンを止めるためにこのイベントハンドラを削除します
	// 		}

	// 		houseMgr.onUpdate();

	// 		// カウントダウン処理
	// 		time -= 1 / g.game.fps;
	// 		timeLabel.text = "TIME: " + Math.ceil(time);
	// 		timeLabel.invalidate();
	// 	};
	// 	scene.onUpdate.add(updateHandler);
	// 	// ここまでゲーム内容を記述します
	// });
	g.game.pushScene(scene2.scene);
}
