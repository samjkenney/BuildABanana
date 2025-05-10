//Represents a button to switch between scenes, like the back and next buttons
import { Scene } from "phaser";
import { GameObjects } from "phaser";
import { TextButton } from "./TextButton";
import { TextStyles } from '../toolbox/TextStyles';

export class SceneButton extends TextButton{
    //private static color: string; //make constant?
    //private static width: number; //make constant?
    //private static height: number; //make constant?

    constructor(scene: Scene, x: number, y: number, width: number, height: number, color: number, hoverColor: number, selectedColor: number, displayText: string, textStyle: GameObjects.TextStyle, scaleToButtonSize: boolean, scaleOnHover: boolean, nextScene: string, extraAction?: Function, delay?: number){
        var action = () => {
            if(extraAction){
                extraAction();
            }
            if(delay){
                scene.time.delayedCall(delay, () => {
                    scene?.scene.start(nextScene);
                });
            }
            else{
                scene?.scene.start(nextScene); // Use optional chaining to safely access scene
            }
        };

        super(scene, x, y, width, height, color, hoverColor, selectedColor, displayText, textStyle, scaleToButtonSize, scaleOnHover, action);

    }
}