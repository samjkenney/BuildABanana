import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
       
        this.load.setPath('assets');
        this.load.image('mainBackground', 'Basic Background.png');
        this.load.image('gameBackground', '1.png');
        this.load.image('startButton', 'startButton.png');
        

         //Dress up
         this.load.image('menu', 'Menu.png');  
         this.load.image('banana', 'Banana.png');   
         this.load.image('buttonOne', 'Button1.png'); 
         this.load.image('buttonTwo', 'Button2.png');  
         this.load.image('buttonThree', 'Button3.png'); 

         this.load.image('face', 'assets/Face.png');      
         this.load.image('glasses', 'assets/Glasses.png');
         this.load.image('shirt', 'assets/Shirt.png'); 
         
         
         this.load.image('faceChill', 'assets/FaceChill.png'); 
        this.load.image('hatClown', 'assets/HatClown.png');  
        this.load.image('bodyClown', 'assets/BodyClown.png'); 
        this.load.image('nextButton', 'assets/nextButton.png');
    }

    create() {
        this.scene.start('MainMenu');
    }
}

