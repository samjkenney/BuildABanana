/// Represents any button that uses an image as its content, like icon buttons
import { Scene } from "phaser";
import { GameObjects } from "phaser";
import { Button } from './Button';

export class ImageButton extends Button{
    // width: number;
    // height: number;
    //image: GameObjects.Image;

    constructor(scene: Scene, x: number, y: number, width: number, height: number, color: number, hoverColor: number, selectedColor: number, imageKey: string, scaleOnHover: boolean, action: Function){
        var content = new GameObjects.Image(scene, 0, 0, imageKey);
        super(scene, x, y, width, height, color, hoverColor, selectedColor, content, true, scaleOnHover, action);
        //.load.image("image", imagePath); //moved loading to scene, pass in key instead of path

        this.content.setPosition(width / 2, height / 2);

        this.add(this.content);
    }

    //replaces Button updateSize
    // protected updateSize(width: number, height: number): void{ //make replace Container setSize method?
    //     this.width = width;
    //     this.height = height;
    //     this.setSize(this.width, this.height);

    //     this.backgroundGraphics.clear();
    //     this.addRectangle(this.color);   
    // }
}