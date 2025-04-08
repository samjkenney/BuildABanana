import { Scene } from "phaser";
import { GameObjects } from "phaser";
import { Button } from './Button';

export class ImageButton extends Button{
    // width: number;
    // height: number;
    // image: GameObjects.Image;

    constructor(scene: Scene, x: number, y: number, width: number, height: number, color: number, imageKey: string, action: Function){
        super(scene, x, y, width, height, color, false, action);
        //.load.image("image", imagePath); //moved loading to scene, pass in key instead of path

        var image = new GameObjects.Image(scene, width / 2, height / 2, imageKey);
        this.scaleToButton(image);

        this.add(image);
    }
}