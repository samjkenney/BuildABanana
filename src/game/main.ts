
import { MainMenu } from './scenes/MainMenu';
import { DressUp } from './scenes/DressUp';
import { Peel } from './scenes/Peel';
import { Split } from './scenes/Split';
import { Name} from './scenes/Name'; // Import the Name scene
import { AUTO, Game } from 'phaser';


//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    dom: {
        createContainer: true
    },
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        MainMenu,
        DressUp,
        Split,
        Peel,
        Name
    ] 


};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
