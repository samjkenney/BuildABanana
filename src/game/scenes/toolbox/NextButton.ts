import { Scene, GameObjects } from 'phaser';

// // NextButton takes in a scene which the button belongs to, and x and y coordinates for its position, and the name of the next scene to transition to when clicked.
// // It creates a button that changes color when hovered over and transitions to the next scene when clicked.

export class NextButton extends GameObjects.Sprite {
    constructor(currentScene: Scene, x: number, y: number, nextScene: string) {
       
        super(currentScene, x, y, 'nextButton');

        
        currentScene.add.existing(this);

        
        this.setInteractive();
        this.setScale(0.15);

      
        this.on('pointerover', () => {
            this.setTint(0xffb6c1); 
            this.setScale(0.18);
        });

        
        this.on('pointerout', () => {
            this.clearTint();
            this.setScale(0.15);
        });

       
        this.on('pointerdown', () => {
            currentScene.scene.start(nextScene);
        });
    }
}