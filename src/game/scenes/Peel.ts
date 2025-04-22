import { Scene } from 'phaser';
import { NextButton } from './toolbox/NextButton';
import { Banana } from './toolbox/Banana';

export class Peel extends Scene {
    constructor() {
        super('Peel');
    }

    preload() {
        this.load.image('backgroundP', 'assets/peel/Peel_BKG.png');
        this.load.image('nextButton', 'assets/nextButton.png');
        this.load.image('openHandCursor', 'assets/peel/open_hand.png');
        this.load.image('banana', 'assets/Banana.png');
        this.load.image('scissors', 'assets/peel/scissors.png');
    }

    create() {
        this.add.image(849, 567.5, 'backgroundP');
        //const banana = new Banana(this, 823, 535, 'banana');

        

        const startPoint = new Phaser.Math.Vector2(956, 247);
        const controlPoint1 = new Phaser.Math.Vector2(1100, 700);   
        const controlPoint2 = new Phaser.Math.Vector2(600, 850)
        const endPoint = new Phaser.Math.Vector2(516, 703);

        const peelCurve = new Phaser.Curves.CubicBezier(startPoint, controlPoint1, controlPoint2, endPoint);


        const graphics = this.add.graphics();
        graphics.lineStyle(4, 0xff0000, 1);
        peelCurve.draw(graphics);

        const scissors = this.add.image(startPoint.x, startPoint.y, 'scissors')
            .setScale(0.3)
            .setDepth(2)
            .setInteractive();

        this.input.setDraggable(scissors);

        this.input.on('drag', (
            pointer: Phaser.Input.Pointer,
            gameObject: Phaser.GameObjects.GameObject,
            dragX: number,
            dragY: number
        ) => {
            let closestT = 0;
            let minDist = Number.MAX_VALUE;

            for (let t = 0; t <= 1; t += 0.01) {
                const p = peelCurve.getPoint(t);
                if (!p) continue;

                const dist = Phaser.Math.Distance.Between(dragX, dragY, p.x, p.y);
                if (dist < minDist) {
                    minDist = dist;
                    closestT = t;
                }
            }

            const pointOnCurve = peelCurve.getPoint(closestT);
            if (pointOnCurve) {
                (gameObject as Phaser.GameObjects.Image).setPosition(pointOnCurve.x, pointOnCurve.y);
            }
        });

        new NextButton(this, 1550, 100, 'Split');
    }
}
