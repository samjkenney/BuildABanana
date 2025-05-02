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
            //this.load.image(`Face${i}`, `assets/dressup/Face${i}.png`);
            //this.load.image(`Glasses${i}`, `assets/dressup/Glasses${i}.png`);
            //this.load.image(`Shirt${i}`, `assets/dressup/Shirt${i}.png`);

             // Map buttons to DU images
             this.load.image(`DU_Face${i}`, `assets/dressup/DU_Face${i}.png`);
             this.load.image(`DU_Glasses${i}`, `assets/dressup/DU_Glasses${i}.png`);
             this.load.image(`DU_Shirt${i}`, `assets/dressup/DU_Shirt${i}.png`);
        }

        //this.load.image('nextButton', 'assets/nextButton.png');

        // UI Layers
        // this.load.image('Face_Layer', 'assets/dressup/DU_F_Layer.png');
        // this.load.image('Clothes_Layer', 'assets/dressup/DU_C_Layer.png');
        // this.load.image('Hat_Layer', 'assets/dressup/DU_H_Layer.png');
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
        // for (let i = 1; i <= 4; i++) {
        //      this.glassesArray.push(`DU_Glasses${i}`); //change to defined array at start (so don't have to calculate image key, can just loop over array)?
        // }

        this.shirtArray = [
            new Cosmetic(this, "DU_Shirt1", 0, 0, 1),
            new Cosmetic(this, "DU_Shirt2", 0, 0, 1),
            new Cosmetic(this, "DU_Shirt3", 20, 0, 1),
            new Cosmetic(this, "DU_Shirt4", 0, 0, 1),
        ];
        // for (let i = 1; i <= 4; i++) {
        //      this.shirtArray.push(`DU_Shirt${i}`); //change to defined array at start (so don't have to calculate image key, can just loop over array)?
        // }

        //create category buttons
        var categories = ["face", "glasses", "shirt"]; //move to variables?
        var categoriesMap: {[key: string]: Cosmetic[]} = {"face": this.faceArray, "glasses": this.glassesArray, "shirt": this.shirtArray}; //change to array of dictionaries
        
        // var categories1: {[key: string]: any}[] = [
        //     {"name": "face", "array": this.faceArray},
        //     {"name": "glasses", "array": this.glassesArray},
        //     {"name": "shirt", "array": this.shirtArray}
        // ];

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
        //set face button to selected

        //check 1 category button selected at time (list of buttons, set others in list to not selected?)



        //this.add.image(849, 567.5, 'dressUpBackground');
        //const menu = this.add.image(950, 576, 'menu');
        //menu.setScale(0.85);
        //const myBanana = new Banana(this, 450, 714, 'banana');

        // Layers
        // const layers = {
        //     face: this.add.image(950, 576, 'Hat_Layer').setInteractive().setVisible(false).setScale(0.85),
        //     glasses: this.add.image(950, 576, 'Face_Layer').setInteractive().setVisible(false).setScale(0.85),
        //     shirt: this.add.image(950, 576, 'Clothes_Layer').setInteractive().setVisible(false).setScale(0.85),
        // };

        
        //this.layers = layers;
        
        // const hideAllLayers = () => {
        //     for (let key in this.layers) {
        //         this.layers[key].setVisible(false);
        //     }
        // };

        //Positioning, TODO: Make it an Array instead???
        // const buttonPositions = {
        //     sharedPositions: [
        //         { x: 1250.5, y: 750 },
        //         { x: 1480.5, y: 520 },
        //         { x: 1250.5, y: 520 },
        //         { x: 1480.5, y: 750 }
        //     ],
            
        // };

        // Make Category Buttons
        // const createCategoryButtons = (category: string, positions: { x: number, y: number }[]) => {
        //     const buttons: Phaser.GameObjects.Image[] = [];
        //     let currentButton: Phaser.GameObjects.Image | null = null;

        //     for (let i = 1; i <= 4; i++) {
        //         const button = this.add.image(positions[i - 1].x, positions[i - 1].y, `${category}${i}`);
        //         button.setInteractive({ pixelPerfect: true }).setVisible(false).setScale(1.24);
        //         button.on('pointerdown', () => {
        //             console.log(`Clicked ${category}${i}`);
        //             this.toggleImage(`${category}${i}`);

        //             if (currentButton) {
        //                 currentButton.clearTint();
        //             }
                    
        //             button.setTint(0xe1a8a0);
        //             currentButton = button;
        //             //this.registry.set("currentButton", currentButton)

        //         });
        //         buttons.push(button);
        //     }
        //     return buttons;
        // };

        // Buttons for cat call function above
        // this.faceButtons = createCategoryButtons('Face', buttonPositions.sharedPositions);
        // this.glassesButtons = createCategoryButtons('Glasses', buttonPositions.sharedPositions);
        // this.shirtButtons = createCategoryButtons('Shirt', buttonPositions.sharedPositions);

        // Icons for cat
        // const face = this.add.image(1020, 536, 'face').setScale(0.23).setInteractive();
        // const glasses = this.add.image(1020, 636, 'glasses').setScale(0.23).setInteractive();
        // const shirt = this.add.image(1020, 736, 'shirt').setScale(0.23).setInteractive();

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
        //console.log(this.registry.get("imageMap"));

        // Cat logic
        // const setCategory = (category: string) => {
        //     hideAllLayers();
        //     this.layers[category].setVisible(true);
        //     this.selectedLayer = category;
        //     this.faceButtons.forEach(button => button.setVisible(category === 'face'));
        //     this.glassesButtons.forEach(button => button.setVisible(category === 'glasses'));
        //     this.shirtButtons.forEach(button => button.setVisible(category === 'shirt'));

            
        //     face.clearTint();
        //     glasses.clearTint();
        //     shirt.clearTint();
        // };

        // Mouse Interactions
        // setCategory('face');
        // face.setTint(0xcc7577); 
        // face.on('pointerdown', () => {
        //     setCategory('face');
        //     face.setTint(0xcc7577); 
             
        // });

        // // TODO:(Change to Hat)
        // glasses.on('pointerdown', () => {
        //     setCategory('glasses');
        //     glasses.setTint(0xcc7577); 
            
        // });

      
        // shirt.on('pointerdown', () => {
        //     setCategory('shirt');
        //     shirt.setTint(0xcc7577); 
            
        // });

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

   
    //put cosmetic on banana
    private toggleImage(imageKey: string) { //passes in category and number ("Face1")
        const category = imageKey.match(/[a-zA-Z]+/g)?.[0]; //get category ("Face")
        var cosmetic = category + "Cosmetic";
        if (!category) return;

        for (const key in this.imageMap) { //loop through all items in imageMap
            if (key.startsWith(category)) {
                this.imageMap[key].setVisible(false); //hide all cosmetics in category
            }
        }

        //show selected cosmetic
        if (this.imageMap[imageKey]) { //check if null
            this.imageMap[imageKey].setVisible(true); //find selected image in imageMap, set visible
        }

        this.registry.set(cosmetic, "DU_" + imageKey);
        // console.log(this.registry.get(category.toLowerCase()));
       
    }
}
