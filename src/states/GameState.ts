import * as PIXI from "pixi.js";
import { BaseState } from '../fsm/BaseState';
import { Tank } from '../Tank';
import { AlienSwarm, BulletAlien } from '../AlienSwarm';
import { Keyboard } from '../Keyboard';
import { Game } from '../Game';
import { DisplayText } from '../DisplayText';

export class GameState extends BaseState {

    private _score: number = 0;
    private _scoreText: DisplayText;
    private _swarm: AlienSwarm;
    private _tank: Tank;
    private _quit: Keyboard;

    public constructor(app: PIXI.Application, stage: PIXI.Container) {
        super(app, stage);
    }

    public update(deltaTime: number): void {
        this._scoreText.text = `Score: ${this._score}`;

        this._tank.update(deltaTime);
        this._swarm.update(deltaTime);
        const hitResult: BulletAlien = this._swarm.checkCollisions(this._tank.bullets);
        
        if (hitResult.alien && hitResult.alienRow && hitResult.bullet) {
            this._tank.removeBullet(hitResult.bullet);
            hitResult.alienRow.removeAlien(hitResult.alien); 
            this._score += hitResult.alien.points;   
        }

        if (this._quit.isDown) {
            Game.instance.stateManager.changeTo("attract");
        }
    }
    
    public enter(): void {
        const aliens: PIXI.BaseTexture = PIXI.Texture.from("aliens").baseTexture;
        const explosion: PIXI.BaseTexture = PIXI.Texture.from("explosion").baseTexture;
        this._swarm = new AlienSwarm(this.stage, aliens, explosion);
        this._tank = new Tank("tank", "shot");

        this._score = 0;
        this._scoreText = new DisplayText("Score: 0", 0, 0, "Arial", 10);
        this._scoreText.color = 0xFFFFFF;
        this._quit = new Keyboard("Escape");
    }
    
    public exit(): void {
        this._swarm.destroy();
        this._tank.destroy();
        this._scoreText.destroy();
        this._quit.destroy();
    }
}