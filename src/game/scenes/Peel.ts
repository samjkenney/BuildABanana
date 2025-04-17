import { Input, Scene } from 'phaser';
import { GameObjects } from 'phaser'; 
import { NextButton }from './toolbox/NextButton'; 
import { Banana } from './toolbox/Banana';

export class Peel extends Scene {
    constructor() {
        super('Peel');
       
    }

 
    preload() {
        this.load.image('backgroundP', 'assets/peel/Peel_BKG.png');
        this.load.image('nextButton', 'assets/nextButton.png'); 
        this.load.image('openHandCursor', 'assets/peel/open_hand.png');
        this.load.image('line', 'assets/peel/Drag_lines.png');
        this.load.image('banana', 'assets/Banana.png'); 
        this.load.image('scissors', 'assets/peel/scissors.png');

        
     
        this.load.spritesheet('peel', 'assets/peel/peel.png', { 
            frameWidth: 1698, 
            frameHeight: 1135 
        });
    }

    create() {

        this.add.image(849, 567.5, 'backgroundP'); 

        const banana = new Banana(this, 823, 535, 'banana');

        this.input.setDefaultCursor('url(assets/peel/open_hand.png), auto');

        this.input.on('pointerdown', () => {
            this.input.setDefaultCursor('url(assets/peel/closed_hand.png), auto');
        });

        this.input.on('pointerup', () => {
            this.input.setDefaultCursor('url(assets/peel/open_hand.png), auto');
        });

        this.anims.create({
            key: 'peelAnim',
            frames: this.anims.generateFrameNumbers('peel', { start: 0, end: 4 }), 
            frameRate: 1.5,  
            repeat: 0 
        });

        const peelSprite = this.add.sprite(823, 535, 'peel').setScale(0.9).setVisible(false);

        const scissors = this.add.image(700, 400, 'scissors');
        scissors.setDepth(2).setScale(0.5); 
        
        scissors.setInteractive({ draggable: true });
        
        let dragDirection: string | null = null;

        
        this.input.on('dragstart', () => {
            dragDirection = null;
        });
        this.input.on(
            'drag',
            (
                pointer: Phaser.Input.Pointer,
                gameObject: Phaser.GameObjects.GameObject,
                dragX: number,
                dragY: number
            ) => {
                if (gameObject === scissors) {
                    const image = gameObject as Phaser.GameObjects.Image;
        
                    //initial pos
                    image.x = 700; 
        
                    //movement
                    const minY = 100;
                    const maxY =900;
                    image.y = Phaser.Math.Clamp(dragY, minY, maxY);
                }
            }
        );
        
        this.input.on('dragend', () => {
            dragDirection = null;
        });
       
        
    }

    
}