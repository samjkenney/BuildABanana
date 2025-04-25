import { GameObjects, Scene } from 'phaser';
import { NextButton } from './toolbox/NextButton';

export class PhotoShoot extends Scene {
    constructor() {
        super('PhotoShoot');
    }

    preload() {
        this.load.image('background2', 'assets/Basic Background 2.png'); //replace w custom background

        this.load.video('photoshootVideo', 'assets/banana photos.mp4'); // Load the video

        
    }

    create() {
        this.add.image(849, 567.5,'background2');
        this.add.video(849, 567.5, 'photoshootVideo').setScale(1.5).play(); // Play the video
        this.time.addEvent({
            delay: 3000,
            callback: ()=>{
                new NextButton(this, 1550, 100, 'DressUp'); 
            },
            loop: false
        })
        
    }
}