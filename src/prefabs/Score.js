class Candy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.rowStartD = 0;
    }

    update() {
        this.x += game.settings.globalSpeed
    }

    spawn() {
        this.rowStartD = Phaser.Math.Between(0, 2);
        if (this.rowStartD == 0) {
            this.y = 360 + 60 - 144;
        } else if (this.rowStartD == 1) {
            this.y = 360 + 60;
        } else if (this.rowStartD == 2) {
            this.y = 360 + 60 + 144;
        }
    }
}