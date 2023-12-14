// Menu class definition, extending Phaser.Scene for the game menu
class Menu extends Phaser.Scene {
    // Constructor for Menu
    constructor() {
        super("menuScene"); // Call the parent class constructor and name the scene 'menuScene'
    }

    // Preload method to load menu assets
    preload() {
        // Load assets for the menu
        this.load.spritesheet('gamelogo', './assets/gamelogo_empty.png', { frameWidth: 173, frameHeight: 66, startFrame: 0, endFrame: 1 });
        this.load.image('botbg', './assets/RaceTrack.png');
        this.load.image('topbg', './assets/ViewingPlatform.png');
    }

    // Create method to setup the menu scene
    create() {
        // Place background tile sprites
        this.wpTop = this.add.tileSprite(0, 0, 632, 70, 'topbg').setScale(4, 4).setOrigin(0, 0);
        this.wpBot = this.add.tileSprite(0, 283, 316, 108, 'botbg').setScale(4.1, 4).setOrigin(0, 0);

        // Add borders to the scene
        this.add.rectangle(0, 0, 1280, 5, 0x000000).setOrigin(0, 0); // Top
        this.add.rectangle(0, 715, 1280, 5, 0x000000).setOrigin(0, 0); // Bottom
        this.add.rectangle(0, 0, 5, 720, 0x000000).setOrigin(0, 0); // Left
        this.add.rectangle(1275, 0, 5, 720, 0x000000).setOrigin(0, 0); // Right  

        // Create and play the game logo animation
        this.anims.create({
            key: 'gamelogo',
            frames: this.anims.generateFrameNumbers('gamelogo', { start: 0, end: 1, first: 0 }),
            frameRate: 5,
            repeat: -1,
        });
        this.logo = new Player(this, game.config.width / 2, game.config.height / 2 - 100, 'gamelogo').setScale(4, 4).setOrigin(0.5);
        this.logo.anims.play('gamelogo');

        // Define text configuration for menu
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        };

        // Center position for menu text
        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;

        // Display menu text options
        this.add.text(centerX, centerY + 110, 'Press F To Play', menuConfig).setScale(2).setOrigin(0.5);
        this.add.text(centerX, centerY + 160, 'Press T For Tutorial', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 340, 'By: Alexander Shaham, Terence So, Brandon Leung', menuConfig).setScale(0.5).setOrigin(0.5);

        // Define keyboard keys for menu interaction
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    }

    // Update method called every frame
    update() {
        // Handle tile scrolling for background
        this.wpTop.tilePositionX -= game.settings.globalSpeed / 4;
        this.wpBot.tilePositionX -= game.settings.globalSpeed / 4;

        // Start the play scene if F is pressed
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            // Start the game
            this.scene.start("playScene");
        }
        // Start the tutorial scene if T is pressed
        if (Phaser.Input.Keyboard.JustDown(keyT)) {
            // Start the tutorial
            this.scene.start("tutorialScene");
        }
    }
}
