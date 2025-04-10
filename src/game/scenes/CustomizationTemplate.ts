import { GameObjects, Scene } from 'phaser';
import { SceneTemplate } from './SceneTemplate';
import { TextStyles } from './toolbox/TextStyles';

export abstract class CustomizationTemplate extends SceneTemplate {
    //horizontal: 10% border, 40% banana, 10% border, 30% menu, 10% border
    //vertical: 10% border, 60% content, 10% border, 10% button, 10% border
    protected BORDER: number; //make constant?
    protected MENUBORDER: number;
    protected CONTENTHEIGHT: number;
    protected BANANAWIDTH: number
    protected MENUWIDTH: number;
    protected bananaContainer: GameObjects.Container;
    protected menuContainer: GameObjects.Container;

    // constructor(sceneFileName: string, titleText: string, backButton: boolean, backgroundImagePath?: string) {
        constructor(sceneFileName: string, titleText: string, backgroundImagePath?: string) {
        //super(sceneFileName, titleText, 0, 0, backButton, backgroundImagePath);
        super(sceneFileName, titleText, backgroundImagePath);
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

    protected loader1(scene: Scene){
        super.loader(scene);

        this.calculateSizes(scene);
        this.addBanana(scene);
        this.addMenu(scene);
    }

    private calculateSizes(scene: Scene){
        this.BORDER = scene.scale.baseSize.width * 0.1; //make constant?
        this.CONTENTHEIGHT = scene.scale.baseSize.height * 0.6;
        this.BANANAWIDTH = scene.scale.baseSize.width * 0.4;
        this.MENUWIDTH = scene.scale.baseSize.width * 0.3;
    }

    private addBanana(scene: Scene){
        //add container
        this.bananaContainer = new GameObjects.Container(scene);
        scene.add.existing(this.bananaContainer);
        this.bananaContainer.setPosition(this.BORDER, this.BORDER);
        this.bananaContainer.setSize(this.BANANAWIDTH, this.CONTENTHEIGHT);

        //add banana
    }

    private addMenu(scene: Scene){
        //add container
        this.menuContainer = new GameObjects.Container(scene);
        scene.add.existing(this.menuContainer);
        this.menuContainer.setPosition(this.BORDER * 2 + this.BANANAWIDTH, this.BORDER);
        this.menuContainer.setSize(this.MENUWIDTH, this.CONTENTHEIGHT);
        this.MENUBORDER = this.menuContainer.height * 0.1; //move to calculateSizes?

        //add title
        this.menuContainer.add(super.getTitle());
        super.getTitle().setOrigin(0.5, 0); //set origin to top center of text box
        super.getTitle().setPosition(this.MENUWIDTH / 2, this.BORDER);
    }

    protected getBorder(){
        return this.BORDER;
    }
    protected getMenuBorder(){
        return this.MENUBORDER;
    }

    protected getContentHeight(){
        return this.CONTENTHEIGHT;
    }

    protected getBananaWidth(){
        return this.BANANAWIDTH;
    }

    protected getMenuWidth(){
        return this.MENUWIDTH;
    }

    protected getBananaContainer(){
        return this.bananaContainer;
    }

    protected getMenuContainer(): GameObjects.Container{
        return this.menuContainer;
    }
};