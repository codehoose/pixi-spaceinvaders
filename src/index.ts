import { SpaceInvadersGame } from './SpaceInvadersGame';

export class Main {
    constructor() {
        window.onload = (): void => {
            this.startGame();
        };
    }

    private startGame(): void {
        new SpaceInvadersGame(320, 200);
    }
}

new Main();
