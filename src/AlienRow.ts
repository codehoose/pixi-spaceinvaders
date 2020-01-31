import { AnimatedAlien } from './aliens/AnimatedAlien';

export class AlienRow {
    private readonly _tint: number;

    private _aliens: AnimatedAlien[] = [];
    public get aliens(): ReadonlyArray<AnimatedAlien> {
        return this._aliens;
    }

    public get tint(): number { 
        return this._tint;
    }

    public add(alien: AnimatedAlien, x: number, y: number) {
        alien.sprite.set(x, y);
        alien.sprite.tint = this._tint;
        this._aliens.push(alien);
    }

    public destroy(): void {
        this._aliens.forEach((a: AnimatedAlien) => a.sprite.destroy());
        this._aliens = [];
    }

    public removeAlien(alien: AnimatedAlien): void {
        alien.showExplosion();
    }

    public nextFrame(): void {
        this._aliens.forEach((a: AnimatedAlien) => a.nextFrame());
    }

    public moveDown(delta: number): void {
        this.removeTheDead();
        this._aliens.forEach((a: AnimatedAlien) => a.sprite.y += delta);
    }

    public moveAcross(delta: number): void {
        this.removeTheDead();
        this._aliens.forEach((a: AnimatedAlien) => a.sprite.x += delta);
    }

    public atRightMost(x: number): boolean {
        return this._aliens.filter((a: AnimatedAlien) => a.sprite.x >= x).length > 0;
    }

    public atLeftMost(x: number): boolean {
        return this._aliens.filter((a: AnimatedAlien) => a.sprite.x <= x).length > 0;
    }

    public constructor(tint: number) {
        this._tint = tint;
    }

    private removeTheDead(): void {
        const deadAliens: AnimatedAlien[] = this._aliens.filter((a: AnimatedAlien) => a.isDead);
        deadAliens.forEach((a: AnimatedAlien) => { a.sprite.destroy(); });
        this._aliens = this._aliens.filter((a: AnimatedAlien) => !a.isDead);
    }
}