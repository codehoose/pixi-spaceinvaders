import * as PIXI from "pixi.js";
import { AlienSwarm, BulletAlien } from './AlienSwarm';
import aliensImage from "./assets/aliens.png";
import tankImage from "./assets/tank.png";
import shotImage from "./assets/shot.png";
import explosionImage from "./assets/explosion.png";
import { Tank } from "~Tank";

export class Main {
    private static readonly GAME_WIDTH = 320;
    private static readonly GAME_HEIGHT = 200;

    private app: PIXI.Application | undefined;

    constructor() {
        window.onload = (): void => {
            this.startLoadingAssets();
        };
    }

    private startLoadingAssets(): void {
        const loader = PIXI.Loader.shared;
        loader.add("aliens", aliensImage)
              .add("tank", tankImage)
              .add("explosion", explosionImage)
              .add("shot", shotImage);
        loader.on("complete", () => {
            this.onAssetsLoaded();
        });
        loader.load();
    }

    private onAssetsLoaded(): void {
        this.createRenderer();

        const stage = this.app!.stage;
        const aliens: PIXI.BaseTexture = PIXI.Texture.from("aliens").baseTexture;
        const explosion: PIXI.BaseTexture = PIXI.Texture.from("explosion").baseTexture;
        const swarm: AlienSwarm = new AlienSwarm(stage, aliens, explosion);
        const tank: Tank = new Tank(stage, PIXI.Texture.from("tank"), PIXI.Texture.from("shot"));
        stage.addChild(tank.sprite);

        let score: number = 0;
        const scoreStyle: PIXI.TextStyle = new PIXI.TextStyle()
        scoreStyle.fill = 0xFFFFFF;
        scoreStyle.fontFamily = "Arial";
        scoreStyle.fontSize = 10;
        const scoreText: PIXI.Text = new PIXI.Text("Score: 0", scoreStyle);
        stage.addChild(scoreText);

        this.app!.ticker.add((delta: number) => {
            scoreText.text = `Score: ${score}`;

            tank.update(delta);
            swarm.update(delta);
            const hitResult: BulletAlien = swarm.checkCollisions(tank.bullets);
            
            if (hitResult.alien && hitResult.alienRow && hitResult.bullet) {
                tank.removeBullet(hitResult.bullet);
                hitResult.alienRow.removeAlien(hitResult.alien); 
                score = score += hitResult.alien.points;   
            }
        });
    }

    private createRenderer(): void {
        this.app = new PIXI.Application({
            backgroundColor: 0x0,
            width: Main.GAME_WIDTH,
            height: Main.GAME_HEIGHT,
        });

        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;

        document.body.appendChild(this.app.view);

        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.app.stage.scale.x = window.innerWidth / Main.GAME_WIDTH;
        this.app.stage.scale.y = window.innerHeight / Main.GAME_HEIGHT;

        window.addEventListener("resize", this.onResize.bind(this));
    }

    private onResize(): void {
        if (!this.app) {
            return;
        }

        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.app.stage.scale.x = window.innerWidth / Main.GAME_WIDTH;
        this.app.stage.scale.y = window.innerHeight / Main.GAME_HEIGHT;
    }
}

new Main();
