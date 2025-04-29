import { Banana } from './toolbox/Banana';
import { CookTemplate } from './CookTemplate';

export class Peel extends CookTemplate {
    constructor() {
        // Set scene key, title, and background image
        super('Peel', 'Peel Your Banana', 'peelBackground');
    }

    preload() {
        super.preload(); // just in case the template adds anything later

        this.load.image('peelBackground', 'assets/peel/Peel_BKG.png'); 

        for (let i = 0; i <= 4; i++) { // load the banana peel images
            this.load.image(`banana${i}`, `assets/peel/bananaPeel${i}.png`);
        }

        for (let i = 1; i <= 3; i++) { // load the drag down frames
            this.load.image(`frame${i}`, `assets/peel/frame${i}.png`);
        }

    }

    create() {
        super.create();
    
        this.customizationLoader(this);
    
    
        let banana: Banana = this.registry.get('banana');
    
        if (!banana) {
            banana = new Banana(this);
            this.registry.set('banana', banana); 
        }

    
       

    // Set up peel stage frames
    const bananaFrames = ['banana', 'banana1', 'banana2', 'banana3', 'banana4'];
    let currentFrame = 0;

    // Drag animation setup
    const dragAnimation = this.add.sprite(1300, 535, 'frame1').setDepth(2);

    this.anims.create({
        key: 'dragLoop',
        frames: [
            { key: 'frame1' },
            { key: 'frame2' },
            { key: 'frame3' },
        ],
        frameRate: 6,
        repeat: -1,
    });

    dragAnimation.play('dragLoop');



    // Dragging behavior
    banana.bananaImage.setInteractive();
    this.input.setDraggable(banana.bananaImage);

    let lastPeelTime = 0;
    const peelCooldown = 800;

    // Handle the peel animation
    banana.bananaImage.on('drag', (pointer: Phaser.Input.Pointer) => {
        const now = this.time.now;

        if (pointer.isDown && currentFrame < bananaFrames.length - 1) {
            if (now - lastPeelTime >= peelCooldown) {
                currentFrame++;
                banana.setTexture(bananaFrames[currentFrame]);
                banana.setScale(1);

                // Stop the animation when fully peeled
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
