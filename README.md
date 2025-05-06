# Snake

This is Snake game build with Phaser library in Javascript. The game is a simple snake game where the user controls the 
snake with the arrow keys to change the direction of the snake. Apples spawn randomly on the screen that the snake should 
eat. Every time the snake eats an apple, the snake grows 1 body segment. The snake dies when the snake collides with itself
or with the borders. When the user reaches a score of 500, green apples appear that allows the snake to collide with itself 
without dying. The green apple only appear for 5 seconds every 1 minute and lasts for 10 seconds. If the snake couldn't eat
the green apple in time, it will disappear.


## Installation

To install and play this game, the following dependencies are required:
- NPM package manager
- Git
- A local web server


1. Clone the repository

To clone the repository, run the following command in the terminal:

```shell
git clone git@github.com:davidvanschaik/Snake.git
```

2. Install the dependencies

If you don't have NPM installed, you can download it [here](https://www.npmjs.com/get-npm).

To install the run the following command in the terminal:

```shell
npm install
```

3. Start the local web server

If you are using and IDE like Visual Studio Code, you can use the Live Server extension to start a local web server.

Alternative you can use the PHP build in server. To start the server, you first must install PHP. 
You can download PHP [here](https://www.php.net/downloads).

If PHP is installed, you can start the server by running the following command in the terminal:
NOTE: Make sure you are in the root directory of the project.

```shell
php -S localhost:8000
```

4. Open the game in the browser

To open the game in the browser, navigate to the following URL:

localhost:8000/index.html

## Controls

The game is very simple. At first you will see a start screen with a play button. Click on the play button to start the game.
The game will launch in 3 seconds, after that you can control the snake by using the arrow keys to change the direction of the snake. 

NOTE: You can't move the snake to the right if it is moving left and vice versa. The same goes for up and down.

