// represents all the buttons that take the player to the next scene
import { Scene } from "phaser";
import { GameObjects } from "phaser";
import { SceneButton } from "./SceneButton";
import { TextStyles } from '../toolbox/TextStyles';


export class NextButton extends SceneButton{
    //private static color: string; //make constant?
    private static WIDTH = 240; //make constant?
    private static HEIGHT = 100; //make constant?
    static COLOR = 0xffccd3; //make constant?
    static HOVERCOLOR = 0xffabb5; //make constant?
    static SELECTEDCOLOR = 0x80caca; //make constant?
    //add rounding

    constructor(scene: Scene, nextScene: string, x: number, y: number, displayText: string, extraAction?: Function, delay?: number, color?: number){
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
        super(scene, x, y, NextButton.WIDTH, NextButton.HEIGHT, thisColor, NextButton.HOVERCOLOR, NextButton.SELECTEDCOLOR, text, new GameObjects.Text(scene, 0, 0 , "button", TextStyles.button).style, false, true, nextScene, extraAction, delay);
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