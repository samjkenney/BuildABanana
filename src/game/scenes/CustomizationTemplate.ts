import { GameObjects, Scene } from 'phaser';
import { SceneTemplate } from './SceneTemplate';
import { TextStyles } from './toolbox/TextStyles';

export abstract class CustomizationTemplate extends SceneTemplate {
    //horizontal: 10% border, 40% banana, 10% border, 30% menu, 10% border
    //vertical: 10% border, 65% content, 5% border, 10% button, 10% border
    protected BORDER: number; //make constant?
    protected HALFBORDER: number;
    protected MENUBORDER: number;
    protected BANANAHEIGHT: number;
    protected BANANAWIDTH: number
    protected MENUHEIGHT: number;
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

    protected customizationLoader(scene: Scene){
        super.sceneLoader(scene);

        this.calculateSizes(scene);
        this.addBananaContainer(scene);
        this.addMenuContainer(scene);
    }

    private calculateSizes(scene: Scene){
        this.BORDER = scene.scale.baseSize.width * 0.1; //make constant?
        this.HALFBORDER = this.BORDER / 2;
        this.MENUBORDER = this.MENUHEIGHT * 0.1;
        this.BANANAHEIGHT = scene.scale.baseSize.height * 0.8;
        this.BANANAWIDTH = scene.scale.baseSize.width * 0.475;
        this.MENUHEIGHT = scene.scale.baseSize.height * 0.65;
        this.MENUWIDTH = scene.scale.baseSize.width * 0.3;
    }

    private addBananaContainer(scene: Scene){ //move to sceneTemplate?
        //add container
        scene.add.graphics().fillStyle(0x000000, 1).fillRect(0, 0, this.BORDER, this.BANANAHEIGHT);
        scene.add.graphics().fillStyle(0x00ff00, 1).fillRect(this.BORDER, this.BORDER, this.BANANAWIDTH, this.BANANAHEIGHT);

        this.bananaContainer = new GameObjects.Container(scene);
        scene.add.existing(this.bananaContainer);
        this.bananaContainer.setPosition(this.BORDER, this.BORDER);
        this.bananaContainer.setSize(this.BANANAWIDTH, this.BANANAHEIGHT);

        this.bananaContainer.add(scene.add.graphics().fillStyle(0xff0000, 1).fillRect(0, 0, this.BANANAWIDTH, this.BANANAHEIGHT));
        //this.bananaContainer.add(x);

        //add banana
        var banana = scene.registry.get("banana"); //move to sceneTemplate?
        banana.addBanana(this);
        banana.addToContainer(this.bananaContainer);
        banana.center(this.BANANAWIDTH, this.BANANAHEIGHT);
    }

    private addMenuContainer(scene: Scene){
        //add container
        this.menuContainer = new GameObjects.Container(scene);
        scene.add.existing(this.menuContainer);
        this.menuContainer.setPosition(this.BORDER * 2 + this.BANANAWIDTH, this.BORDER);
        this.menuContainer.setSize(this.MENUWIDTH, this.MENUHEIGHT);

        //add title
        super.getTitle().setOrigin(0.5, 0); //set origin to top center of text box
        super.getTitle().setPosition(this.MENUWIDTH / 2, 0);
        this.menuContainer.add(super.getTitle());
    }

    protected getBorder(){
        return this.BORDER;
    }
    protected getMenuBorder(){
        return this.MENUBORDER;
    }

    protected getBananaHeight(){
        return this.BANANAHEIGHT;
    }

    protected getBananaWidth(){
        return this.BANANAWIDTH;
    }
    
    protected getMenuHeight(){
        return this.MENUHEIGHT;
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