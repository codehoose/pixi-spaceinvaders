import { Game } from '../Game';

export function changeToState(stateName: string): void {
    Game.instance.stateManager.changeTo(stateName);
}