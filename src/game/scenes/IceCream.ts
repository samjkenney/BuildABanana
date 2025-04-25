import { GameObjects, Scene } from 'phaser';
import { NextButton } from './toolbox/NextButton';

export class IceCream extends Scene {
    constructor() {
        super('IceCream');
    }

    preload() {
        this.load.image('background2', 'assets/Basic_BKG.jpeg'); //replace w custom background

        //load ice cream assets

        
    }

    create() {
        this.add.image(849, 567.5,'background2'); 
        new NextButton(this, 800, 654, 'MainMenu');
        //add ice cream!
    }
}