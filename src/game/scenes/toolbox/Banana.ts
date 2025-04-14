import { Scene } from 'phaser';
import { GameObjects } from 'phaser';

export class Banana{
    scene: Scene;
    activeFace: GameObjects.Image | null = null; 
    x: number;
    y: number;
    

    constructor(currentScene: Scene, x: number, y: number, name: String){
        this.scene = currentScene; 
        this.x = x;
        this.y = y;
        currentScene.load.image('banana', 'assets/Banana.png'); //replace asset with peeled banana
        const banana = currentScene.add.image(x, y, 'banana'); 
        banana.setScale(0.65);  
        banana.setInteractive();
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
}