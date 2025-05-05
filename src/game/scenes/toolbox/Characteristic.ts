// Represents a characteristic of a banana (Personality, Aspiration)
//Contains a name, a cosmetic, and an eulogy entry
import { Cosmetic } from "./Cosmetic";

export class Characteristic{
    name: string;
    reactionCosmetic: Cosmetic;
    eulogyEntry: string;

    //Name of the characteristic, the cosmetic that represents it, and the eulogy entry
    constructor(name: string,  reactionCosmetic: Cosmetic, eulogyEntry: string){
        this.name = name;
        this.reactionCosmetic = reactionCosmetic;
        this.eulogyEntry = eulogyEntry;
    }

    getName(){
        return this.name;
    }

    getReactionCosmetic(){
        return this.reactionCosmetic;
    }

    getEulogyEntry(){
        return this.eulogyEntry;
    }
}