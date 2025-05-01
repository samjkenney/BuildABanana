import { GameObjects, Scene } from 'phaser';

export class TextStyles{
    static title = {
            fontFamily: "Kitto",
            color: "#B4E6E7",
            stroke: "#4FB0B0", 
            strokeThickness: 6, 
            fontSize: 100,
            align: "center",
            //increase line spacing
        };
        
    static button = {
        fontFamily: "Kitto",
        color: "#ffffff",
        fontSize: 80
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