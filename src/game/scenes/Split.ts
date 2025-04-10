import { GameObjects, Scene } from 'phaser';
import { NextButton } from './toolbox/NextButton';

export class Split extends Scene {
    constructor() {
        super('Split');
    }

    preload() {
        this.load.image('peeledBanana', 'assets/Banana.png'); //replace asset with peeled banana
        this.load.image('background', 'assets/Basic Background 2.png');
        
        //load peeled banana    
    }

    create() {
        this.add.image(512, 384,'background'); 
        const banana = this.add.image(256, 384, 'banana'); 
        banana.setScale(0.5);  
        banana.setInteractive();

        //when the banana is clicked
        banana.on('pointerdown', () => {
            //slice the banana
            //add a next button
            new NextButton(this, 800, 654, 'IceCream');
        })
        
    }
}