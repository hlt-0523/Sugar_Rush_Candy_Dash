class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // Load assets
        this.load.image('Race_Car', './assets/Race_Car.png');
        this.load.image('Candy', './assets/Candy.png');
        this.load.image('obstacle', './assets/Ralph.png');
        this.load.image('CandySwamp', './assets/CandySwamp.png');
        this.load.image('botbg', './assets/RaceTrack.png');
        this.load.image('topbg', './assets/ViewingPlatform.png');
        this.load.spritesheet('runanim', './assets/Race_Car_Anim.png', {frameWidth: 74, frameHeight: 66, startFrame: 0, endFrame: 8});
        this.load.spritesheet('SubmitCandyanim', './assets/SubmitCandy_empty.png', { frameWidth: 45, frameHeight: 59, startFrame: 0, endFrame: 6});
        this.load.audio('Candysfx', './assets/CandyScore.mp3');
        this.load.audio('bgmusic', './assets/CandyBGM.mp3');
        this.load.audio('scoresfx', './assets/GetScore.mp3');
    }

    create() {
        // Place tile sprite
        this.wpTop = this.add.tileSprite(0, 0, 632, 70, 'topbg').setScale(4, 4).setOrigin(0, 0);
        this.wpBot = this.add.tileSprite(0, 283, 316, 108, 'botbg').setScale(4.1, 4).setOrigin(0, 0);

        // Define keyboard keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // Play music
        this.music = this.sound.add('bgmusic');
        this.music.play({ volume: 0.1, loop: -1 });

        // Player animations
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('runanim', {start: 0, end: 7, first: 0}),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({ //use from same sprite at a later point.
            key: 'SubmitCandy',
            frames: this.anims.generateFrameNumbers('SubmitCandyanim', { start: 0, end: 5, first: 0 }),
            frameRate: 12,
            repeat: -1,
        })

        // Add checkpoint
        this.CandySwamp = new Checkpoint(this, -200, 360 + 95 - 144, 'CandySwamp').setScale(2.1, 2.1).setSize(100, 100).setOrigin(0, 0);
        // Add Candy
        this.Candy = new Candy(this, -200, 360 + 60 - 144, 'Candy').setScale(2, 2).setSize(72,100).setOrigin(0);
        // Add Ralphs
        this.Ralph0 = new Obstacle(this, -640, 288 + 25, 'obstacle').setScale(4, 4).setOrigin(0.5);
        this.Ralph1 = new Obstacle(this, 0, 288 + 25 + 144, 'obstacle').setScale(4, 4).setOrigin(0.5);
        this.Ralph2 = new Obstacle(this, -320, 288 + 25 + 2 * 144, 'obstacle').setScale(4, 4).setOrigin(0.5);
        this.Ralph3 = new Obstacle(this, -960, 288 + 25 + 144, 'obstacle').setScale(4, 4).setOrigin(0.5);
        // Add player
        this.player = new Player(this, 1000, 3 * 144 - 20, 'runanim').setScale(3, 3).setSize(160, 160).setOrigin(0, 0.5);
        this.player.anims.play('run')

        // Conditions
        this.gameOver = false;
        this.positionChecker = true;
        this.isCandySwampTimer = false;
        this.isCandyTimer = false;
        this.isRalphTimer == false
        this.isPointTimer = false;
        this.isSubmitingCandy = false;
        this.isMoving = true;
        this.moveAnimOn = true;
        this.soundBool = false;
        // Score 
        this.weight = 0;
        this.points = 0;

        // Text format
        this.playConfig = {
            fontFamily: 'Courier New',
            fontSize: '28px',
            backgroundColor: '#FF00FF',
            color: '#000',
            align: 'right',
            padding: {
                top: 2,
                bottom: 2,
            },
            fixedWidth: 0
        }
        this.centerX = game.config.width / 2;
        this.centerY = game.config.height / 2;
        this.textSpacer = 64;

        // Displays
        this.highScore = this.add.text(5, 5, "High Score: " + game.settings.highScore, this.playConfig);
        this.score = this.add.text(5, 35, "Score: 0", this.playConfig);
        this.CandyCount = this.add.text(5, 65, "Candys: 0", this.playConfig);
        // Borders
        this.add.rectangle(0, 0, 1280, 5, 0x000000).setOrigin(0, 0); // left
        this.add.rectangle(0, 715, 1280, 5, 0x000000).setOrigin(0, 0); // bottom
        this.add.rectangle(0, 0, 5, 720, 0x000000).setOrigin(0, 0); // top
        this.add.rectangle(1275, 0, 5, 720, 0x000000).setOrigin(0, 0); // right    
    }

    update() {
        // Tile scrolling
        this.wpTop.tilePositionX -= game.settings.globalSpeed / 4;
        this.wpBot.tilePositionX -= game.settings.globalSpeed / 4;

        // Killed by edge
        if (this.player.x >= game.settings.killZone) {
            this.player.alpha = 0;
            this.gameOver = true;
        }

        // Game over and scene swap
        if (this.gameOver == true) {
            this.add.text(this.centerX, this.centerY, 'Press (M) To Return To The Main Menu!', this.playConfig).setOrigin(0.5);
            this.add.text(this.centerX, this.centerY - this.textSpacer, 'Press(R) To Restart!', this.playConfig).setOrigin(0.5);
            if (keyR.isDown) {
                this.scene.start("playScene");
            }
            if (keyM.isDown) {
                this.scene.start("menuScene");
            }
            this.music.stop();
            game.settings.globalSpeed = 6;
            this.weight = 0;
            game.settings.startPositionBuffer = 0;
        }

        // CandySwamp spawner
        if (this.isCandySwampTimer == false) {
            this.isCandySwampTimer = true;
            // 15-second timer
            this.CandySwampTimer = this.time.delayedCall(10000, () => {
                this.isCandySwampTimer = false;
                this.CandySwamp.x = -50;
                this.CandySwamp.CandySwampStart = true;
                this.CandySwamp.spawn();
            }, null, this);
        }
        // Candy spawner
        if (this.isCandyTimer == false) {
            this.isCandyTimer = true;
            // 5-second timer
            this.CandyTimer = this.time.delayedCall(5000, () => {
                this.isCandyTimer = false;
                this.Candy.x = -50;
                this.Candy.alpha = 1;
                this.Candy.spawn();
            }, null, this);
        }

        // Check player collisions
        if (this.checkCollision(this.player, this.Ralph0)) {
            this.playerHit(this.player, this.Ralph0);
        }
        if (this.checkCollision(this.player, this.Ralph1)) {
            this.playerHit(this.player, this.Ralph1);
        }
        if (this.checkCollision(this.player, this.Ralph2)) {
            this.playerHit(this.player, this.Ralph2);
        }
        if (this.checkCollision(this.player, this.Ralph3)) {
            this.playerHit(this.player, this.Ralph3);
        }
        if (this.checkCollision(this.player, this.Candy)) {
            this.playerScore(this.Candy);
        }
        if (this.checkCollision(this.player, this.CandySwamp) && keyF.isDown) {
            this.playerSubmitCandy(this.player);
            this.isSubmitingCandy = true;
        } else {
            this.isSubmitingCandy = false;
        } 
        // Stacking prevention for objects - Candy
        if (this.checkCollision(this.Candy, this.Ralph0)) {
            this.Candy.x -= 160;
        }
        if (this.checkCollision(this.Candy, this.Ralph1)) {
            this.Candy.x -= 160;
        }
        if (this.checkCollision(this.Candy, this.Ralph2)) {
            this.Candy.x -= 160;
        }
        if (this.checkCollision(this.Candy, this.Ralph3)) {
            this.Candy.x -= 160;
        }
        // Stacking prevention for objects - CandySwamp
        if (this.checkCollision(this.CandySwamp, this.Ralph0)) {
            this.CandySwamp.x -= 160;
        }
        if (this.checkCollision(this.CandySwamp, this.Ralph1)) {
            this.CandySwamp.x -= 160;
        }
        if (this.checkCollision(this.CandySwamp, this.Ralph2)) {
            this.CandySwamp.x -= 160;
        }
        if (this.checkCollision(this.CandySwamp, this.Ralph3)) {
            this.CandySwamp.x -= 160;
        }

        // Update objects
        if (this.gameOver) {
            this.player.x = 100000000;
        }
        this.player.update();
        this.Candy.update();
        this.CandySwamp.update();
        this.Ralph0.update();
        this.Ralph1.update();
        this.Ralph2.update();
        this.Ralph3.update();

        // Increase high score and repaint (if applicable)
        if (this.points > game.settings.highScore) {
            game.settings.highScore = this.points;
            this.highScore.text = "High Score: " + game.settings.highScore;
        }

        // Player x-movement
            // Prevent player from going past start position - probably unneeded code tbh.
        if (this.player.x <= game.config.width / 2 - game.settings.startPositionBuffer && this.isSubmitingCandy == false) {
            this.positionChecker = true;
            this.isMoving = true;
            if (this.isMoving == true && this.moveAnimOn == false) {
                this.moveAnimOn = true;
                this.player.anims.play('run')
                this.soundBool = false;
            }
            // Check to see if player has been displaced from start position
        } else if (this.player.x > game.config.width / 2 - game.settings.startPositionBuffer && this.isSubmitingCandy == false) {
            this.positionChecker = false;
            this.isMoving = true;
            if (this.isMoving == true && this.moveAnimOn == false) {
                this.moveAnimOn = true;
                this.player.anims.play('run')
                this.soundBool = false;
            }
        }
            // Player catch up to start position if not being pushed or SubmitingCandy.
        if (this.positionChecker == false && this.isSubmitingCandy == false &&
            !this.checkCollision(this.player, this.Ralph0) &&
            !this.checkCollision(this.player, this.Ralph1) &&
            !this.checkCollision(this.player, this.Ralph2) &&
            !this.checkCollision(this.player, this.Ralph3)) {
            this.player.x -= 1;
            this.isMoving = true;
            this.soundBool = false;
        }
            // Stop run animation when player is SubmitingCandy
        if (this.isSubmitingCandy == true) {
            this.player.x += game.settings.globalSpeed;
            this.isMoving = false;
            if (this.isMoving == false && this.moveAnimOn == true) {
                this.moveAnimOn = false;
                this.player.anims.stop('run')
                if (this.weight >= 1) {
                    this.player.anims.play('SubmitCandy');
                }
            }
        }
    }

    // Axis-Aligned Bounding Boxes checking
    checkCollision(player, object) {
        if (player.x < object.x + object.width &&
            player.x + player.width > object.x &&
            player.y < object.y + object.height &&
            player.height + player.y > object.y) {
            return true;
        } else {
            return false;
        }
    }

    // Player-car reaction
    playerHit(player) {
        player.x += game.settings.globalSpeed;
        this.isMoving = false;
        // Stop run animation
        if (this.isMoving == false && this.moveAnimOn == true) {
            this.moveAnimOn = false;
            this.player.anims.stop('run')
        }
    }

    // Player-Score reaction
    playerScore(Score) {
        this.sound.play('Candysfx', { volume: 0.2 });
        this.weight++;
        this.CandyCount.text = "Candys: " + this.weight;
        Score.alpha = 0;
        Score.x += 300;
        game.settings.globalSpeed += 1;
        if (game.settings.startPositionBuffer < 400) {
            game.settings.startPositionBuffer += 50;
        }
    }

    // Player scoring
    playerSubmitCandy(player) {
        if (this.weight > 0) {
            // Score manipulation
            if (!this.isPointTimer) {
                this.isPointTimer = true;
                // Timer to turn unload Candys 1 by 1
                this.pointTimer = this.time.delayedCall(250, () => {
                    this.soundBool = false;
                    this.isPointTimer = false;
                    this.weight--;
                    this.CandyCount.text = "Candys: " + this.weight;
                    if (this.weight <= 0) {
                        // Ensure the timer is stopped if no more Candys
                        this.isPointTimer = false;
                    }
                    if (game.settings.startPositionBuffer >= 50) {
                        game.settings.startPositionBuffer -= 50;
                    }
                    this.points += 100;
                    game.settings.globalSpeed -= 1;
                    this.score.text = "Score: " + this.points;
                }, null, this);
            }
            if (!this.soundBool) {
                this.sound.play('scoresfx', { volume: 0.2 });
                this.soundBool = true;
            }
        }
    }
}