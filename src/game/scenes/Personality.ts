import { GameObjects, Scene } from 'phaser';
import { CustomizationTemplate } from './CustomizationTemplate';
import { TextStyles } from './toolbox/TextStyles';
import { ImageButton } from "./interactives/ImageButton";
import { CategoryButton } from "./interactives/CategoryButton";

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
        for (let i = 1; i <= 5; i++) {
            this.load.image(`Personality menu ${i}`, `assets/personality/personality menu ${i}.png`);
            this.load.image(`Personality label ${i}`, `assets/personality/personality label ${i}.png`);
        }
        
        this.load.image("diva", "assets/personality/personality diva.png")
        this.load.image("flexible", "assets/personality/personality flexible.png")
        this.load.image("geni", "assets/personality/personality diva.png")
        this.load.image("diva", "assets/personality/personality diva.png")
        this.load.image("diva", "assets/personality/personality diva.png")
    }

    create(){
        super.customizationLoader(this); //don't need to use super (can use "this")?

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

        //Positioning, TODO: Make it an Array instead???
        var h = 150;
        var buttonWidth = 200
        var center = this.MENUWIDTH / 2 - buttonWidth / 2;
        var yStart = 0;
        const positions = [ //some math way to calculate in loop????
                { x: center, y: yStart}, //1 (top)
                { x: center + (h * Math.sin(54 * Math.PI / 180)), y: yStart + (h * Math.cos(54 * Math.PI / 180))}, //2 (bottom right)
                { x: center + (h * Math.sin(54 * Math.PI / 180)) - (h * Math.cos(72 * Math.PI / 180)), y: yStart + (h * Math.cos(54 * Math.PI / 180)) + (h * Math.sin(72 * Math.PI / 180))}, //3 (top right)
                { x: center + (h * Math.sin(54 * Math.PI / 180)) - (h * Math.cos(72 * Math.PI / 180)) - h, y: yStart + (h * Math.cos(54 * Math.PI / 180)) + (h * Math.sin(72 * Math.PI / 180))}, //4 (top left)
                { x: center - (h * Math.sin(54 * Math.PI / 180)), y: yStart + (h * Math.cos(54 * Math.PI / 180))} //5 (bottom left)
                // { x: 1000, y: 600 }, //1 (top)
                // { x: 1020, y: 610 }, //2 (right)
                // { x: 1013, y: 630 }, //3 (right bottom)
                // { x: 987, y: 630 }, //4 (left bottom)
                // { x: 980, y: 610 } //5 left
            ];
        this.createMenu(positions);

        super.addNextButton(this, "Aspirations"); //don't need to use super (can use "this")?
        super.addBackButton(this, "Name"); //don't need to use super (can use "this")?
    }

        private createMenu(positions: { x: number, y: number }[]){
            //const buttons: Phaser.GameObjects.Image[] = [];
            let currentButton: Phaser.GameObjects.Image | null = null;

            for (let i = 1; i <= 5; i++) {
                var button = new ImageButton(this, positions[i - 1].x, positions[i - 1].y, 300, 300, 0x0000ff, `Personality menu ${i}`, false, () => console.log("huh"));
                button.setTransparent();
                this.add.existing(button);
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
            }
        };

}