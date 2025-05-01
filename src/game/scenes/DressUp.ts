import { GameObjects, Scene } from 'phaser';
import { Button } from './interactives/Button';
import { CustomizationTemplate } from "./CustomizationTemplate";
import { Banana } from './toolbox/Banana';
import { CategoryButton } from "./interactives/CategoryButton";
import { Cosmetic } from './toolbox/Cosmetic';

export class DressUp extends CustomizationTemplate {
    //TODO: Data Manager -> transfer choices to next scene
    private cosmeticContainer: GameObjects.Container;
    private categoryContainer: GameObjects.Container;
    private iconContainer: GameObjects.Container;

    // private faceArray: string[];
    // private glassesArray: string[];
    // private shirtArray: string[];
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
        //debugging
        if(this.debug){
            this.cosmeticContainer.add(this.add.graphics().fillStyle(0x004400, 1).fillRect(0, 0, this.getMenuContainer().width, this.getMenuContainer().height - this.getTitle().height - this.MENUBORDER));
        }

        this.categoryContainer = new GameObjects.Container(this, 0, 0);
        this.categoryContainer.setSize(this.cosmeticContainer.width * 0.25, this.cosmeticContainer.height);
        this.cosmeticContainer.add(this.categoryContainer);
        //debugging
        if(this.debug){
            this.categoryContainer.add(this.add.graphics().fillStyle(0x008800, 1).fillRect(0, 0, this.cosmeticContainer.width * 0.25, this.cosmeticContainer.height));
        }

        this.iconContainer = new GameObjects.Container(this, this.categoryContainer.width, 0);
        this.iconContainer.setSize(this.cosmeticContainer.width * 0.75, this.cosmeticContainer.height);
        this.cosmeticContainer.add(this.iconContainer);
        this.iconContainer.add(this.add.graphics().fillStyle(0xffffff, 1).fillRoundedRect(0, 0, this.cosmeticContainer.width * 0.75, this.cosmeticContainer.height, 40)); //change to get button corner radius?

        //make arrays of cosmetic image keys
        this.faceArray = [
            new Cosmetic(this, "DU_Face1", 10, 0, 0.975),
            new Cosmetic(this, "DU_Face2", 20, 0, 1),
            new Cosmetic(this, "DU_Face3", 0, 0, 1),
            new Cosmetic(this, "DU_Face4", 0, 0, 1),
        ];
        // for (let i = 1; i <= 4; i++) {
        //      this.faceArray.push(`DU_Face${i}`); //change to defined array at start (so don't have to calculate image key, can just loop over array)?
        // }

        this.glassesArray = [
            new Cosmetic(this, "DU_Glasses1", 10, 0, 1),
            new Cosmetic(this, "DU_Glasses2", 5, 0, 0.975),
            new Cosmetic(this, "DU_Glasses3", 10, -190, 1),
            new Cosmetic(this, "DU_Glasses4", 0, 0, 1),
        ];

        this.shirtArray = [
            new Cosmetic(this, "DU_Shirt1", 0, 0, 1),
            new Cosmetic(this, "DU_Shirt2", 0, 0, 1),
            new Cosmetic(this, "DU_Shirt3", 20, 0, 1),
            new Cosmetic(this, "DU_Shirt4", 0, 0, 1),
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
       
        //Maps for Image

        this.imageMap = {
            'Face1': this.add.image(450, 714, 'DU_Face1').setVisible(false).setScale(0.65),
            'Face2': this.add.image(450, 714, 'DU_Face2').setVisible(false).setScale(0.65),
            'Face3': this.add.image(450, 714, 'DU_Face3').setVisible(false).setScale(0.65),
            'Face4': this.add.image(450, 714, 'DU_Face4').setVisible(false).setScale(0.65),

            'Glasses1': this.add.image(450, 714, 'DU_Glasses1').setVisible(false).setScale(0.65),
            'Glasses2': this.add.image(450, 714, 'DU_Glasses2').setVisible(false).setScale(0.65),
            'Glasses3': this.add.image(450, 714, 'DU_Glasses3').setVisible(false).setScale(0.65),
            'Glasses4': this.add.image(450, 714, 'DU_Glasses4').setVisible(false).setScale(0.65),

            'Shirt1': this.add.image(450, 714, 'DU_Shirt1').setVisible(false).setScale(0.65),
            'Shirt2': this.add.image(450, 714, 'DU_Shirt2').setVisible(false).setScale(0.65),
            'Shirt3': this.add.image(450, 714, 'DU_Shirt3').setVisible(false).setScale(0.65),
            'Shirt4': this.add.image(450, 714, 'DU_Shirt4').setVisible(false).setScale(0.65)
        };

        this.registry.set("imageMap", this.imageMap);

    
        //new NextButton(this, 1300, 990, 'Wash');
        this.addNextButton(this, "Wash");
    }

   
    //put cosmetic on banana
    // private toggleImage(imageKey: string) { //passes in category and number ("Face1")
    //     const category = imageKey.match(/[a-zA-Z]+/g)?.[0]; //get category ("Face")
    //     var cosmetic = category + "Cosmetic";
    //     if (!category) return;

    //     for (const key in this.imageMap) { //loop through all items in imageMap
    //         if (key.startsWith(category)) {
    //             this.imageMap[key].setVisible(false); //hide all cosmetics in category
    //         }
    //     }

    //     //show selected cosmetic
    //     if (this.imageMap[imageKey]) { //check if null
    //         this.imageMap[imageKey].setVisible(true); //find selected image in imageMap, set visible
    //     }

    //     this.registry.set(cosmetic, "DU_" + imageKey);
    //     // console.log(this.registry.get(category.toLowerCase()));
       
    // }
}
