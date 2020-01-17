import * as PIXI from "pixi.js";
import { BaseState } from '../fsm/BaseState';
import { Tank } from '../Tank';
import { AlienSwarm, BulletAlien } from '../AlienSwarm';
export class GameState extends BaseState {

    private _score: number = 0;
    private _scoreText: PIXI.Text;
    private _swarm: AlienSwarm;
    private _tank: Tank;

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
    }
    
    public enter(): void {
        const aliens: PIXI.BaseTexture = PIXI.Texture.from("aliens").baseTexture;
        const explosion: PIXI.BaseTexture = PIXI.Texture.from("explosion").baseTexture;
        this._swarm = new AlienSwarm(this.stage, aliens, explosion);
        this._tank = new Tank("tank", "shot");

        this._score = 0;
        const scoreStyle: PIXI.TextStyle = new PIXI.TextStyle()
        scoreStyle.fill = 0xFFFFFF;
        scoreStyle.fontFamily = "Arial";
        scoreStyle.fontSize = 10;
        this._scoreText = new PIXI.Text("Score: 0", scoreStyle);
        this.stage.addChild(this._scoreText);
    }
    
    public exit(): void {
        this._swarm.destroy();
        this._tank.destroy();
        this._scoreText.destroy();
    }
}