import { Banana } from './toolbox/Banana';
import { CookTemplate } from './CookTemplate';

export class Peel extends CookTemplate {
    constructor() {
        // set scene title and background image
        super('Peel', 'Peel Your Banana', 'peelBackground');
    }

    preload() {
        super.preload(); // load any assets from the parent class if needed

        this.load.image('peelBackground', 'assets/peel/Peel_BKG.png'); // load the background image

        // load all banana peel images
        for (let i = 0; i <= 4; i++) {
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
        banana.bananaImage.setInteractive();
        this.input.setDraggable(banana.bananaImage);

        let lastPeelTime = 0; // track the time for peeling cooldown
        const peelCooldown = 800; // time between peel actions in ms

        // handling the drag event (peeling the banana)
        // banana.bananaImage.on('drag', (pointer: Phaser.Input.Pointer) => {
        //     const now = this.time.now;

        //     // only allow peeling if the banana isn't fully peeled yet
        //     if (pointer.isDown && currentFrame < bananaFrames.length - 1) {
        //         if (now - lastPeelTime >= peelCooldown) {
        //             currentFrame++; // move to the next peel frame
        //             banana.setTexture(bananaFrames[currentFrame]);
        //             banana.setScale(1); // ensure banana is scaled correctly

        //             // stop the drag animation when fully peeled
        //             if (currentFrame === 4) {
        //                 dragAnimation.stop();
        //                 dragAnimation.setVisible(false); // hide the drag animation
        //                 this.addNextButton(this, 'Split'); // show the next button
        //             }

        //             lastPeelTime = now; // update last peel time
        //         }
        //     }
        // });

        // Set flag when drag starts
    this.input.on('dragstart', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) => {
        isDraggingBanana = (gameObject === banana.bananaImage);
        if (isDraggingBanana) {
            console.log(`Drag started on banana at position: (${pointer.x}, ${pointer.y})`);
        } else {
            console.log(`Drag started on another object at position: (${pointer.x}, ${pointer.y})`);
        }
    });

    // Reset flag when drag ends
    this.input.on('dragend', () => {
        isDraggingBanana = false;
    });

    // On drag, peel the banana only if it is the banana image being dragged
    this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) => {
        const now = this.time.now;

        if (isDraggingBanana && pointer.isDown && currentFrame < bananaFrames.length - 1) {
            if (now - lastPeelTime >= peelCooldown) {
                currentFrame++;
                banana.bananaImage.setTexture(bananaFrames[currentFrame]);
                banana.bananaImage.setScale(1);

                if (currentFrame === 4) {
                    dragAnimation.stop();
                    dragAnimation.setVisible(false);
                    this.addNextButton(this, 'Split');
                }

                lastPeelTime = now;
            }
        }
    });



        
    }
}
