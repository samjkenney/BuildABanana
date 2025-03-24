import { GameObjects, Scene } from 'phaser';

export class Peel extends Scene {
    constructor() {
        super('Peel');
    }

    preload() {
        this.load.image('banana', 'assets/Banana.png'); 
        this.load.image('background', 'assets/Basic Background 2.png');
        this.load.image('startButton', 'assets/startButton.png'); 
        //load peeled banana    
    }

    create() {
        this.add.image(512, 384,'background'); 
        const banana = this.add.image(256, 384, 'banana'); 
        banana.setScale(0.5);  
        banana.setInteractive();

        banana.on('pointerdown', () => {
            //peel the banana
            //add a next button
            const startButton = this.add.sprite(512, 384, 'startButton').setInteractive(); //centered???

       
            startButton.on('pointerdown', () => {
                this.scene.start('Split'); 
            });
        })
        
    }
}