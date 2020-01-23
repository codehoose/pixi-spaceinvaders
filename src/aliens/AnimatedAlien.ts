import { BaseAlien } from "./BaseAlien";
import { setSpriteTexture } from '../framework';

export class AnimatedAlien extends BaseAlien {
    private readonly _explosion: string;

    private _points: number;
    public get points(): number {
        return this._points;
    }

    private _isDead: boolean = false;
    public get isDead(): boolean {
        return this._isDead;
    }

    public constructor(alienTexture: string, explosionTexture: string, frame0: number, frame1: number, points: number) {
        super(alienTexture, 16, 8);

        this._explosion = explosionTexture;
        this._points = points;
        this.frameIndices.push(frame0, frame1);
        this.setFrame(0);
    }

    public showExplosion() {
        setSpriteTexture(this.sprite, this._explosion);
        this._isDead = true;
    }
}