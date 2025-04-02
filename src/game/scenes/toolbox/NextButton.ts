import { Scene } from "phaser";
import { GameObjects } from "phaser";

// NextButton takes in a scene which the button belongs to, and x and y coordinates for its position, and the name of the next scene to transition to when clicked.
// It creates a button that changes color when hovered over and transitions to the next scene when clicked.

export class NextButton{
    

    constructor(currentScene : Scene, x: number, y: number, nextScene: string){
        //adds the button to the screen
        currentScene.load.image('nextButton', 'assets/nextButton.png');
        const nextButton = currentScene.add.sprite(x, y, 'nextButton').setInteractive();
        nextButton.setScale(0.7);

        //mouse over
        nextButton.on('pointerover', () => {
            nextButton.setTint(0xffb6c1); 
            nextButton.setScale(0.12); 
        });

        // Mouse leaves 
        nextButton.on('pointerout', () => {
            nextButton.clearTint();
            nextButton.setScale(0.1); 
        });

        // When clicked
        if (currentScene) { // Ensure this.scene is not null or undefined
            nextButton.on('pointerdown', () => {
                currentScene.scene.start(nextScene); 
            });
        }
    }
}