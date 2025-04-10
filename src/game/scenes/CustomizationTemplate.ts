import { GameObjects, Scene } from 'phaser';
import { SceneTemplate } from './SceneTemplate';
import { NextButton } from './interactives/NextButton';
import { TextStyles } from './toolbox/TextStyles';

export abstract class CustomizationTemplate extends SceneTemplate {
    //horizontal: 10% border, 40% banana, 10% border, 30% menu, 10% border
    //vertical: 10% border, 60% content, 10% border, 10% button, 10% border
    BORDER = this.scale.displaySize.width * 0.1; //make constant?
    CONTENTHEIGHT = this.scale.displaySize.height * 0.6;
    BANANAWIDTH = this.scale.displaySize.width * 0.4;
    MENUWIDTH = this.scale.displaySize.width * 0.3;
    titleText: string;

    constructor(sceneFileName: string, titleText: string, backButton: boolean, backgroundImagePath?: string) {
        super(sceneFileName, titleText, 0, 0, backButton, backgroundImagePath);
        this.titleText = titleText;
    };

    preload(){

    };

    create(){
        //create containers
        var banana = this.add.container(this.BORDER, this.BORDER);
        banana.setSize(this.BANANAWIDTH, this.CONTENTHEIGHT);
        var menu = this.add.container(this.BORDER * 2 + this.BANANAWIDTH, this.BORDER);
        menu.setSize(this.MENUWIDTH, this.CONTENTHEIGHT);

        //add title
        menu.add(this.title);
        this.title.setOrigin(0.5);
        this.title.setPosition(this.MENUWIDTH / 2);

        //add banana
    };
};