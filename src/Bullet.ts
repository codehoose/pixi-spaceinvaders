import * as PIXI from "pixi.js";

export class Bullet {

    private readonly _x: number;
    private readonly _stage: PIXI.Container;
    private _y: number;

    private readonly _sprite: PIXI.Sprite;
    public get sprite(): PIXI.Sprite {
        return this._sprite;
    }

    public constructor(stage: PIXI.Container, texture: PIXI.Texture, x: number, y: number) {
        this._stage = stage;
        this._x = x;
        this._y = y;
        this._sprite = new PIXI.Sprite(texture);
        this._stage.addChild(this._sprite);
        this._sprite.position.set(this._x, this._y);
    }

    public update(): void {
        this._sprite.position.y -= 50 * (PIXI.Ticker.shared.elapsedMS / 1000.0);

    }
}