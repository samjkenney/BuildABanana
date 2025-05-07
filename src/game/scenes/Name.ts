import { GameObjects, Scene } from 'phaser';
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

        this.load.html('nameform', 'assets/text/nameform.html');
        
    }

    create() {
        this.customizationLoader(this);

        //this.addBlink();

        //const nextButton = new NextButton(this, 1160, 854, 'Personality'); // Add a next button to go to the Personality scene
        //nextButton.setVisible(false);
        //const myBanana = new Banana(this, 400, 714, 'banana'); // Create a new Banana object
        this.addNextButton(this, "PhotoShoot", "Next");
        this.getNextButton().setVisible(false);

        const element = this.add.dom(0, 300).createFromCache('nameform'); //update y!!!
        const inputBox = element.getChildByName('nameField') as HTMLInputElement;
        element.setOrigin(0) //set origin to top left
        this.getMenuContainer().add(element);
        // custom
        inputBox.style.backgroundColor = '#ffccd2'; //move to html file with other style stuff?
        inputBox.style.border = 'none';
        inputBox.style.width = this.getMenuContainer().width + 'px';
        inputBox.style.height = '100px'; 

        var message: GameObjects.Text = this.add.text(1200, 530, "Name too long!", { fontSize: '32px', color: '#ff0000' }).setOrigin(0.5).setDepth(1);;
        message.setVisible(false);

        inputBox.addEventListener('input', () => {
            if (inputBox.value !== '' && inputBox.value.length <= 20) { //add character limit (function)
                message.setVisible(false); //remove error message
                this.getNextButton().setVisible(true);  
            }
            else if (inputBox.value.length > 20){
                this.getNextButton().setVisible(false);
                message.setVisible(true);
            }
             else {
                this.getNextButton().setVisible(false); 
            }
        });

        this.getNextButton().on('pointerdown', () => {
            if (inputBox.value !== '') { //add character limit (function)
                var banana = this.registry.get("banana");
                banana.setName(inputBox.value);
                //update banana in registry?

                //debugging
                //console.log('Saved name:', inputBox.value);  
                //console.log('Retrieved name from banana in registry:', this.registry.get('banana').getName());
            }
        });

        
    }

  
}
