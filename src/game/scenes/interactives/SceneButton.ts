import { Scene } from "phaser";
import { GameObjects } from "phaser";
import { TextButton } from "./TextButton";
import { TextStyles } from '../toolbox/TextStyles';

export class SceneButton extends TextButton{
    //private static color: string; //make constant?
    //private static width: number; //make constant?
    //private static height: number; //make constant?

    constructor(scene: Scene, x: number, y: number, width: number, height: number, color: number, displayText: string, textStyle: GameObjects.TextStyle, scaleToButtonSize: boolean, scaleOnHover: boolean, nextScene: string,){
        var action = () => {
            scene?.scene.start(nextScene); // Use optional chaining to safely access scene
        };

        super(scene, x, y, width, height, color, displayText, textStyle, scaleToButtonSize, scaleOnHover, false, action);

    }
}