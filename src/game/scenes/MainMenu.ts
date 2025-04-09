import { GameObjects, Scene } from 'phaser';
import { TextButton } from './interactives/TextButton';
import { NextButton } from './interactives/NextButton';
import { TextStyles } from './toolbox/TextStyles';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        this.load.image('startButton', 'assets/startButton.png');  
        this.load.image('backgroundImage', 'assets/Basic Background.png');
    }

    create() {
        var background = this.add.image(0, 0, 'backgroundImage');
        background.setOrigin(0);
        
        var startButton = new TextButton(this, background.width / 2 - 125, background.height / 2 - 50, 250, 100, 0xF9B1B4, "Start", TextStyles.getTitleStyle(this), false, true, () => {this.scene.start('Name')});
        var startButton2 = new NextButton(this, background.width / 2 - 100, background.height / 2 - 40 + 240, "Name");

        this.add.existing(startButton).setInteractive();
        this.add.existing(startButton2).setInteractive();

        //const startButton = this.add.sprite(this.scale.displaySize.width, this.scale.displaySize.height, 'startButton').setInteractive(); //centered???
        // this.startButton.on('pointerdown', () => {
        //     this.scene.start('Name'); 
        // });
    }
}