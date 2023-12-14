// Tutorial class definition, extending Phaser.Scene for the game tutorial
class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene"); // Call the parent class constructor and name the scene 'tutorialScene'
    }

    // Preload method to load tutorial assets (if any)
    preload() {
 // Load assets specific to the tutorial scene
// For example, images or sound files used in the tutorial
    }
    // Create method to set up the tutorial scene
    create() {
        // Define text configuration for tutorial display
        let tutorialConfig = {
            fontFamily: 'Courier',
            fontSize: '32px',
            color: '#FFC',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show tutorial text
        let centerX = game.config.width / 2;        // Center position for tutorial text
        let centerY = game.config.height / 2;        // Center position for tutorial text
        // Display tutorial text
        this.add.text(centerX, centerY - 250, 'Tutorial', tutorialConfig).setScale(1.6, 1.6).setOrigin(0.5);
        this.add.text(centerX, centerY - 250, 'Objective:', tutorialConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 70, 'Collect Candys while dodging the Ralphs', tutorialConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 35, 'Game speed correlates to total amount of unspent Candys', tutorialConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Going off of the screen will result in game over', tutorialConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 70, 'Controls: ', tutorialConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 105, '↑ to move up | ↓ to move down', tutorialConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 140, 'Press F while on a Candy Swamp to turn in a Candy', tutorialConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 175, 'Holding F will turn in multiple Candys', tutorialConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 250, 'Press F To Play', tutorialConfig).setOrigin(0.5);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }
    // Update method called every frame
    update() {
        // Check if key F is pressed to start the game
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.start("playScene");// Start the play scene
        }
    }
}
