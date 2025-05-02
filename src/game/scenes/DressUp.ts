import { GameObjects, Scene } from 'phaser';
import { Button } from './interactives/Button';
import { CustomizationTemplate } from "./CustomizationTemplate";
import { Banana } from './toolbox/Banana';
import { CategoryButton } from "./interactives/CategoryButton";
import { Cosmetic } from './toolbox/Cosmetic';
import { TextButton } from './interactives/TextButton';

export class DressUp extends CustomizationTemplate {
    //TODO: Data Manager -> transfer choices to next scene
    private cosmeticContainer: GameObjects.Container;
    private categoryContainer: GameObjects.Container;
    private iconContainer: GameObjects.Container;


    private faceArray: Cosmetic[];
    private glassesArray: Cosmetic[];
    private shirtArray: Cosmetic[];

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

    }

    create() {
        this.customizationLoader(this);

        //create containers
        this.cosmeticContainer = new GameObjects.Container(this, 0, this.getTitle().height + this.MENUBORDER);
        this.cosmeticContainer.setSize(this.getMenuContainer().width, this.getMenuContainer().height - this.getTitle().height - this.MENUBORDER); //make calculateSize method?
        this.getMenuContainer().add(this.cosmeticContainer);


        this.categoryContainer = new GameObjects.Container(this, 0, 0);
        this.categoryContainer.setSize(this.cosmeticContainer.width * 0.25, this.cosmeticContainer.height);
        this.cosmeticContainer.add(this.categoryContainer);
    

        this.iconContainer = new GameObjects.Container(this, this.categoryContainer.width, 0);
        this.iconContainer.setSize(this.cosmeticContainer.width * 0.75, this.cosmeticContainer.height);
        this.cosmeticContainer.add(this.iconContainer);
        this.iconContainer.add(this.add.graphics().fillStyle(0xffc9d2, 1).fillRoundedRect(0, 0, this.cosmeticContainer.width * 0.75, this.cosmeticContainer.height, 40)); //change to get button corner radius?

        //make arrays of cosmetic image keys
        this.faceArray = [
            new Cosmetic( "DU_Face1", 185, 0, 0.975),
            new Cosmetic("DU_Face2", 200, 0, 1),
            new Cosmetic("DU_Face3", 195, 0, 1.1),
            new Cosmetic("DU_Face4", 180, 0, 1),
        ];
      

        this.glassesArray = [
            new Cosmetic("DU_Glasses1", 180, -220, 1),
            new Cosmetic("DU_Glasses2", 175, -220, 0.975),
            new Cosmetic("DU_Glasses3", 180, -220, 1),
            new Cosmetic("DU_Glasses4", 170, -220, 1),
        ];

        this.shirtArray = [
            new Cosmetic("DU_Shirt1", 0, 0, 1),
            new Cosmetic("DU_Shirt2", 0, 0, 1),
            new Cosmetic("DU_Shirt3", 20, 0, 1),
            new Cosmetic("DU_Shirt4", 0, 0, 1),
        ];
    

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
            buttonList[i].setSelectOne(buttonList);
        }
       
        
        //TODO: IMPLEMENT ZOOM IN ON BANANA HEAD
        // new button()    
        // on Next Button click ->
        // zoom in on the banana forehead
        // this.scene.tweens.add({
        //targets     : this ,
        //scale       : 10
        //ease        : 'Linear',
        //duration    : 500,
        //});
        //transition to Personality scene
        //this.scene.start('Personality');


        this.addNextButton(this, "Wash");
    }

   
  
}
