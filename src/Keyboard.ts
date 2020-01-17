export class Keyboard {
    private readonly _key: string;
    
    private readonly _onUp: (ev: KeyboardEvent) => void;
    private readonly _onDown: (ev: KeyboardEvent) => void;

    private _isDown: boolean = false;
    public get isDown(): boolean { 
        return this._isDown;
    }

    public constructor(key: string) {
        this._key = key;
        this._onDown = (ev: KeyboardEvent) => this.onKeyDown(ev.key);
        window.addEventListener(
            "keydown", this._onDown, false
          );

        this._onUp = (ev: KeyboardEvent) => this.onKeyUp(ev.key);
        window.addEventListener(
            "keyup", this._onUp, false
        );
    }

    public destroy(): void {
        window.removeEventListener("keydown", this._onDown);
        window.removeEventListener("keyup", this._onUp);
    }

    private onKeyDown(key: string) {
        if (key === this._key) {
            this._isDown = true;
        }
    }

    private onKeyUp(key: string) {
        if (key === this._key) {
            this._isDown = false;
        }
    }
}