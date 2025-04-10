import { GameObjects, Scene } from 'phaser';
import { TextStyles } from './toolbox/TextStyles';
import { NextButton } from './interactives/NextButton';

export abstract class SceneTemplate extends Scene {
    // protected SCENEWIDTH: number;
    // protected SCENEHEIGHT: number;
    protected backgroundImagePath?: string
    protected title: GameObjects.Text;
    protected titleText: string;
    // protected titleX: number;
    // protected titleY: number;
    protected nextButton: NextButton;
    //protected backButton: BackButton;

    // constructor(sceneFileName: string, titleText: string, titleX: number, titleY: number, backButton: boolean, backgroundImagePath?: string) {
        constructor(sceneFileName: string, titleText: string, backgroundImagePath?: string) {
        super(sceneFileName);
        this.titleText = titleText;
        // this.titleX = titleX;
        // this.titleY = titleY;
        // this.backButton = backButton;
        this.backgroundImagePath = backgroundImagePath
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

    protected loader(scene: Scene){
        //this.calculateSizes(scene);
        this.addBackground(scene);
        this.addTitle(scene, this.titleText)
    }

    // private calculateSizes(scene: Scene){
    //     this.SCENEWIDTH= scene.scale.displaySize.width; //make constant?
    //     this.SCENEHEIGHT = scene.scale.displaySize.height;
    // }

    private addBackground(scene: Scene){
        if((this.backgroundImagePath === undefined) == false){
            scene.load.image('backgroundImage', this.backgroundImagePath);
        }
        else{
            scene.load.image('backgroundImage', 'assets/Basic Background.png'); //default background
        }

        scene.add.image(scene.scale.baseSize.width / 2, scene.scale.baseSize.height / 2, "backgroundImage");
    }

    private addTitle(scene: Scene, text: string){
        this.title = new GameObjects.Text(scene, 0, 0, text, TextStyles.getTitleStyle(scene));
        scene.add.existing(this.title);
        //position updated in child classes
    }

    protected addNextButton(scene: Scene, nextScene: string, displayText?: string){
        this.nextButton = new NextButton(this, scene.scale.baseSize.width * 0.9 - NextButton.getWidth(), scene.scale.baseSize.height * 0.9 - NextButton.getHeight(), nextScene, displayText);
        scene.add.existing(this.nextButton);
    }

    // protected addBackButton(previousScene: string){
    //     this.backButton = new BackButton();
    //     this.add.existing(this.backButton);
    // }

    // protected getSceneWidth(){
    //     return this.SCENEWIDTH;
    // }

    // protected getSceneHeight(){
    //     return this.SCENEHEIGHT;
    // }

    protected getTitle(){
        return this.title;
    }
};