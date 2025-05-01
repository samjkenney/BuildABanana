//This file is the main entry point for the game. It initializes game instance, as well as outlines scenes and their order.
//To add a new scene, import it here and add it to the array in the config object below.
//This file is pulled from the Phaser template

//Import necessary modules and classes from Phaser
import { AUTO, Game } from 'phaser';

//Import the scenes for the game
import { MainMenu } from './scenes/MainMenu'; 
import { Name } from './scenes/Name';
import { Personality } from './scenes/Personality';
import { Aspirations } from './scenes/Aspirations';
import { DressUp } from './scenes/DressUp';
import { Peel } from './scenes/Peel';
import { Split } from './scenes/Split';
import { Wash } from './scenes/Wash';
import { IceCream } from './scenes/IceCream';
import { PhotoShoot } from './scenes/PhotoShoot';
import { Eulogy } from './scenes/Eulogy';
//Add any other scenes here


//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO, //decides if using WebGL or Canvas
    width: 1698,
    height: 1135,
    backgroundColor: '#ffffff',

    dom: {
        createContainer: true
    },
    parent: 'game-container',

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    title: "Build-A-Banana",
    //url: ???,
    scene: [
        MainMenu,
        Name,
        Personality,
        Aspirations,
        PhotoShoot,
        DressUp,
        Wash,
        Peel,
        Split,
        IceCream,
        Eulogy
        //Add any other scenes here
    ] 
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
