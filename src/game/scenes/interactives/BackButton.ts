//Creates the back arrow for the scenes
import { Scene } from "phaser";
import { GameObjects } from "phaser";
import { SceneButton } from "./SceneButton";
import { TextStyles } from '../toolbox/TextStyles';

export class BackButton extends SceneButton{
    //private static color: string; //make constant?
    private static WIDTH = 80; //make constant?
    private static HEIGHT = 80; //make constant?

    constructor(scene: Scene, previousScene: string){
        super(scene, scene.scale.baseSize.width * 0.04, scene.scale.baseSize.height * 0.08, BackButton.WIDTH, BackButton.HEIGHT, 0xF9B1B4, "<", new GameObjects.Text(scene, 0, 0 , "button", TextStyles.button).style, false, true, previousScene);

    }

    static getWidth(){
        return BackButton.WIDTH;
    }

    static getHeight(){
        return BackButton.HEIGHT;
    }
}