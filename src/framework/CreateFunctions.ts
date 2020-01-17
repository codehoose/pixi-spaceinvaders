import { PSprite } from '../PSprite';
import { Game } from '../Game';

export function createSpriteFrom(textureName: string): PSprite {
    const sprite: PSprite = new PSprite(textureName, Game.instance.stageManager.stage);
    return sprite;
}