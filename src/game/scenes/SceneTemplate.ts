import { GameObjects, Scene } from 'phaser';
import { Banana } from './toolbox/Banana';
import { TextStyles } from './toolbox/TextStyles';
import { NextButton } from './interactives/NextButton';
import { BackButton } from './interactives/BackButton';

export abstract class SceneTemplate extends Scene {
    // protected SCENEWIDTH: number;
    // protected SCENEHEIGHT: number;
    protected backgroundImage = "defaultBackground"; //default background
    protected title: GameObjects.Text;
    protected titleText: string;
    // protected titleX: number;
    // protected titleY: number;
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

    protected sceneLoader(scene: Scene){
        //this.calculateSizes(scene);
        this.addBackground(scene);
        this.addTitle(scene, this.titleText)
        this.addBanana(scene);
    }

    // private calculateSizes(scene: Scene){
    //     this.SCENEWIDTH= scene.scale.displaySize.width; //make constant?
    //     this.SCENEHEIGHT = scene.scale.displaySize.height;
    // }

    private addBackground(scene: Scene){
        scene.add.image(0, 0, this.backgroundImage).setOrigin(0);
    }

    private addTitle(scene: Scene, text: string){
        this.title = new GameObjects.Text(scene, 0, 0, text, TextStyles.getTitleStyle(scene));
        scene.add.existing(this.title);
        //position updated in child classes
    }

    private addBanana(scene: Scene){
        var banana = scene.registry.get("banana");
        banana.addBanana(scene);
    }



    protected addNextButton(scene: Scene, nextScene: string, displayText?: string){
        this.nextButton = new NextButton(this, nextScene, 0, 0, displayText);
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