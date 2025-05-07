import { GameObjects, Scene } from 'phaser';
import { Banana } from './toolbox/Banana';
import { TextStyles } from './toolbox/TextStyles';
import { NextButton } from './interactives/NextButton';
import { BackButton } from './interactives/BackButton';

export abstract class SceneTemplate extends Scene {
    //debugging
    protected debug = false;
    borderBox: GameObjects.Graphics;
    expectedBox: GameObjects.Graphics;
    actualBox: GameObjects.Graphics;

    // protected SCENEWIDTH: number;
    // protected SCENEHEIGHT: number;
    protected backgroundImage = "defaultBackground"; //default background
    protected title: GameObjects.Text;
    protected titleText: string;
    // protected titleX: number;
    // protected titleY: number;

    protected SIDEBORDER: number; //make constant, move to sceneTemplate?
    protected TOPBORDER: number; //move to sceneTemplate?
    protected HALFBORDER: number; //move to sceneTemplate?
    protected BANANAHEIGHT: number; //move to sceneTemplate?
    protected BANANAWIDTH: number //move to sceneTemplate?
    protected bananaContainer: GameObjects.Container;
    
    protected nextButton: NextButton;
    protected backButton: BackButton;

    // constructor(sceneFileName: string, titleText: string, titleX: number, titleY: number, backButton: boolean, backgroundImagePath?: string) {
    constructor(sceneFileName: string, titleText: string, backgroundImage?: string) {
        super(sceneFileName);
        this.titleText = titleText;
        // this.titleX = titleX;
        // this.titleY = titleY;
        // this.backButton = backButton;
        if(backgroundImage){
            this.backgroundImage = backgroundImage //replace background if given new one
        }

        //add sceneLoader?
    };

    preload(){
        // if(this.backgroundImagePath != null){
        //     this.load.image('backgroundImage', this.backgroundImagePath);
        // }
        // else{
        //     this.load.image('backgroundImage', 'assets/Basic Background.png'); //default background
        // }
    };

    create(){
    };

    protected sceneLoader(scene: Scene){ //move to constructor?
        this.calculateSizes1(scene);
        this.addBackground(scene);
        this.addTitle(scene, this.titleText)
        this.addBananaContainer(scene);

        var banana = scene.registry.get("banana");
        banana.addBanana(scene, this.bananaContainer); //move to method, call in children (so can have scene with no banana)
    }

    private calculateSizes1(scene: Scene){
    //     this.SCENEWIDTH= scene.scale.displaySize.width; //make constant?
    //     this.SCENEHEIGHT = scene.scale.displaySize.height;
        this.SIDEBORDER = scene.scale.baseSize.width * 0.08; //make constant?
        this.TOPBORDER = scene.scale.baseSize.height * 0.08
        this.HALFBORDER = this.SIDEBORDER / 2;
        this.BANANAHEIGHT = scene.scale.baseSize.height * 0.84;
        this.BANANAWIDTH = scene.scale.baseSize.width * 0.84;
    }

    private addBackground(scene: Scene){
        scene.add.image(0, 0, this.backgroundImage).setOrigin(0);
    }

    private addTitle(scene: Scene, text: string){
        this.title = new GameObjects.Text(scene, 0, 0, text, TextStyles.title);
        scene.add.existing(this.title);
        //position updated in child classes
    }

    protected updateTitle(centerX: number, topY: number, container?: GameObjects.Container){ //change to take title position in constructor?
        this.title.setOrigin(0.5, 0); //set origin to top center of text box
        this.title.setPosition(centerX, topY);

        if(container){
            container.add(this.title);
        }
    }
    
    private addBananaContainer(scene: Scene){ //move to sceneTemplate or Banana?
        //debugging
        if(this.debug){
            this.borderBox = this.add.graphics().fillStyle(0xffffff, 1).fillRect(0, 0, this.SIDEBORDER, this.scale.baseSize.height).fillRect(0, 0, this.scale.baseSize.width, this.TOPBORDER);
            this.expectedBox = this.add.graphics().fillStyle(0xff0000, 1).fillRect(this.SIDEBORDER, this.TOPBORDER, this.BANANAWIDTH, this.BANANAHEIGHT);
        }

        //add container
        this.bananaContainer = new GameObjects.Container(scene);
        scene.add.existing(this.bananaContainer);
        this.bananaContainer.setPosition(this.SIDEBORDER, this.TOPBORDER);
        this.bananaContainer.setSize(this.BANANAWIDTH, this.BANANAHEIGHT);

        //debugging
        if(this.debug){
            this.actualBox = scene.add.graphics().fillStyle(0x00ff00, 1).fillRect(0, 0, this.BANANAWIDTH, this.BANANAHEIGHT);
            this.bananaContainer.add(this.actualBox).sendToBack(this.actualBox);
        }
    }

    protected updateBananaContainerSize(){
        this.bananaContainer.setSize(this.BANANAWIDTH, this.BANANAHEIGHT);
        this.registry.get("banana").center(this.BANANAWIDTH, this.BANANAHEIGHT);
        //debugging
        if(this.debug){
            this.expectedBox.clear();
            this.expectedBox = this.add.graphics().fillStyle(0xff0000, 1).fillRect(this.SIDEBORDER, this.TOPBORDER, this.BANANAWIDTH, this.BANANAHEIGHT);
            this.children.sendToBack(this.expectedBox);
            this.actualBox.clear()
            this.actualBox = this.add.graphics().fillStyle(0x00ff00, 1).fillRect(0, 0, this.BANANAWIDTH, this.BANANAHEIGHT);
            this.bananaContainer.add(this.actualBox).sendToBack(this.actualBox);
        }
    }



    protected addNextButton(scene: Scene, nextScene: string, displayText: string, extraAction?: Function, x?: number, y?: number){ //add x, y parameters, replaced in template addNextButton definitions, remove?
        if(!x){
            x = 0;
        }
        if (!y){
            y = 0;
        }
        this.nextButton = new NextButton(this, nextScene, x, y, displayText, extraAction);
        scene.add.existing(this.nextButton);
    }

    protected addBackButton(scene: Scene, previousScene: string){
        this.backButton = new BackButton(scene, previousScene);
        scene.add.existing(this.backButton);
    }

    // protected getSceneWidth(){
    //     return this.SCENEWIDTH;
    // }

    // protected getSceneHeight(){
    //     return this.SCENEHEIGHT;
    // }


    //getter methods
    protected getTitle(){
        return this.title;
    }

    protected getNextButton(){
        return this.nextButton;
    }
};