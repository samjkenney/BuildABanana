import { GameObjects, Scene } from 'phaser';
import { NextButton } from './toolbox/NextButton';

export class Wash extends Scene {
    constructor() {
        super('Wash');
    }

    preload() {
        this.load.image('banana', 'assets/Banana.png'); 
        this.load.image('background', 'assets/wash/Shower.png'); 
        this.load.image('hoseOff', 'assets/wash/Hose_off.png');

        this.load.image('hose', 'assets/wash/Hose.png');
        this.load.image('washButton', 'assets/wash/WashButton.png');

        this.load.image('puddle', 'assets/wash/puddle.png');
        this.load.image('water', 'assets/wash/water.png');
    }

    private makeDropFall(drop: GameObjects.Image) {
        this.tweens.add({
            targets: drop,
            y: drop.y + 100,
            alpha: 0,
            duration: 4000,
            ease: 'Power2',
            onComplete: () => {
                drop.setAlpha(1).setY(drop.y - 100);
                this.makeDropFall(drop);
            }
        });
    }

    create() {
        this.add.image(849, 567.5, 'background'); 
            
        const puddle = this.add.image(849, 1000, 'puddle')
            .setScale(0.95)
            .setDepth(0)
            .setVisible(false); 

        const banana = this.add.image(849, 767.5, 'banana')
            .setScale(0.55)
            .setDepth(1)
            .setInteractive();

        const drops = [
            this.add.image(1000, 630, 'water'),
            this.add.image(900, 950, 'water')
        ];

        drops.forEach(drop => {
            drop.setScale(0.14).setDepth(2).setVisible(false);
        });

        const washButton = this.add.image(792, 500, 'washButton').setScale(0.8);

        this.input.once('pointerdown', () => {
            washButton.destroy();

            const hose = this.add.image(1000, 900, 'hoseOff')
                .setAlpha(1)
                .setDepth(3);

            this.tweens.add({
                targets: hose,
                x: 849,
                y: 600,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    this.time.delayedCall(1200, () => {
                        hose.setTexture('hose');
                    });

                    this.time.delayedCall(3000, () => {
                        hose.setTexture('hoseOff');
                        puddle.setVisible(true);
                        drops.forEach(drop => drop.setVisible(true));
                        drops.forEach(drop => this.makeDropFall(drop));

                        this.time.delayedCall(1000, () => {
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
