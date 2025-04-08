import { GameObjects, Scene } from 'phaser';
import { NextButton } from './toolbox/NextButton';
import { Banana } from './toolbox/Banana';

export class Name extends Scene {
    message: GameObjects.Text;
    returnKey: Phaser.Input.Keyboard.Key;
    nameInput: any;

    constructor() {
        super('Name');
    }

    preload() {  
        this.load.image('backgroundImage', 'assets/Basic Background.png');  
        this.load.image('nextButton', 'assets/nextButton.png');
        this.load.image('banana', 'assets/Banana.png'); 
        
    }

    create() {
        this.add.image(512, 384, 'backgroundImage');  
        const nextButton = new NextButton(this, 800, 654, 'DressUp'); // Add a next button to go to the DressUp scene
        const myBanana = new Banana(this, 210, 384, 'banana'); // Create a new Banana object
       
        this.message = this.add.text(640, 250, "Hello, --", {
            color: "#FFFFFF",
            fontSize: 60,
            fontStyle: "bold",
            fontFamily: "Kitto"
        }).setOrigin(0.5);


    
    }
}