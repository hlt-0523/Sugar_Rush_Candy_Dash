// Player class definition
class Player extends Phaser.GameObjects.Sprite {
    // Constructor for Player
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame); // Call the parent class (Sprite) constructor

        scene.add.existing(this); // Add this object to the existing scene
        this.positionTracker = 0; // Tracker for the player's vertical position
    }

    // Update method called every frame
    update() {
        // Handle player motion in the vertical direction
        // If the UP key is pressed and player is not at the topmost row
        if (Phaser.Input.Keyboard.JustDown(keyUP) && this.positionTracker != 1) {
            this.y -= 144; // Move the player up
            this.positionTracker++; // Update position tracker
        }
        // If the DOWN key is pressed and player is not at the bottom row
        if (Phaser.Input.Keyboard.JustDown(keyDOWN) && this.positionTracker != -1) {
            this.y += 144; // Move the player down
            this.positionTracker--; // Update position tracker
        }
    }
}
