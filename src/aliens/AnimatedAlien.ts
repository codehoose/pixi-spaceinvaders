import * as PIXI from "pixi.js";
import { BaseAlien } from "./BaseAlien";

export class AnimatedAlien extends BaseAlien {
    
    public constructor(baseTexture: PIXI.BaseTexture, frame0: number, frame1: number) {
        super(baseTexture, 16, 8);

        this.frames.push(this.createTexture(frame0));
        this.frames.push(this.createTexture(frame1));
        this.setFrame(0);
    }
}