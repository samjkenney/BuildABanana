import { Scene } from "phaser";
import { GameObjects } from "phaser";

export class NextButton{
    private scene: Phaser.Scene | null = null;

    constructor(currentScence : Scene, x: number, y: number, nextScene: string){
        this.scene = currentScence;
        this.scene.load.image('nextButton', 'assets/nextButton.png');
        const nextButton = this.scene.add.sprite(x, y, 'nextButton').setInteractive();
        nextButton.setScale(0.7);

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
        if (this.scene) { // Ensure this.scene is not null or undefined
            nextButton.on('pointerdown', () => {
                console.log('Next button clicked, transitioning to Peel scene'); // Debug log
                this.scene?.scene.start(nextScene); // Use optional chaining to safely access scene
            });
        }
    }
}