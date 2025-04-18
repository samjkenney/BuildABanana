import { GameObjects, Scene } from 'phaser';

export class TextStyles{
    static title = {
            fontFamily: "Kitto",
            color: "#ffffff",
            fontSize: 80
        };
        
    static button = {
        fontFamily: "Kitto",
        color: "#ffffff",
        fontSize: 60
    }

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

    static getTitleStyle(scene: Scene){
        return new GameObjects.Text(scene, 0, 0, "", TextStyles.title).style;
    }

    static getButtonStyle(scene: Scene){
        return new GameObjects.Text(scene, 0, 0, "", TextStyles.button).style;
    }
}