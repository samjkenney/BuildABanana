import { GameObjects, Scene } from 'phaser';

export class DressUp extends Scene {
    constructor() {
        super('DressUp');
    }

    preload() {
        this.load.image('dressUpBackground', 'assets/1.png');  
        this.load.image('menu', 'assets/Menu.png');  
        this.load.image('banana', 'assets/Banana.png'); 
        this.load.image('buttonOne', 'assets/Button1.png');  
        this.load.image('buttonTwo', 'assets/Button2.png');  
        this.load.image('buttonThree', 'assets/Button3.png'); 
        this.load.image('face', 'assets/Face.png');     
        this.load.image('glasses', 'assets/Glasses.png'); 
        this.load.image('shirt', 'assets/Shirt.png'); 

        this.load.image('faceChill', 'assets/FaceChill.png'); 
        this.load.image('hatClown', 'assets/HatClown.png');  
        this.load.image('bodyClown', 'assets/BodyClown.png'); 
        
    }

    create() {
        this.add.image(512, 384,'dressUpBackground'); 
        const menu = this.add.image(800, 404, 'menu');  
        menu.setScale(1.7);
        const banana = this.add.image(210, 384, 'banana'); 
        banana.setScale(0.4);  
           
        const buttonOne = this.add.image(750, 270, 'buttonOne').setVisible(false);
        const buttonTwo = this.add.image(750, 270, 'buttonTwo').setVisible(false);
        const buttonThree = this.add.image(750, 270, 'buttonThree').setVisible(true);
   
        const face = this.add.image(645, 334, 'face'); 
        face.setInteractive();
        const glasses =this.add.image(625, 434, 'glasses'); 
        glasses.setInteractive();
        const shirt = this.add.image(615, 504, 'shirt'); 
        shirt.setInteractive();


        const faceChill = this.add.image(210, 384, 'faceChill').setVisible(false).setInteractive();
        const hatClown = this.add.image(210, 384, 'hatClown').setVisible(false).setInteractive();
        const bodyClown = this.add.image(210, 384, 'bodyClown').setVisible(false).setInteractive();




  
         face.on('pointerdown', () => {
            buttonOne.setVisible(false);  
            buttonTwo.setVisible(false); 
            buttonThree.setVisible(true); 
        });

       
        glasses.on('pointerdown', () => {
            buttonOne.setVisible(true); 
            buttonTwo.setVisible(false);  
            buttonThree.setVisible(false); 
        });

        
        shirt.on('pointerdown', () => {
            buttonOne.setVisible(false); 
            buttonTwo.setVisible(true); 
            buttonThree.setVisible(false);  
        });

       
    buttonOne.on('pointerdown', () => {
        faceChill.setVisible(true);  
        hatClown.setVisible(false); 
        bodyClown.setVisible(false);
    });

    

     



        
    }
}