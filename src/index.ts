import * as PIXI from "pixi.js";
import { AlienSwarm } from "./AlienSwarm";
import rabbitImage from "./assets/aliens.png";

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
        loader.add("rabbit", rabbitImage);
        loader.on("complete", () => {
            this.onAssetsLoaded();
        });
        loader.load();
    }

    private onAssetsLoaded(): void {
        this.createRenderer();

        const stage = this.app!.stage;
        const aliens: PIXI.BaseTexture = PIXI.Texture.from("rabbit").baseTexture;
        const swarm: AlienSwarm = new AlienSwarm(stage, aliens);

        this.app!.ticker.add((delta: number) => {
            swarm.update(delta);
        });
    }

    private createRenderer(): void {
        this.app = new PIXI.Application({
            backgroundColor: 0x330033,
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

    // private attachPixiConsole() {
    //     const consoleConfig = new PixiConsoleConfig();
    //     consoleConfig.consoleWidth = this.app!.view.width;
    //     consoleConfig.consoleHeight = this.app!.view.height;
    //     consoleConfig.backgroundAlpha = 0;

    //     const pixiConsole = new PixiConsole(consoleConfig);
    //     pixiConsole.show();

    //     this.app!.stage.addChild(pixiConsole);

    //     console.log("Pixi-console added 🦾");
    //     console.warn("Warnings example ✌");
    //     setTimeout(() => {
    //         throw new Error("Uncaught error example 👮‍♀️");
    //     }, 0);
    // }

    // private getBunny(): PIXI.Sprite {
    //     const bunnyRotationPoint = {
    //         x: 0.5,
    //         y: 0.5,
    //     };

    //     const bunny = new PIXI.Sprite(PIXI.Texture.from("rabbit"));
    //     bunny.anchor.set(bunnyRotationPoint.x, bunnyRotationPoint.y);
    //     bunny.scale.set(2, 2);

    //     return bunny;
    // }

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
