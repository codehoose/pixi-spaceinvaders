import { BaseState } from '../fsm/BaseState';
import { Keyboard } from '../Keyboard';
import { DisplayText } from '../DisplayText';
import { changeToState } from '../framework';

export class AttractModeState extends BaseState {
    private readonly _message: string;
    private readonly _key: string;
    private readonly _nextState: string;

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

    public constructor(message: string, key: string, nextState: string) {
        super();

        this._message = message;
        this._key = key;
        this._nextState = nextState;
    }

    public update(deltaTime: number): void {
        if (this._p.isDown) {
            changeToState(this._nextState);
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
        this._text = new DisplayText(this._message, 110, 90, "Arial", 12, "center");
        this._text.color = 0xFFFFFF;
        this._p = new Keyboard(this._key);
    }

    public exit(): void {
        this._text.destroy();
        this._p.destroy();
    }
}