import aliensImage from "./assets/aliens.png";
import tankImage from "./assets/tank.png";
import shotImage from "./assets/shot.png";
import explosionImage from "./assets/explosion.png";
import { GameState } from './states/GameState';
import { Game } from './Game';

export class Main {
    private _game: Game;

    constructor() {
        window.onload = (): void => {
            this.startGame();
        };
    }

    private startGame(): void {
        this._game = new Game(320, 200);
        this._game.loader.add("aliens", aliensImage)
            .add("tank", tankImage)
            .add("explosion", explosionImage)
            .add("shot", shotImage)
            .load(() => this.onAssetsLoaded());
    }

    private onAssetsLoaded(): void {
        console.log(`${this._game.app} ${this._game.app.stage.name}`);
        this._game.stateManager.add("game", new GameState(this._game.app, this._game.app.stage));
        this._game.stateManager.changeTo("game");
        this._game.run();
    }
}

new Main();
