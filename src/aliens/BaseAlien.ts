import { PSprite } from '../PSprite';
import { setSpriteFrame, createSprite } from '../framework';

export class BaseAlien {

    private readonly _textureName: string;
    private readonly _cellWidth: number;
    private readonly _cellHeight: number;
    private _currentFrame: number = -1;

    protected readonly _frameIndices: number[] = [];
    protected get frameIndices(): number[] {
        return this._frameIndices;
    }

    protected _sprite: PSprite;
    public get sprite(): PSprite {
        return this._sprite;
    }

    public get x(): number {
        return this._sprite.x;
    }

    public set x(x: number) {
        this._sprite.x = x;
    }

    public get y(): number {
        return this._sprite.y;
    }

    public set y(y: number) {
        this._sprite.y = y;
    }

    public constructor(textureName: string, cellWidth: number, cellHeight: number) {
        this._cellWidth = cellWidth;
        this._cellHeight = cellHeight;
        this._textureName = textureName;
        this._sprite = createSprite();
    }

    public setFrame(frameId: number): void {
        this._currentFrame = frameId;
        this._currentFrame %= this.frameIndices.length;
        setSpriteFrame(this.sprite, this._textureName, this.frameIndices[this._currentFrame], this._cellWidth, this._cellHeight);
    }

    public nextFrame(): void {
        this.setFrame(this._currentFrame + 1);
    }
}