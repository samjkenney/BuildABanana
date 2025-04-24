import { GameObjects, Scene } from 'phaser';
import { CookTemplate } from './CookTemplate';
import { NextButton } from './toolbox/NextButton';

export class Wash extends CookTemplate {
    constructor() {
        super('Wash', "Gently rinse!", "washBackground");
    }

    preload() {
        //this.load.image('banana', 'assets/Banana.png'); 
        this.load.image('washBackground', 'assets/wash/Shower.png'); 
        this.load.image('hoseOff', 'assets/wash/Hose_off.png');

        for (let i = 1; i <= 3; i++) {
            this.load.image(`hose${i}`, `assets/wash/hose${i}.png`);
        }
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
        this.customizationLoader(this);
            
        const puddle = this.add.image(849, 1000, 'puddle')
            .setScale(0.95)
            .setDepth(0)
            .setVisible(false); 

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
                        let hoseFrames = ['hose1', 'hose2', 'hose3'];
                        let currentFrame = 0;
    
                        const hoseAnimation = this.time.addEvent({
                            delay: 150,
                            callback: () => {
                                hose.setTexture(hoseFrames[currentFrame]);
                                currentFrame = (currentFrame + 1) % hoseFrames.length;
                            },
                            loop: true
                        });

                    this.time.delayedCall(3000, () => {
                        hoseAnimation.remove();

                        var banana = this.registry.get("banana");
                        banana.setFace(this, "default", this.bananaContainer);
                        banana.setGlasses(this, "none", this.bananaContainer);
                        banana.setShirt(this, "none", this.bananaContainer);

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
                                    this.addNextButton(this, "Peel");
                                }
                            });
                        });
                    });
                }
            });
        });
    }
}

