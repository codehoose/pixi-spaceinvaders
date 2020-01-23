import { PSprite } from './PSprite';
import { createSpriteFrom } from './framework';

export class Bullet {
    private readonly _x: number;
    private _y: number;

    private readonly _sprite: PSprite;
    public get sprite(): PSprite {
        return this._sprite;
    }

    public constructor(bulletTextureName: string, x: number, y: number) {
        this._x = x;
        this._y = y;

        this._sprite = createSpriteFrom(bulletTextureName);
        this._sprite.set(this._x, this._y);
    }

    public destroy(): void {
        this._sprite.destroy();
    }

    public update(deltaTime: number): void {
        this._sprite.y -= 50 * deltaTime;
    }
}