import * as PIXI from "pixi.js";
import { Keyboard } from './Keyboard';
import { Bullet } from "./Bullet";

export class Tank {
    private static HORIZONTAL_SPEED: number = 100;

    private readonly _left: Keyboard;
    private readonly _right: Keyboard;
    private readonly _space: Keyboard;

    private _fireCooldown: number = 0;
    private _x: number;

    private readonly _bulletTexture: PIXI.Texture;
    private readonly _stage: PIXI.Container;

    private readonly _sprite: PIXI.Sprite;
    public get sprite(): PIXI.Sprite {
        return this._sprite;
    }

    private _bullets: Bullet[] = [];
    public get bullets(): Bullet[] {
        return this._bullets;
    }

    public constructor(stage: PIXI.Container, tankTexture: PIXI.Texture, bullet: PIXI.Texture) {
        this._stage = stage;
        this._sprite = new PIXI.Sprite(tankTexture);
        this._bulletTexture = bullet;
        this._sprite.position.x = 144;
        this._x = 144;
        this._sprite.position.y = 184;
        this._left = new Keyboard("ArrowLeft");
        this._right = new Keyboard("ArrowRight");
        this._space = new Keyboard(" ");
    }

    public removeBullet(bullet: Bullet): void {
        bullet.sprite.destroy();
        this._bullets = this._bullets.filter((b: Bullet) => b !== bullet);
    }

    private moveRight(): void {
        this._x += Tank.HORIZONTAL_SPEED * (PIXI.Ticker.shared.elapsedMS / 1000.0);
        this._sprite.position.x = Math.ceil(this._x);
        if (this._sprite.position.x > 304) {
            this._sprite.position.x = 304;
            this._x = 304;
        }
    }

    private moveLeft(): void { 
        this._x -= Tank.HORIZONTAL_SPEED * (PIXI.Ticker.shared.elapsedMS / 1000.0);
        this._sprite.position.x = Math.ceil(this._x);
        if (this._sprite.position.x < 0) {
            this._sprite.position.x = 0;
            this._x = 0;
        }
    }

    private fire(): void { 
        if (this._fireCooldown > 0) {
            return;
        }
        
        this._fireCooldown = 1000;
        this._bullets.push(new Bullet(this._stage, this._bulletTexture, this._sprite.position.x + 7, this._sprite.position.y - 8));
    }

    public update(deltaTime: number): void {
        if (this._fireCooldown > 0) {
            this._fireCooldown -= PIXI.Ticker.shared.elapsedMS;
            if (this._fireCooldown < 0) {
                this._fireCooldown = 0;
            }
        }

        if (this._space.isDown) {
            this.fire();
        }

        if (this._right.isDown) {
            this.moveRight();
        } else if (this._left.isDown) {
            this.moveLeft();
        }

        this._bullets.forEach((b: Bullet) => {
            b.update();
        });
    }
}