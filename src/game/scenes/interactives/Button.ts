import { Scene } from "phaser";
import { GameObjects } from "phaser";

export abstract class Button extends GameObjects.Container{ //make not abstract, allow other GameObjects button types?????
    scene: Scene;
    //x: number;
    //y: number;
    width: number;
    height: number;
    protected color: number; //necessary?
    protected backgroundGraphics;

    private static CORNERRADIUS: number = 10; //make constant, make protected, not static to later access, set (button styles, customization category tabs, etc.)?
    //protected static BORDER = 10; //make constant?
    private static TINT: number = 0xe58da6; //make constant?

    constructor(currentScene: Scene, x: number, y: number, width: number, height: number, color: number, hoverScale: boolean, action: Function){
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
            if(hoverScale){
                var widthChange = width * 1.2 - width
                var heightChange = height * 1.2 - height
                this.setPosition(x - widthChange / 2, y - heightChange / 2)
                this.setScale(1.2);
            }
        });

        //mouse leaves (hover end)
        this.on('pointerout', () => {
            this.backgroundGraphics.fillStyle(color, 1);
            this.backgroundGraphics.fillRoundedRect(0, 0, width, height, Button.CORNERRADIUS);
            if(hoverScale){
                this.setScale(1);
                this.setPosition(x, y);
            }
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

        var scale = (smallerButtonSide - 2 * border) / largerContentSide; //only scale like this if smalerButtonSide and largerContentSide are same sides (width or height)?
        content.setDisplaySize(contentWidth * scale, contentHeight * scale);
    }
}