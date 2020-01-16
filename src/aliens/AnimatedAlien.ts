import * as PIXI from "pixi.js";
import { BaseAlien } from "./BaseAlien";

export class AnimatedAlien extends BaseAlien {
    
    private readonly _explosion: PIXI.BaseTexture;

    private _points: number;
    public get points(): number {
        return this._points;
    }

    private _isDead: boolean = false;
    public get isDead(): boolean {
        return this._isDead;
    }

    public constructor(alienTexture: PIXI.BaseTexture, explosionTexture: PIXI.BaseTexture, frame0: number, frame1: number, points: number) {
        super(alienTexture, 16, 8);

        this._explosion = explosionTexture;
        this._points = points;
        this.frames.push(this.createTexture(frame0));
        this.frames.push(this.createTexture(frame1));
        this.setFrame(0);
    }

    public showExplosion() {
        this.sprite.texture = new PIXI.Texture(this._explosion);
        this._isDead = true;
    }
}