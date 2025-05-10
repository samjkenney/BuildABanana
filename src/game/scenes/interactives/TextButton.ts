//represents a button that displays text
import { Scene } from "phaser";
import { GameObjects } from "phaser";
import { Button } from './Button';

export class TextButton extends Button{
    constructor(scene: Scene, x: number, y: number, width: number, height: number, color: number, hoverColor: number, selectedColor: number, displayText: string, textStyle: GameObjects.TextStyle, scaleToButtonSize: boolean, scaleOnHover: boolean, action: Function){
        var content = new GameObjects.Text(scene, 0, 0, displayText, textStyle);

        super(scene, x, y, width, height, color, hoverColor, selectedColor, content, scaleToButtonSize, scaleOnHover, action);

        this.content.setOrigin(0.5);
        this.content.setPosition(width / 2, height / 2);

        this.add(this.content);
    }
}