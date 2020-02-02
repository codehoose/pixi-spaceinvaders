export interface IComponent {
    update(deltaTime: number): void;
    destroy(): void;
}
