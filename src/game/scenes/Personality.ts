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
    private COLOR = 0xff0000;

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
    }

    create(){
        super.customizationLoader(this); //don't need to use super (can use "this")?

        //calculate UI dimensions
        this.MENUHALFBORDER = super.getMenuContainer().width * 0.05;
        //this.BUTTONWIDTH = (super.getMenuContainer().width - ((this.personalities.length - 1) * this.MENUHALFBORDER)) / this.personalities.length;
        //this.BUTTONHEIGHT = super.getMenuContainer().height * 0.8;
        this.BUTTONHEIGHT = (super.getMenuContainer().height * 0.9 - super.getTitle().height - ((CharacteristicHandler.getPersonalities().length - 1) * this.MENUHALFBORDER)) / CharacteristicHandler.getPersonalities().length;

        this.createMenu();

        super.addBackButton(this, "Name"); //don't need to use super (can use "this")?
    }

    private createMenu(){
        //create buttons
        var buttonList = [];
        for(let i = 0; i < CharacteristicHandler.getPersonalities().length; i++){
            var buttonY = super.getTitle().height + this.MENUBORDER + i * (this.MENUHALFBORDER + this.BUTTONHEIGHT);
            var action = () => {
                this.flashCosmetic(CharacteristicHandler.getPersonalities()[i].getReactionCosmetic());
                this.addNextButton(this, "Aspirations");
            };

            //add button
            var button = new TextButton(this, 0, buttonY, this.menuContainer.width, this.BUTTONHEIGHT, this.COLOR, CharacteristicHandler.getPersonalities()[i].getName(), TextStyles.getButtonStyle(this), true, true, action);
            //button.setTransparent();
            buttonList.push(button);
            this.menuContainer.add(button);
        };

        for(var i = 0; i < CharacteristicHandler.getPersonalities().length; i++){
            buttonList[i].setSelectOne(buttonList);
        };
    }

    private createMenu1(){
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
                this.addNextButton(this, "Aspirations");
            };
            
            //add button
            var button = new ImageButton(this, positions[i].x, positions[i].y, 300, 300, 0xffffff, `Personality menu ${i + 1}`, false, action);
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