import { Scene } from "phaser";
import { GameObjects } from "phaser";

export abstract class Button extends GameObjects.Container{ //make not abstract, allow other GameObjects button types?????
    scene: Scene;
    originalX: number;
    originalY: number;
    width: number;
    height: number;
    protected color: number; //necessary?
    protected backgroundGraphics;
    protected content: GameObjects.Image | GameObjects.Text; //if need button with no content, move this to ImageButton and TextButton, remove scaleOnHover in constructor, add Content parameter to scaleToButton, move scaleToButton call to ImageButton, TextButton

    //protected static CORNERRADIUS: number = 20; //make constant, make private, not static to later access, set (button styles, customization category tabs, etc.)?
    protected cornerRadius: number;
    //protected static BORDER = 10; //make constant?
    private static TINT: number = 0xe58da6; //make constant, move to different types of buttons?
    private static HOVERSCALE = 1.2;

    constructor(currentScene: Scene, x: number, y: number, width: number, height: number, color: number, content: GameObjects.Image | GameObjects.Text, scaleToButtonSize: boolean, scaleOnHover: boolean, action: Function){
        super(currentScene, x, y);
        this.scene = currentScene;
        this.width = width;
        this.height = height;
        this.color = color; //necessary?
        this.content = content;
        this.cornerRadius = this.height * 0.2;

        this.setSize(this.width, this.height);
        this.setPosition(x, y);
        this.setInteractive(new Phaser.Geom.Rectangle(width / 2, height / 2, this.width, this.height), Phaser.Geom.Rectangle.Contains); //use this.backgroundGraphics as shape?

        //add background rectangle
        this.backgroundGraphics = this.scene.add.graphics();
        this.add(this.backgroundGraphics);
        this.addRectangle(this.color);

        if(scaleToButtonSize){
            this.scaleToButton();
        }

        //this.scene.add.existing(this); //changed to add button from scene file (instead of adding it from here)



        //mouse enters (hover start)
        this.on('pointerover', () => {
            this.originalX = this.x;
            this.originalY = this.y;
            //clear old rectangle
            this.addRectangle(Button.TINT);
            if(scaleOnHover){
                var widthChange = width * Button.HOVERSCALE - width
                var heightChange = height * Button.HOVERSCALE - height
                this.setPosition(this.originalX - widthChange / 2, this.originalY - heightChange / 2)
                this.setScale(1.2);
            }
        });

        //mouse leaves (hover end)
        this.on('pointerout', () => {
            //clear old rectangle
            this.addRectangle(this.color)
            if(scaleOnHover){
                this.setScale(1);
                this.setPosition(this.originalX, this.originalY);
            }
        });

        //click
        if (this.scene) { // Ensure this.scene is not null or undefined
            this.on("pointerdown", action);
        }
    }

    protected addRectangle(color: number){
        this.backgroundGraphics.fillStyle(color, 1); //move to method?
        this.backgroundGraphics.fillRoundedRect(0, 0, this.width, this.height, this.cornerRadius);
    }

    //scale content to button size
    // protected scaleToButton(content: GameObjects.Text): void;
    // protected scaleToButton(content: GameObjects.Image): void;
    // protected scaleToButton(content: any){
    // protected scaleToButton(content: GameObjects.Text | GameObjects.Image){ //don't need parameter!
    protected scaleToButton(){
        var contentWidth = this.content.width; //remove variable?
        var contentHeight = this.content.height; //remove variable?
        var largerContentSide = Math.max(contentWidth, contentHeight);
        var smallerButtonSide = Math.min(this.width, this.height);
        var border = smallerButtonSide / 10;

        var scale = (smallerButtonSide - 2 * border) / largerContentSide; //only scale like this if smalerButtonSide and largerContentSide are same sides (width or height)?
        this.content.setDisplaySize(contentWidth * scale, contentHeight * scale);

        //this.content.setOrigin(0.5);
        this.content.setPosition(this.width / 2, this.height / 2,); //recenter image or text
    }

    protected setColor(color: number){
        //clear old rectangle?
        this.color = color;
        this.addRectangle(color);
    }

    // protected updateSize(width: number, height: number, buttonContent: GameObjects.Text | GameObjects.Image){ //make replace Container setSize method?
    //     this.width = width;
    //     this.height = height;
    //     this.setSize(this.width, this.height);

    //     this.backgroundGraphics.clear(); //set background rectangle size
    //     this.addRectangle(this.color);

    //     this.scaleToButton();
    //     //buttonContent.setPosition(this.width / 2, this.height / 2); //recenter button content

    //     //need to update eventEmitter somehow
    // }

    protected getContent(): GameObjects.Image | GameObjects.Text{
        return this.content;
    }
}