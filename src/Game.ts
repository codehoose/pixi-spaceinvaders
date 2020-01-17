import * as PIXI from "pixi.js";
import { StateManager } from './fsm/StateManager';
import { ResourceManager } from './ResourceManager';
import { StageManager } from './StageManager';

export class Game {
    private readonly _width: number;
    private readonly _height: number;

    private _updateLoop: (n: number) => void;

    private readonly _app: PIXI.Application;
    public get app(): PIXI.Application {
        return this._app;
    }

    private static _instance: Game;
    public static get instance(): Game {
        return Game._instance;
    }

    private readonly _stateManager: StateManager;
    public get stateManager(): StateManager {
        return this._stateManager;
    }

    private readonly _resourceManager: ResourceManager;
    public get loader(): ResourceManager {
        return this._resourceManager;
    }

    private readonly _stageManager: StageManager;
    public get stageManager(): StageManager {
        return this._stageManager;
    }

    public constructor(width: number, height: number, backgroundColor: number = 0x0) {
        this._app = new PIXI.Application({
            backgroundColor,
            width,
            height,
        });

        this._width = width;
        this._height = height;
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;

        document.body.appendChild(this._app.view);

        this._app.renderer.resize(window.innerWidth, window.innerHeight);
        this._app.stage.scale.x = window.innerWidth / this._width;
        this._app.stage.scale.y = window.innerHeight / this._height;

        window.addEventListener("resize", this.onResize.bind(this));        

        this._stateManager = new StateManager(this);
        this._resourceManager = new ResourceManager();
        this._stageManager = new StageManager(this._app.stage);

        Game._instance = this;
    }

    public run(): void {
        this._updateLoop = (delta: number) => {
            this._stateManager.update(this._app.ticker.elapsedMS / 1000.0);
        };

        this._app!.ticker.add(this._updateLoop);
    }

    public stop(): void {
        this._app.ticker.remove(this._updateLoop);
    }

    private onResize(): void {
        if (!this._app) {
            return;
        }

        this._app.renderer.resize(window.innerWidth, window.innerHeight);
        this._app.stage.scale.x = window.innerWidth / this._width;
        this._app.stage.scale.y = window.innerHeight / this._height;
    }
}