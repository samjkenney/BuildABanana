import { Scene } from "phaser";
import { Banana } from "./toolbox/Banana";
import { TextStyles } from "./toolbox/TextStyles";
import { Characteristic } from "./toolbox/Characteristic";
import { SceneButton } from "./interactives/SceneButton";
import { MainMenu } from "./MainMenu";

export class Eulogy extends Scene {

    constructor(){
        super("Eulogy");
    }

    preload(){
        //load background
        this.load.image("backgroundT", "assets/eulogy/EulogyBKG.png"); 
    }
    
    create(){
        //gets information from the banana object
        const name : String = this.registry.get("banana").getName();
        const personality : Characteristic = this.registry.get("banana").getPersonality();
        const aspiration : Characteristic = this.registry.get("banana").getAspiration();
        

        const bg = this.add.image(849, 567.5,'backgroundT').setScale(1); //replace w custom background
       
        //custom text to be displayed 
        const eulogyText = "Here lies " + name + " the Banana\n" +
         "Who was loved by all; \n" +
          "a devoted friend, child, and sibling. \n" +
         "They were a banana of many talents. \n" +
         name + " " + personality.getEulogyEntry() +  "\n" +
         name + " " + aspiration.getEulogyEntry() +  "\n" +
         "They will be missed by all who knew them.\n\n" +
            "May they rest in peace.\n" +
            "\n \n \n \n \n" +
            "This game was made by:\n" +
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

       //add text ot the screen
        const titleText = this.add.text(400, 1000, eulogyText);
        titleText.setTint(0x000000); // Set the text color to black
        console.log(titleText.tint);
        titleText.setStyle(TextStyles.body);
        titleText.setWordWrapWidth(900);
        titleText.setLineSpacing(50);
        
        //animation for autoscroll
        this.tweens.add({
            targets: titleText,
            y: { from: 1000, to: -5000 },  // Move from bottom to top 
            duration: 50000,           // Animation duration (in milliseconds)
            ease: 'Linear',           // Animation easing function
            repeat: 0,              
            yoyo: false          
          });

      
      this.time.addEvent({
        delay: 40000, // Delay before starting the animation
        callback: () => {
            var buttonWidth = 550;
            var buttonHeight = 100;
            this.add.existing(new SceneButton(this, this.scale.baseSize.width / 2 - buttonWidth / 2, this.scale.baseSize.height / 2 - buttonHeight / 2, buttonWidth, buttonHeight, MainMenu.BUTTONCOLOR, MainMenu.BUTTONHOVERCOLOR, MainMenu.BUTTONSELECTEDCOLOR, 'Play again?', TextStyles.getButtonStyle(this), false, true, "MainMenu")); // Add a next button to go to the MainMenu scene
        },
        loop: false
      });  
        
    }
}