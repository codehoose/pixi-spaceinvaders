import * as PIXI from 'pixi.js';
import { Game } from './Game';

export class PSprite {
    private readonly _sprite: PIXI.Sprite;

    public get x(): number {
        return this._sprite.x;
    }

    public set x(x: number) {
        this._sprite.x = x;
    }

    public get y(): number {
        return this._sprite.y;
    }

    public get width(): number {
        return this._sprite.width;
    }

    public get height(): number {
        return this._sprite.height;
    }

    public set y(y: number) {
        this._sprite.y = y;
    }

    public get tint(): number {
        return this._sprite.tint;
    }

    public set tint(tint: number) {
        this._sprite.tint = tint;
    }

    public constructor(textureName: string, container: PIXI.Container) {
        const texture: PIXI.Texture = textureName ? Game.instance.loader.getTexture(textureName) : undefined;
        this._sprite = new PIXI.Sprite(texture);
        if (container) {
            container.addChild(this._sprite);
        }
    }

    public destroy(): void {
        this._sprite.destroy();
    }

    public set(x: number, y: number): void {
        this._sprite.position.set(x, y);
    }

    public setTexture(texture: PIXI.Texture): void {
        this._sprite.texture = texture;
    }
}