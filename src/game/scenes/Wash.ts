import { GameObjects, Scene } from 'phaser';
import { NextButton } from './toolbox/NextButton';

export class Wash extends Scene {
    constructor() {
        super('Wash');
    }

    preload() {
        this.load.image('banana', 'assets/Banana.png'); 
        this.load.image('background', 'assets/wash/Shower.png'); //replace w custom background
        this.load.image('hoseOff', 'assets/wash/Hose_off.png');

        //load wash assets
        this.load.image('hose', 'assets/wash/Hose.png');
        this.load.image('washButton', 'assets/wash/WashButton.png');

        //load default face
    }

    create() {
        this.add.image(849, 567.5,'background'); 

        const banana = this.add.image(849, 767.5, 'banana');  
        banana.setScale(0.55)
        banana.setInteractive();


        const washButton = this.add.image(792, 500, 'washButton');
        washButton.setScale(0.8)
        washButton.setInteractive();

        


        //when the banana is clicked
        washButton.on('pointerdown', () => {
            washButton.destroy();

        const hose = this.add.image(1000, 900, 'hoseOff').setAlpha(1);

        //Hose onscreen
        this.tweens.add({
            targets: hose,
            x: 849,
            y: 600,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                // Switch 
                this.time.delayedCall(1200, () => {
                    hose.setTexture('hose');
                });

                 // Switch back 
                 this.time.delayedCall(3000, () => {
                    hose.setTexture('hoseOff');

                    this.time.delayedCall(1000, () => {
                        //Hose offscreen
                        this.tweens.add({
                            targets: hose,
                            x: 1000,
                            y: 900,
                            duration: 4000,
                            ease: 'Power2',
                            onComplete: () => {
                                hose.destroy();
                                new NextButton(this, 1550, 100, 'Peel');
                            }
                        });
                    });
                });
            }
        });
    }); 
} 
}