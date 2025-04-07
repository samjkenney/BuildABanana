import { Scene } from "phaser";
import { GameObjects } from "phaser";

export abstract class Button extends Phaser.GameObjects.Container{ //make not abstract, allow other GameObjects button types?????
    scene: Scene;
    //x: number;
    //y: number;
    width: number;
    height: number;
    color: number; //necessary?
    backgroundGraphics;

    private static CORNERRADIUS: number = 10; //make constant, make protected, not static to later access, set (button styles, customization category tabs, etc.)?
    //protected static BORDER = 10; //make constant?
    private static TINT: number = 0xffffff; //make constant?

    constructor(currentScene: Scene, x: number, y: number, width: number, height: number, color: number, action: Function){
        super(currentScene, x, y);
        this.scene = currentScene;
        this.width = width;
        this.height = height;
        this.color = color; //necessary?

        this.setSize(this.width, this.height);
        this.setPosition(x, y);
        this.setInteractive(new Phaser.Geom.Rectangle(width / 2, height / 2, this.width, this.height), Phaser.Geom.Rectangle.Contains); //use this.backgroundGraphics as shape?

        //add background rectangle
        this.backgroundGraphics = this.scene.add.graphics();
        this.add(this.backgroundGraphics);
        this.backgroundGraphics.fillStyle(color, 1);
        this.backgroundGraphics.fillRoundedRect(0, 0, width, height, Button.CORNERRADIUS);

        //this.scene.add.existing(this); //changed to add button from scene file (instead of adding it from here)



        //mouse enters (hover start)
        this.on('pointerover', () => {
            this.backgroundGraphics.fillStyle(Button.TINT, 1); //make transparent?
            this.backgroundGraphics.fillRoundedRect(0, 0, width, height, Button.CORNERRADIUS);
            //this.setScale(1.2); 
        });

        //mouse leaves (hover end)
        this.on('pointerout', () => {
            this.backgroundGraphics.fillStyle(color, 1);
            this.backgroundGraphics.fillRoundedRect(0, 0, width, height, Button.CORNERRADIUS);
            //this.setScale(1); 
        });

        //click
        if (this.scene) { // Ensure this.scene is not null or undefined
            this.on("pointerdown", action);
        }
    }

    //scale content to button size
    // protected scaleToButton(content: GameObjects.Text): void;
    // protected scaleToButton(content: GameObjects.Image): void;
    // protected scaleToButton(content: any){
    protected scaleToButton(content: GameObjects.Text | GameObjects.Image){
        var contentWidth = content.displayWidth;
        var contentHeight = content.displayHeight;
        var largerContentSide = Math.max(contentWidth, contentHeight);
        var smallerButtonSide = Math.min(this.width, this.height);
        var border = smallerButtonSide / 10;

        var scale = (smallerButtonSide - 2 * border) / largerContentSide;
        content.setDisplaySize(contentWidth * scale, contentHeight * scale);
    }
}