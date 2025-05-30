//represents any assets that is placed on the banana, such as a hat or glasses
//takes an image path, x and y distance from the center, and scale
import { Scene } from 'phaser';
import { GameObjects } from 'phaser';
import { Banana } from "./Banana";

export class Cosmetic{
    imageKey: string;
    x = Banana.X;
    y = Banana.Y;
    scale =  Banana.SCALE;
    image: GameObjects.Image;

    constructor(imageKey: string, xFromCenter: number, yFromCenter: number, scale: number){
        this.imageKey = imageKey;
        this.x += xFromCenter;
        this.y += yFromCenter;
        this.scale *= scale;

        //this.image = scene.add.image(0, 0, imageKey).setScale(this.scale); //move to scenes?
    }

    getImageKey(){
        return this.imageKey;
    }

    getXFromCenter(){
        return this.x;
    }

    getYFromCenter(){
        return this.y;
    }

    getScale(){
        return this.scale;
    }

    // getImage(){
    //     return this.image;
    // }
}