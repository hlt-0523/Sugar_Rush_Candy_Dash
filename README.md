# Sugar Rush: Candy Dash
## Overview

**Sugar Rush**: Candy Dash is an endless runner-style 2D game inspired by the fictional game "Sugar Rush" from Wreck-It Ralph. Set in the sweet and vibrant world of Sugar Rush, players dash through ever-changing candy-themed landscapes, dodging obstacles, collecting sweets, and competing for high scores.
File Structure
**assets/**: Contains all game assets such as images, sprites, and audio files.
**src/**: Source code of the game.
**Checkpoint.js**: Defines the checkpoint behavior in the game.
**Obstacle.js**: Manages obstacles that players must avoid.
**Player.js**: Player character's functionality and control.
**Score.js**: Score handling logic.
**Play.js**: Main game scene with game logic and rendering.
**Menu.js**: Start menu scene of the game.
**Tutorial.js**: Tutorial scene explaining game mechanics.
**index.html**: Entry point for the game.
**package.json**: Node.js configuration file for the project.

## Contributing
Contributions to Sugar Rush: Candy Dash are welcome! If you have an idea or suggestion, please follow these steps:

**Fork the repository.**
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

## INFRASTRUCTURE
**Game Execution** : I have tested my game in Chrome, and it runs without critical errors or crashes. This should fulfill the browser compatibility requirement.
**GitHub Page Maintenance**: I have maintained my GitHub page well. It shows meaningful contributions, commits, and milestones that reflect the progress of my project.
LOOK & FEEL
**Game Essentials** : My game includes a title screen, credits view, means of completion, and the ability to restart within the game, as seen in the different scenes I've implemented.
**Game Premise and Controls** : I have provided ways for players to learn about the game's premise and controls, either through a tutorial or an instruction screen within the game.
**Playability** : My game is designed to be playable to completion by a player of moderate skill. I haven't specified a "grader mode" or debug menu, but I believe the game's difficulty is balanced for proper evaluation.
## TECHNICAL EXECUTION**
**Use of Phaser Components** : In my game, I've utilized various Phaser components like sprites, animations, keyboard input, and more, meeting the requirement of using at least five major Phaser components.
**Mechanical Cohesion** : The mechanics of my game reflect the technical goals of the adaptation. The controls perform as expected, and the mechanics are well-implemented.
**Code Organization** : My project and code are well-organized. I've used legible comments, appropriate data structures, and logical scene structures, following the baseline set by Nathan's examples.
## POLISH & STYLE
**Extra Polish and Creativity** : I believe my game has that extra bit of polish and creativity. It stands out due to its unique design, technical prowess, and originality, which should be evident to players and graders.
## FOR DUOS ONLY
Not applicable to me as I am working solo on this project.
## SUBMISSION REQUIREMENTS
I have already provided the link to my game's GitHub repository.
I need to ensure there's a playable link to my game online for submission.
Overall, I feel confident that I have met most, if not all, of the requirements for this assignment. My game demonstrates technical skill, creative design, and effective use of Phaser's capabilities, which should align well with the assignment's criteria.