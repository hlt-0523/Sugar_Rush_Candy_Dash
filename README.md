# Sugar Rush: Candy Dash
## Overview

Sugar Rush: Candy Dash is an endless runner-style 2D game inspired by the fictional game "Sugar Rush" from Wreck-It Ralph. Set in the sweet and vibrant world of Sugar Rush, players dash through ever-changing candy-themed landscapes, dodging obstacles, collecting sweets, and competing for high scores.
File Structure
assets/: Contains all game assets such as images, sprites, and audio files.
src/: Source code of the game.
Checkpoint.js: Defines the checkpoint behavior in the game.
Obstacle.js: Manages obstacles that players must avoid.
Player.js: Player character's functionality and control.
Score.js: Score handling logic.
Play.js: Main game scene with game logic and rendering.
Menu.js: Start menu scene of the game.
Tutorial.js: Tutorial scene explaining game mechanics.
index.html: Entry point for the game.
package.json: Node.js configuration file for the project.

## Contributing
Contributions to Sugar Rush: Candy Dash are welcome! If you have an idea or suggestion, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-name).
Make your changes and commit them (git commit -am 'Add some feature').
Push to the branch (git push origin feature-name).
Create a new Pull Request.

## Known Issues and Testing
**Issues** 
Game Freeze on CandySwamp: When the player reaches the CandySwamp and presses 'F', the game freezes while audio continues. Investigations suggest this might be related to the game loop or event handling within Play.js.

Collision Handling: Some collision detections are not consistent, especially at higher speeds, potentially due to timing issues in the update loop.

## Testing
Checkpoint and Obstacle Mechanics: Frequent testing is required to ensure that the spawning and behavior of checkpoints and obstacles are consistent and bug-free.

Player Interactions: Thorough testing of player controls and interactions with game objects is critical, particularly after implementing new features or adjustments.

Performance Testing: Regular performance tests are recommended to identify any potential lag or rendering issues, especially on different devices.