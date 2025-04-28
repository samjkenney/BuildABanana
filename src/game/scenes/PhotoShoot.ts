import { GameObjects, Scene } from 'phaser';
import { SceneTemplate } from './SceneTemplate';
import { NextButton } from './interactives/NextButton';

export class PhotoShoot extends SceneTemplate {
    constructor() {
        super('PhotoShoot', "");
    }

    preload() {
        this.load.image('background2', 'assets/Basic Background 2.png'); //replace w custom background

        this.load.video('photoshootVideo', 'assets/banana photos.mp4'); // Load the video

        
    }

    create() {
        this.sceneLoader(this);
        //remove banana?
        //this.add.image(849, 567.5,'background2');
        var video = this.add.video(this.bananaContainer.width / 2, this.bananaContainer.height / 2, 'photoshootVideo').setScale(1.35).setOrigin(0.5).play(); // Play the video
        this.bananaContainer.add(video);
        //this.add.existing(new NextButton(this, 'DressUp',  849, 567.5)); // Add a next button to go to the DressUp scene
        this.time.addEvent({ //delayedCall?
            delay: 3000,
            callback: ()=>{
                this.addNextButton(this, "DressUp");
                this.getNextButton().setPosition(this.bananaContainer.width - this.getNextButton().width, this.bananaContainer.height - this.getNextButton().height);
                this.bananaContainer.add(this.getNextButton());
            },
            loop: false
        });
        
    }
}