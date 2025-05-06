// A scene template for scenes that include a menu component
//Takes in a scene file name, title text, and an optional background image path
//by Zander Leong

import { GameObjects, Scene } from 'phaser';
import { SceneTemplate } from './SceneTemplate';
import { TextStyles } from './toolbox/TextStyles';
import { NextButton } from './interactives/NextButton';

export abstract class CustomizationTemplate extends SceneTemplate {
    protected MENUBORDER: number; //make constant?
    protected MENUHEIGHT: number;
    protected MENUWIDTH: number;
    protected bananaContainer: GameObjects.Container;
    protected menuContainer: GameObjects.Container;

    // constructor(sceneFileName: string, titleText: string, backButton: boolean, backgroundImagePath?: string) {
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
        this.updateBananaContainerSize();
        this.addMenuContainer(scene);
        this.updateTitle(this.MENUWIDTH / 2, 0, this.menuContainer);
    }

    private calculateSizes(scene: Scene){
        this.BANANAWIDTH = scene.scale.baseSize.width * 0.45; //replaces SceneTemplate calculation
        this.MENUHEIGHT = scene.scale.baseSize.height * 0.70; //65%?
        this.MENUBORDER = this.MENUHEIGHT * 0.1; //move to each scene?
        //this.MENUHEIGHT = this.BANANAHEIGHT;
        this.MENUWIDTH = scene.scale.baseSize.width * 0.35;
    }

    private addMenuContainer(scene: Scene){
        //add container
        this.menuContainer = new GameObjects.Container(scene);
        scene.add.existing(this.menuContainer);
        this.menuContainer.setPosition(this.SIDEBORDER + this.BANANAWIDTH + this.HALFBORDER, this.TOPBORDER);
        this.menuContainer.setSize(this.MENUWIDTH, this.MENUHEIGHT);

        //debugging
        if(this.debug){
            var expectedBox = scene.add.graphics().fillStyle(0xff0000, 1).fillRect(this.SIDEBORDER + this.BANANAWIDTH + this.HALFBORDER, this.TOPBORDER, this.MENUWIDTH, this.MENUHEIGHT);
            scene.children.sendToBack(expectedBox);
            var actualBox = scene.add.graphics().fillStyle(0x00ff00, 1).fillRect(0, 0, this.MENUWIDTH, this.MENUHEIGHT);
            this.menuContainer.add(actualBox).sendToBack(actualBox);
        }
    }
    
    protected addNextButton(scene: Scene, nextScene: string, displayText: string){
        this.nextButton = new NextButton(this, nextScene, this.SIDEBORDER + this.BANANAWIDTH + this.HALFBORDER + this.MENUWIDTH / 2 - NextButton.getWidth() / 2, this.TOPBORDER + this.MENUHEIGHT + (this.BANANAHEIGHT - this.MENUHEIGHT - NextButton.getHeight()), displayText);
        scene.add.existing(this.nextButton);
    }



    //getter methods
    protected getSideBorder(){ //are these not even necessary either (children inherit SIDEBORDER)??????
        return this.SIDEBORDER;
    }

    protected getTopBorder(){ //huh
        return this.TOPBORDER;
    }

    protected getMenuBorder(){ //wow oopsies
        return this.MENUBORDER;
    }

    protected getBananaHeight(){ //not necessary (can use container.height)?
        return this.BANANAHEIGHT;
    }

    protected getBananaWidth(){ //not necessary either?
        return this.BANANAWIDTH;
    }
    
    protected getMenuHeight(){ //or this?
        return this.MENUHEIGHT;
    }

    protected getMenuWidth(){ //or this?
        return this.MENUWIDTH;
    }

    protected getBananaContainer(){ //wait even this (children inherit, don't need getter method)?
        return this.bananaContainer;
    }

    protected getMenuContainer(): GameObjects.Container{ //and this?
        return this.menuContainer;
    }
};