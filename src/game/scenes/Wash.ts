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

        //water stuff
        this.load.image('puddle', 'assets/wash/puddle.png');
        this.load.image('water', 'assets/wash/water.png');
    }

    create() {
        this.add.image(849, 567.5,'background'); 
           
    const puddle = this.add.image(849, 1000, 'puddle').setScale(0.65).setDepth(0).setVisible(false); 

    const banana = this.add.image(849, 767.5, 'banana').setScale(0.55).setDepth(1).setInteractive();

    const drop1 = this.add.image(1000, 630, 'water').setScale(0.1).setDepth(2).setVisible(false);
    const drop2 = this.add.image(900, 950, 'water').setScale(0.1).setDepth(2).setVisible(false);
   



        const washButton = this.add.image(792, 500, 'washButton');
        washButton.setScale(0.8)
     

        


        //when the screen is clicked
        this.input.once('pointerdown', () => {
            washButton.destroy();

        const hose = this.add.image(1000, 900, 'hoseOff').setAlpha(1).setDepth(3);

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
                    puddle.setVisible(true);
                    drop1.setVisible(true);
                    drop2.setVisible(true);

                     // TODO:understand this!!
                     const makeDropFall = (drop: GameObjects.Image) => {
                        this.tweens.add({
                            targets: drop,
                            y: drop.y + 100, 
                            alpha: 0, 
                            duration: 3000,
                            ease: 'Power2',
                            onComplete: () => {
                                drop.setAlpha(1);
                                drop.setY(drop.y - 100);
                                makeDropFall(drop); 
                            }
                        });
                    };

                    // drop animations
                    makeDropFall(drop1);
                    makeDropFall(drop2);

                                    
                    const expression = this.add.sprite(960, 767.5, 'blinking_sheet').setFrame(0).setScale(1.6).setDepth(1);

                    this.anims.create({
                        key: 'blink',
                        frames: this.anims.generateFrameNumbers('blinking_sheet', { frames: [0, 1, 2] }),
                        frameRate: 1,
                        repeat: -1
                    });

                    expression.play('blink', true);


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