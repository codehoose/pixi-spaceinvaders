import { Keyboard } from './Keyboard';
import { Bullet } from "./Bullet";
import { createSpriteFrom } from './framework';
import { PSprite } from './PSprite';

export class Tank {
    private static HORIZONTAL_SPEED: number = 100;

    private readonly _left: Keyboard;
    private readonly _right: Keyboard;
    private readonly _shoot: Keyboard;

    private _fireCooldown: number = 0;
    private _x: number;

    private readonly _bulletTexture: string;

    private readonly _sprite: PSprite;
    public get sprite(): PSprite {
        return this._sprite;
    }

    private _bullets: Bullet[] = [];
    public get bullets(): Bullet[] {
        return this._bullets;
    }

    public constructor(tankTexture: string, bulletTexture: string) {
        this._sprite = createSpriteFrom(tankTexture);
        this._bulletTexture = bulletTexture;
        this._sprite.x = 144;
        this._x = 144;
        this._sprite.y = 184;
        this._left = new Keyboard("ArrowLeft");
        this._right = new Keyboard("ArrowRight");
        this._shoot = new Keyboard(" ");
    }

    public destroy(): void {
        this._sprite.destroy();
        this._left.destroy();
        this._right.destroy();
        this._shoot.destroy();
        this._bullets.forEach((b: Bullet) => b.destroy());
        this._bullets = [];
    }

    public removeBullet(bullet: Bullet): void {
        bullet.sprite.destroy();
        this._bullets = this._bullets.filter((b: Bullet) => b !== bullet);
    }

    private moveRight(deltaTime: number): void {
        this._x += Tank.HORIZONTAL_SPEED * deltaTime;
        this._sprite.x = Math.ceil(this._x);
        if (this._sprite.x > 304) {
            this._sprite.x = 304;
            this._x = 304;
        }
    }

    private moveLeft(deltaTime: number): void { 
        this._x -= Tank.HORIZONTAL_SPEED * deltaTime;
        this._sprite.x = Math.ceil(this._x);
        if (this._sprite.x < 0) {
            this._sprite.x = 0;
            this._x = 0;
        }
    }

    private fire(): void { 
        if (this._fireCooldown > 0) {
            return;
        }
        
        this._fireCooldown = 1;
        this._bullets.push(new Bullet(this._bulletTexture, this._sprite.x + 7, this._sprite.y - 8));
    }

    public update(deltaTime: number): void {
        if (this._fireCooldown > 0) {
            this._fireCooldown -= deltaTime;
            if (this._fireCooldown < 0) {
                this._fireCooldown = 0;
            }
        }

        if (this._shoot.isDown) {
            this.fire();
        }

        if (this._right.isDown) {
            this.moveRight(deltaTime);
        } else if (this._left.isDown) {
            this.moveLeft(deltaTime);
        }

        this._bullets.forEach((b: Bullet) => {
            b.update(deltaTime);
        });
    }
}