import { GameObjects, Scene } from 'phaser';
import { CustomizationTemplate } from './CustomizationTemplate';
import { TextStyles } from './toolbox/TextStyles';
import { TextButton } from "./interactives/TextButton";

export class Aspirations extends CustomizationTemplate{
    //horizontal: 10% border, 40% banana, 10% border, 30% menu, 10% border
    //vertical: 10% border, 60% content, 10% border, 10% button, 10% border
    //content vertical: 10% title???, 10% border, 70/3% button, 5% border, 70/3% button, 5% border, 70/3% button,
    private MENUHALFBORDER: number;
    private BUTTONHEIGHT: number;
    private COLOR = 0x000000;

    private aspirations: string[] = [
        "1",
        "2",
        "3"
    ]

    constructor(){
        super("Aspirations", "Pick an\naspiration!", "labBackground");
    }

    preload(){
    }

    create(){
        super.customizationLoader(this);

        //calculate UI dimensions
        this.MENUHALFBORDER = super.getMenuContainer().height * 0.05;
        this.BUTTONHEIGHT = (super.getMenuContainer().height * 0.9 - super.getTitle().height - ((this.aspirations.length - 1) * this.MENUHALFBORDER)) / this.aspirations.length;

        // //add aspiration menu
        // for(var i = 0; i < this.aspirations.length; i++){
        //     var buttonY = super.getMenuContainer().height - super.getTitle().height - super.getMenuBorder() + i * (this.MENUHALFBORDER + this.BUTTONHEIGHT);
        //     var action = () => {
        //         console.log(this.aspirations[i]); //action, save array value to reusable variable?
        //     };

        //     //add menu button
        //     var button = new TextButton(this, 0, buttonY, super.getMenuContainer().width, this.BUTTONHEIGHT, this.COLOR, this.aspirations[i], TextStyles.getButtonStyle(this), true, true, action);
        //     super.getMenuContainer().add(button);
        // }

        super.addNextButton(this, "DressUp");
        super.addBackButton(this, "Personality");
    }
}