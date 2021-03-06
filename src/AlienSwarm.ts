import { AlienRow } from "./AlienRow";
import { AnimatedAlien } from "./aliens/AnimatedAlien";
import { Bullet } from './Bullet';
import { PSprite } from './PSprite';
import { randomRange } from './framework/RandomFunctions';
import { Game } from './Game';
import { Tank } from './Tank';

export type BulletAlien = {
    alien?: AnimatedAlien;
    alienRow?: AlienRow;
    bullet?: Bullet;
}

export class AlienSwarm {
    private _count: number = 0;
    private _moveSecs: number = 1;
    private _travel: number = 4;
    private _bulletCooldown: number = 0;
    private _bullets: Bullet[] = [];

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

    public constructor(alienTexture: string, explosionTexture: string) {
        this._squid = new AlienRow(0x00cc00);
        this._horns = new AlienRow(0xcccc00);
        this._octopus = new AlienRow(0xcc00cc);

        this._rows = [this._squid, this._horns, this._octopus];

        const sx: number = 72; // Starting X-co-ordinate
        const sy: number = 32; // Starting Y-co-ordinate

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

    public destroy(): void {
        this._rows.forEach((row: AlienRow) => row.destroy());
        this._bullets.forEach((b: Bullet) => b.destroy());
    }

    public checkTankCollision(tank: Tank): boolean {
        let result: boolean = false;
        this._bullets.forEach((b: Bullet) => {
            if (this.hitTestRectangle(tank.sprite, b.sprite)) {
                b.sprite.destroy();
                this._bullets = this._bullets.filter((b2: Bullet) => b2 !== b);
                result = true;
            }
        });
        return result;
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
    private hitTestRectangle(r1: PSprite, r2: PSprite) {

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

    public update(deltaTime: number): void {  
        this._count += deltaTime;
        if (this._count >= this._moveSecs) {
            this._count -= this._moveSecs;

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
                this._moveSecs -= 0.2;
                if (this._moveSecs <= 0.2) {
                    this._moveSecs = 0.2;
                }
            } else {
                this._rows.forEach((row: AlienRow) => row.moveAcross(this._travel));
            }

            this._rows.forEach((row: AlienRow) => row.nextFrame());
        }

        this.shootBullet(deltaTime);
        this._bullets.forEach((b: Bullet) => b.update(deltaTime));
    }

    private shootBullet(deltaTime: number): void {
        if (this._bulletCooldown >= 0) {
            this._bulletCooldown -= deltaTime;
            return;
        }

        const rowIndex: number = randomRange(this._rows.length);
        const alienIndex: number = randomRange(this._rows[rowIndex].aliens.length);
        const alien: AnimatedAlien = this._rows[rowIndex].aliens[alienIndex];

        if (alien) {
            const bullet: Bullet = new Bullet("alienshot", alien.x, alien.y, 4, 1);
            bullet.tint = this._rows[rowIndex].tint;
            this._bullets.push(bullet);
            this._bulletCooldown = 2;
        }

        if (this._bullets.length > 5) {
            const b: Bullet = this._bullets.shift();
            b.destroy();
        }
    }
}