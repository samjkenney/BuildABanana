import { GameObjects, Scene } from 'phaser';
import { NextButton } from './interactives/NextButton';

export class IceCream extends Scene {
    constructor() {
        super('IceCream');
    }

    preload() {
        this.load.image('background2', 'assets/Basic_BKG.jpeg'); //replace w custom background
        this.load.image('iceCream', 'assets/icecream/Final Ice Cream Presentation.png'); //replace w custom ice cream
        for (let i = 1; i <= 7; i++) {
            // load animation frames
            this.load.image(`cloudFrame${i}`, `assets/icecream/animationframes/${i}.png`);
       }
        
    }

    create() {
        //create animation for the cloud
        this.anims.create({
            key: 'clouds',
            frames: [
                { key: 'cloudFrame1' },
                { key: 'cloudFrame2' },
                { key: 'cloudFrame3' },
                { key: 'cloudFrame4' },
                { key: 'cloudFrame5' },
                { key: 'cloudFrame6' },
                { key: 'cloudFrame7' }
            ],
            frameRate: 3.5, //3.5 frames per second
            repeat: 0 
        })

        this.add.image(849, 567.5,'background2'); 
        this.add.image(849, 567.5,'iceCream');
        const cloudAnim = this.add.sprite(849, 567.5, 'frame1').play('clouds');
        this.time.addEvent({
            delay: 2000, // Delay before starting the animation
            callback: () => {
                cloudAnim.destroy(); // Start the animation after the delay
            },
            loop: false
        })
        
        
        this.add.existing(new NextButton(this,'Eulogy', 1400, 1000, 'Yum!'));
       
        
    }
}