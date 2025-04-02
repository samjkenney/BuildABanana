import { Scene } from 'phaser';
import { GameObjects } from 'phaser'; // Separate import for GameObjects
import { NextButton }from './toolbox/NextButton'; 
import { Banana } from './toolbox/Banana'; // Import the Banana class

export class Peel extends Scene {
    private banana: Banana | null = null; // Declare banana as a property of the class
    constructor() {
        super('Peel');
    }

    preload() {
        this.load.image('banana', 'assets/Banana.png'); 
        this.load.image('background', 'assets/Basic Background 2.png');
        this.load.image('nextButton', 'assets/nextButton.png'); 
        //load peeled banana    
    }

    create() {
        this.add.image(512, 384,'background'); 
        const banana = this.add.image(256, 384, 'banana'); 
        banana.setScale(0.5);  
        banana.setInteractive();

        //when banana is clicked
        banana.on('pointerdown', () => {
            //peel the banana
            //add a next button
            new NextButton(this, 800, 654, 'Split'); 
        })
        
    }

    setBanana(banana: Banana){
        this.banana = banana;
    }
}