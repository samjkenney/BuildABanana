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
        this.load.image('banana', 'assets/bananaPeel0.png'); 
        this.load.image('background', 'assets/Basic_BKG.jpeg');
        this.load.image('nextButton', 'assets/nextButton.png'); 
        //load peeled banana    
        this.load.image('peeledBanana', 'assets/bananaPeel4.png');
        this.load.image('bananaPeel1', 'assets/bananaPeel1.png');
        this.load.image('bananaPeel2', 'assets/bananaPeel2.png');
        this.load.image('bananaPeel3', 'assets/bananaPeel3.png');
        
    }

    create() {
        this.add.image(849, 567.5,'background'); 
        const peeledBanana = this.add.image(256, 384, 'peeledBanana');
        peeledBanana.setScale(0.5);

        const bananaPeel3 = this.add.image(256, 384, 'bananaPeel3');
        bananaPeel3.setVisible(false);  
        bananaPeel3.setScale(0.5);
        bananaPeel3.setInteractive(true);

        

        // const bananaPeel1 = this.add.image(256, 384, 'bananaPeel1');
        // bananaPeel1.setScale(0.5);

        
        const banana = this.add.image(256, 384, 'banana'); 
        banana.setScale(0.5);  
        banana.setInteractive();

        

        //when banana is clicked
        banana.on('pointerdown', () => {
            new NextButton(this, 800, 654, 'Split');
        })

        // bananaPeel1?.on('pointerdown', () => {
        //     bananaPeel1.destroy();
        //     const bananaPeel2 = this.add.image(256, 384, 'bananaPeel2');
        //     bananaPeel2.setVisible(false);
        //     bananaPeel2.setScale(0.5);
        //     bananaPeel2.setInteractive(true);
            
        // });

        // bananaPeel2.on('pointerdown', () => {
        //     bananaPeel2.destroy();
        //     bananaPeel3.setVisible(true);
        // });

        // bananaPeel3.on('pointerdown', () => {
        //     bananaPeel3.destroy();
        //     new NextButton(this, 800, 654, 'Split');
        // });
        
        
    }

   
}