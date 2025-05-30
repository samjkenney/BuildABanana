import { GameObjects, Scene } from 'phaser';
import { Button } from './interactives/Button';
import { CustomizationTemplate } from "./CustomizationTemplate";
import { Banana } from './toolbox/Banana';
import { CategoryButton } from "./interactives/CategoryButton";
import { Cosmetic } from './toolbox/Cosmetic';
import { TextButton } from './interactives/TextButton';
import { NextButton } from './interactives/NextButton';
import { TextStyles } from './toolbox/TextStyles';

export class DressUp extends CustomizationTemplate {
    
    private cosmeticContainer: GameObjects.Container;
    private categoryContainer: GameObjects.Container;
    private iconContainer: GameObjects.Container;


    //make arrays of cosmetic image keys
    private faceArray: Cosmetic[] = [ //make static?
        new Cosmetic( "DU_Face1", 195, -30, 0.95),
        new Cosmetic("DU_Face2", 200, -30, 1),
        new Cosmetic("DU_Face3", 195, -30, 1),
        new Cosmetic("DU_Face4", 180, -30, 1),
    ];
    private glassesArray: Cosmetic[] = [
        new Cosmetic("DU_Glasses1", 200, -300, 0.975),
        new Cosmetic("DU_Glasses2", 170, -350, 0.975),
        new Cosmetic("DU_Glasses3", 150, -450, 0.95),
        new Cosmetic("DU_Glasses4", 210, -300, 1),
    ];
    private shirtArray: Cosmetic[] = [
        //Minion Overalls
        new Cosmetic("DU_Shirt1", 100, 180, 1),
        //Jester Necklace
        new Cosmetic("DU_Shirt2", 85, 170, 1.1),
        //Pointer
        new Cosmetic("DU_Shirt3", -60, 30, 1),
        //Tie
        new Cosmetic("DU_Shirt4", 130, 210, 1.05),
    ];

    private faceButtons: Phaser.GameObjects.Image[] = [];
    private glassesButtons: Phaser.GameObjects.Image[] = [];
    private shirtButtons: Phaser.GameObjects.Image[] = [];
    
    // Handle Layering
    private layers: { [key: string]: Phaser.GameObjects.Image } = {};
    private selectedLayer: string | null = null;

    private imageMap: { [key: string]: Phaser.GameObjects.Image } = {}; 
    private selectedFace: string | null = null;
    private selectedGlasses: string | null = null;
    private selectedShirt: string | null = null;

    constructor() {
        super('DressUp', "Banana-\nGlam!", "dressUpBackground");
    }

    preload() {
        this.load.image('dressUpBackground', 'assets/dressup/DS_BKG.png');
        //this.load.image('menu', 'assets/dressup/DU_MenuBase.png');

        //Category images
        this.load.image('face', 'assets/dressup/DU_F_Icon_scale.png');
        this.load.image('glasses', 'assets/dressup/DU_H_Icon_scale.png');
        this.load.image('shirt', 'assets/dressup/DU_C_Icon_scale.png');

        // Button images
        for (let i = 1; i <= 4; i++) {
             // Map buttons to DU images
             this.load.image(`DU_Face${i}`, `assets/dressup/DU_Face${i}.png`);
             this.load.image(`DU_Glasses${i}`, `assets/dressup/DU_Glasses${i}.png`);
             this.load.image(`DU_Shirt${i}`, `assets/dressup/DU_Shirt${i}.png`);
        }

        for (let j = 1; j <= 15; j++) {
            this.load.image(`brainZoom${j}`, `assets/dressup/zoomAnimation/brainzoom${j}.png`);
        }

    }

    create() {
        this.customizationLoader(this);

        var layer = this.add.image(0, 0, "labBackground").setOrigin(0).setAlpha(0.1);
        this.children.sendToBack(layer);
        this.children.sendToBack(this.background);
        
        //create containers, move to function
        this.cosmeticContainer = new GameObjects.Container(this, 0, this.getTitle().height + this.MENUBORDER);
        this.cosmeticContainer.setSize(this.getMenuContainer().width, this.getMenuContainer().height - this.getTitle().height - this.MENUBORDER); //make calculateSize method?
        this.getMenuContainer().add(this.cosmeticContainer);


        this.categoryContainer = new GameObjects.Container(this, 0, 0);
        this.categoryContainer.setSize(this.cosmeticContainer.width * 0.25, this.cosmeticContainer.height);
        this.cosmeticContainer.add(this.categoryContainer);
    

        this.iconContainer = new GameObjects.Container(this, this.categoryContainer.width, 0);
        this.iconContainer.setSize(this.cosmeticContainer.width * 0.75, this.cosmeticContainer.height);
        this.cosmeticContainer.add(this.iconContainer);
        this.iconContainer.add(this.add.graphics().fillStyle(0xffabb5, 1).fillRoundedRect(0, 0, this.cosmeticContainer.width * 0.75, this.cosmeticContainer.height, 40)); //change to get button corner radius?

    

        //create category buttons
        var categories = ["face", "glasses", "shirt"]; //move to variables?
        var categoriesMap: {[key: string]: Cosmetic[]} = {"face": this.faceArray, "glasses": this.glassesArray, "shirt": this.shirtArray}; //change to array of dictionaries
        

        var buttonList = [];
        for(var i = 0; i < categories.length; i++){
            var y = (0.25 / 2 + i * 0.25) * this.categoryContainer.height; //change to calculate from category list size?
            var button = new CategoryButton(this, 0, y, categories[i], this.categoryContainer, this.iconContainer, categoriesMap[categories[i]], this.bananaContainer); //save buttons to variables
            buttonList.push(button);
            this.categoryContainer.add(button);
        }

        for(var i = 0; i < categories.length; i++){
            buttonList[i].setSelectOne(buttonList, false);
        }

        buttonList[0].setSelected(true);
        buttonList[0].selectCategory();
       
        

        //zoom function
        var zoom = () => {
            
            var cam = this.cameras.main;
            
            cam.setPosition(0, 0);
            cam.centerOn(720, 400);
            
            this.tweens.add({
                targets: cam,
                zoom: 20,
                ease: 'Linear',
                duration: 1500,
                onComplete: () => {
                    //play animation
                    playZoomAnimation();
                    this.time.addEvent({
                        delay: 4300, // Delay before starting the animation
                        callback: () => { 
                            this.scene.start('Personality');
                        },
                        loop: false
                    })    
                }
            });
        }

        //play the animation of zooming in on the banana
        var playZoomAnimation = () => {
            this.anims.create({
                key: 'brainZoom',
                frames: [
                    { key: 'brainZoom1' },
                    { key: 'brainZoom2' },
                    { key: 'brainZoom3' },
                    { key: 'brainZoom4' },
                    { key: 'brainZoom5' },
                    { key: 'brainZoom6' },
                    { key: 'brainZoom7' },
                    { key: 'brainZoom8' },
                    { key: 'brainZoom9' },
                    { key: 'brainZoom10' },
                    { key: 'brainZoom11' },
                    { key: 'brainZoom12' },
                    { key: 'brainZoom13' },
                    { key: 'brainZoom14' },
                    { key: 'brainZoom15' }
                ],
                frameRate: 5, 
                repeat: 0 
            })

            const thisSprite = this.add.sprite(720, 400, 'brainZoom1').setScale(0.05).play('brainZoom'); //
            // play animation
        }
        
       //add button to zoom in on banana and transition to next scene
       var width = 400;
       var height = 100;
        this.add.existing(new TextButton(this,  this.SIDEBORDER + this.BANANAWIDTH + this.HALFBORDER + this.MENUWIDTH / 2 - width / 2, this.TOPBORDER + this.MENUHEIGHT + (this.BANANAHEIGHT - this.MENUHEIGHT - height), width, height,
             NextButton.COLOR, NextButton.HOVERCOLOR, NextButton.SELECTEDCOLOR, "Deep Dive", TextStyles.getButtonStyle(this), 
             true, true, zoom))
    }

   
  
}
