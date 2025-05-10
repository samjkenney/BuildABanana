import { GameObjects, Scene } from 'phaser';
import { Banana } from "./toolbox/Banana";
import { SceneButton } from './interactives/SceneButton';
import { NextButton } from './interactives/NextButton';
import { TextStyles } from './toolbox/TextStyles';

export class MainMenu extends Scene {
    static BUTTONCOLOR = 0xffe77f;
    static BUTTONHOVERCOLOR = 0xeebe65;
    static BUTTONSELECTEDCOLOR = 0xb18623;
    constructor() {
        super('MainMenu');
    }

    preload() {
        //this.load.image('startButton', 'assets/startButton.png');
        this.load.image('defaultBackground', 'assets/Basic_BKG.png');
        this.load.image('labBackground', 'assets/characteristic background.png');
        this.load.image('tank', 'assets/tank_layer.png');
        this.load.image('banana', 'assets/Banana.png');
        this.load.image("bananaPeeled", "assets/peel/bananaPeel4.png");
        this.load.image('defaultFace', 'assets/default face.png');
        this.load.image('eyesClosed', 'assets/eyes closed.png');
        this.load.image('none', 'assets/empty.png');
    }

    create() {
        var background = this.add.image(0, 0, 'defaultBackground');
        background.setOrigin(0);

        var banana = new Banana(this); //create new banana
        this.registry.set("banana", banana);
        
        var startButton = new SceneButton(this, background.width / 2 - 150, background.height / 2 + 130, 300, 100, MainMenu.BUTTONCOLOR, MainMenu.BUTTONHOVERCOLOR, MainMenu.BUTTONSELECTEDCOLOR, "Start", TextStyles.getTitleButtonStyle(this), false, true, 'Name');
        this.add.existing(startButton).setInteractive();

        //this.add.graphics().fillStyle(0x000000, 1).fillCircle(100, 100, 5);
        //this.add.existing(new TextButton(this, 100, 100, 200, 200, 0x000000, "hello", TextStyles.getTitleStyle(this), false, true, () => console.log("")));


        
        //const startButton = this.add.sprite(this.scale.displaySize.width, this.scale.displaySize.height, 'startButton').setInteractive(); //centered???
        // this.startButton.on('pointerdown', () => {
        //     this.scene.start('Name'); 
        // });
    }
}