import { Cosmetic } from "./Cosmetic";

export class Characteristic{
    name: string;
    reactionCosmetic: Cosmetic;
    eulogyEntry: string;

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