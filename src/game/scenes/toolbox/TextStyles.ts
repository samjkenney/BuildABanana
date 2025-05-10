//Contains our Kitto text styles
import { GameObjects, Scene } from 'phaser';

export class TextStyles{
    static title = {
        fontFamily: "Kitto",
        fontSize: 100,
        color: "#80caca",
        stroke: "#4FB0B0",
        //strokeThickness: 6,
        align: "center",
        //increase line spacing
    };

    static body = {
        fontFamily: "Kitto",
        fontSize: 60,
        color: '#7eb6b6',
        align: "center"
    };

    static button = {
        fontFamily: "Kitto",
        color: "#ffffff",
        fontSize: 80
    };

    static titleButton = {
        fontFamily: "Kitto",
        color: "#ffabb5",
        fontSize: 80
    };

    // static styleMap: { [key: string]: object } = {
    //     "title": {
    //         fontFamily: "Kitto",
    //         color: "#ffffff",
    //         fontSize: 80
    //     },

    //     "button": {
    //         fontFamily: "Kitto",
    //     color: "#ffffff",
    //     fontSize: 60
    //     }
    // };

    // static styleMap1 = new Map<string, object>([
    //     ["title", {
    //         fontFamily: "Kitto",
    //         color: "#ffffff",
    //         fontSize: 80
    //     }],

    //     ["button", {
    //         fontFamily: "Kitto",
    //     color: "#ffffff",
    //     fontSize: 60
    //     }]
    // ]);

    // static getStyle(scene: Scene, styleType: string){
    //     return new GameObjects.Text(scene, 0, 0, "", TextStyles.styleMap1.get(styleType)).style;
    // }


    //change text style for peel n dress up
    static setTitleStyle(color: string, border: string) {
        TextStyles.title.color = color;
        TextStyles.title.stroke = border;
    }


    static getTitleStyle(scene: Scene){
        return new GameObjects.Text(scene, 0, 0, "", TextStyles.title).style;
    }

    static getBodyStyle(scene: Scene){
        return new GameObjects.Text(scene, 0, 0, "", TextStyles.body).style;
    }

    static getButtonStyle(scene: Scene){
        return new GameObjects.Text(scene, 0, 0, "", TextStyles.button).style;
    }

    static getTitleButtonStyle(scene: Scene){
        return new GameObjects.Text(scene, 0, 0, "", TextStyles.titleButton).style;
    }
}