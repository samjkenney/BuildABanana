//template for all the cooking scenes
import { GameObjects, Scene } from 'phaser';
import { SceneTemplate } from './SceneTemplate';
import { TextStyles } from './toolbox/TextStyles';
import { NextButton } from './interactives/NextButton';
import { DarkNextButton } from './interactives/DarkNextButton';

export abstract class CookTemplate extends SceneTemplate {
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

    protected cookLoader(scene: Scene){ //find way to move to constructor, make automatic?
        super.sceneLoader(scene);

        //this.calculateSizes(scene);
        this.updateTitle(this.BANANAWIDTH / 2, 0, this.bananaContainer);
    }

    private calculateSizes(scene: Scene){
        //put title above bananaContainer (not inside) so no overlap?
    }
    
    protected addNextButton(scene: Scene, nextScene: string, displayText: string, extraAction?: Function, delay?: number){
        this.nextButton = new NextButton(this, nextScene, this.SIDEBORDER + this.BANANAWIDTH - NextButton.getWidth(), this.TOPBORDER + this.BANANAHEIGHT - NextButton.getHeight(), displayText, extraAction, delay);
        scene.add.existing(this.nextButton);
    }

    protected addDarkNextButton(scene: Scene, nextScene: string, displayText: string, extraAction?: Function, delay?: number){
        this.nextButton = new DarkNextButton(this, nextScene, this.SIDEBORDER + this.BANANAWIDTH - NextButton.getWidth(), this.TOPBORDER + this.BANANAHEIGHT - NextButton.getHeight(), displayText, extraAction, delay);
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