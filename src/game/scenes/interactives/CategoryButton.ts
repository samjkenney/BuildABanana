import { Scene } from "phaser";
import { GameObjects } from "phaser";
import { Button } from './Button';
import { ImageButton } from './ImageButton';
import { IconButton } from './IconButton';
import { Cosmetic } from '../toolbox/Cosmetic';

export class CategoryButton extends ImageButton{
    private static COLOR = 0xfa94a9; //make constant?
    private static CLICKCOLOR = 0xffffff; //change to use Button selectedColor
    //color: number;
    private WIDTH: number; //make constant?
    private HEIGHT: number; //make constant?
    //private selected = false; //make not private?

    private SIDEBORDER: number;
    private TOPBORDER: number;
    private ICONSPERROW = 2; //calculate based on number of icons?

    scene: Scene;
    imageKey: string;
    iconContainer: GameObjects.Container;
    cosmeticArray: Cosmetic[];
    bananaContainer: GameObjects.Container;

    constructor(scene: Scene, x: number, y: number, imageKey: string, container: GameObjects.Container, iconContainer: GameObjects.Container, cosmeticArray: Cosmetic[], bananaContainer: GameObjects.Container){
        var action = () => {
            console.log("Category button clicked");

            this.createIconButtons(scene, iconContainer, bananaContainer); //change to use existing icon menu
        };

        super(scene, x, y, container.width + container.width * 0.2, container.height * 0.25, CategoryButton.COLOR, imageKey, false, action); //change width to add this.cornerRadius (instead of 10)????
        this.scene = scene;
        this.imageKey = imageKey;
        this.iconContainer = iconContainer;
        this.cosmeticArray = cosmeticArray;
        this.bananaContainer = bananaContainer;

        this.calculateSizes(container);
        //this.updateSize(this.WIDTH, this.HEIGHT, this.getContent());
        //this.createIconButtons(scene, iconContainer); //so can set one category to selected at start of scene, move to setSelected?
    }

    private calculateSizes(container: GameObjects.Container){ //move to just in the constructor (not a function)?
        this.WIDTH = container.width + this.cornerRadius;
        this.HEIGHT = container.height * 0.25; //change to calculate based on number of categories?
        this.SIDEBORDER = this.iconContainer.width * 0.1;
        this.TOPBORDER = this.iconContainer.height * 0.1;
    }

    private createIconButtons(scene: Scene, iconContainer: GameObjects.Container, bananaContainer: GameObjects.Container){
        //if(this.selected){ //not necessary (always selected in function called)?
            //this.setColor(CategoryButton.CLICKCOLOR);

            //remove existing icon button menu

            //create icon button menu (move to DressUp, change to just set menu visible or bring to front?)
            var row = 1;
            var column = 1;
            var buttonList = [];
            for(var i = 0; i < this.cosmeticArray.length; i++){
                var buttonNumber = i + 1;

                var button = new IconButton(scene, 0, 0, this.cosmeticArray[i], this.imageKey, iconContainer, bananaContainer);
                buttonList.push(button);
                iconContainer.add(button);

                var x = this.SIDEBORDER * column + (column - 1) * button.getWidth();
                var y = this.TOPBORDER * row + (row - 1) * button.getHeight();
                button.setPosition(x, y);

                //change row and column
                if(buttonNumber % this.ICONSPERROW == 0){
                    row++;
                    column = 1;
                }
                else{
                    column++;
                }
            }

            for(var i = 0; i < this.cosmeticArray.length; i++){
                buttonList[i].setSelectOne(buttonList);
            }
        //}
    }



    // getSelected(){ //remove
    //     return this.selected;
    // }

    // setSelected(){ //remove
    //     this.selected = true;
    //     this.createIconButtons(this.scene, this.iconContainer, this.bananaContainer);
    // }
}