import { Scene } from "phaser";
import { GameObjects } from "phaser";
import { Button } from './Button';

export class TextButton extends Button{
    constructor(scene: Scene, x: number, y: number, width: number, height: number, color: number, displayText: string, textStyle: GameObjects.TextStyle, scaleToButtonSize: boolean, scaleOnHover: boolean, action: Function){
        super(scene, x, y, width, height, color, scaleOnHover, action);

        var text = new GameObjects.Text(scene, 0, 0, displayText, textStyle);
        text.setOrigin(0.5);
        text.setPosition(width / 2, height / 2);
        if(scaleToButtonSize){
            this.scaleToButton(text);
        }

        this.add(text);
    }
}