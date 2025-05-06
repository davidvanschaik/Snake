import {
    snake,
    centerGrid,
    createSnake,
    getDirection,
    move,
    eatApple, createBody
} from "./snake.js";

let score = 0;
let scoreText;

let gameOverTextRed;
let gameOverTextBlack;
let highScoreText;

let paddingY;
let paddingX;
let startGameButton;
let startGameButtonText;

let newSpeed;
export let cursors;
export let speed = 2;
export let scene;

export let apple;
export let greenApple;
let greenAppleIsActive = false;
let greenAppleTime;
let powerUpTime;


export function preload() {
    this.load.image('food', 'assets/images/food.png');
    this.load.spritesheet('head', 'assets/images/head.png', {frameWidth: 75, frameHeight: 75});
    this.load.spritesheet('body', 'assets/images/body.png', {frameWidth: 75, frameHeight: 75});

    this.load.spritesheet('head_game_over', 'assets/images/head_go.png', {frameWidth: 75, frameHeight: 75});
    this.load.spritesheet('body_game_over', 'assets/images/body_go.png', {frameWidth: 75, frameHeight: 75});
    this.load.image('food_game_over', 'assets/images/food_go.png');
    this.load.image('green_food', 'assets/images/green_food.png');
}

export function create() {
    scene = this;
    cursors = this.input.keyboard.createCursorKeys();
    scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '30px', fill: '#070000' });
    scoreText.setDepth(1);
    gameOverTextBlack = this.add.text(175, 275, 'Game Over', { fontSize: '75px', fill: '#070707'});
    gameOverTextRed = this.add.text(180, 275, 'Game Over', { fontSize: '75px', fill: '#ee0404'});
    highScoreText = this.add.text(183, 460, 'High Score: ', { fontSize: '50px', fill: '#050505'});

    createBackground();
    createSnake();
    spawnApple();
    newSpeed = speed;
    let highScore = localStorage.getItem('highScore');
    if (highScore === null) {
        localStorage.setItem('highScore', '0');
    }
}

export function createBackground() {
    for (let x = 0; x < 25; x++) {
        for (let y = 0; y < 25; y++) {
            scene.add.rectangle(x * 32, y * 32, 32, 32, 0xADD8E6)
                .setOrigin(0)
                .setStrokeStyle(1, 0xA9A9A9);
        }
    }
}

export function spawnApple() {
    let { x, y } = getRandomPositions();
    apple = scene.add.image(x, y, 'food');
    apple.setScale(0.45);
}

function getRandomPositions() {
    let minX = 2, maxX = 24; // X range (in grid units)
    let minY = 2, maxY = 24; // Y range (in grid units)

    let x = (Math.floor(Math.random() * (maxX - minX + 1)) + minX) * 32 - 16;
    let y = (Math.floor(Math.random() * (maxY - minY + 1)) + minY) * 32 - 16;
    return { x, y };
}

export function update() {
    if (speed !== 0) {
        collideWithSelf();
        borderCollision();
        getDirection();
        move();
        eatApple();
        increaseSpeed();
        spawnGreenApple();
        eatGreenApple();
    }
}

function borderCollision() {
    [snake[0].body.x, snake[0].body.y].forEach((pos) => {
        if (pos < 15 || pos > 785) {
            gameOver();
        }
    });
}

function collideWithSelf() {
    if (greenAppleIsActive && (Date.now() - powerUpTime > 10000)) {
        greenAppleIsActive = false;
        powerUpTime = 0;
    }
    if (! greenAppleIsActive ) {
        snake.forEach((part, index) => {
            if (index !== 0) {
                if (getDistance(snake[0].body, part.body) < 16) {
                    gameOver();
                }
            }
        });
    }
}

function gameOver() {
    speed = 0;
    newSpeed = 0;
    updateSnakeGameOver();
    gameOverTextBlack.setDepth(1);
    gameOverTextRed.setDepth(1);
    setHighScore();
    playButton('Play Again', scene);
}

function setHighScore() {
    let highScore = localStorage.getItem('highScore');
    if (highScore === null || highScore < score) {
        localStorage.setItem('highScore', score);
        highScoreText.setText(`New High Score: ${score}`);
    } else {
        highScoreText.setText(`High Score: ${highScore}`);
    }
    highScoreText.setDepth(1);
}

function updateSnakeGameOver() {
    snake.forEach((part, index) => {
        centerGrid(part);
        if (index === 0) {
            changeColor(part, index, 'head', 0.425, part.direction);
        } else {
            changeColor(part, index, 'body', 0.40);
        }
    });
    apple = scene.add.image(apple.x, apple.y, 'food_game_over', );
    apple.setScale(0.45);
}

function changeColor(part, index, image, scale, direction = 1) {
    part.body = scene.add.sprite(part.body.x, part.body.y, `${image}_game_over`, direction);
    snake[index].body.setScale(scale);
}

export function getDistance(body1, body2) {
    return Phaser.Math.Distance.Between(body1.x, body1.y, body2.x, body2.y);
}

export function addSpeed(part, movementSpeed= 0) {
    let moveDistance = movementSpeed === 0 ? speed : movementSpeed;
    if (part.direction === 0) {
        part.body.x -= moveDistance;
    }
    if (part.direction === 2) {
        part.body.x += moveDistance;
    }
    if (part.direction === 1) {
        part.body.y -= moveDistance;
    }
    if (part.direction === 3) {
        part.body.y += moveDistance;
    }
}

export function addScore() {
    score += 10;
    scoreText.setText(`Score: ${score}`);
}

export function increaseSpeed() {
    if (score > 90 && speed === 2) {
        newSpeed += 2;
    }
}

export function setSpeed() {
    if (speed !== newSpeed) {
        speed = newSpeed;
    }
}

export function playButton(play, scene) {
    paddingX = 20;  // Horizontal padding
    paddingY = 10;  // Vertical padding

    // Create text object (without padding)
    startGameButtonText = scene.add.text(400, 400, play, {
        fontSize: `40px`,
        fill: "#012C00",
    }).setOrigin(0.5); // Center text

    // Calculate button size based on text
    let textWidth = startGameButtonText.width + (paddingX * 2);
    let textHeight = startGameButtonText.height + (paddingY * 2);

    // Create a rectangle background behind the text
    startGameButton = scene.add.rectangle(400, 400, textWidth, textHeight, 0x08FA11) // Green background
        .setStrokeStyle(4, 0x012C00) // Dark green border
        .setOrigin(0.5);

    // Make the button interactive
    startGameButton.setInteractive();

    // Change cursor when hovering over the button
    startGameButton.on("pointerover", () => {
        scene.input.setDefaultCursor("pointer");
    });

    startGameButton.on("pointerout", () => {
        scene.input.setDefaultCursor("default");
    });

    // Click event to start game
    startGameButton.on("pointerdown", () => {
        startGameButtonText.destroy();
        startGameButton.destroy();
        gameStart(scene);
    });

    scene.children.bringToTop(startGameButtonText);
}

function gameStart(scene) {
    let countdown = 3; // Start from 3
    let startGameText = scene.add.text(400, 400, `Game start: ${countdown}`, {
        fontSize: '40px',
        fill: '#090000'
    }).setOrigin(0.5);

    // Countdown every second
    let countdownInterval = setInterval(() => {
        countdown--; // Decrease countdown
        startGameText.setText(`Game start: ${countdown}`); // Update text

        if (countdown === 0) {
            clearInterval(countdownInterval); // Stop the interval
            window.location.href = "game.html"; // Redirect to game.html
        }
    }, 1000); // Run every 1000ms (1 second)
}

function spawnGreenApple() {
    if (greenApple === undefined && ! greenAppleIsActive) {
        if (score >= 500 && (! greenAppleTime || Date.now() - greenAppleTime > 5000)) {
            let { x, y } = getRandomPositions();
            greenApple = scene.add.image(x, y, 'green_food');
            greenApple.setScale(0.45);
            greenAppleTime = Date.now();
        }
    }
}

function eatGreenApple() {
    if (greenApple === undefined) {
        return;
    }

    let distance = getDistance(snake[0].body, greenApple);

    if (distance < 32) {
        greenAppleIsActive = true;
        powerUpTime = Date.now();
    }
    if (distance < 16) {
        greenApple.destroy();
    }

    if (Date.now() - greenAppleTime > 2000) {
        greenApple.destroy();
        greenApple = undefined;
    }
}
