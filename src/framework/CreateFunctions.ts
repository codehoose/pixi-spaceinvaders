import * as PIXI from 'pixi.js';
import { PSprite } from '../PSprite';
import { Game } from '../Game';

export function createSpriteFrom(textureName: string): PSprite {
    const sprite: PSprite = new PSprite(textureName, Game.instance.stageManager.stage);
    return sprite;
}

export function createSprite(): PSprite {
    return new PSprite(undefined, Game.instance.stageManager.stage);
}

export function setSpriteTexture(sprite: PSprite, textureName: string): void {
    const texture: PIXI.Texture = Game.instance.loader.getTexture(textureName);
    sprite.setTexture(texture);
}

export function setSpriteFrame(sprite: PSprite, textureName: string, frameId: number, cellWidth: number, cellHeight: number): void {
    const name: string = `${textureName}.${frameId}`;
    if (Game.instance.loader.hasTexture(name)) {
        sprite.setTexture(Game.instance.loader.getTexture(name));
    } else {
        const baseTexture: PIXI.Texture = Game.instance.loader.getTexture(textureName);
        const columns: number = baseTexture.width / cellWidth;

        const x: number = Math.floor(frameId % columns) * cellWidth;
        const y: number = Math.floor(frameId / columns) * cellHeight;
        const rect: PIXI.Rectangle = new PIXI.Rectangle(x, y, cellWidth, cellHeight);
        
        const texture: PIXI.Texture = new PIXI.Texture(baseTexture.baseTexture, rect);
        Game.instance.loader.addTexture(name, texture);
        sprite.setTexture(texture);
    }
}