import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;
    private face: GameObjects.Sprite | null = null; 
    private face2: GameObjects.Sprite | null = null;
    private body: GameObjects.Sprite | null = null;

    constructor ()
    {
        super('MainMenu');
    }

    create () //Too much Repetition
    {
        
        this.add.image(512, 384, 'mainBackground').setDisplaySize(1024, 768);


        
        const button = this.add.sprite(160, 300, 'customButton1'); 
        button.setInteractive(); 
        button.setScale(0.35); // Bounds Issue
       


        const button2 = this.add.sprite(160, 500, 'customButton2'); 
        button2.setInteractive(); 
        button2.setScale(0.35); // Bounds Issue


        const button4 = this.add.sprite(825, 400, 'customButton4'); 
        button4.setInteractive(); 
        button4.setScale(0.35); // Bounds Issue
       

        button.on('pointerdown', () => {
            this.toggleFace(); 
        });

        button2.on('pointerdown', () => {
            this.toggleFace2(); 
        });

        button4.on('pointerdown', () => {
            this.toggleFace4(); 
        });


        EventBus.emit('current-scene-ready', this);
    }
    
    toggleFace() {
        if (this.face) {
            this.face.destroy();
            this.face = null; 
        } else {
            this.addFace();
        }
    }

    toggleFace2() {
        if (this.face2) {
            this.face2.destroy();
            this.face2 = null; 
        } else {
            this.addFace2();
        }
    }

    toggleFace4() {
        if (this.body) {
            this.body.destroy();
            this.body = null; 
        } else {
            this.addBody();
        }
    }



    addFace() {
        if (this.scene) {
            this.face = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'faceCool');
            this.face.setDisplaySize(500, 750);
        }
    }

    addFace2() {
        if (this.scene) {
            this.face2 = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'faceClown');
            this.face2.setDisplaySize(500, 750);
        }
    }

    addBody() {
        if (this.scene) {
            this.body = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'banana');
            this.body.setDisplaySize(500, 750);

        }
    }



    changeScene ()
    {
        if (this.logoTween)
        {
            this.logoTween.stop();
            this.logoTween = null;
        }

        this.scene.start('Game');
    }

    moveLogo (reactCallback: ({ x, y }: { x: number, y: number }) => void)
    {
        if (this.logoTween)
        {
            if (this.logoTween.isPlaying())
            {
                this.logoTween.pause();
            }
            else
            {
                this.logoTween.play();
            }
        } 
        else
        {
            this.logoTween = this.tweens.add({
                targets: this.logo,
                x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
                y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    if (reactCallback)
                    {
                        reactCallback({
                            x: Math.floor(this.logo.x),
                            y: Math.floor(this.logo.y)
                        });
                    }
                }
            });
        }
    }
}
