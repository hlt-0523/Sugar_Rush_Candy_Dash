// Candy class definition, which seems to represent score items in the game
class Candy extends Phaser.GameObjects.Sprite {
    // Constructor for Candy
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame); // Call the parent class (Sprite) constructor

        scene.add.existing(this); // Add this object to the existing scene
        this.rowStartD = 0; // Initial row position for the candy
    }

    // Update method called every frame
    update() {
        // Move the candy horizontally based on the global game speed
        this.x += game.settings.globalSpeed;
    }

    // Spawn method for the candy
    spawn() {
        // Randomly select a row for the candy to appear
        this.rowStartD = Phaser.Math.Between(0, 2);
        if (this.rowStartD == 0) {
            this.y = 360 + 60 - 144; // Position for the first row
        } else if (this.rowStartD == 1) {
            this.y = 360 + 60; // Position for the second row
        } else if (this.rowStartD == 2) {
            this.y = 360 + 60 + 144; // Position for the third row
        }
    }
}
