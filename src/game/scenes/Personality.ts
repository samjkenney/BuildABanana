import { GameObjects, Scene } from 'phaser';
import { CustomizationTemplate } from './CustomizationTemplate';
import { TextStyles } from './toolbox/TextStyles';
import { Banana } from './toolbox/Banana';
import { Cosmetic } from "./toolbox/Cosmetic";
import { ImageButton } from "./interactives/ImageButton";
import { TextButton } from "./interactives/TextButton";
import { CharacteristicHandler } from './toolbox/CharacteristicHandler';
import { Characteristic } from './toolbox/Characteristic';

export class Personality extends CustomizationTemplate{
    //horizontal: 10% border, 40% banana, 10% border, 30% menu, 10% border
    //vertical: 10% border, 60% content, 10% border, 10% button, 10% border
    //content vertical: 10% title???, 10% border, 80% buttons
    //content horizontal: 30% button, 5% border, 30% button, 5% border, 30% button
    private MENUHALFBORDER: number;
    private BUTTONHEIGHT: number;
    private BUTTONWIDTH: number;
    private COLOR = 0xffccd2;
    private HOVERCOLOR = 0xb5e8e8;
    private SELECTEDCOLOR = 0x80caca;

    private buttonList: TextButton[] = [];

    // private personalities: string[] = [
    //     "1",
    //     "2",
    //     "3"
    // ];

    constructor(){
        super("Personality", "Pick a\npersonality!", "labBackground");
    }

    preload(){
        for (let i = 1; i <= 5; i++) {
            this.load.image(`Personality menu ${i}`, `assets/personality/personality menu ${i}.png`);
            this.load.image(`Personality label ${i}`, `assets/personality/personality label ${i}.png`);
        };
        
        this.load.image("diva", "assets/personality/personality diva.png");
        this.load.image("flexible", "assets/personality/personality flexible.png");
        this.load.image("genius", "assets/personality/personality genius.png");
        this.load.image("honest", "assets/personality/personality honest.png");
        this.load.image("strong", "assets/personality/personality strong.png");

        for (let i = 1; i <= 3; i++) {
            this.load.image(`water_${i}`, `assets/personality/water_${i}.png`);
        }
    }

    create(){
        super.customizationLoader(this); //don't need to use super (can use "this")?
        this.setTitleColor("#dbffff");

        //calculate UI dimensions
        this.MENUHALFBORDER = super.getMenuContainer().width * 0.05;
        //this.BUTTONWIDTH = (super.getMenuContainer().width - ((this.personalities.length - 1) * this.MENUHALFBORDER)) / this.personalities.length;
        //this.BUTTONHEIGHT = super.getMenuContainer().height * 0.8;
        this.BUTTONHEIGHT = (super.getMenuContainer().height * 0.9 - super.getTitle().height - ((CharacteristicHandler.getPersonalities().length - 1) * this.MENUHALFBORDER)) / CharacteristicHandler.getPersonalities().length;
        
        this.buttonList = []; //clear list (for back button)
        this.createMenu();

        const tank = this.add.image(850.2155144762387, 566.7769396551724, 'tank')
        .setScale(1);
        // .setAlpha(0.8);
        var layer = this.add.image(0, 0, "labBackground").setOrigin(0).setAlpha(0.2);

        this.children.sendToBack(layer);
        this.children.sendToBack(tank);
        this.children.sendToBack(this.background);

         // animated water
         const water = this.add.image(917.8492418333755, 542.6275017097364, 'water_1')
         .setDepth(0)// layering
         .setScale(1.180) // scale
         .setAlpha(0.3); 
 
         let waterFrames = ['water_1', 'water_2', 'water_3'];
         let currentFrame = 0;
 
         this.time.addEvent({
             delay: 250, // speed
             loop: true,
             callback: () => {
             water.setTexture(waterFrames[currentFrame]);
             currentFrame = (currentFrame + 1) % waterFrames.length;
             }
         });

         this.tweens.add({
            targets: water,
            alpha: 0.3, 
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });


        // tank.setInteractive({ draggable: true });
        // this.input.setDraggable(tank);
        // tank.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
        //     tank.x = dragX;
        //     tank.y = dragY;
        //     console.log(`Tank position: x=${tank.x}, y=${tank.y}`);
        // });

        
        //check if Personality already selected (used back button)
        var banana = this.registry.get("banana");
        // this.bananaContainer.setDepth(1); 
        if(banana.getPersonality() !== undefined){
            banana.getFaceImage().setVisible(false); //remove default face
            banana.getGlassesImage().setVisible(false);
            banana.getShirtImage().setVisible(false);

            var characteristic = banana.getPersonality(); //add selected cosmetic
            banana.addCosmetic(this, characteristic.getReactionCosmetic(), this.bananaContainer);

            var index = CharacteristicHandler.getPersonalities().indexOf(characteristic); //select button
            this.buttonList[index].setSelected(true);

            this.createNextButton();
        }

        super.addBackButton(this, "DressUp"); //don't need to use super (can use "this")?
    }

    private createMenu(){
        //create buttons
        for(let i = 0; i < CharacteristicHandler.getPersonalities().length; i++){
            var buttonY = super.getTitle().height + this.MENUBORDER + i * (this.MENUHALFBORDER + this.BUTTONHEIGHT);
            var action = () => {
                var banana: Banana = this.registry.get("banana");
                //this.flashCosmetic(CharacteristicHandler.getPersonalities()[i].getReactionCosmetic());
                banana.setPersonality(CharacteristicHandler.getPersonalities()[i]);
                this.createNextButton();
            };

            //add button
            let button = new TextButton(this, 0, buttonY, this.menuContainer.width, this.BUTTONHEIGHT, this.COLOR, this.HOVERCOLOR, this.SELECTEDCOLOR, CharacteristicHandler.getPersonalities()[i].getName(), TextStyles.getButtonStyle(this), true, true, action);
            //button.setTransparent();
            this.buttonList.push(button);
            this.menuContainer.add(button);

            button.on('pointerover', () => {
                var banana: Banana = this.registry.get("banana");
                banana.getFaceImage().setVisible(false); //remove default face
                banana.getGlassesImage().setVisible(false);
                banana.getShirtImage().setVisible(false);

                //remove all cosmetics
                CharacteristicHandler.getPersonalities().forEach(characteristic => {
                    banana.removeCosmetic(characteristic.getReactionCosmetic(), this.bananaContainer);
                });

                banana.addCosmetic(this, CharacteristicHandler.getPersonalities()[i].getReactionCosmetic(), this.bananaContainer);
            });

            button.on('pointerout', () => {
                var banana: Banana = this.registry.get("banana");
                if(!button.getSelected()){
                    banana.removeCosmetic(CharacteristicHandler.getPersonalities()[i].getReactionCosmetic(), this.bananaContainer);
                    //add selected cosmetic
                    if(banana.getPersonality() !== undefined){
                        var cosmetic = banana.getPersonality().getReactionCosmetic();
                        banana.addCosmetic(this, cosmetic, this.bananaContainer);
                    }
                    else{
                        banana.getFaceImage().setVisible(true); //add back default face
            banana.getGlassesImage().setVisible(true);
            banana.getShirtImage().setVisible(true);
                    }
                }
            });
        };

        for(var i = 0; i < CharacteristicHandler.getPersonalities().length; i++){ //move to previous loop?
            this.buttonList[i].setSelectOne(this.buttonList, false);
        };
    }

    private createNextButton(){
        var extraAction = () => {
            var banana: Banana = this.registry.get("banana");
            var cosmetics = banana.getPersonality().getReactionCosmetic();
            banana.removeCosmetic(banana.getPersonality().getReactionCosmetic(), this.bananaContainer);
            this.tweens.add({
                targets: cosmetics,
                alpha: 0, 
                duration: 800,
                yoyo: false,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            //add customizations back
            this.time.delayedCall(800, () => {
                banana.getFaceImage().setVisible(true);
                banana.getGlassesImage().setVisible(true);
                banana.getShirtImage().setVisible(true);

                //change to tweens!!!!!!!!!
            });
        };

        this.addNextButton(this, "Aspirations", "Next", extraAction, 1000);
    }



    //for pentagon menu
    private createPentagonMenu(){
        //Pentagon positioning
        var h = 150;
        var buttonWidth = 300
        var center = this.MENUWIDTH / 2 - buttonWidth / 2;
        var yStart = this.getTitle().height + this.MENUBORDER;
        const positions = [ //some math way to calculate in loop????
            { x: center, y: yStart}, //1 (top)
            { x: center + (h * Math.sin(54 * Math.PI / 180)), y: yStart + (h * Math.cos(54 * Math.PI / 180))}, //2 (bottom right)
            { x: center + (h * Math.sin(54 * Math.PI / 180)) - (h * Math.cos(72 * Math.PI / 180)), y: yStart + (h * Math.cos(54 * Math.PI / 180)) + (h * Math.sin(72 * Math.PI / 180))}, //3 (top right)
            { x: center + (h * Math.sin(54 * Math.PI / 180)) - (h * Math.cos(72 * Math.PI / 180)) - h, y: yStart + (h * Math.cos(54 * Math.PI / 180)) + (h * Math.sin(72 * Math.PI / 180))}, //4 (top left)
            { x: center - (h * Math.sin(54 * Math.PI / 180)), y: yStart + (h * Math.cos(54 * Math.PI / 180))} //5 (bottom left)
        ];

        //create buttons
        var actions = new Map;
        var buttonList = [];
        for(let i = 0; i < CharacteristicHandler.getPersonalities().length; i++){
            var action = () => {
                actions.set(`action${i}`, this.flashCosmetic(CharacteristicHandler.getPersonalities()[i].getReactionCosmetic()));
                this.addNextButton(this, "Aspirations", "Next");
            };
            
            //add button
            var button = new ImageButton(this, positions[i].x, positions[i].y, 300, 300, 0xffffff, 0x000000, 0x000000, `Personality menu ${i + 1}`, false, action);
            //button.setInteractive(false);
            //button.getContent().setInteractive();
            button.setTransparent();
            buttonList.push(button);

            button.on('pointerover', () => {
                button.getContent().setTint(0x000000);
            });

            buttonList.push(button);
            this.menuContainer.add(button);



                // const button = this.add.image(positions[i - 1].x, positions[i - 1].y, `Personality menu ${i}`);
                // button.setInteractive({ pixelPerfect: true }).setScale(0.7); //make image buttons, set not interactive (just image is interactive?)
                
                // button.on('pointerdown', () => {


                //     if (currentButton) {
                //         currentButton.clearTint();
                //     }
                //     button.setTint(0xe1a8a0);
                //     currentButton = button;
                // });

                // var label: GameObjects.Image;
                // button.on('pointerover', () => {
                //     button.setTint(0xe1a8a0);
                //     //button.setScale(0.9);
                //     label = this.add.image(positions[i - 1].x, positions[i - 1].y, `Personality label ${i}`);
                //     label.setScale(0.7)
                // });

                // button.on('pointerout', () => {
                //     button.clearTint();
                //     //buton.setScale(0.7);
                //     label.setVisible(false); //destroy?
                // });
                //buttons.push(button);
        };
    }

    private flashCosmetic(cosmetic: Cosmetic){ //move to banana?
        var banana: Banana = this.registry.get("banana");
        this.time.delayedCall(400, () => {banana.addCosmetic(this, cosmetic, this.bananaContainer)});
        this.time.delayedCall(600, () => {banana.removeCosmetic(cosmetic, this.bananaContainer)});
    }
}