import { GameObjects, Scene } from 'phaser';
import { TextStyles } from './toolbox/TextStyles';
import { NextButton } from './interactives/NextButton';

export abstract class SceneTemplate extends Scene {
    backgroundImagePath?: string
    title: GameObjects.Text;
    titleText: string;
    titleX: number;
    titleY: number;
    backButton: boolean;

    constructor(sceneFileName: string, titleText: string, titleX: number, titleY: number, backButton: boolean, backgroundImagePath?: string) {
        super(sceneFileName);
        this.titleText = titleText;
        this.titleX = titleX;
        this.titleY = titleY;
        this.backButton = backButton;
        this.backgroundImagePath = backgroundImagePath
    };

    preload(){
        if(this.backgroundImagePath != null){
            this.load.image('backgroundImage', this.backgroundImagePath); //default background
        }
        else{
            this.load.image('backgroundImage', 'assets/Basic Background.png'); //default background
        }
    };

    create(){
        this.add.image(0, 0, "backgroundImage");
        this.title = this.add.text(this.titleX, this.titleY, this.titleText);

        // if(this.backButton){
        //     this.add.existing(new BackButton());
        // }
    };

    // protected addBackground(scene: Scene, backgroundImagePath?: string){
    //     if(backgroundImagePath != null){
    //         scene.load.image('backgroundImage', backgroundImagePath);
    //     }
    //     else{
    //         scene.load.image('backgroundImage', 'assets/Basic Background.png'); //default background
    //     }

    //     scene.add.image(0, 0, "backgroundImage");
    // };

    // protected addTitle(scene: Scene, titleText: string, titleX: number, titleY: number){
    //     scene.add.text(titleX, titleY, titleText, TextStyles.getTitleStyle(this));
    // }

    protected addNextButton(nextScene: string, displayText?: string){
        var button = new NextButton(this, 0, 0, nextScene, displayText);
        this.add.existing(button);
    }
};