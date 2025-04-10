import { GameObjects, Scene } from 'phaser';
import { NextButton } from './interactives/NextButton';

export class Wash extends Scene {
    constructor() {
        super('Wash');
    }

    preload() {
        this.load.image('banana', 'assets/Banana.png'); 
        this.load.image('background', 'assets/Basic Background 2.png'); //replace w custom background

        //load wash assets

        //load default face
    }

    create() {
        this.add.image(512, 384,'background'); 
        const banana = this.add.image(256, 384, 'banana'); 
        banana.setScale(0.5);  
        banana.setInteractive();

        //when the banana is clicked
        banana.on('pointerdown', () => {
            //wash the banana
            new NextButton(this, 800, 654, 'Peel');
        })
        
    }
}