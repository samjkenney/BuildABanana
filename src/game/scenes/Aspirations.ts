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

    private aspirations: Map<string, any>[] = [
        // {aspiration: "Cooties Doctor", imageKey: "cooties doctor"},
        // {aspiration: "A-peel Lawyer", imageKey: "appeal lawyer"},
        // {aspiration: "Computer Science Professor", imageKey: "computer science professor"},
        // {aspiration: "Banana Foster Parent", imageKey: "banana foster parent"},
        // {aspiration: "Modern Artist", imageKey: "modern artist"}
        new Map([["aspiration", "Cooties Doctor"]]),
        new Map([["aspiration", "A-peel Lawyer"]]),
        new Map([["aspiration", "Computer Science Professor"]]),
        new Map([["aspiration", "Banana Foster Parent"]]),
        new Map([["aspiration", "Modern Artist"]])
    ];
    private selected = false;

    constructor(){
        super("Aspirations", "Pick an\naspiration!", "labBackground");
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
        this.BUTTONHEIGHT = (super.getMenuContainer().height * 0.9 - super.getTitle().height - ((this.aspirations.length - 1) * this.MENUHALFBORDER)) / this.aspirations.length;

        //add button actions to aspiration maps
        var banana = this.registry.get("banana");
        this.aspirations[0].set("reaction", () => {
                this.selected = true;
                this.flashImage("cooties doctor");
            });
        this.aspirations[1].set("reaction", () => {
                this.selected = true;
                this.flashImage("appeal lawyer");
            });
        this.aspirations[2].set("reaction", () => {
                this.selected = true;
                this.flashImage("computer science professor");
            });
        this.aspirations[3].set("reaction", () => {
                this.selected = true;
                this.flashImage("banana foster parent");
            });
        this.aspirations[4].set("reaction", () => {
                this.selected = true;
                this.flashImage("modern artist");
            });

        //add aspiration menu
        for(var i = 0; i < this.aspirations.length; i++){
            var buttonY = super.getTitle().height + this.MENUBORDER + i * (this.MENUHALFBORDER + this.BUTTONHEIGHT);

            //add menu button
            var button = new TextButton(this, 0, buttonY, this.menuContainer.width, this.BUTTONHEIGHT, this.COLOR, this.aspirations[i].get("aspiration"), TextStyles.getButtonStyle(this), false, true, this.aspirations[i].get("reaction"));
            this.menuContainer.add(button);
        };

        super.addBackButton(this, "Personality");
        //while(this.selected){ //find way to continuously watch?
                super.addNextButton(this, "DressUp");
        //};
    }

    private flashImage(imageKey: string){
        var banana = this.registry.get("banana");
        this.time.delayedCall(300, () => {banana.addImage(this, imageKey, "reaction", this.bananaContainer)});
        this.time.delayedCall(600, () => {banana.removeImage("reaction", this.bananaContainer)});
    }
}