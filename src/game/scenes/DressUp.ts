import { GameObjects, Scene } from 'phaser';
import { NextButton } from './toolbox/NextButton'; 
import { Banana } from './toolbox/Banana';

export class DressUp extends Scene {
    //TODO: Data Manager -> transfer choices to next scene

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
        super('DressUp');
    }

    preload() {
        this.load.image('dressUpBackground', 'assets/dressup/DS_BKG.png');
        this.load.image('menu', 'assets/dressup/DU_MenuBase.png');
        this.load.image('banana', 'assets/Banana.png');

        //Cats
        this.load.image('face', 'assets/dressup/Face.png');
        this.load.image('glasses', 'assets/dressup/Glasses.png');
        this.load.image('shirt', 'assets/dressup/Shirt.png');

        // Button images
        for (let i = 1; i <= 4; i++) {
            this.load.image(`Face${i}`, `assets/dressup/Face${i}.png`);
            this.load.image(`Glasses${i}`, `assets/dressup/Glasses${i}.png`);
            this.load.image(`Shirt${i}`, `assets/dressup/Shirt${i}.png`);


             // Map buttons to DU images
             this.load.image(`DU_Face${i}`, `assets/dressup/DU_Face${i}.png`);
             this.load.image(`DU_Glasses${i}`, `assets/dressup/DU_Glasses${i}.png`);
             this.load.image(`DU_Shirt${i}`, `assets/dressup/DU_Shirt${i}.png`);
        }

        this.load.image('nextButton', 'assets/nextButton.png');

        // UI Layers
        this.load.image('Face_Layer', 'assets/dressup/DU_F_Layer.png');
        this.load.image('Clothes_Layer', 'assets/dressup/DU_C_Layer.png');
        this.load.image('Hat_Layer', 'assets/dressup/DU_H_Layer.png');
    }

    create() {
        this.add.image(849, 567.5, 'dressUpBackground');
        const menu = this.add.image(950, 576, 'menu');
        menu.setScale(0.85);
        //const myBanana = new Banana(this, 450, 714, 'banana');

       

        // Layers
        const layers = {
            face: this.add.image(950, 576, 'Hat_Layer').setInteractive().setVisible(false).setScale(0.85),
            glasses: this.add.image(950, 576, 'Face_Layer').setInteractive().setVisible(false).setScale(0.85),
            shirt: this.add.image(950, 576, 'Clothes_Layer').setInteractive().setVisible(false).setScale(0.85),
        };

        
        this.layers = layers;
        
        const hideAllLayers = () => {
            for (let key in this.layers) {
                this.layers[key].setVisible(false);
            }
        };

        //Positioning, TODO: Make it an Array instead???
        const buttonPositions = {
            sharedPositions: [
                { x: 1250.5, y: 750 },
                { x: 1480.5, y: 520 },
                { x: 1250.5, y: 520 },
                { x: 1480.5, y: 750 }
            ],
            
        };

        // Make Category Buttons
        const createCategoryButtons = (category: string, positions: { x: number, y: number }[]) => {
            const buttons: Phaser.GameObjects.Image[] = [];
            let currentButton: Phaser.GameObjects.Image | null = null;

            for (let i = 1; i <= 4; i++) {
                const button = this.add.image(positions[i - 1].x, positions[i - 1].y, `${category}${i}`);
                button.setInteractive({ pixelPerfect: true }).setVisible(false).setScale(1.24);
                button.on('pointerdown', () => {
                    console.log(`Clicked ${category}${i}`);
                    this.toggleImage(`${category}${i}`);

                    if (currentButton) {
                        currentButton.clearTint();
                    }
                    
                    button.setTint(0xe1a8a0);
                    currentButton = button;
                    //this.registry.set("currentButton", currentButton)

                });
                buttons.push(button);
            }
            return buttons;
        };

        // Buttons for cat call function above
        this.faceButtons = createCategoryButtons('Face', buttonPositions.sharedPositions);
        this.glassesButtons = createCategoryButtons('Glasses', buttonPositions.sharedPositions);
        this.shirtButtons = createCategoryButtons('Shirt', buttonPositions.sharedPositions);

        // Icons for cat
        const face = this.add.image(1020, 536, 'face').setScale(0.23).setInteractive();
        const glasses = this.add.image(1020, 636, 'glasses').setScale(0.23).setInteractive();
        const shirt = this.add.image(1020, 736, 'shirt').setScale(0.23).setInteractive();

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
        const setCategory = (category: string) => {
            hideAllLayers();
            this.layers[category].setVisible(true);
            this.selectedLayer = category;
            this.faceButtons.forEach(button => button.setVisible(category === 'face'));
            this.glassesButtons.forEach(button => button.setVisible(category === 'glasses'));
            this.shirtButtons.forEach(button => button.setVisible(category === 'shirt'));

            
            face.clearTint();
            glasses.clearTint();
            shirt.clearTint();
        };

        // Mouse Interactions
        setCategory('face');
        face.setTint(0xcc7577); 
        face.on('pointerdown', () => {
            setCategory('face');
            face.setTint(0xcc7577); 
             
        });

        // TODO:(Change to Hat)
        glasses.on('pointerdown', () => {
            setCategory('glasses');
            glasses.setTint(0xcc7577); 
            
        });

      
        shirt.on('pointerdown', () => {
            setCategory('shirt');
            shirt.setTint(0xcc7577); 
            
        });

    
        new NextButton(this, 1300, 990, 'Wash');
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
