import { Scene } from 'phaser';
import { GameObjects } from 'phaser';

export class Banana{
    scene: Scene;
    bananaImage: GameObjects.Image;
    activeFace: GameObjects.Image | null = null; 
    x: number;
    y: number;
    

    constructor(currentScene: Scene, x: number, y: number, name: String){
        this.scene = currentScene; 
        this.x = x;
        this.y = y;
        this.bananaImage = currentScene.add.image(x, y, 'banana'); 
        this.bananaImage.setScale(0.65);  
        this.bananaImage.setInteractive();
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
        this.activeFace = this.scene.add.image(this.x, this.y, 'bananaFace');
        this.activeFace.setScale(0.4);
    }


    destroy() {
        this.bananaImage.destroy();
    }
}