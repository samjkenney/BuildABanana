import { GameObjects, Scene } from 'phaser';
import { NextButton } from './toolbox/NextButton';

export class Wash extends Scene {
    constructor() {
        super('Wash');
    }

    preload() {
        this.load.image('banana', 'assets/Banana.png'); 
        this.load.image('background', 'assets/wash/Shower.png'); //replace w custom background

        //load wash assets
        this.load.image('hose', 'assets/wash/Hose.png');
        this.load.image('washButton', 'assets/wash/WashButton.png');

        //load default face
    }

    create() {
        this.add.image(512, 384,'background'); 

        const banana = this.add.image(256, 384, 'banana'); 
        banana.setScale(0.5);  
        banana.setInteractive();

        const washButton = this.add.image(512, 500, 'washButton');
        washButton.setInteractive();

        


        //when the banana is clicked
        washButton.on('pointerdown', () => {
            washButton.destroy();
            const hose = this.add.image(512, 384, 'hose');
            setTimeout(() => {
                // Code to execute after 2 seconds
                hose.destroy();
                console.log("Delayed action executed");
            }, 3000);
            //wash the banana
            new NextButton(this, 800, 654, 'Peel');
        })
        
    }
}