import { Scene } from 'phaser';
import { GameObjects } from 'phaser'; // Separate import for GameObjects
import { NextButton }from './toolbox/NextButton'; 

export class Peel extends Scene {
    constructor() {
        super('Peel');
    }

 
    preload() {
        this.load.image('backgroundP', 'assets/peel/Peel_BKG.png');
        this.load.image('nextButton', 'assets/nextButton.png'); 
        
     
        this.load.spritesheet('peel', 'assets/peel/peel.png', { 
            frameWidth: 666, 
            frameHeight: 375  
        });
    }

    create() {
        this.add.image(849, 567.5, 'backgroundP'); 
    
        this.anims.create({
            key: 'peelAnim',
            frames: this.anims.generateFrameNumbers('peel', { start: 0, end: 4 }), 
            frameRate: 1.5,  
            repeat: 0 
        });

        
        const peelSprite = this.add.sprite(866, 500, 'peel'); //TODO: Fix Positioning
        peelSprite.play('peelAnim'); 
        peelSprite.setScale(4);  


   

        
    }
}