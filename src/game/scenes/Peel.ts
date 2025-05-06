import { Banana } from './toolbox/Banana';
import { CookTemplate } from './CookTemplate';
import { TextStyles } from './toolbox/TextStyles';

export class Peel extends CookTemplate {
    constructor() {
        // set scene title and background image
        super('Peel', 'Peel Your Banana', 'peelBackground');

    }

    preload() {
        super.preload(); // load any assets from the parent class if needed

        this.load.image('peelBackground', 'assets/peel/Peel_BKG.png'); 
    

        // load all banana peel images
        for (let i = 1; i <= 4; i++) {
            this.load.image(`banana${i}`, `assets/peel/bananaPeel${i}.png`);
        }

        // load frames for the drag animation
        for (let i = 1; i <= 3; i++) {
            this.load.image(`frame${i}`, `assets/peel/frame${i}.png`);
        }
    }

    create() {

        TextStyles.setTitleStyle('#ffcbd2', '#eda3a9');
        

        super.create(); // set up the base class things
    
        this.cookLoader(this); // custom function to handle any extra setup
    

        let banana: Banana = this.registry.get('banana');
    
        // if there's no banana in the registry, create a new one
        if (!banana) {
            banana = new Banana(this);
            this.registry.set('banana', banana); // store it in the registry for later use
        }

        // banana frames for peeling
        const bananaFrames = ['banana', 'banana1', 'banana2', 'banana3', 'banana4'];
        let currentFrame = 0;

        // drag animation setup
        const dragAnimation = this.add.sprite(1300, 535, 'frame1').setDepth(2);

        this.anims.create({
            key: 'dragLoop', // the animation name
            frames: [
                { key: 'frame1' },
                { key: 'frame2' },
                { key: 'frame3' },
            ],
            frameRate: 5, // how fast it changes frames
            repeat: -1, // loop forever
        });

        dragAnimation.play('dragLoop'); // start the animation

        // make the banana image draggable
        banana.bananaImage.setInteractive({
            pixelPerfect: true, //uggh transparent bkg prblms
            useHandCursor: true
        });
        this.input.setDraggable(banana.bananaImage);

        let lastPeelTime = 0; // track the time for peeling cooldown
        const peelCooldown = 800; // time between peel actions



        // handle dragging
        this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) => {
            console.log('Dragging:', (gameObject as Phaser.GameObjects.Image).texture?.key); // debug test
        
            // get current time to track how long since last peel
            const now = this.time.now;
            if (pointer.isDown && currentFrame < bananaFrames.length - 1) { // check if the pointer is down and we're not at the last peel frame yet
                if (now - lastPeelTime >= peelCooldown) { // make sure enough time has passed since last peel
                    currentFrame++; // move to the next peel frame
                    banana.setTexture(bananaFrames[currentFrame]);
                    banana.setScale(1);
        
                    // stop the drag animation once the banana is fully peeled
                    if (currentFrame === 4) {
                        dragAnimation.stop();
                        dragAnimation.setVisible(false);
                        this.addNextButton(this, 'Split'); // show next button
                    }
        
                    lastPeelTime = now; // update the last peel time
                }
            }
        });

        
    }
}
