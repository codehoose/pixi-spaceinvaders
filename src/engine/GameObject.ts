import * as PIXI from 'pixi.js';

import { IDestroy } from "./IDestroy";
import { Game } from "~Game";
import { IComponent } from './IComponent';


/**
 * Basic game object used for placing components like skeletal animations, sprite renderers etc.
 */
export class GameObject implements IDestroy {

    private readonly _container: PIXI.Container;

    private _children: GameObject[] = [];
    private _components: IComponent[] = [];

    /**
     * The parent game object.
     */
    private _parent: GameObject;
    public get parent(): GameObject {
        return this._parent;
    }

    public set parent(parent: GameObject) {
        this._parent = parent;
    }

    /**
     * Constructor.
     * @param parent - Parent
     */
    public constructor(parent: GameObject = null) {
        this._container = new PIXI.Container();

        if (!parent) {
            Game.instance.stageManager.add(this);
        } else {
            parent.addChild(this);
        }
    }

    /**
     * Update the game object, its components and children.
     * @param deltaTime - The delta time in seconds
     */
    public update(deltaTime: number): void {
        this._components.forEach((c: IComponent) => c.update(deltaTime));
        this._children.forEach((go: GameObject) => go.update(deltaTime));
    }

    /**
     * Add a child game object.
     * @param child  - The child game object
     */
    public addChild(child: GameObject): void {
        this._container.addChild(child._container);
        this._children.push(child);
        child.parent = this;
    }

    /**
     * Add component.
     * @param component - The component to add
     */
    public addComponent(component: IComponent): void {
        this._components.push(component);
    }

    /**
     * Add to the scene.
     * @param stage - The main stage
     */
    public addToScene(stage: PIXI.Container): void {
        stage.addChild(this._container);
    }

    /**
     * Destroy the game object, its components and optional children too.
     * @param childrenToo  - True if the children are to be destroyed too
     */
    public destroy(childrenToo: boolean = true): void {
        if (childrenToo) {
            this._children.forEach((go: GameObject) => { go.destroy();});
        }

        if (this._parent) {
            this._parent._container.removeChild(this._container);
        }

        this._children = [];
        this._components.forEach((c: IComponent) => c.destroy());
    }
}