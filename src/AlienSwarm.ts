import * as PIXI from "pixi.js";
import { AlienRow } from "./AlienRow";
import { AnimatedAlien } from "./aliens/AnimatedAlien";
import { Bullet } from './Bullet';

export type BulletAlien = {
    alien?: AnimatedAlien;
    alienRow?: AlienRow;
    bullet?: Bullet;
}

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

    public constructor(container: PIXI.Container, alienTexture: PIXI.BaseTexture, explosionTexture: PIXI.BaseTexture) {
        this._squid = new AlienRow(container, 0x00cc00);
        this._horns = new AlienRow(container, 0xcccc00);
        this._octopus = new AlienRow(container, 0xcc00cc);

        this._rows = [this._squid, this._horns, this._octopus];

        const sx: number = 72; // Starting X-co-ordinate
        const sy: number = 16; // Starting Y-co-ordinate

        let x: number = 16; 
        let y: number = sy;

        for (let s: number = 0; s < 11; s++) {
            this.squid.add(new AnimatedAlien(alienTexture, explosionTexture, 2, 5, 30), sx + (x * s), y);
        }

        y += 16;
        for (let s: number = 0; s < 11; s++) {
            this.horns.add(new AnimatedAlien(alienTexture, explosionTexture, 1, 4, 20), sx + (x * s), y);
        }     
        y += 16;
        for (let s: number = 0; s < 11; s++) {
            this.horns.add(new AnimatedAlien(alienTexture, explosionTexture, 1, 4, 20), sx + (x * s), y);
        }   
        
        y += 16;
        for (let s: number = 0; s < 11; s++) {
            this.octopus.add(new AnimatedAlien(alienTexture, explosionTexture, 0, 3, 10), sx + (x * s), y);
        }   
        y += 16;
        for (let s: number = 0; s < 11; s++) {
            this.octopus.add(new AnimatedAlien(alienTexture, explosionTexture, 0, 3, 10), sx + (x * s), y);
        }   
    }

    public checkCollisions(bullets: Bullet[]): BulletAlien {
        let hit: BulletAlien = { };
        this._rows.forEach((alienRow: AlienRow) => {
            alienRow.aliens.forEach((alien: AnimatedAlien) => {
                bullets.forEach((bullet: Bullet) => {
                    if (this.hitTestRectangle(alien.sprite, bullet.sprite)) {
                        hit = {
                            alien,
                            alienRow,
                            bullet
                        }; 
                    }
                });
            });
        });

        return hit;
    }

    // FROM https://github.com/kittykatattack/learningPixi#the-hittestrectangle-function
    private hitTestRectangle(r1: PIXI.Sprite, r2: PIXI.Sprite) {

        //Define the variables we'll need to calculate
        let hit: boolean = false;
        let combinedHalfWidths: number = 0;
        let combinedHalfHeights: number = 0
        let vx: number = 0;
        let vy: number = 0;
      
        //hit will determine whether there's a collision
        hit = false;
      
        //Find the center points of each sprite
        const r1centerX: number = r1.x + r1.width / 2;
        const r1centerY: number = r1.y + r1.height / 2;
        const r2centerX: number = r2.x + r2.width / 2;
        const r2centerY: number = r2.y + r2.height / 2;
      
        //Find the half-widths and half-heights of each sprite
        const r1halfWidth: number = r1.width / 2;
        const r1halfHeight: number = r1.height / 2;
        const r2halfWidth: number = r2.width / 2;
        const r2halfHeight: number = r2.height / 2;
      
        //Calculate the distance vector between the sprites
        vx = r1centerX - r2centerX;
        vy = r1centerY - r2centerY;
      
        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = r1halfWidth + r2halfWidth;
        combinedHalfHeights = r1halfHeight + r2halfHeight;
      
        //Check for a collision on the x axis
        if (Math.abs(vx) < combinedHalfWidths) {
      
          //A collision might be occurring. Check for a collision on the y axis
          if (Math.abs(vy) < combinedHalfHeights) {
      
            //There's definitely a collision happening
            hit = true;
          } else {
      
            //There's no collision on the y axis
            hit = false;
          }
        } else {
      
          //There's no collision on the x axis
          hit = false;
        }
      
        //`hit` will be either `true` or `false`
        return hit;
      };

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
                this._moveMs -= 200;
                if (this._moveMs <= 200) {
                    this._moveMs = 200;
                }
            } else {
                this._rows.forEach((row: AlienRow) => row.moveAcross(this._travel));
            }

            this._rows.forEach((row: AlienRow) => row.nextFrame());
        }
    }
}