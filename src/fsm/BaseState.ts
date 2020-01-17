import * as PIXI from "pixi.js";

export abstract class BaseState {

    private readonly _app: PIXI.Application;
    protected get app(): PIXI.Application {
        return this._app;
    }

    private readonly _stage: PIXI.Container;
    protected get stage(): PIXI.Container {
        return this._stage;
    }

    public constructor(app: PIXI.Application, stage: PIXI.Container) {
        this._app = app;
        this._stage = stage;
    }

    public abstract update(deltaTime: number): void;

    public abstract enter(): void;
    
    public abstract exit(): void;
}