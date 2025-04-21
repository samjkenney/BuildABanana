import { GameObjects, Scene } from 'phaser';
import { CustomizationTemplate } from './CustomizationTemplate';
import { TextStyles } from './toolbox/TextStyles';
import { TextButton } from "./interactives/TextButton";

export class Personality extends CustomizationTemplate{
    //horizontal: 10% border, 40% banana, 10% border, 30% menu, 10% border
    //vertical: 10% border, 60% content, 10% border, 10% button, 10% border
    //content vertical: 10% title???, 10% border, 80% buttons
    //content horizontal: 30% button, 5% border, 30% button, 5% border, 30% button
    private MENUHALFBORDER: number;
    private BUTTONHEIGHT: number;
    private BUTTONWIDTH: number;
    private COLOR = 0x000000;

    private personalities: string[] = [
        "1",
        "2",
        "3"
    ]

    constructor(){
        super("Personality", "Pick a\npersonality!", "labBackground");
    }

    preload(){
    }

    create(){
        super.customizationLoader(this);

        //calculate UI dimensions
        this.MENUHALFBORDER = super.getMenuContainer().width * 0.05;
        this.BUTTONWIDTH = (super.getMenuContainer().width - ((this.personalities.length - 1) * this.MENUHALFBORDER)) / this.personalities.length;
        this.BUTTONHEIGHT = super.getMenuContainer().height * 0.8;

        // //add personality menu
        // for(var i = 0; i < this.personalities.length; i++){
        //     var buttonY = super.getMenuContainer().height - super.getTitle().height - super.getMenuBorder() + i * (this.MENUHALFBORDER + this.BUTTONHEIGHT);
        //     var action = () => {
        //         console.log(this.personalities[i]); //action, save array value to reusable variable?
        //     };

        //     //add menu button
        //     var button = new TextButton(this, 0, buttonY, super.getMenuContainer().width, this.BUTTONHEIGHT, this.COLOR, this.personalities[i], TextStyles.getButtonStyle(this), true, true, action);
        //     super.getMenuContainer().add(button);
        // }

        super.addNextButton(this, "Aspirations");
        super.addBackButton(this, "Name");
    }
}