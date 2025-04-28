import { GameObjects, Scene } from 'phaser';
import { CookTemplate } from './CookTemplate';
import { NextButton } from './interactives/NextButton';
//import { NextButton } from './toolbox/NextButton';

export class Split extends CookTemplate {
    constructor() {
        super('Split','Slice it up!');
    }

    preload() {
        this.load.image('splitBackground', 'assets/split/slicing lights off background.png');

        this.load.image('slice1', 'assets/split/Slicing Lights Off individual slice 1.png');
        this.load.image('slice2', 'assets/split/Slicing Lights Off individual slice 2.png');
        this.load.image('slice3', 'assets/split/Slicing Lights Off individual slice 3.png');

        this.load.image('splitBanana', 'assets/split/Slicing Lights Off banana.png');
        
        this.load.image('text', 'assets/split/click to slice text.png');

        this.load.video('splitVideo', 'assets/split/slice animation CROPPED.mp4')
    }

    create() {
        this.add.image(849, 567.5,'splitBackground'); 
        const banana = this.add.image(823, 535, 'splitBanana');  
        banana.setInteractive();

        const text = this.add.image(849, 567.5, 'text');

        const slice1 = this.add.image(849, 567.5, 'slice1');
        slice1.setVisible(false);
        const slice2 = this.add.image(849, 567.5, 'slice2');
        slice2.setVisible(false);
        const slice3 = this.add.image(849, 567.5, 'slice3');
        slice3.setVisible(false);
        let click: number = 0; 
        //when the banana is clicked
        banana.on('pointerdown', () => {
            click++;;
            if (click === 1){
                slice1.setVisible(true);
            }
            else if (click === 2){
                slice2.setVisible(true);
            }
            else if (click === 3)  {
                slice3.setVisible(true);
                text.destroy();
                this.time.addEvent({
                    delay: 1000,
                    callback: ()=>{
                       banana.destroy();
                        slice1.destroy();
                        slice2.destroy();
                        slice3.destroy();
                        this.add.video(849, 567.5, 'splitVideo').setScale(1.2).play();
                        new NextButton(this,'IceCream', 1550, 100, 'Yum!');
                        this.scene.start('IceCream');
                        //this.addNextButton(this, 'IceCream', 'Yum!');
                    },
                    loop: false
                })
            }
            
            
           
        })
        
    }
}