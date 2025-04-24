import { Scene } from 'phaser';
import { GameObjects } from 'phaser';

export class Banana{
    scene: Scene;
    
    // x: number;
    // y: number;

    name: string;
    personality: string;
    aspiration: string;

    activeFace = "default";
    activeGlasses = "none";
    activeShirt = "none";

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

    addBanana(scene: Scene, container: GameObjects.Container){ //make container optional (in case banana not in a container in some special scene)?
        setTexture(textureKey: string) {
            this.bananaImage.setTexture(textureKey);
            this.bananaImage.setScale(0.85);
        }
    
    
        updateBanana(){
            //update banana customizations
        }
    
        setBananaFace(face: String){
            //set banana face
            this.scene.load.image('bananaFace', `assets/face trixie.png`); 
            console.log('adding', {face} );
            if (this.activeFace !== null){
                this.activeFace.destroy();
            }
        }






        
        
        //add banana image
        if(!this.peeled){ //check if peeled    
            this.bananaImage = scene.add.image(0, 0, 'banana').setScale(0.8);
        }
        else{
            this.bananaImage = scene.add.image(0, 0, 'bananaPeeled').setScale(0.8);
        }

        //add face
        if(this.activeFace !== "default" && !this.washed){ //check logic
            //scene.load.image("face1", "assets/" + this.activeFace + ".png"); //change from loading to setting to faceImage
            this.faceImage = scene.add.image(0, 0, this.activeFace);
        }
        else{ //change to loop, function, class?
            this.activeFace = "default"; //set to default if null or something weird, or if washed?????
            this.faceImage = scene.add.image(0, 0, "defaultFace");
        }
        //this.faceImage = scene.add.image(0, 0, 'face1').setScale(0.4); //add coordinates, scale in list of face dictionaries

        //add glasses
        if(this.activeGlasses !== "none" && !this.washed){
            //scene.load.image("glasses", "assets/" + this.activeGlasses + ".png"); //change from loading
            this.glassesImage = scene.add.image(0, 0, this.activeGlasses);
        }
        else{
            this.activeGlasses = "none"; //set to none if null or something weird, or if washed?????
            this.glassesImage = scene.add.image(0, 0, "defaultFace"); //change to empty image
        }
        //this.glassesImage = scene.add.image(0, 0, 'glasses').setScale(0.4); //add coordinates, scale in list of glasses dictionaries

        //add shirt
        if(this.activeShirt !== "none" && !this.washed){
            //scene.load.image("shirt", "assets/" + this.activeShirt + ".png"); //change from loading
            this.shirtImage = scene.add.image(0, 0, this.activeShirt);
        }
        else{
            this.activeShirt = "none"; //set to none if null or something weird, or if washed?????
            this.shirtImage = scene.add.image(0, 0, "defaultFace"); //change to empty image
        }
        //this.shirtImage = scene.add.image(0, 0, 'shirt').setScale(0.4); //add coordinates, scale in list of shirt dictionaries

        //positions updated in scenes? just kidding
        this.addToContainer(container); //but would that be better?
        this.center(container.width, container.height);
    }

    updateBanana(scene: Scene, container: GameObjects.Container){
        //update banana customization images?

        //remove banana images
        this.bananaImage.setVisible(false);
        this.faceImage.setVisible(false);
        this.glassesImage.setVisible(false);
        this.shirtImage.setVisible(false);

        this.addBanana(scene, container);
    }

    private addToContainer(container: GameObjects.Container){ //move to addBanana?
        container.add(this.bananaImage).sendToBack(this.bananaImage);
        container.add(this.faceImage);
        container.add(this.glassesImage);
        container.add(this.shirtImage);

        //this.center(container.width, container.height);
    }

    center(totalWidth: number, totalHeight: number){
        this.bananaImage.setPosition(totalWidth / 2, totalHeight / 2);
        this.faceImage.setPosition(totalWidth / 2, totalHeight / 2); //change to add position from center
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

    setFace(scene: Scene, face: string, container: GameObjects.Container){
        //set banana face
        this.activeFace = face;
        this.updateBanana(scene, container);

        //if (this.activeFace !== null){
            //this.activeFace.destroy();
        //}
    }

    setGlasses(scene: Scene, glasses: string, container: GameObjects.Container){
        //set banana glasses
        this.activeGlasses = glasses;
        this.updateBanana(scene, container);
    }

    setShirt(scene: Scene, shirt: string, container: GameObjects.Container){
        //set banana shirt
        this.activeShirt = shirt;
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