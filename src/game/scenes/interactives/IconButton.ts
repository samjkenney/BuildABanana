import { Scene } from "phaser";
import { GameObjects } from "phaser";
import { ImageButton } from './ImageButton';

export class IconButton extends ImageButton{
    //private static color: string; //make constant?
    //private static width: number; //make constant?
    //private static height: number; //make constant?

    constructor(scene: Scene, x: number, y: number, imageKey: string){
        var action = () => {
            console.log("Icon button clicked");
            //change clothes
        };

        super(scene, x, y, 200, 200, 0x000000, imageKey, action);

    }
}