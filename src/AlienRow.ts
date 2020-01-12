import * as PIXI from "pixi.js";
import { BaseAlien } from './aliens/BaseAlien';

export class AlienRow {
    private readonly _container: PIXI.Container;

    private readonly _aliens: BaseAlien[] = [];
    public get aliens(): ReadonlyArray<BaseAlien> {
        return this._aliens;
    }

    public add(alien: BaseAlien, x: number, y: number) {
        alien.sprite.position.set(x, y);
        this._aliens.push(alien);
        this._container.addChild(alien.sprite);
    }

    public nextFrame(): void {
        this._aliens.forEach((a: BaseAlien) => a.nextFrame());
    }

    public moveDown(delta: number): void {
        this._aliens.forEach((a: BaseAlien) => a.sprite.position.y += delta);
    }

    public moveAcross(delta: number): void {
        this._aliens.forEach((a: BaseAlien) => a.sprite.position.x += delta);
    }

    public atRightMost(x: number): boolean {
        return this._aliens.filter((a: BaseAlien) => a.sprite.position.x >= x).length > 0;
    }

    public atLeftMost(x: number): boolean {
        return this._aliens.filter((a: BaseAlien) => a.sprite.position.x <= x).length > 0;
    }

    public constructor(container: PIXI.Container) {
        this._container = container;
    }
}