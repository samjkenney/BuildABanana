// Creates two arrays of characteristics, one for aspirations, and one for personalities
// Can be called to get the characteristics for the game
import { Characteristic } from "./Characteristic";
import { Cosmetic } from "./Cosmetic";

export class CharacteristicHandler{
    static ASPIRATIONS: Characteristic[] = [
        new Characteristic("Cooties Doctor",
            "assets/aspirations/Cosmetic Cooties Doctor.png",
            new Cosmetic("cooties doctor", 120, 0, 1.875),
            "the Banana would have cured ten million bananas from cooties."),
        new Characteristic("A-peel Lawyer",
            "assets/aspirations/Cosmetic Appeal Lawyer.png",
            new Cosmetic("appeal lawyer", 80, 0, 2),
            "the Banana would have overturned an unfair ruling in the Supreme Court."),
        new Characteristic("Computer Science Professor",
            "assets/aspirations/Cosmetic Compsci Professor.png",
            new Cosmetic("computer science professor", 80, 0, 1.5), 
            "the Banana would have made an awesome game about building bonsai trees."),
        new Characteristic("Banana Foster Parent",
            "assets/aspirations/Cosmetic Banana Foster Parent.png",
            new Cosmetic("banana foster parent", 90, -100, 1.875), 
            "the Banana would have given a bunch of bananas a loving home."),
        new Characteristic("Modern Artist",
            "assets/aspirations/Cosmetic Modern Artist.png",
            new Cosmetic("modern artist", 50, -20, 2),
            "the Banana would have sold millions of dollars worth of duct tape art.")
    ];

    //TODO: update images!
    static PERSONALITIES: Characteristic[] = [
        new Characteristic("Diva",
            "assets/personality/...",
            "the Banana dreamed of being the first banana to win RuPeel's Drag Race."),
        new Characteristic("Flexible",
            "assets/personality/...",
            "the Banana dreamed of being the first banana to win gold in the Olympics."),
        new Characteristic("Genius",
            "assets/personality/...",
            "the Banana dreamed of being the first banana to win a Nobel Prize."),
        new Characteristic("Honest",
            "assets/personality/...",
            "the Banana dreamed of always telling their friends when they had spinach in their teeth."),
        new Characteristic("Strong",
            "assets/personality/...",   
            "the Banana dreamed of bunching 450 pounds.")
    ]
    constructor(){  
    }

    static getAspirations(){
        return CharacteristicHandler.ASPIRATIONS;
    }

    static getPersonalities(){
        return CharacteristicHandler.PERSONALITIES;
    }

    
}