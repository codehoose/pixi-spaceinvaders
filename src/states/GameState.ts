import { BaseState } from '../fsm/BaseState';
import { Tank } from '../Tank';
import { AlienSwarm, BulletAlien } from '../AlienSwarm';
import { Keyboard } from '../Keyboard';
import { DisplayText } from '../DisplayText';
import { changeToState } from '../framework';

export class GameState extends BaseState {
    private static MAX_LIVES: number = 3;

    private _score: number = 0;
    private _lives: number = GameState.MAX_LIVES;
    private _scoreText: DisplayText;
    private _swarm: AlienSwarm;
    private _tank: Tank;
    private _quit: Keyboard;
    private _gameOver: boolean = false;

    public update(deltaTime: number): void {
        const lives = this._lives > 0 ? this._lives : 0;
        this._scoreText.text = `Score: ${this._score} Lives: ${lives}`;

        this._tank.update(deltaTime);
        this._swarm.update(deltaTime);
        const hitResult: BulletAlien = this._swarm.checkCollisions(this._tank.bullets);
        
        if (hitResult.alien && hitResult.alienRow && hitResult.bullet) {
            this._tank.removeBullet(hitResult.bullet);
            hitResult.alienRow.removeAlien(hitResult.alien); 
            this._score += hitResult.alien.points;   
        }

        if (this._swarm.checkTankCollision(this._tank)) {
            this._tank.explode();
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
        this._tank = new Tank("tank", "shot", "tankexplosion");
        this._tank.afterExplosion = () => {
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