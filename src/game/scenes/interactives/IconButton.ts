import { Scene } from "phaser";
import { GameObjects } from "phaser";
import { ImageButton } from './ImageButton';
import { Banana } from '../toolbox/Banana';
import { Cosmetic } from '../toolbox/Cosmetic';

export class IconButton extends ImageButton{
    private static COLOR = 0x000000; //make constant?
    private WIDTH: number; //make constant?
    private HEIGHT: number; //make constant?

    constructor(scene: Scene, x: number, y: number, imageKey: Cosmetic, category: string, container: GameObjects.Container, bananaContainer: GameObjects.Container){
        var action = () => {
            console.log("Icon button clicked");
            var banana: Banana = scene.registry.get("banana");
            if(category == "face"){ //change to index of categoryArray or whatever from DressUp, check for which category to set (if statements)?
                banana.setFace(scene, imageKey, bananaContainer);
            }
            else if(category == "glasses"){
                banana.setGlasses(scene, imageKey, bananaContainer);
            }
            else if(category == "shirt"){
                banana.setShirt(scene, imageKey, bananaContainer);
            }
            //select behavior
        };

        super(scene, x, y, container.width * 0.35, container.height * 0.35, IconButton.COLOR, imageKey.getImageKey(), true, true, action);

        this.calculateSizes(container);
        this.setSize(this.WIDTH, this.HEIGHT);
    }

    private calculateSizes(container: GameObjects.Container){ //change to constant, static?
        this.WIDTH = container.width * 0.35; //change to calculate based on how many cosmetics?
        this.HEIGHT = container.height * 0.35;
    }

    getWidth(){ //don't need, can use .width?
        return this.WIDTH;
    }

    getHeight(){ //don't need either
        return this.HEIGHT;
    }
}