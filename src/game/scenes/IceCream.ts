import { GameObjects, Scene } from 'phaser';
import { NextButton } from './interactives/NextButton';

export class IceCream extends Scene {
    constructor() {
        super('IceCream');
    }

    preload() {
        this.load.image('background2', 'assets/Basic_BKG.jpeg'); //replace w custom background
        this.load.image('iceCream', 'assets/icecream/Final Ice Cream Presentation.png'); //replace w custom ice cream
        //load ice cream assets
        for (let i = 1; i <= 7; i++) {
            // load animation frames
            this.load.image(`cloudFrame${i}`, `assets/icecream/animationframes/${i}.png`);
       }
        
    }

    create() {
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
            frameRate: 3.5,
            repeat: 0 // Loop the animation indefinitely
        })

         //replace w custom background
        this.add.image(849, 567.5,'background2'); 
        this.add.image(849, 567.5,'iceCream');
        this.add.sprite(849, 567.5, 'frame1').play('clouds');
        new NextButton(this,'Eulogy', 1550, 1000, 'Yum!');
        this.time.addEvent({
            delay: 11000,
            callback: ()=>{
                this.scene.start('Eulogy');
                //this.addNextButton(this, 'IceCream', 'Yum!');
            },
            loop: false
        })
        
    }
}