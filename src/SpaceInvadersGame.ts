import { Game } from './Game';
import { AttractModeState } from './states/AttractModeState';
import { GameState } from './states/GameState';

import aliensImage from "./assets/aliens.png";
import tankImage from "./assets/tank.png";
import shotImage from "./assets/shot.png";
import explosionImage from "./assets/explosion.png";
import alienShotImage from "./assets/alienshot.png";
import tankExplosion from "./assets/tank-explosion.png";

export class SpaceInvadersGame extends Game {
    public constructor(width: number, height: number, backgroundColor?: number) {
        super(width, height, backgroundColor);

        this.loader.add("aliens", aliensImage)
            .add("tank", tankImage)
            .add("explosion", explosionImage)
            .add("shot", shotImage)
            .add("alienshot", alienShotImage)
            .add("tankexplosion", tankExplosion)
            .load(() => this.onAssetsLoaded());
    }

    private onAssetsLoaded(): void {
        this.stateManager.add("game", new GameState());
        this.stateManager.add("attract", new AttractModeState());
        this.stateManager.changeTo("attract");
        this.run();
    }    
}