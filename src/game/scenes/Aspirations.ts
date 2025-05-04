import { GameObjects, Scene } from 'phaser';
import { CustomizationTemplate } from './CustomizationTemplate';
import { TextStyles } from './toolbox/TextStyles';
import { Banana } from './toolbox/Banana';
import { Cosmetic } from "./toolbox/Cosmetic";
import { TextButton } from "./interactives/TextButton";
import { CharacteristicHandler } from './toolbox/CharacteristicHandler';
import { Characteristic } from './toolbox/Characteristic';

export class Aspirations extends CustomizationTemplate{
    //horizontal: 10% border, 40% banana, 10% border, 30% menu, 10% border
    //vertical: 10% border, 60% content, 10% border, 10% button, 10% border
    //content vertical: 10% title???, 10% border, 70/3% button, 5% border, 70/3% button, 5% border, 70/3% button,
    private MENUHALFBORDER: number;
    private BUTTONHEIGHT: number;
    private COLOR = 0xff0000;

    constructor(){
        super("Aspirations", "Choose an\naspiration!", "labBackground");
    }

    preload(){
        this.load.image("appeal lawyer", "assets/aspirations/Cosmetic Appeal Lawyer.png")
        this.load.image("banana foster parent", "assets/aspirations/Cosmetic Banana Foster Parent.png")
        this.load.image("computer science professor", "assets/aspirations/Cosmetic Compsci Professor.png")
        this.load.image("cooties doctor", "assets/aspirations/Cosmetic Cooties Doctor.png")
        this.load.image("modern artist", "assets/aspirations/Cosmetic Modern Artist.png")
    }

    create(){
        super.customizationLoader(this);

        //calculate UI dimensions
        this.MENUHALFBORDER = super.getMenuContainer().height * 0.05;
        this.BUTTONHEIGHT = (super.getMenuContainer().height * 0.9 - super.getTitle().height - ((CharacteristicHandler.getAspirations().length - 1) * this.MENUHALFBORDER)) / CharacteristicHandler.getAspirations().length;

        this.createMenu();

        super.addBackButton(this, "Personality");
    }

    private createMenu(){
        //create buttons
        var actions = new Map;
        var buttonList = [];
        for(let i = 0; i < CharacteristicHandler.getAspirations().length; i++){
            var buttonY = super.getTitle().height + this.MENUBORDER + i * (this.MENUHALFBORDER + this.BUTTONHEIGHT);
            var action = () => {
                actions.set(`action${i}`, this.flashCosmetic(CharacteristicHandler.getAspirations()[i].getReactionCosmetic()));
                this.addNextButton(this, "PhotoShoot");
            };

            //add button
            var button = new TextButton(this, 0, buttonY, this.menuContainer.width, this.BUTTONHEIGHT, this.COLOR, CharacteristicHandler.getAspirations()[i].getName(), TextStyles.getButtonStyle(this), true, true, action);
            //button.setTransparent();
            buttonList.push(button);
            this.menuContainer.add(button);
        };

        for(var i = 0; i < CharacteristicHandler.getAspirations().length; i++){
            buttonList[i].setSelectOne(buttonList);
        };
    }

    private flashCosmetic(cosmetic: Cosmetic){ //move to banana?
        var banana: Banana = this.registry.get("banana");
        this.time.delayedCall(400, () => {banana.addCosmetic(this, cosmetic, this.bananaContainer)});
        this.time.delayedCall(600, () => {banana.removeCosmetic(cosmetic, this.bananaContainer)});
    }
}