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
        this.add.image(849, 567.5,'background'); 

        const banana = this.add.image(849, 767.5, 'banana');  
        banana.setScale(0.55)
        banana.setInteractive();


        const washButton = this.add.image(792, 500, 'washButton');
        washButton.setScale(0.8)
        washButton.setInteractive();

        


        //when the banana is clicked
        washButton.on('pointerdown', () => {
            washButton.destroy();
            const hose = this.add.image(849, 600, 'hose');
            hose.setAlpha(1);  
            
            setTimeout(() => {
                
                // Move off screen 
                this.tweens.add({
                    targets: hose,
                    x: 1000,           
                    y: 900,     
                    alpha: 0,      
                    duration: 4000,   
                    ease: 'Power2',     
                    onComplete: () => {
                        console.log("Delayed action executed");
                        hose.destroy();  
                        new NextButton(this, 1550, 100, 'Peel');
                        
                    }
                });

            }, 2000);
           
        })
        
    }
}