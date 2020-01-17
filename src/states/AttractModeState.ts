import * as PIXI from "pixi.js";
import { BaseState } from '../fsm/BaseState';
import { Keyboard } from '../Keyboard';
import { Game } from '../Game';
import { DisplayText } from '../DisplayText';

export class AttractModeState extends BaseState {

    private _text: DisplayText;
    private _p: Keyboard;
    private _count: number = 0;
    private _index: number = 0;

    private _colours: number[] = [
        0xFF0000,
        0x00FF00,
        0xFFFF00,
        0x00FFFF,
        0xFF00FF,
        0xFFFFFF,
        0xFFFF00
    ]

    public constructor(app: PIXI.Application, stage: PIXI.Container) {
        super(app, stage);
    }

    public update(deltaTime: number): void {
        if (this._p.isDown) {
            Game.instance.stateManager.changeTo("game");
        }

        if (this._count > 0) {
            this._count -= deltaTime;
            return;
        }

        this._text.color = this._colours[this._index];
        this._index = (this._index + 1) % this._colours.length;
        this._count = 0.25;
    }
    
    public enter(): void {
        this._text = new DisplayText("SPACE INVADERS\nPress 'P' to Play", 110, 90, "Arial", 12, "center");
        this._text.color = 0xFFFFFF;
        this._p = new Keyboard("p");
    }

    public exit(): void {
        this._text.destroy();
        this._p.destroy();
    }
}