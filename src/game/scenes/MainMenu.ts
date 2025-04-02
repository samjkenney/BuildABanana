import { GameObjects, Scene } from 'phaser';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        this.load.image('startButton', 'assets/startButton.png');  
        this.load.image('backgroundImage', 'assets/Basic Background.png');  
    }

    create() {
        this.add.image(512, 384, 'backgroundImage');  

     
        const startButton = this.add.sprite(512, 384, 'startButton').setInteractive(); //centered???

       
        startButton.on('pointerdown', () => {
            this.scene.start('Name'); 
        });
    }
}