import { MainMenu } from './scenes/MainMenu'; // Import scenes
import { Name} from './scenes/Name';
import { DressUp } from './scenes/DressUp';
import { Peel } from './scenes/Peel';
import { Split } from './scenes/Split';

import { AUTO, Game } from 'phaser';


//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO, //decides if using WebGL or Canvas
    // width: 1024,
    // height: 768,
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
        DressUp,
        Peel,
        Split
    ] 
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
