import { GameObjects, Scene } from 'phaser';
import { NextButton } from './interactives/NextButton';

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
        new NextButton(this, 'DressUp',  849, 567.5, 'Next'); // Add a next button to go to the DressUp scene
        this.time.addEvent({
            delay: 3000,
            callback: ()=>{
                this.scene.start('DressUp');
            },
            loop: false
        })
       
    }
}