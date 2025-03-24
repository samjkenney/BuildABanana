import { GameObjects, Scene } from 'phaser';

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

        banana.on('pointerdown', () => {
            //slice the banana
            //add a next button
        })
        
    }
}