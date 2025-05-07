import { Scene } from "phaser";
import { GameObjects } from "phaser";
import { SceneButton } from "./SceneButton";
import { TextStyles } from '../toolbox/TextStyles';


export class NextButton extends SceneButton{
    //private static color: string; //make constant?
    private static WIDTH = 240; //make constant?
    private static HEIGHT = 100; //make constant?
    private static COLOR = 0xF9B1B4; //make constant?
    //add rounding

    constructor(scene: Scene, nextScene: string, x: number, y: number, displayText?: string, color?: number){
        var text;
        var thisColor: number;
        if(displayText != null){
            text = displayText;
        }
        else{
            text = "Next";
        }
        if(color != null){
            thisColor = color;
        }
        else{
            thisColor = NextButton.COLOR;
        }

        // super(scene, scene.scale.baseSize.width * 0.9 - NextButton.getWidth(), scene.scale.baseSize.height * 0.9 - NextButton.getHeight(), NextButton.WIDTH, NextButton.HEIGHT, NextButton.COLOR, text, new GameObjects.Text(scene, 0, 0 , "button", TextStyles.button).style, false, true, nextScene);
        // super(scene, 0, 0, NextButton.WIDTH, NextButton.HEIGHT, NextButton.COLOR, text, new GameObjects.Text(scene, 0, 0 , "button", TextStyles.button).style, false, true, nextScene);
        // //position updated in each scene?
        super(scene, x, y, NextButton.WIDTH, NextButton.HEIGHT, thisColor, text, new GameObjects.Text(scene, 0, 0 , "button", TextStyles.button).style, false, true, nextScene);
    }

    updatePosition(scene: Scene){
        this.setPosition(scene.scale.baseSize.width)
    }

    static getWidth(){
        return NextButton.WIDTH;
    }

    static getHeight(){
        return NextButton.HEIGHT;
    }
}