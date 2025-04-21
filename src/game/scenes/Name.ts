import { GameObjects, Scene } from 'phaser';
import { NextButton } from './toolbox/NextButton';
import { Banana } from './toolbox/Banana';

export class Name extends Scene {
    message: GameObjects.Text;
    returnKey: Phaser.Input.Keyboard.Key;
    expression: Phaser.GameObjects.Sprite;
    nameInput: HTMLInputElement; 
    
    

    constructor() {
        super('Name');
    }

    preload() {  
        this.load.image('NameBackground', 'assets/name/NS_BKG.png');  
        this.load.image('nextButton', 'assets/nextButton.png');
        this.load.image('banana', 'assets/Banana.png'); 
        this.load.spritesheet('blinking_sheet','assets/name/Blinking.png', {
            frameWidth: 666,  
            frameHeight: 372,
        });
        this.load.html('nameform', 'assets/text/nameform.html');
        
    }

    create() {
        this.add.image(849, 567.5, 'NameBackground'); 

        this.anims.create({
            key:'blink',
            frames:this.anims.generateFrameNumbers('blinking_sheet',{frames: [0, 1, 2]}),
            frameRate:1,
            repeat:-1
        });

        this.expression = this.add.sprite(530,714, 'blinking_sheet');
        this.expression.setFrame(0);
        this.expression.play('blink',true);
        this.expression.setDepth(1);
        this.expression.setScale(1.6); 

        const nextButton = new NextButton(this, 1160, 854, 'Personality'); // Add a next button to go to the Personality scene
        nextButton.setVisible(false);
        //const myBanana = new Banana(this, 400, 714, 'banana'); // Create a new Banana object
        
        const element = this.add.dom(800, 450).createFromCache('nameform'); 
        const inputBox = element.getChildByName('nameField') as HTMLInputElement;
        element.setPosition(1150, 434); 
        // custom
        inputBox.style.backgroundColor = '#ffccd2'; 
        // inputBox.style.border = '1px solid ##ffccd2'; 
        inputBox.style.border = 'none';
        inputBox.style.width = '700px';
        inputBox.style.height = '100px'; 

        
        inputBox.addEventListener('input', () => {
            if (inputBox.value !== '') {
                nextButton.setVisible(true);  
            } else {
                nextButton.setVisible(false); 
            }
        });

        nextButton.on('pointerdown', () => {
            if (inputBox.value !== '') {
                
                //this.registry.set('bananaName', inputBox.value);
                var banana = this.registry.get("banana");
                banana.setName(inputBox.value);
                //updated banana in registry?

                //debugging 
                console.log('Saved name:', inputBox.value);  
                console.log('Retrieved name from registry:', this.registry.get('bananaName'));
    }
    });

 
}
}
