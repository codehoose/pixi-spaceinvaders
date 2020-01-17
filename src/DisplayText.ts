import * as PIXI from 'pixi.js';
import { Game } from './Game';

export class DisplayText {

    private _text: PIXI.Text;
    private _style: PIXI.TextStyle;

    public get text(): string {
        return this._text.text;
    }

    public set text(text: string) {
        this._text.text = text;
    }

    public get color(): number {
        return this._style.fill as number;
    }

    public set color(color: number) {
        this._style.fill = color;
    }

    public constructor(text: string, x?: number, y?: number, fontFamily?: string, fontSize?: number, align?: string) {
        this._style = new PIXI.TextStyle();
        if (fontFamily) {
            this._style.fontFamily = fontFamily;
            this._style.fontSize = fontSize;
            this._style.align = align;
        }
        this._text = new PIXI.Text(text, this._style);
        Game.instance.stageManager.stage.addChild(this._text);
        if (x && y) {
            this._text.position.set(x, y);
        }
    }

    public destroy(): void {
        this._text.destroy();
    }
}