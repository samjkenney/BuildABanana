import { GameObjects, Scene } from 'phaser';
import { Banana } from "./toolbox/Banana";
import { TextButton } from './interactives/TextButton';
import { NextButton } from './interactives/NextButton';
import { TextStyles } from './toolbox/TextStyles';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        this.load.image('startButton', 'assets/startButton.png');  
        this.load.image('backgroundImage', 'assets/Basic_BKG.jpeg');
    }

    create() {
        var background = this.add.image(0, 0, 'backgroundImage');
        background.setOrigin(0);

        var banana = new Banana(this); //create new banana
        this.registry.set("banana", banana);
        
        var startButton = new TextButton(this, background.width / 2 - 125, background.height / 2 - 50, 250, 100, 0xF9B1B4, "Start", TextStyles.getTitleStyle(this), false, true, () => {this.scene.start('Name')});
        this.add.existing(startButton).setInteractive();

        //this.add.graphics().fillStyle(0x000000, 1).fillCircle(100, 100, 5);
        //this.add.existing(new TextButton(this, 100, 100, 200, 200, 0x000000, "hello", TextStyles.getTitleStyle(this), false, true, () => console.log("")));


        
        //const startButton = this.add.sprite(this.scale.displaySize.width, this.scale.displaySize.height, 'startButton').setInteractive(); //centered???
        // this.startButton.on('pointerdown', () => {
        //     this.scene.start('Name'); 
        // });
    }
}