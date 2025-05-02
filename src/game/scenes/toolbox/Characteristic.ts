import { Cosmetic } from "./Cosmetic";

export class Characteristic{
    name: string;
    img: string;
    reactionCosmetic: Cosmetic;
    eulogyEntry: string;

    constructor(name: string, imgKey: string, reactionCosmetic: Cosmetic, eulogyEntry: string){
        this.name = name;
        this.img = imgKey;
        this.reactionCosmetic = reactionCosmetic;
        this.eulogyEntry = eulogyEntry;
    }

    getName(){
        return this.name;
    }

    getImageKey(){
        return this.img;
    }

    getReactionCosmetic(){
        return this.reactionCosmetic;
    }

    getEulogyEntry(){
        return this.eulogyEntry;
    }
}