import { GameObjects, Scene } from 'phaser';
import { SceneTemplate } from './SceneTemplate';
import { NextButton } from './interactives/NextButton';

export class PhotoShoot extends SceneTemplate {
    constructor() {
        super('PhotoShoot', '', "backgroundbase");
    }

    preload() {
        this.load.image('backgroundbase', 'assets/PS_BKG.png'); //replace w custom background

        this.load.video('photoshootVideo', 'assets/banana photos.mp4'); // Load the video

        
    }

    create() {
        this.sceneLoader(this);
        //remove banana?
        // this.add.image(849, 567.5,'background2');
        var video = this.add.video(this.bananaContainer.width / 2, this.bananaContainer.height / 2, 'photoshootVideo').setAlpha(1).setScale(1.35).setOrigin(0.5).play(); // Play the video
        this.bananaContainer.add(video);
        
        this.time.addEvent({ //delayedCall?
            delay: 3000,
            callback: ()=>{
                this.addNextButton(this, "DressUp", "Next");
                this.getNextButton().setPosition(this.bananaContainer.width - this.getNextButton().width, this.bananaContainer.height - this.getNextButton().height);
                this.bananaContainer.add(this.getNextButton());
            },
            loop: false
        });
        
    }

    
}