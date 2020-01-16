export class Keyboard {
    private readonly _key: string;
    
    private _isDown: boolean = false;
    public get isDown(): boolean { 
        return this._isDown;
    }

    public constructor(key: string) {
        this._key = key;
        window.addEventListener(
            "keydown", (ev: KeyboardEvent) => this.onKeyDown(ev.key), false
          );

        window.addEventListener(
            "keyup", (ev: KeyboardEvent) => this.onKeyUp(ev.key), false
        );
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