import { Scene } from "phaser";
import { Banana } from "./toolbox/Banana";
import { TextStyles } from "./toolbox/TextStyles";
import { Characteristic } from "./toolbox/Characteristic";

export class Eulogy extends Scene {

    constructor(){
        super("Eulogy");
    }

    preload(){
        //load background
        this.load.image("backgroundT", "assets/Basic_BKG.jpeg"); 
    }
    //TODO: add images?? 
    //TODO: fix spacing
    //TODO: implement personality/aspiration
    //TODO: font style?
    create(){
        const name : String = this.registry.get("banana").getName();
       // const personality : Characteristic = this.registry.get("banana").getPersonality();
       // const aspiration : Characteristic = this.registry.get("banana").getAspiration();
        

        const bg = this.add.image(849, 567.5,'backgroundT').setScale(1.5); //replace w custom background
       
        const eulogyText = "Here lies " + name + " the Banana\n" +
         "Who was loved by all; \n" +
          "a devoted friend, child, and sibling. \n" +
         "They were a banana of many talents. \n" +
         name + "personality.getEulogyEntry()" +  "\n" +
         name + "aspiration.getEulogyEntry()" +  "\n" +
         "They will be missed by all who knew them. \n" +
            "May they rest in peace.\n" +
            "\n \n \n \n \n" +
            "This game was made by: \n" +
            "Daisy Chan \n" +
            "Sam Kenney \n" +
            "Nadya Konadu \n" +
            "Zander Leong \n" +
            "\n \n \n \n \n" +
            "Special thanks to: \n" +
            "Paul Cantrell \n" +
            "Jim Marigmen \n" +
            "Kaliana Andriamananjara \n" +
            "Guy the cat";
       
        const titleText = this.add.text(400, 1000, eulogyText);
        titleText.setStyle(TextStyles.body);
        titleText.setWordWrapWidth(1000);
        titleText.setLineSpacing(50);
        
        
        this.tweens.add({
            targets: titleText,
            y: { from: 1000, to: -5000 },  // Move from bottom to top 
            duration: 20000,           // Animation duration (in milliseconds)
            ease: 'Linear',           // Animation easing function
            repeat: 0,              
            yoyo: false          
          });

        
    }
}