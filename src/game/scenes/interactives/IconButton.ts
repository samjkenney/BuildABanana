import { Scene } from "phaser";
import { GameObjects } from "phaser";
import { ImageButton } from './ImageButton';

export class IconButton extends ImageButton{
    //private static color: string; //make constant?
    //private static width: number; //make constant?
    //private static height: number; //make constant?
    //action = (image: GameObjects.Image) => void{console.log("icon click")}
    //action: Function = (image: GameObjects.Image) => console.log("hmm " + image);
    // this.on('pointerdown', () => {
    //     console.log('icon click');
    // })

    constructor(scene: Scene, x: number, y: number, imageKey: string){
        super(scene, x, y, 200, 200, 0x000000, imageKey, () => console.log("hmm"));

    }

    //click
}