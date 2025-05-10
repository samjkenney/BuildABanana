// Represents the individual cosmetic buttons in the dress up scene
import { Scene } from "phaser";
import { GameObjects } from "phaser";
import { ImageButton } from './ImageButton';
import { Banana } from '../toolbox/Banana';
import { Cosmetic } from '../toolbox/Cosmetic';

export class IconButton extends ImageButton{
    private static COLOR = 0xfeeaed; //make constant?
    private static HOVERCOLOR = 0xF9B1B4; //make constant?
    private static SELECTEDCOLOR = 0x0000ff; //make constant?
    private WIDTH: number; //make constant?
    private HEIGHT: number; //make constant?

    constructor(scene: Scene, x: number, y: number, imageKey: Cosmetic, category: string, container: GameObjects.Container, bananaContainer: GameObjects.Container){
        var action = () => {
            console.log("Icon button clicked");
            var banana: Banana = scene.registry.get("banana");
            
            if(this.selected == true){ //deselect
                if(category == "face"){ //change to index of categoryArray or whatever from DressUp, check for which category to set (if statements)?
                    banana.setFace(scene, Banana.defaultFaceCosmetic, bananaContainer);
                }
                else if(category == "glasses"){
                    banana.setGlasses(scene, Banana.noGlassesCosmetic, bananaContainer);
                }
                else if(category == "shirt"){
                    banana.setShirt(scene, Banana.noShirtCosmetic, bananaContainer);
                }
            }
            else{
                console.log("icon not selected " + this.selected);
                if(category == "face"){
                    banana.setFace(scene, imageKey, bananaContainer);
                }
                else if(category == "glasses"){
                    banana.setGlasses(scene, imageKey, bananaContainer);
                }
                else if(category == "shirt"){
                    banana.setShirt(scene, imageKey, bananaContainer);
                }
            }
        };

        super(scene, x, y, container.width * 0.35, container.height * 0.35, IconButton.COLOR, IconButton.HOVERCOLOR, IconButton.SELECTEDCOLOR, imageKey.getImageKey(), true, action);

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