import { GameObjects, Scene } from 'phaser';
import { CookTemplate } from './CookTemplate';
import { Banana } from './toolbox/Banana';
import { Cosmetic } from './toolbox/Cosmetic';

export class Wash extends CookTemplate {

    private candles: Phaser.GameObjects.Image;
    constructor() {
        super('Wash', "Bath time!", "washBackground");
    }

    preload() {
        // load all images for the scene, like the background, hose, and puddle
        this.load.image('washBackground', 'assets/wash/Shower.png'); 
        this.load.image('hoseOff', 'assets/wash/Hose_off.png');
        // load hose frames for animation
        for (let i = 1; i <= 3; i++) {
            this.load.image(`hose${i}`, `assets/wash/hose${i}.png`);
        }
        this.load.image('washButton', 'assets/wash/WashButton.png');
        this.load.image('puddle', 'assets/wash/puddle.png');
        this.load.image('water', 'assets/wash/water.png');
        this.load.image('candles', 'assets/wash/candles.png');
        this.load.image('candles_out', 'assets/wash/candles_out.png');
        this.load.image('washFace', 'assets/wash/washed face.png');

       
    }

    private makeDropFall(drop: GameObjects.Image) {
        // animate the water drops falling down and fading out
        this.tweens.add({
            targets: drop,
            y: drop.y + 100, // move drop down
            alpha: 0, // fade out drop
            duration: 4000, // animation duration
            ease: 'Power2', // easing function
            onComplete: () => {
                // reset drop position and opacity, then make it fall again
                drop.setAlpha(1).setY(drop.y - 100);
                this.makeDropFall(drop);
            }
        });
    }

    create() {
        this.cookLoader(this);

        this.brainZoom();

        this.candles = this.add.image(798.8186877290125, 511.42518720068756, 'candles')
        .setDepth(1);
            
        const drops = [
            this.add.image(1100, 510, 'water'),
            this.add.image(900, 850, 'water')
        ];

        drops.forEach(drop => {
            // set drops to small size and hidden by default
            drop.setScale(0.19).setDepth(1).setVisible(false);
        });

        const washButton = this.add.image(792, 500, 'washButton').setScale(0.6);

        this.input.once('pointerdown', () => {
            // when button is clicked, start hose animation
            washButton.destroy(); // remove the wash button

            const hose = this.add.image(1000, 900, 'hoseOff')
                .setAlpha(1) // make sure hose is visible
                .setDepth(3); // set hose depth to be on top

                this.tweens.add({
                    targets: hose,
                    x: 849, // move hose to new position
                    y: 600,
                    duration: 1000, // animation duration
                    ease: 'Power2', 
                    onComplete: () => {
                        // animate hose frames to simulate water spraying
                        const hoseAnimation = this.animateHose(hose);
                        
                        this.time.delayedCall(3000, () => {
                            // after 3 seconds, stop hose animation and show puddle
                            this.stopHose(hoseAnimation); 

                            // update the banana appearance
                            this.resetCosmetics();

                            // set the banana container depth to be above the puddle
                            this.bananaContainer.setDepth(1); 

                            this.candles.setTexture('candles_out');

                            hose.setTexture('hoseOff'); // reset hose texture
                            drops.forEach(drop => drop.setVisible(true)); // make water drops visible
                            drops.forEach(drop => this.makeDropFall(drop)); // start making water drops fall

                            this.time.delayedCall(1000, () => {
                            // after 1 second, move hose back to its original position and destroy it
                                this.tweens.add({
                                    targets: hose,
                                    x: 1000,
                                    y: 900,
                                    duration: 4000,
                                    ease: 'Power2',
                                    onComplete: () => {
                                        hose.destroy(); // hose is destroyed
                                        this.addNextButton(this, "Peel", "Next"); // add the next button
                                    }
                                });
                            });
                        });
                    }
                });
            });



    

        }

    // Function to zoom in on the banana's forehead and then zoom out
    brainZoom() {
        var cam = this.cameras.main;
        // get camera starting information 
        var camX = cam.x;
        var camY = cam.y;
        var camWidth = cam.width;
        var camHeight = cam.height;
        var centerX = cam.centerX;
        var centerY = cam.centerY;
        //zoom in on banana forehead
        cam.centerOn(1010, 520);
        cam.setZoom(20);
     
                //zoom out to original size 
        this.tweens.add({
            targets: cam,
            zoom: 1,
            ease: 'Linear',
            duration: 1300,    
            onComplete: () => {
                cam.setPosition(camX, camY);
                cam.centerOn(centerX, centerY);
                cam.setSize(camWidth, camHeight);
                cam.setZoom(1);
            }
        }); 
    }

    //animates the hose to simulate water spraying
    animateHose(hose: GameObjects.Image) {
        let hoseFrames = ['hose1', 'hose2', 'hose3'];
        let currentFrame = 0;
    
        const hoseAnimation = this.time.addEvent({
            delay: 150,
            callback: () => {
                hose.setTexture(hoseFrames[currentFrame]); // change hose frame
                currentFrame = (currentFrame + 1) % hoseFrames.length; // loop through frames
            },
            loop: true
        });

        return hoseAnimation; // return the animation event for later use
    }

    //stops hose animation and adds puddle
    stopHose(hoseAnimation: Phaser.Time.TimerEvent){
        hoseAnimation.remove();
        const puddleContainer = this.add.container(0, 0); // create a container for the puddle
        const puddle = this.add.image(849, 1000, 'puddle').setScale(1.5).setDepth(0); // add puddle to container
        puddleContainer.add(puddle);
    }

    //set cosmetics to washed state
    resetCosmetics(){
        var banana: Banana = this.registry.get("banana");
        var washedFace: Cosmetic = new Cosmetic("washFace", 0, -30, 1.1);
        banana.setFace(this, washedFace, this.bananaContainer);
        banana.setGlasses(this, Banana.noGlassesCosmetic, this.bananaContainer);
        banana.setShirt(this, Banana.noShirtCosmetic, this.bananaContainer);
    }
}

