// Creates two arrays of characteristics, one for aspirations, and one for personalities
// Can be called to get the characteristics for the game
import { Characteristic } from "./Characteristic";
import { Cosmetic } from "./Cosmetic";
import { Aspirations } from "../Aspirations";

export class CharacteristicHandler{
    static ASPIRATIONS: Characteristic[] = [
        new Characteristic("Cooties Doctor",
             new Cosmetic("cooties doctor", 120, 0, 1.875), 
              "the Banana would have cured ten million bananas from cooties."),
        new Characteristic("A-peel Lawyer",
             new Cosmetic("appeal lawyer", 80, 0, 2),  
            "the Banana would have overturned an unfair ruling in the Supreme Court."),
        new Characteristic("Computer Science Professor",
             new Cosmetic ("computer science professor", 80, 0, 1.5),   
             "the Banana would have made an awesome game about build ing bonsai trees."),
        new Characteristic("Banana Foster Parent",
             new Cosmetic("banana foster parent", 90, -100, 1.875),    
             "the Banana would have given a bunch of bananas a loving home."),
        new Characteristic("Modern Artist",
             new Cosmetic("modern artist", 50, -20, 2),  
             "the Banana would have sold millions of dollars worth of duct tape art.")
    ];

    //TODO: update sizing!
    static PERSONALITIES: Characteristic[] = [
        new Characteristic("Diva",
            new Cosmetic("assets/personality/personality diva.png", 80, 0, 2),
            "the Banana dreamed of being the first banana to win RuPeel's Drag Race."),
        new Characteristic("Flexible",
            new Cosmetic("assets/personality/personality flexible.png", 80, 0, 2),
            "the Banana dreamed of being the first banana to win gold in the Olympics."),
        new Characteristic("Genius",
            new Cosmetic("assets/personality/personality genius.png", 80, 0, 2),
            "the Banana dreamed of being the first banana to win a Nobel Prize."),
        new Characteristic("Honest",
            new Cosmetic("assets/personality/personality honest.png", 80, 0, 2),
            "the Banana dreamed of always telling their friends when they had spinach in their teeth."),
        new Characteristic("Strong",
            new Cosmetic("assets/personality/personality strong.png", 80, 0, 2),   
            "the Banana dreamed of bunching 450 pounds.")
    ]
    
    constructor(){  
    }

    static getAspirations(){
        return this.ASPIRATIONS;
    }

    static getPersonalities(){
        return this.PERSONALITIES;
    }

    
}