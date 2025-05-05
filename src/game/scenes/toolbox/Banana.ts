// Represented a banana, holding the image and cosmetics
// Constructed takes in a scene
import { Scene } from 'phaser';
import { GameObjects } from 'phaser';
import { Cosmetic } from "./Cosmetic";
import { Characteristic } from './Characteristic';

export class Banana{
    scene: Scene;
    
    static X = 25;
    static Y = 70;
    static SCALE = 0.8;

    name: string;
    personality: Characteristic;
    aspiration: Characteristic;

    activeFace = "default"; //combine with faceCosmetic somehow?
    activeGlasses = "none";
    activeShirt = "none";

    faceCosmetic: Cosmetic;
    glassesCosmetic: Cosmetic;
    shirtCosmetic: Cosmetic;

    defaultFaceCosmetic: Cosmetic;
    noGlassesCosmetic: Cosmetic;
    noShirtCosmetic: Cosmetic;

    bananaImage: GameObjects.Image;
    //activeFace: GameObjects.Image | null = null;
    faceImage: GameObjects.Image;
    glassesImage: GameObjects.Image;
    shirtImage: GameObjects.Image;

    washed = false;
    peeled = false;

    constructor(currentScene: Scene){ //add container
        this.scene = currentScene;
        // this.x = x;
        // this.y = y;
        //this.bananaImage = currentScene.add.image(x, y, 'banana'); 
        //this.bananaImage.setScale(0.65);  
        //this.bananaImage.setInteractive();
        this.defaultFaceCosmetic = new Cosmetic("defaultFace", 35, 20, 1);
        this.noGlassesCosmetic = new Cosmetic("none", 0, 0, 1);
        this.noShirtCosmetic = new Cosmetic("none", 0, 0, 1);
        this.faceCosmetic = this.defaultFaceCosmetic;
        this.glassesCosmetic = this.noGlassesCosmetic;
        this.shirtCosmetic = this.noShirtCosmetic;
    }

    //peel help methods
    setTexture(textureKey: string) {
        this.bananaImage.setTexture(textureKey);
        this.bananaImage.setScale(Banana.SCALE);
        }
    
     setScale(scale: number) {
        if (this.bananaImage) {
            this.bananaImage.setScale(scale);
        }
        }

    addBanana(scene: Scene, container: GameObjects.Container){ //make container optional (in case banana not in a container in some special scene)?
        //add banana image
        if(!this.peeled){ //check if peeled    
            this.bananaImage = scene.add.image(0, 0, 'banana').setScale(Banana.SCALE);
        }
        else{
            this.bananaImage = scene.add.image(0, 0, 'bananaPeeled').setScale(Banana.SCALE);
        }

        //add face
        if(this.activeFace !== "default" && !this.washed){ //check logic
            //scene.load.image("face1", "assets/" + this.activeFace + ".png"); //change from loading to setting to faceImage
            this.faceImage = scene.add.image(0, 0, this.faceCosmetic.getImageKey()).setScale(this.faceCosmetic.getScale());
        }
        else{ //change to loop, function, class?
            this.activeFace = "default"; //set to default if null or something weird, or if washed?????
            this.faceImage = scene.add.image(0, 0, this.defaultFaceCosmetic.getImageKey()).setScale(this.defaultFaceCosmetic.getScale());
        }
        //this.faceImage = scene.add.image(0, 0, 'face1').setScale(0.4); //add coordinates, scale in list of face dictionaries

        //add glasses
        if(this.activeGlasses !== "none" && !this.washed){
            //scene.load.image("glasses", "assets/" + this.activeGlasses + ".png"); //change from loading
            this.glassesImage = scene.add.image(0, 0, this.glassesCosmetic.getImageKey()).setScale(this.glassesCosmetic.getScale());
        }
        else{
            this.activeGlasses = "none"; //set to none if null or something weird, or if washed?????
            this.glassesImage = scene.add.image(0, 0, "none");
        }
        //this.glassesImage = scene.add.image(0, 0, 'glasses').setScale(0.4); //add coordinates, scale in list of glasses dictionaries

        //add shirt
        if(this.activeShirt !== "none" && !this.washed){
            //scene.load.image("shirt", "assets/" + this.activeShirt + ".png"); //change from loading
            this.shirtImage = scene.add.image(0, 0, this.shirtCosmetic.getImageKey()).setScale(this.shirtCosmetic.getScale());
        }
        else{
            this.activeShirt = "none"; //set to none if null or something weird, or if washed?????
            this.shirtImage = scene.add.image(0, 0, "none");
        }
        //this.shirtImage = scene.add.image(0, 0, 'shirt').setScale(0.4); //add coordinates, scale in list of shirt dictionaries

        //positions updated in scenes? just kidding
        this.addToContainer(container); //but would that be better?
        this.center(container.width, container.height);
    }

    addCosmetic(scene: Scene, cosmetic: Cosmetic, bananaContainer: GameObjects.Container){ //move to SceneTemplate?
        var image = scene.add.image(0, 0, cosmetic.getImageKey()).setScale(cosmetic.getScale());
        image.setName(cosmetic.getImageKey());
        //image.setName("cosmetic");
        bananaContainer.add(image);
        image.setPosition(bananaContainer.width / 2 + cosmetic.getXFromCenter(), bananaContainer.height / 2 + cosmetic.getYFromCenter()); //move to a method, change to add coordinates?
    }
    
    removeCosmetic(cosmetic: Cosmetic, bananaContainer: GameObjects.Container){
        var image: GameObjects.Image = bananaContainer.getByName(cosmetic.getImageKey());
        //var image: GameObjects.Image = bananaContainer.getByName("cosmetic");
        if(bananaContainer.exists(image)){
            image.destroy();
        };
    }

    updateBanana(scene: Scene, bananaContainer: GameObjects.Container){
        //remove banana images
        this.bananaImage.setVisible(false);
        this.faceImage.setVisible(false);
        this.glassesImage.setVisible(false);
        this.shirtImage.setVisible(false);

        this.addBanana(scene, bananaContainer);
    }

    private addToContainer(container: GameObjects.Container){ //move to addBanana?
        container.add(this.bananaImage);
        container.add(this.faceImage);
        container.add(this.glassesImage);
        container.add(this.shirtImage);

        //this.center(container.width, container.height);
    }

    center(totalWidth: number, totalHeight: number){
        this.bananaImage.setPosition(totalWidth / 2 + Banana.X, totalHeight / 2 + Banana.Y);
        this.faceImage.setPosition(totalWidth / 2 + this.faceCosmetic.getXFromCenter(), totalHeight / 2 + this.faceCosmetic.getYFromCenter()); //change to add position from center
        this.shirtImage.setPosition(totalWidth / 2 + this.shirtCosmetic.getXFromCenter(), totalHeight / 2 + this.shirtCosmetic.getYFromCenter());
        this.glassesImage.setPosition(totalWidth / 2 + this.glassesCosmetic.getXFromCenter(), totalHeight / 2 + this.glassesCosmetic.getYFromCenter());
    }



    //setter methods
    setName(name: string){
        this.name = name;
    }

    setPersonality(personality: Characteristic){
        this.personality = personality;
    }

    setAspiration(aspiration: Characteristic){
        this.aspiration = aspiration;
    }

    setFace(scene: Scene, faceCosmetic: Cosmetic, container: GameObjects.Container){ //combine into 1 method, take category as parameter?
        //set banana face
        this.activeFace = faceCosmetic.getImageKey();
        this.faceCosmetic = faceCosmetic;
        this.updateBanana(scene, container);

        //if (this.activeFace !== null){
            //this.activeFace.destroy();
        //}
    }

    setGlasses(scene: Scene, glassesCosmetic: Cosmetic, container: GameObjects.Container){
        //set banana glasses
        this.activeGlasses = glassesCosmetic.getImageKey();
        this.glassesCosmetic = glassesCosmetic;
        this.updateBanana(scene, container);
    }

    setShirt(scene: Scene, shirtCosmetic: Cosmetic, container: GameObjects.Container){
        //set banana shirt
        this.activeShirt = shirtCosmetic.getImageKey();
        this.shirtCosmetic = shirtCosmetic;
        this.updateBanana(scene, container);
    }



    //getter methods
    getName(){
        return this.name;
    }

    getPersonality(){
        return this.personality;
    }

    getAspiration(){
        return this.aspiration;
    }

    getBananaImage(){
        return this.bananaImage;
    }

    getFaceImage(){
        return this.faceImage;
    }

    getShirtImage(){
        return this.shirtImage;
    }

    getGlassesImage(){
        return this.glassesImage;
    }

    destroy() {
        this.bananaImage.destroy();
    }
}