import * as PIXI from "pixi.js";

import { GameObject } from "engine/GameObject";

export class StageManager {

    private readonly _root: GameObject;
    private readonly _stage: PIXI.Container;

    public get stage(): PIXI.Container {
        return this._stage;
    }

    public add(child: GameObject): void {
        // // this._stage.addChild(container);
        // this._root.addChild(child);
        child.addToScene(this._stage);
    }

    public constructor(stage: PIXI.Container) {
        this._stage = stage;
    }
}