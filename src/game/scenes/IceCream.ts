import { GameObjects, Scene } from 'phaser';
import { NextButton } from './toolbox/NextButton';

export class IceCream extends Scene {
    constructor() {
        super('IceCream');
    }

    preload() {
        this.load.image('background2', 'assets/Basic_BKG.jpeg'); //replace w custom background
        this.load.image('iceCream', 'assets/icecream/Final Ice Cream Presentation.png'); //replace w custom ice cream
        //load ice cream assets

        
    }

    create() {
        this.add.image(849, 567.5,'background2'); 
        this.add.image(849, 567.5,'iceCream');
        new NextButton(this, 1550, 1000, 'Eulogy');
        //add ice cream!
    }
}