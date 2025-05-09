import { GameObjects, Scene } from 'phaser';
import { SceneTemplate } from './SceneTemplate';  

export class LightsOff extends SceneTemplate {
    constructor() {
        super('LightsOff', 'Lights Off Scene');  
    }

    preload() {
        for (let i = 1; i <= 11; i++) {
            this.load.image(`image_${i}`, `assets/lightsoff/${i}.png`);
        }
    }

    create() {
        let i = 1; 
        const totalImages = 11;
        const frameRate = 250; 

        let cutsceneImage = this.add.image(0, 0, `image_${i}`).setOrigin(0).setDepth(10);

        // frame texture changing
        const updateFrame = () => {
            cutsceneImage.setTexture(`image_${i}`);  
            i++;  

            if (i <= totalImages) {
                this.time.delayedCall(frameRate, updateFrame); 
            } else {
                cutsceneImage.destroy();
                this.scene.start('Split');
            }
        };

        // start loop
        updateFrame();
    }
}