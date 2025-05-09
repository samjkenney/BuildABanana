import { GameObjects, Scene } from 'phaser';
import { CookTemplate } from './CookTemplate';
import { NextButton } from './interactives/NextButton';


export class Split extends CookTemplate {
    constructor() {
        super('Split','  Slice it up!', "splitBackground");
    }

    preload() {
        this.load.image('splitBackground', 'assets/split/slicing lights off background.png');

        this.load.image('slice1', 'assets/split/Slicing Lights Off individual slice 1.png');
        this.load.image('slice2', 'assets/split/Slicing Lights Off individual slice 2.png');
        this.load.image('slice3', 'assets/split/Slicing Lights Off individual slice 3.png');

        this.load.image('splitBanana', 'assets/split/Slicing Lights Off banana.png');
        
        this.load.image('text', 'assets/split/click to slice text.png');

        for (let i = 1; i <= 5; i++) {
            this.load.image(`lightsOn${i}`, `assets/split/lightsOn/lightson${i}.png`);
        }
    }

    create() {
        this.cookLoader(this);
        this.hideBanana(this);

        const banana = this.add.image(823, 535, 'splitBanana');  
        banana.setInteractive();

        const text = this.add.image(849, 567.5, 'text');

        //load the slice images but don't show them yet
        const slice1 = this.add.image(849, 567.5, 'slice1');
        slice1.setVisible(false);
        const slice2 = this.add.image(849, 567.5, 'slice2');
        slice2.setVisible(false);
        const slice3 = this.add.image(849, 567.5, 'slice3');
        slice3.setVisible(false);


        let click: number = 0; 
        //when the banana is clicked
        banana.on('pointerdown', () => {
            click++;
            if (click === 1){
                slice1.setVisible(true);
            }
            else if (click === 2){
                slice2.setVisible(true);
            }
            else if (click === 3)  {
                this.clearScene(banana, slice1, slice2, slice3, text);
            }      
        })
        
    }
    
    //removes the banana, slices, and text, and plays the lights on animation
    clearScene(banana: GameObjects.Image, slice1: GameObjects.Image, slice2: GameObjects.Image, slice3: GameObjects.Image, text: GameObjects.Image) {
        slice3.setVisible(true);
        text.destroy();
        //after one second, play the animation
        this.time.addEvent({
            delay: 1000,
            callback: ()=>{
                banana.destroy();
                slice1.destroy();
                slice2.destroy();
                slice3.destroy();
                this.setTitleColor("#b5e8e8");
                this.playLightsOn();
                this.time.addEvent({
                    delay: 1500,
                    callback: () => {
                        this.addDarkNextButton(this, 'IceCream', 'Oops!');
                    },
                    loop: false
                        })
                    },
                loop: false
                })
    }

    playLightsOn = () => {
        this.anims.create({
            key: 'lightsOn',
            frames: [
                { key: 'lightsOn1' },
                { key: 'lightsOn2' },
                { key: 'lightsOn3' },
                { key: 'lightsOn4' },
                { key: 'lightsOn5' }
            ],
            frameRate: 4.5,
            repeat: 0 
        });

        const video = this.add.sprite(849, 567.5, 'lightsOn1').play('lightsOn');
        this.children.bringToTop(this.bananaContainer);
    }
}