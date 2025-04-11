import { GameObjects, Scene } from 'phaser';
import { NextButton } from './toolbox/NextButton';

export class IceCream extends Scene {
    constructor() {
        super('IceCream');
    }

    preload() {
        this.load.image('background', 'assets/Basic Background 2.png'); //replace w custom background

        //load ice cream assets

        
    }

    create() {
        this.add.image(512, 384,'background'); 
        new NextButton(this, 800, 654, 'MainMenu');
        
    }
}