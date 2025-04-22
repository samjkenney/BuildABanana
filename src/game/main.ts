import { MainMenu } from './scenes/MainMenu'; // Import scenes
import { Name } from './scenes/Name';
import { Personality } from './scenes/Personality';
import { Aspirations } from './scenes/Aspirations';
import { DressUp } from './scenes/DressUp';
import { Peel } from './scenes/Peel';
import { Split } from './scenes/Split';

import { AUTO, Game } from 'phaser';
import { Wash } from './scenes/Wash';
import { IceCream } from './scenes/IceCream';



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
        Peel,
        MainMenu,
        Name,
        Personality,
        Aspirations,
        DressUp,
        Split,
        Wash,
        IceCream
    ] 
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
