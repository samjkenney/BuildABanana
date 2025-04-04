import { GameObjects, Scene } from 'phaser';
import { NextButton } from './toolbox/NextButton'; 
import { Banana } from './toolbox/Banana';

export class DressUp extends Scene {

    private faceButtons: Phaser.GameObjects.Image[] = [];
    private glassesButtons: Phaser.GameObjects.Image[] = [];
    private shirtButtons: Phaser.GameObjects.Image[] = [];
    // Handle Layering
    private layers: { [key: string]: Phaser.GameObjects.Image } = {};
    private selectedLayer: string | null = null;

    constructor() {
        super('DressUp');
    }

    preload() {
        this.load.image('dressUpBackground', 'assets/DU_BKG.png');
        this.load.image('menu', 'assets/DU_MenuBase.png');
        this.load.image('banana', 'assets/Banana.png');
        
        //Cats
        this.load.image('face', 'assets/Face.png');
        this.load.image('glasses', 'assets/Glasses.png');
        this.load.image('shirt', 'assets/Shirt.png');

        // Button images
        for (let i = 1; i <= 4; i++) {
            this.load.image(`Face${i}`, `assets/Face${i}.png`);
            this.load.image(`Glasses${i}`, `assets/Glasses${i}.png`);
            this.load.image(`Shirt${i}`, `assets/Shirt${i}.png`);
        }

        this.load.image('nextButton', 'assets/nextButton.png');

        // UI Layers
        this.load.image('Face_Layer', 'assets/DU_F_Layer.png');
        this.load.image('Clothes_Layer', 'assets/DU_C_Layer.png');
        this.load.image('Hat_Layer', 'assets/DU_H_Layer.png');
    }

    create() {
        this.add.image(512, 384, 'dressUpBackground');
        const menu = this.add.image(550, 376, 'menu');
        menu.setScale(0.55);
        const myBanana = new Banana(this, 274, 469, 'banana');

        // Layers
        const layers = {
            face: this.add.image(550, 376, 'Hat_Layer').setInteractive().setVisible(false).setScale(0.55),
            glasses: this.add.image(550, 376, 'Face_Layer').setInteractive().setVisible(false).setScale(0.55),
            shirt: this.add.image(550, 376, 'Clothes_Layer').setInteractive().setVisible(false).setScale(0.55),
        };

        this.layers = layers;
        
        const hideAllLayers = () => {
            for (let key in this.layers) {
                this.layers[key].setVisible(false);
            }
        };

        //Positning
        const buttonPositions = {
            face: [
                { x: 750.5, y: 344 },
                { x: 900.5, y: 344 },
                { x: 750.5, y: 480 },
                { x: 900.5, y: 480 }
            ],
            glasses: [
                { x: 750.5, y: 344 },
                { x: 900.5, y: 344 },
                { x: 750.5, y: 480 },
                { x: 900.5, y: 480 }
            ],
            shirt: [
                { x: 750.5, y: 344 },
                { x: 900.5, y: 344 },
                { x: 750.5, y: 480 },
                { x: 900.5, y: 480 }
            ]
        };

        // make Button
        const createCategoryButtons = (category: string, positions: { x: number, y: number }[]) => {
            const buttons: Phaser.GameObjects.Image[] = [];
            for (let i = 1; i <= 4; i++) {
                const button = this.add.image(positions[i - 1].x, positions[i - 1].y, `${category}${i}`);
                button.setInteractive().setVisible(false).setDisplaySize(400, 250);
                buttons.push(button);
            }
            return buttons;
        };

        // Buttons for cat
        this.faceButtons = createCategoryButtons('Face', buttonPositions.face);
        this.glassesButtons = createCategoryButtons('Glasses', buttonPositions.glasses);
        this.shirtButtons = createCategoryButtons('Shirt', buttonPositions.shirt);

        // Icons for cat
        const face = this.add.image(596.5, 344, 'face').setScale(0.16).setInteractive();
        const glasses = this.add.image(597, 414, 'glasses').setScale(0.16).setInteractive();
        const shirt = this.add.image(596.5, 488, 'shirt').setScale(0.16).setInteractive();

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
        
        face.on('pointerdown', () => {
            setCategory('face');
            face.setTint(0xff69b4); 
        });

        // TODO:(Change to Hat)
        glasses.on('pointerdown', () => {
            setCategory('glasses');
            glasses.setTint(0xff69b4); 
        });

      
        shirt.on('pointerdown', () => {
            setCategory('shirt');
            shirt.setTint(0xff69b4); 
        });

    
        new NextButton(this, 800, 654, 'Peel');
    }
}