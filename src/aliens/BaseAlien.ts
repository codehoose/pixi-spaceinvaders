import { PSprite } from '../PSprite';
import { setSpriteFrame, createSprite } from '../framework/CreateFunctions';

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