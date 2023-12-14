// Checkpoint class definition
class Checkpoint extends Phaser.GameObjects.Sprite {
    // Constructor for Checkpoint
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame); // Call the parent class (Sprite) constructor

        scene.add.existing(this); // Add this object to the existing scene
        this.CandySwampStart = false; // Flag to track if the CandySwamp has started
        this.rowStartMH = 1; // Initial row setting for the checkpoint
    }

    // Update method called every frame
    update() {
        // If CandySwamp has started, move the checkpoint horizontally
        if (this.CandySwampStart == true) {
            this.x += game.settings.globalSpeed; // Move based on the global game speed
        }
    }

    // Spawn method for the checkpoint
    spawn() {
        // Randomly select a row for the checkpoint to appear
        this.rowStartMH = Phaser.Math.Between(0, 2);
        if (this.rowStartMH == 0) {
            this.y = 360 + 95 - 144; // Position for the first row
        } else if (this.rowStartMH == 1) {
            this.y = 360 + 95; // Position for the second row
        } else if (this.rowStartMH == 2) {
            this.y = 360 + 95 + 144; // Position for the third row
        }
    }
}
