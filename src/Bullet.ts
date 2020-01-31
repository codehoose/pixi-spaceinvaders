import { PSprite } from './PSprite';
import { createSpriteFrom } from './framework';
import { setSpriteFrame } from './framework/CreateFunctions';

export class Bullet {
    private static SPEED: number = 50;
    private static FRAME_SPEED: number = 0.1;

    private readonly _x: number;
    private readonly _speed: number;
    private readonly _frames: number;
    private readonly _bulletTextureName: string;
    private _y: number;
    private _frameID: number = 0;
    private _frameCount: number = 0;

    private readonly _sprite: PSprite;
    public get sprite(): PSprite {
        return this._sprite;
    }

    public get tint(): number {
        return this._sprite.tint;
    }

    public set tint(tint: number) {
        this.sprite.tint = tint;
    }

    public constructor(bulletTextureName: string, x: number, y: number, frames: number = 1, direction: number = -1) {
        this._x = x;
        this._y = y;
        this._speed = Bullet.SPEED * direction;
        this._frames = frames;
        this._bulletTextureName = bulletTextureName;

        this._sprite = createSpriteFrom(bulletTextureName);
        this._sprite.set(this._x, this._y);
    }

    public destroy(): void {
        this._sprite.destroy();
    }

    public update(deltaTime: number): void {
        this._sprite.y += this._speed * deltaTime;

        if (this._frameCount > 0) {
            this._frameCount -= deltaTime;
        } else {
            this._frameCount = Bullet.FRAME_SPEED;
            this._frameID = (this._frameID + 1) % this._frames;
            setSpriteFrame(this._sprite, this._bulletTextureName, this._frameID, 3, 8);
        }
    }
}