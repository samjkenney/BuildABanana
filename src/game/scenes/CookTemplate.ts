import { GameObjects, Scene } from 'phaser';
import { SceneTemplate } from './SceneTemplate';
import { TextStyles } from './toolbox/TextStyles';
import { NextButton } from './interactives/NextButton';

export abstract class CookTemplate extends SceneTemplate {
    protected SIDEBORDER: number; //make constant, move to sceneTemplate?
    protected TOPBORDER: number; //move to sceneTemplate?
    protected BANANAHEIGHT: number; //move to sceneTemplate?
    protected BANANAWIDTH: number //move to sceneTemplate?
    protected bananaContainer: GameObjects.Container;

    constructor(sceneFileName: string, titleText: string, backgroundImage?: string) {
        //super(sceneFileName, titleText, 0, 0, backButton, backgroundImagePath);
        super(sceneFileName, titleText, backgroundImage);
        // this.BORDER = scene.scale.displaySize.width * 0.1; //make constant?
        // this.CONTENTHEIGHT = scene.scale.displaySize.height * 0.6;
        // this.BANANAWIDTH = scene.scale.displaySize.width * 0.4;
        // this.MENUWIDTH = scene.scale.displaySize.width * 0.3;
        //this.titleText = titleText;
        //this.backgroundImagePath = backgroundImagePath;
    }

    preload(){
    }

    create(){  
    }

    protected customizationLoader(scene: Scene){ //find way to move to constructor, make automatic?
        super.sceneLoader(scene);

        this.calculateSizes(scene);
        this.addBananaContainer(scene);
    }

    private calculateSizes(scene: Scene){
        this.SIDEBORDER = scene.scale.baseSize.width * 0.08; //make constant?
        this.TOPBORDER = scene.scale.baseSize.height * 0.08
        this.BANANAHEIGHT = scene.scale.baseSize.height * 0.84;
        this.BANANAWIDTH = scene.scale.baseSize.width * 0.84;
    }

    private addBananaContainer(scene: Scene){ //move to sceneTemplate?
        //debugging
        this.add.graphics().fillStyle(0xffffff, 1).fillRect(0, 0, this.SIDEBORDER, this.scale.baseSize.height);
        this.add.graphics().fillStyle(0xff0000, 1).fillRect(this.SIDEBORDER, this.TOPBORDER, this.BANANAWIDTH, this.BANANAHEIGHT);
        
        //add container
        this.bananaContainer = new GameObjects.Container(scene);
        scene.add.existing(this.bananaContainer);
        this.bananaContainer.setPosition(this.SIDEBORDER, this.TOPBORDER);
        this.bananaContainer.setSize(this.BANANAWIDTH, this.BANANAHEIGHT);

        //debugging
        this.bananaContainer.add(scene.add.graphics().fillStyle(0x00ff00, 1).fillRect(0, 0, this.BANANAWIDTH, this.BANANAHEIGHT));

        //add banana
        var banana = scene.registry.get("banana"); //move to sceneTemplate?
        banana.addToContainer(this.bananaContainer);
        banana.center(this.BANANAWIDTH, this.BANANAHEIGHT);
    }
    
    protected addNextButton(scene: Scene, nextScene: string, displayText?: string){
        this.nextButton = new NextButton(this, nextScene, this.SIDEBORDER + this.BANANAWIDTH - NextButton.getWidth(), this.TOPBORDER + this.BANANAHEIGHT - NextButton.getHeight(), displayText);
        scene.add.existing(this.nextButton);
    }



    //getter methods
    protected getSideBorder(){
        return this.SIDEBORDER;
    }

    protected getTopBorder(){
        return this.TOPBORDER;
    }

    protected getBananaHeight(){
        return this.BANANAHEIGHT;
    }

    protected getBananaWidth(){
        return this.BANANAWIDTH;
    }

    protected getBananaContainer(){
        return this.bananaContainer;
    }
};