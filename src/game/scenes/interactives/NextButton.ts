import { Scene } from "phaser";
import { GameObjects } from "phaser";
import { SceneButton } from "./SceneButton";
import { TextStyles } from '../toolbox/TextStyles';

// export class NextButton{
//     private scene: Phaser.Scene | null = null;

//     constructor(currentScence : Scene, x: number, y: number, nextScene: string){
//         this.scene = currentScence;
//         this.scene.load.image('nextButton', 'assets/nextButton.png');
//         const nextButton = this.scene.add.sprite(x, y, 'nextButton').setInteractive();
//         nextButton.setScale(0.7);

//         nextButton.on('pointerover', () => {
//             nextButton.setTint(0xffb6c1); 
//             nextButton.setScale(0.12); 
//         });

//         // Mouse leaves 
//         nextButton.on('pointerout', () => {
//             nextButton.clearTint();
//             nextButton.setScale(0.1); 
//         });

//         // When clicked
//         if (this.scene) { // Ensure this.scene is not null or undefined
//             nextButton.on('pointerdown', () => {
//                 console.log('Next button clicked, transitioning to Peel scene'); // Debug log
//                 this.scene?.scene.start(nextScene); // Use optional chaining to safely access scene
//             });
//         }
//     }
// }

export class NextButton extends SceneButton{
    //private static color: string; //make constant?
    private static WIDTH = 170; //make constant?
    private static HEIGHT = 80; //make constant?

    constructor(scene: Scene, x: number, y: number, nextScene: string, displayText?: string){
        var text;
        if(displayText != null){
            text = displayText;
        }
        else{
            text = "Next";
        }

        super(scene, x, y, NextButton.WIDTH, NextButton.HEIGHT, 0xF9B1B4, text, new GameObjects.Text(scene, 0, 0 , "button", TextStyles.button).style, false, true, nextScene);

    }

    static getWidth(){
        return NextButton.WIDTH;
    }

    static getHeight(){
        return NextButton.HEIGHT;
    }
}