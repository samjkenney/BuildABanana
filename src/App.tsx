import { useRef } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';

function App() {
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    
    const currentScene = (scene: Phaser.Scene) => {
        
    }

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            <div>
                {}
            </div>
        </div>
    )
}

export default App;