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
            frameWidth: 1698, 
            frameHeight: 1135 
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

        
        const peelSprite = this.add.sprite(823, 535, 'peel'); //TODO: Fix Positioning
        peelSprite.setScale(0.9);
        peelSprite.play('peelAnim'); 
         

       


   

        
    }
}