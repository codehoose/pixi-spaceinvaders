import * as PIXI from "pixi.js";

export class StageManager {
    private readonly _stage: PIXI.Container;
    public get stage(): PIXI.Container {
        return this._stage;
    }

    public constructor(stage: PIXI.Container) {
        this._stage = stage;
    }
}