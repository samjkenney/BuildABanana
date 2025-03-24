
import { MainMenu } from './scenes/MainMenu';
import { DressUp } from './scenes/DressUp';
import { Peel } from './scenes/Peel';
import { Split } from './scenes/Split';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Preloader,
        MainMenu,
        DressUp,
        Split,
        Peel
    ] 


};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
