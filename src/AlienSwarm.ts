import * as PIXI from "pixi.js";
import { AlienRow } from "./AlienRow";
import { AnimatedAlien } from "./aliens/AnimatedAlien";

export class AlienSwarm {

    private _count: number = 0;
    private _moveMs: number = 1000;
    private _travel: number = 4;

    private readonly _squid: AlienRow;
    public get squid(): AlienRow {
        return this._squid;
    }

    private readonly _horns: AlienRow;
    public get horns(): AlienRow {
        return this._horns;
    }

    public readonly _octopus: AlienRow;
    public get octopus(): AlienRow {
        return this._octopus;
    }

    private readonly _rows: AlienRow[];

    public constructor(container: PIXI.Container, baseTexture: PIXI.BaseTexture) {
        this._squid = new AlienRow(container);
        this._horns = new AlienRow(container);
        this._octopus = new AlienRow(container);

        this._rows = [this._squid, this._horns, this._octopus];

        const sx: number = 72; // Starting X-co-ordinate
        const sy: number = 16; // Starting Y-co-ordinate

        let x: number = 16; 
        let y: number = sy;

        for (let s: number = 0; s < 11; s++) {
            this.squid.add(new AnimatedAlien(baseTexture,  2,  5), sx + (x * s), y);
        }

        y += 16;
        for (let s: number = 0; s < 11; s++) {
            this.horns.add(new AnimatedAlien(baseTexture,  1,  4), sx + (x * s), y);
        }     
        y += 16;
        for (let s: number = 0; s < 11; s++) {
            this.horns.add(new AnimatedAlien(baseTexture,  1,  4), sx + (x * s), y);
        }   
        
        y += 16;
        for (let s: number = 0; s < 11; s++) {
            this.octopus.add(new AnimatedAlien(baseTexture,  0,  3), sx + (x * s), y);
        }   
        y += 16;
        for (let s: number = 0; s < 11; s++) {
            this.octopus.add(new AnimatedAlien(baseTexture,  0,  3), sx + (x * s), y);
        }   
    }

    public update(delta: number): void {        
        this._count += PIXI.Ticker.shared.elapsedMS;
        if (this._count >= this._moveMs) {
            this._count -= this._moveMs;

            let cantMove: boolean = false;
            let descend: boolean = false;
            if (this._travel > 0) {
                this._rows.forEach((row: AlienRow) => cantMove = cantMove || row.atRightMost(304));
                if (cantMove) {
                    descend = true;
                }
            } else {
                this._rows.forEach((row: AlienRow) => cantMove = cantMove || row.atLeftMost(0));
                if (cantMove) {
                    descend = true;
                }
            }

            if (descend) {
                this._travel *= -1;
                this._rows.forEach((row: AlienRow) => row.moveDown(16));
            } else {
                this._rows.forEach((row: AlienRow) => row.moveAcross(this._travel));
            }

            this._rows.forEach((row: AlienRow) => row.nextFrame());
        }
    }
}