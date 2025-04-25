import { GameObjects, Scene } from 'phaser';
import { NextButton } from './toolbox/NextButton';
import { CustomizationTemplate } from "./CustomizationTemplate";
import { Banana } from './toolbox/Banana';

export class Name extends CustomizationTemplate {
    //backgroundPath = "assets/name/NS_BKG.png";
    message: GameObjects.Text;
    returnKey: Phaser.Input.Keyboard.Key;
    expression: Phaser.GameObjects.Sprite;
    nameInput: HTMLInputElement; 
    
    

    constructor() {
        super('Name', "What's my\nname?", "nameBackground");
    }

    preload() {
        this.load.image('nameBackground', 'assets/name/NS_BKG_NoText.png');

        this.load.spritesheet('blinking_sheet','assets/name/Blinking.png', {
            frameWidth: 666,  
            frameHeight: 372,
        });
        this.load.html('nameform', 'assets/text/nameform.html');
        
    }

    create() {
        //this.add.image(849, 567.5, 'NameBackground'); 
        this.customizationLoader(this);

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

        //const nextButton = new NextButton(this, 1160, 854, 'Personality'); // Add a next button to go to the Personality scene
        //nextButton.setVisible(false);
        //const myBanana = new Banana(this, 400, 714, 'banana'); // Create a new Banana object
        this.addNextButton(this, "Personality");
        this.getNextButton().setVisible(false);

        const element = this.add.dom(0, 300).createFromCache('nameform'); //update y!!!
        const inputBox = element.getChildByName('nameField') as HTMLInputElement;
        element.setOrigin(0) //set origin to top left
        this.getMenuContainer().add(element);
        // custom
        inputBox.style.backgroundColor = '#ffccd2'; //move to html file with other style stuff?
        // inputBox.style.border = '1px solid ##ffccd2'; 
        inputBox.style.border = 'none';
        inputBox.style.width = this.getMenuContainer().width + 'px';
        inputBox.style.height = '100px'; 

        
        
        inputBox.addEventListener('input', () => {
            if (inputBox.value !== '') { //add character limit (function)
                this.getNextButton().setVisible(true);  
            } else {
                this.getNextButton().setVisible(false); 
            }
        });

        this.getNextButton().on('pointerdown', () => {
            if (inputBox.value !== '') { //add character limit (function)
                var banana = this.registry.get("banana");
                banana.setName(inputBox.value);
                //update banana in registry?

                //debugging 
                console.log('Saved name:', inputBox.value);  
                console.log('Retrieved name from banana in registry:', this.registry.get('banana').getName());
    }
    });

 
}
}
