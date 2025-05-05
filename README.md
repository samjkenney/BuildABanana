# Build A Banana
Authors: Daisy Chan, Sam Kenney, Nadya Konadu, and Zander Leong

Build-A-Banana can be found  [here](buildabanana.netlify.app).

Build-A-Banana is a web game meant to instill a bond between the player and their banana, and destroy that bond by cooking the banana. 

This game is built using a template from Phaser, linked [here](https://github.com/phaserjs/template-nextjs). 

## Requirements
Node.js is required to install dependencies and run scripts via npm.

After pulling this code for the first time, you will have to run *npm install* in the terminal.

To compile and build the code, run *npm run dev* in the terminal. Then, click *http://localhost:8080* to view the web version. 

To build, run *npm run build* in the terminal. Then, upload the contents of the *dist* folder to a public-facing web server. For this project, we used Netlify. 

## Navigating the Repository

We only utilized three of the folders: dist, src, and public.

**dist** is updated on *npm run build* and contains the built files of the game.

**src** holds all of the code to run the game. 
    - **game** is the only folder we updated
        - **scenes** contains all of the individual scene files, plus our templates and helper classes.
            - **interactives** holds our helper classes for buttons. 
            - **toolbox** holds our other managing classes: Banana, Characteristic, Cosmetic, etc.
            - Our templates are stored in the main scene class. SceneTemplate is a parent class for CustomizationTemplate and CookTemplate.
            - Each scene or "screen" us stored as an individual file.
        - **main.ts** is updated to include new scenes.

**public** contains the external assets. 
    - **assets** holds our graphics, including animation frames. Graphics used more than once are stored in the main folder, while scene-specific assets are stored in sub-folders named by scene.
    - **fonts** holds our font, Kitto. 

### To Add a New Scene
New scenes should be stored as individual typeScript files in in src/game/scenes. Their unique assets should be stored in a folder of the same name in public/assets.
They should extend from either CustomizatonTemplate, CookTemplate, or SceneTemplate, depending on the content of the scene, and load in the banana from the registry.
The name of the scene should be added to src/main.ts in the form of an import statement at the top, and added into the scene array. 

## Known Bugs

## Frequently Asked Questions
**Did you guys make all the art?**
Yes! Daisy made all of the art in Ibis Paint. 

**How'd you come up with the idea?**
The phrase "Build A Banana" met the idea of "Cooking Mama but screaming." Our other inspirations include the [Papa's -eria games](https://papasgamesfree.io/#google_vignette), [The Ratchelor](https://algorat.club/ratchelor/), [Finch](https://finchcare.com/), Pokemon, and [Jellycat](https://us.jellycat.com/). 
