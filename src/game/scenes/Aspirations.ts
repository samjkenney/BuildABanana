import { GameObjects, Scene } from 'phaser';
import { CustomizationTemplate } from './CustomizationTemplate';
import { TextStyles } from './toolbox/TextStyles';
import { Banana } from './toolbox/Banana';
import { CharacteristicHandler } from './toolbox/CharacteristicHandler';
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

    private handler = new CharacteristicHandler;

    private aspirations: Characteristic[] = this.handler.getAspirations();
       
    // private aspirations: Map<string, any>[] = [
    //     // {aspiration: "Cooties Doctor", imageKey: "cooties doctor"},
    //     // {aspiration: "A-peel Lawyer", imageKey: "appeal lawyer"},
    //     // {aspiration: "Computer Science Professor", imageKey: "computer science professor"},
    //     // {aspiration: "Banana Foster Parent", imageKey: "banana foster parent"},
    //     // {aspiration: "Modern Artist", imageKey: "modern artist"}
    //     new Map([["aspiration", "Cooties Doctor"]]),
    //     new Map([["aspiration", "A-peel Lawyer"]]),
    //     new Map([["aspiration", "Computer Science Professor"]]),
    //     new Map([["aspiration", "Banana Foster Parent"]]),
    //     new Map([["aspiration", "Modern Artist"]])
    // ];
    private selected = false; //get from registry (so can go back and keep selected button)

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
        this.BUTTONHEIGHT = (super.getMenuContainer().height * 0.9 - super.getTitle().height - ((this.aspirations.length - 1) * this.MENUHALFBORDER)) / this.aspirations.length;

        // var appealLawyer = new Cosmetic(this, "appeal lawyer", 80, 0, 2);
        // var bananaFosterParent = new Cosmetic(this, "banana foster parent", 90, -100, 1.875);
        // var computerScienceProfessor = new Cosmetic(this, "computer science professor", 80, 0, 1.5);
        // var cootiesDoctor = new Cosmetic(this, "cooties doctor", 120, 0, 1.875);
        // var modernArtist = new Cosmetic(this, "modern artist", 50, -20, 2);
        this.BUTTONHEIGHT = (super.getMenuContainer().height * 0.9 - super.getTitle().height - ((CharacteristicHandler.getAspirations().length - 1) * this.MENUHALFBORDER)) / CharacteristicHandler.getAspirations().length;

        //add button actions to aspiration maps
        //var banana = this.registry.get("banana");
        // this.aspirations[0].set("reaction", () => {
        //         this.selected = true;
        //         this.flashImage(cootiesDoctor);
        //         this.addNextButton(this, "PhotoShoot");
        //     });
        // this.aspirations[1].set("reaction", () => {
        //         this.selected = true;
        //         this.flashImage(appealLawyer);
        //         this.addNextButton(this, "PhotoShoot");
        //     });
        // this.aspirations[2].set("reaction", () => {
        //         this.selected = true;
        //         this.flashImage(computerScienceProfessor);
        //         this.addNextButton(this, "PhotoShoot");
        //     });
        // this.aspirations[3].set("reaction", () => {
        //         this.selected = true;
        //         this.flashImage(bananaFosterParent);
        //         this.addNextButton(this, "PhotoShoot");
        //     });
        // this.aspirations[4].set("reaction", () => {
        //         this.selected = true;
        //         this.flashImage(modernArtist);
        //         this.addNextButton(this, "PhotoShoot");
        //     });
        var action = () => {
                this.selected = true;
                //this.flashImage(CharacteristicHandler.getAspirations());
                this.addNextButton(this, "PhotoShoot");
            };
        // this.aspirations[1].set("reaction", () => {
        //         this.selected = true;
        //         this.flashImage(appealLawyer);
        //         this.addNextButton(this, "PhotoShoot");
        //     });
        // this.aspirations[2].set("reaction", () => {
        //         this.selected = true;
        //         this.flashImage(computerScienceProfessor);
        //         this.addNextButton(this, "PhotoShoot");
        //     });
        // this.aspirations[3].set("reaction", () => {
        //         this.selected = true;
        //         this.flashImage(bananaFosterParent);
        //         this.addNextButton(this, "PhotoShoot");
        //     });
        // this.aspirations[4].set("reaction", () => {
        //         this.selected = true;
        //         this.flashImage(modernArtist);
        //         this.addNextButton(this, "PhotoShoot");
        //     });

        //add aspiration menu
        var buttonList = [];
        for(var i = 0; i < CharacteristicHandler.getAspirations().length; i++){
            var buttonY = super.getTitle().height + this.MENUBORDER + i * (this.MENUHALFBORDER + this.BUTTONHEIGHT);

            //add menu button
            var button = new TextButton(this, 0, buttonY, this.menuContainer.width, this.BUTTONHEIGHT, this.COLOR, CharacteristicHandler.getAspirations()[i].getName(), TextStyles.getButtonStyle(this), true, true, action);
            buttonList.push(button);
            this.menuContainer.add(button);
        };

        for(var i = 0; i < CharacteristicHandler.getAspirations().length; i++){
            buttonList[i].setSelectOne(buttonList);
        }

        super.addBackButton(this, "Personality");
    }

    private flashImage(cosmetic: Cosmetic){
        var banana: Banana = this.registry.get("banana");
        this.time.delayedCall(400, () => {banana.addCosmetic(this, cosmetic, this.bananaContainer)});
        this.time.delayedCall(600, () => {banana.removeCosmetic(cosmetic, this.bananaContainer)});
    }
}