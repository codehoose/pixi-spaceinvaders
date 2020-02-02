import { BaseState } from '../fsm/BaseState';
import { Tank } from '../Tank';
import { AlienSwarm, BulletAlien } from '../AlienSwarm';
import { Keyboard } from '../Keyboard';
import { DisplayText } from '../DisplayText';
import { changeToState } from '../framework';
import { GameObject } from '~engine/GameObject';

export class GameState extends BaseState {
    private static MAX_LIVES: number = 3;

    private _score: number = 0;
    private _lives: number = GameState.MAX_LIVES;
    private _scoreText: DisplayText;
    private _swarm: AlienSwarm;
    private _tank: GameObject;
    private _tankComponent: Tank;
    private _quit: Keyboard;
    private _gameOver: boolean = false;

    public update(deltaTime: number): void {
        const lives = this._lives > 0 ? this._lives : 0;
        this._scoreText.text = `Score: ${this._score} Lives: ${lives}`;

        this._tank.update(deltaTime);
        this._swarm.update(deltaTime);
        const hitResult: BulletAlien = this._swarm.checkCollisions(this._tankComponent.bullets);
        
        if (hitResult.alien && hitResult.alienRow && hitResult.bullet) {
            this._tankComponent.removeBullet(hitResult.bullet);
            hitResult.alienRow.removeAlien(hitResult.alien); 
            this._score += hitResult.alien.points;   
        }

        if (this._swarm.checkTankCollision(this._tankComponent)) {
            this._tankComponent.explode();
            this._lives--;
        }

        if (this._quit.isDown) {
            changeToState("attract");
        }

        if (this._gameOver) {
            changeToState("gameover");
        }
    }
    
    public enter(): void {
        this._swarm = new AlienSwarm("aliens", "explosion");

        this._tank = new GameObject();
        this._tankComponent = new Tank("tank", "shot", "tankexplosion");
        this._tank.addComponent(this._tankComponent)

        // this._tank = new Tank("tank", "shot", "tankexplosion");
        this._tankComponent.afterExplosion = () => {
            if (this._lives === 0) {
                this._gameOver = true;
            }
        };

        this._score = 0;
        this._lives = GameState.MAX_LIVES;
        this._gameOver = false;
        
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