import { Scene } from 'phaser';
import { GameObjects } from 'phaser';

export class Cosmetic{
    imageKey: string;
    x: number;
    y: number;
    scale: number;
    image: GameObjects.Image;

    constructor(scene: Scene, imageKey: string, xFromCenter: number, yFromCenter: number, scale: number){
        this.imageKey = imageKey;
        this.x = xFromCenter;
        this.y = yFromCenter;
        this.scale = scale;

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