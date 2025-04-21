import { Scene } from 'phaser';
import { GameObjects } from 'phaser';

export class Banana{
    scene: Scene;
    
    // x: number;
    // y: number;

    name: string;
    personality: string;
    aspiration: string;

    activeFace: string;
    activeGlasses: string;
    activeShirt: string;

    bananaImage: GameObjects.Image;
    //activeFace: GameObjects.Image | null = null;
    faceImage: GameObjects.Image;
    glassesImage: GameObjects.Image;
    shirtImage: GameObjects.Image;

    washed = false;
    peeled = false;

    constructor(currentScene: Scene){
        this.scene = currentScene; 
        // this.x = x;
        // this.y = y;
        //this.bananaImage = currentScene.add.image(x, y, 'banana'); 
        //this.bananaImage.setScale(0.65);  
        //this.bananaImage.setInteractive();
    }

    addBanana(scene: Scene){
        //add banana image
        if(!this.peeled){ //check if peeled    
            this.bananaImage = scene.add.image(0, 0, 'banana').setScale(0.4);
        }
        else{
            this.bananaImage = scene.add.image(0, 0, 'bananaPeeled').setScale(0.4);
        }

        //add face
        if(this.activeFace !== "default" && !this.washed){ //check logic
            scene.load.image("face", "assets/" + this.activeFace + ".png");
        }
        else{
            this.activeFace = "default"; //set to default if null or something weird, or if washed?????
            scene.load.image("face", "DEFAULT FACE"); //add default face
        }
        this.faceImage = scene.add.image(0, 0, 'face').setScale(0.4); //add coordinates, scale in list of face dictionaries

        //add glasses
        if(this.activeGlasses !== "none" && !this.washed){
            scene.load.image("glasses", "assets/" + this.activeGlasses + ".png");
        }
        else{
            this.activeGlasses = "none"; //set to none if null or something weird, or if washed?????
            scene.load.image("glasses", "EMPTY"); //add empty
        }
        this.glassesImage = scene.add.image(0, 0, 'glasses').setScale(0.4); //add coordinates, scale in list of glasses dictionaries

        //add shirt
        if(this.activeShirt !== "none" && !this.washed){
            scene.load.image("shirt", "assets/" + this.activeShirt + ".png");
        }
        else{
            this.activeShirt = "none"; //set to none if null or something weird, or if washed?????
            scene.load.image("shirt", "EMPTY"); //add empty
        }
            this.shirtImage = scene.add.image(0, 0, 'shirt').setScale(0.4); //add coordinates, scale in list of shirt dictionaries

        //positions updated in scenes
    }

    updateBanana(scene: Scene){
        //update banana customization images

        //remove banana images
        this.addBanana(scene);
    }

    addToContainer(container: GameObjects.Container){
        container.add(this.bananaImage);
        container.add(this.faceImage);
        container.add(this.glassesImage);
        container.add(this.shirtImage);
    }

    center(totalWidth: number, totalHeight: number){
        this.bananaImage.setPosition(totalWidth / 2, totalHeight / 2);
        this.faceImage.setPosition(totalWidth / 2, totalHeight / 2);
        this.shirtImage.setPosition(totalWidth / 2, totalHeight / 2);
        this.glassesImage.setPosition(totalWidth / 2, totalHeight / 2);
    }



    //setter methods
    setName(name: string){
        this.name = name;
    }

    setPersonality(personality: string){
        this.personality = personality;
    }

    setAspiration(aspiration: string){
        this.aspiration = aspiration;
    }

    setFace(scene: Scene, face: string){
        //set banana face
        //console.log('adding', {face} );
        this.activeFace = face;
        this.updateBanana(scene);

        //if (this.activeFace !== null){
            //this.activeFace.destroy();
        //}
    }

    setGlasses(scene: Scene, glasses: string){
        //set banana glasses
        this.activeGlasses = glasses;
        this.updateBanana(scene);
    }

    setShirt(scene: Scene, shirt: string){
        //set banana shirt
        this.activeShirt = shirt;
        this.updateBanana(scene);
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