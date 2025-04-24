import { Scene } from 'phaser';
import { NextButton } from './toolbox/NextButton';
import { Banana } from './toolbox/Banana';

export class Peel extends Scene {
    constructor() {
        super('Peel');
    }

    preload() {
        this.load.image('backgroundP', 'assets/peel/Peel_BKG.png');
        this.load.image('nextButton', 'assets/nextButton.png');
        this.load.image('banana', 'assets/Banana.png'); //TODO: banana og position problems

        for (let i = 0; i <= 4; i++) {
            this.load.image(`banana${i}`, `assets/peel/bananaPeel${i}.png`);
        }

        for (let i = 1; i <= 3; i++) {
            this.load.image(`frame${i}`, `assets/peel/frame${i}.png`);
        }
    }

    create() {
        this.add.image(849, 567.5, 'backgroundP');

        //const banana = new Banana(this, 823, 535, 'banana');
        const banana = new Banana(this);
        banana.bananaImage.setAlpha(1).setDepth(3);
    
        const bananaFrames = ['banana', 'banana1', 'banana2', 'banana3', 'banana4'];
        let currentFrame = 0;
    
        
        const peelSprite = this.add.sprite(1300, 535, 'frame1');
        peelSprite.setDepth(2);
    
        // frames animation --> TODO: move to sprite sheet to cut down code
        this.anims.create({
            key: 'peelLoop',
            frames: [
                { key: 'frame1' },
                { key: 'frame2' },
                { key: 'frame3' },
            ],
            frameRate: 6, //rate
            repeat: -1, //loop
        });
    
        peelSprite.play('peelLoop');
    
        banana.bananaImage.setInteractive();
        this.input.setDraggable(banana.bananaImage);
    
        let lastPeelTime = 0;
        const peelCooldown = 800;
    
        banana.bananaImage.on('drag', (pointer: Phaser.Input.Pointer) => {
            const now = this.time.now; // grabbing the current time so we can check how long it’s been since the last peel

            // only let it peel if the user is dragging AND we haven’t reached the final banana frame yet
            if (pointer.isDown && currentFrame < bananaFrames.length - 1) {
                
                // check if enough time has passed since the last peel so it doesn’t go super fast
                if (now - lastPeelTime >= peelCooldown) {
                    currentFrame++; // go to the next peel stage
                    banana.setTexture(bananaFrames[currentFrame]); // update the banana image 
                    // hide animation when 4th frame
                    if (currentFrame === 4) {
                        peelSprite.stop(); // stop animating
                        peelSprite.setVisible(false); 
                    }
    
                    lastPeelTime = now;
                }
            }
        });
    
        new NextButton(this, 1550, 100, 'Split');
    }
}
