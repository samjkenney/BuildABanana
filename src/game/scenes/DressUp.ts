import { GameObjects, Scene } from 'phaser';

export class DressUp extends Scene {

    private selectedFace: Phaser.GameObjects.Image | null = null; 

    constructor() {
        super('DressUp');
    }

    preload() {
        this.load.image('dressUpBackground', 'assets/1.png');  
        this.load.image('menu', 'assets/Menu.png');  
        this.load.image('banana', 'assets/Banana.png'); 
        this.load.image('face', 'assets/Face.png');     
        this.load.image('glasses', 'assets/Glasses.png'); 
        this.load.image('shirt', 'assets/Shirt.png'); 

        //Face Options
        this.load.image('prettyFace', 'assets/Pretty Icon.png'); 
        this.load.image('minionFace', 'assets/Minion Icon.png'); 


        this.load.image('Face1', 'assets/face trixie.png'); 
        this.load.image('Face2', 'assets/face minion.png'); 



       
        this.load.image('nextButton', 'assets/nextButton.png');

      
        
    }

    create() {

        
        this.add.image(512, 384,'dressUpBackground'); 
        const menu = this.add.image(800, 404, 'menu');  
        menu.setScale(1.7);
        const banana = this.add.image(210, 384, 'banana'); 
        banana.setScale(0.4);  
        
        // Dress Up Options
        const prettyFace = this.add.image(710, 300, 'prettyFace').setInteractive().setVisible(false);
        prettyFace.setScale(0.4);
        const minionFace = this.add.image(910, 300, 'minionFace').setInteractive().setVisible(false);
        minionFace.setScale(0.4);

   
  


        // Categories
   
        //Face
        const face = this.add.image(595, 254, 'face'); 
        face.setScale(0.15);
        face.setInteractive();

       
        face.on('pointerout', () => {
            // face.clearTint(); 
        });

        
        face.on('pointerover', () => {
            face.setTint(0xffb6c1); 
        });

        face.on('pointerdown', () => {
            face.setTint(0xff69b4); 
            prettyFace.setVisible(true);
            minionFace.setVisible(true);


            prettyFace.on('pointerover', () => {
                if (this.selectedFace !== prettyFace) { 
                    prettyFace.setTint(0xffb6c1); 
                }
            });
        
            prettyFace.on('pointerout', () => {
                if (this.selectedFace !== prettyFace) { 
                    prettyFace.clearTint();
                }
            });
        
            prettyFace.on('pointerdown', () => {
                this.selectedFace = prettyFace;
                prettyFace.setTint(0xff69b4); 
                minionFace.clearTint(); 
                console.log('pretty face selected');
            });
        
            minionFace.on('pointerover', () => {
                if (this.selectedFace !== minionFace) { 
                    minionFace.setTint(0xffb6c1); 
                }
            });
        
            minionFace.on('pointerout', () => {
                if (this.selectedFace !== minionFace) { 
                    minionFace.clearTint();
                }
            });
        
            minionFace.on('pointerdown', () => {
                this.selectedFace = minionFace; 
                minionFace.setTint(0xff69b4); 
                prettyFace.clearTint(); 
                console.log('minion face selected');
            });
        });


        // Glasses
        const glasses = this.add.image(592, 354, 'glasses'); 
        glasses.setScale(0.15);
        glasses.setInteractive();

      
        glasses.on('pointerout', () => {
            glasses.clearTint(); 
        });

        glasses.on('pointerover', () => {
            glasses.setTint(0xffb6c1); 
        });

       
        glasses.on('pointerdown', () => {
            glasses.setTint(0xff69b4); 
        });

        // Shirt
        const shirt = this.add.image(595, 454, 'shirt'); 
        shirt.setScale(0.15);
        shirt.setInteractive();

        shirt.on('pointerout', () => {
            shirt.clearTint();
        });

        shirt.on('pointerover', () => {
            shirt.setTint(0xffb6c1); 
        });

        shirt.on('pointerdown', () => {
            shirt.setTint(0xff69b4); 
        });

       
  
    


        //Next Button 
        const nextButton = this.add.sprite(800, 654, 'nextButton').setInteractive();
        nextButton.setScale(0.1); 
       

        // Mouse hovers 
        nextButton.on('pointerover', () => {
            nextButton.setTint(0xffb6c1); 
            nextButton.setScale(0.12); 
        });

        // Mouse leaves 
        nextButton.on('pointerout', () => {
            nextButton.clearTint();
            nextButton.setScale(0.1); 
        });

        // When clicked
        nextButton.on('pointerdown', () => {
            this.scene.start('Peel'); 
        });



        
    }
}