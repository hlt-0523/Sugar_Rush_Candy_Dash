// Obstacle class definition
class Obstacle extends Phaser.GameObjects.Sprite {
    // Constructor for Obstacle
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame); // Call the parent class (Sprite) constructor

        scene.add.existing(this); // Add this object to the existing scene
        this.rowStartB = 0; // Initial row position for the obstacle
    }

    // Update method called every frame
    update() {
        // Move the obstacle horizontally based on the global game speed
        this.x += game.settings.globalSpeed;

        // Check for wraparound and reposition the obstacle
        if (this.x > game.config.width) {
            this.x = -100; // Reset the x position for wraparound
            this.rowMove(); // Call the method to reposition the obstacle in a new row
        }
    }

    // Method to move the obstacle to a new row
    rowMove() {
        // Randomly select a new row for the obstacle
        this.rowStartB = Phaser.Math.Between(0, 2);
        if (this.rowStartB == 0) {
            this.y = 288 + 25; // Position for the first row
        } else if (this.rowStartB == 1) {
            this.y = 288 + 25 + 144; // Position for the second row
        } else if (this.rowStartB == 2) {
            this.y = 288 + 25 + 2 * 144; // Position for the third row
        }
    }
}
