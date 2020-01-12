import * as PIXI from "pixi.js";

export class BaseAlien {

    private readonly _baseTexture: PIXI.BaseTexture;
    private readonly _cellWidth: number;
    private readonly _cellHeight: number;
    private readonly _columns: number;

    private _currentFrame: number = -1;

    protected readonly _frames: PIXI.Texture[] = [];
    protected get frames(): PIXI.Texture[] {
        return this._frames;
    }

    protected _sprite: PIXI.Sprite = new PIXI.Sprite();
    public get sprite(): PIXI.Sprite {
        return this._sprite;
    }

    public constructor(baseTexture: PIXI.BaseTexture, cellWidth: number, cellHeight: number) {
        this._cellWidth = cellWidth;
        this._cellHeight = cellHeight;
        this._columns = baseTexture.width / cellWidth;
        this._baseTexture = baseTexture;
    }

    public setFrame(frameId: number): void {
        this._currentFrame = frameId;
        this._currentFrame %= this.frames.length;
        this.sprite.texture = this.frames[this._currentFrame];
    }

    public nextFrame(): void {
        this.setFrame(this._currentFrame + 1);
    }

    protected createTexture(frameId: number): PIXI.Texture {
        const x: number = Math.floor(frameId % this._columns) * this._cellWidth;
        const y: number = Math.floor(frameId / this._columns) * this._cellHeight;
        const rect: PIXI.Rectangle = new PIXI.Rectangle(x, y, this._cellWidth, this._cellHeight);

        return new PIXI.Texture(this._baseTexture, rect);
    }
}