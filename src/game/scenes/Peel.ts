import { Banana } from './toolbox/Banana';
import { CookTemplate } from './CookTemplate';

export class Peel extends CookTemplate {
    constructor() {
        // set scene title and background image
        super('Peel', 'Peel Your Banana', 'peelBackground');
    }

    preload() {
        super.preload(); // load any assets from the parent class if needed

        this.load.image('peelBackground', 'assets/peel/Peel_BKG.png'); 
        this.load.image('openHand', 'assets/peel/open_hand.png'); // open hand image //TODO: make class for cursors??
        this.load.image('closedHand', 'assets/peel/closed_hand.png'); // closed hand image


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

        super.create(); // set up the base class things
    
        this.customizationLoader(this); // custom function to handle any extra setup
    
        let isDraggingBanana = false;

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
            frameRate: 6, // how fast it changes frames
            repeat: -1, // loop forever
        });

        dragAnimation.play('dragLoop'); // start the animation

        // make the banana image draggable
        banana.bananaImage.setInteractive({
            pixelPerfect: true,
            // useHandCursor: true
        });
        this.input.setDraggable(banana.bananaImage);

        let lastPeelTime = 0; // track the time for peeling cooldown
        const peelCooldown = 800; // time between peel actions


         // default cursor is the open hand when not interacting
         this.input.setDefaultCursor('url(assets/peel/open_hand.png), pointer');

        // handle dragging
        this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) => {
            console.log('Dragging:', (gameObject as Phaser.GameObjects.Image).texture?.key); // debug test
        
            const now = this.time.now;
            if (pointer.isDown && currentFrame < bananaFrames.length - 1) {
                if (now - lastPeelTime >= peelCooldown) {
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

        // change cursor to closed hand on pointer down
        this.input.on('pointerdown', () => {
            this.input.setDefaultCursor('url(assets/peel/closed_hand.png), pointer');
        });

        // revert cursor to open hand on pointer up
        this.input.on('pointerup', () => {
            this.input.setDefaultCursor('url(assets/peel/open_hand.png), pointer');
        });
        
        // reset cursor to default when scene shuts down
        this.events.on('shutdown', () => {
            this.input.setDefaultCursor('default');
        });
        
    }
}
