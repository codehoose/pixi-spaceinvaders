import { Game } from '../Game';

export function getTexture(textureName: string): PIXI.Texture {
    return Game.instance.loader.getTexture(textureName);
}