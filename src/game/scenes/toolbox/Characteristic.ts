import { Cosmetic } from "./Cosmetic";

export class Characteristic{
    name: string;
    img: Cosmetic;
    eulogyEntry: string;

    constructor(name: string, img: Cosmetic, eulogyEntry: string){
        this.name = name;
        this.img = img;
        this.eulogyEntry = eulogyEntry;
    }

    getName(){
        return this.name;
    }

    getImage(){
        return this.img;
    }

    getEulogyEntry(){
        return this.eulogyEntry;
    }
}