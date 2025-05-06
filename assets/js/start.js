import { playButton, addSpeed } from "./game.js";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let scene;

let speed = 2;

let leftHeart = [
    { x: 12, y: 24, direction: 1 },
    { x: 12, y: 23, direction: 0 },
    { x: 11, y: 23, direction: 1 },
    { x: 11, y: 22, direction: 0 },
    { x: 10, y: 22, direction: 1 },
    { x: 10, y: 21, direction: 0 },
    { x: 9, y: 21, direction: 1 },
    { x: 9, y: 20, direction: 0 },
    { x: 8, y: 20, direction: 1 },
    { x: 8, y: 19, direction: 0 },
    { x: 7, y: 19, direction: 1 },
    { x: 7, y: 18, direction: 0 },
    { x: 6, y: 18, direction: 1 },
    { x: 6, y: 17, direction: 0 },
    { x: 5, y: 17, direction: 1 },
    { x: 5, y: 16, direction: 0 },
    { x: 4, y: 16, direction: 1 },
    { x: 4, y: 15, direction: 0 },
    { x: 3, y: 15, direction: 1 },
    { x: 3, y: 14, direction: 0 },
    { x: 2, y: 14, direction: 1 },
    { x: 2, y: 13, direction: 0 },
    { x: 1, y: 13, direction: 1 },
    { x: 1, y: 12, direction: 0 },
    { x: 0, y: 12, direction: 1 },
    { x: 0, y: 11, direction: 1 },
    { x: 0, y: 10, direction: 1 },
    { x: 0, y: 9, direction: 2 },
    { x: 1, y: 9, direction: 1 },
    { x: 1, y: 8, direction: 2 },
    { x: 2, y: 8, direction: 1 },
    { x: 2, y: 7, direction: 2 },
    { x: 3, y: 7, direction: 1 },
    { x: 3, y: 6, direction: 2 },
    { x: 4, y: 6, direction: 1 },
    { x: 4, y: 5, direction: 2 },
    { x: 5, y: 5, direction: 1 },
    { x: 5, y: 4, direction: 2 },
    { x: 6, y: 4, direction: 2 },
    { x: 7, y: 4, direction: 3 },
    { x: 7, y: 5, direction: 2 },
    { x: 8, y: 5, direction: 3 },
    { x: 8, y: 6, direction: 2 },
    { x: 9, y: 6, direction: 3 },
    { x: 9, y: 7, direction: 2 },
    { x: 10, y: 7, direction: 3 },
    { x: 10, y: 8, direction: 2 },
    { x: 11, y: 8, direction: 3 },
    { x: 11, y: 9, direction: 2 },
    { x: 12, y: 9, direction: 2 },
    { x: 13, y: 9, direction: 1 },
];
let rightHeart = [
    { x: 13, y: 8, direction: 2 },
    { x: 14, y: 8, direction: 1 },
    { x: 14, y: 7, direction: 2 },
    { x: 15, y: 7, direction: 1 },
    { x: 15, y: 6, direction: 2 },
    { x: 16, y: 6, direction: 1 },
    { x: 16, y: 5, direction: 2 },
    { x: 17, y: 5, direction: 1 },
    { x: 17, y: 4, direction: 2 },
    { x: 18, y: 4, direction: 2 },
    { x: 19, y: 4, direction: 3 },
    { x: 19, y: 5, direction: 2 },
    { x: 20, y: 5, direction: 3 },
    { x: 20, y: 6, direction: 2 },
    { x: 21, y: 6, direction: 3 },
    { x: 21, y: 7, direction: 2 },
    { x: 22, y: 7, direction: 3 },
    { x: 22, y: 8, direction: 2 },
    { x: 23, y: 8, direction: 3 },
    { x: 23, y: 9, direction: 2 },
    { x: 24, y: 9, direction: 3 },
    { x: 24, y: 10, direction: 3 },
    { x: 24, y: 11, direction: 3 },
    { x: 24, y: 12, direction: 0 },
    { x: 23, y: 12, direction: 3 },
    { x: 23, y: 13, direction: 0 },
    { x: 22, y: 13, direction: 3 },
    { x: 22, y: 14, direction: 0 },
    { x: 21, y: 14, direction: 3 },
    { x: 21, y: 15, direction: 0 },
    { x: 20, y: 15, direction: 3 },
    { x: 20, y: 16, direction: 0 },
    { x: 19, y: 16, direction: 3 },
    { x: 19, y: 17, direction: 0 },
    { x: 18, y: 17, direction: 3 },
    { x: 18, y: 18, direction: 0 },
    { x: 17, y: 18, direction: 3 },
    { x: 17, y: 19, direction: 0 },
    { x: 16, y: 19, direction: 3 },
    { x: 16, y: 20, direction: 0 },
    { x: 15, y: 20, direction: 3 },
    { x: 15, y: 21, direction: 0 },
    { x: 14, y: 21, direction: 3 },
    { x: 14, y: 22, direction: 0 },
    { x: 13, y: 22, direction: 3 },
    { x: 13, y: 23, direction: 0 },
    { x: 12, y: 23, direction: 3 },
];

let snake = [
    { body: '', direction: 1, frozen: false, index: 0, side: 'left' },
];

function preload() {
    this.load.spritesheet('head', 'assets/images/head.png', {frameWidth: 75, frameHeight: 75});
    this.load.spritesheet('body', 'assets/images/body.png', {frameWidth: 75, frameHeight: 75});
}

function create() {
    scene = this;

    createBackground();
    createSnake();
    playButton('Start Game', scene);
}

function createSnake() {
    snake[0].body = scene.add.sprite((12 * 32) + 16, (25 * 32) + 16, 'head', 1);
    snake[0].body.setScale(0.425);

    for (let i = 1; i < 95; i++) {
        createBody(snake[0], snake[0].body.x, snake[0].body.y + (i * 32), false);
    }
}

function createBody(body, bodyX, bodyY, frozen) {
    let newBody = {
        body: scene.add.sprite(bodyX, bodyY, 'body', 1),
        direction: body.direction,
        frozen: frozen,
        index: 0,
        side: body.side
    };
    newBody.body.setScale(0.40);
    snake.push(newBody);
}

function createBackground() {
    for (let x = 0; x < 25; x++) {
        for (let y = 0; y < 25; y++) {
            scene.add.rectangle(x * 32, y * 32, 32, 32, 0xADD8E6)
                .setOrigin(0)
                .setStrokeStyle(1, 0xA9A9A9);
        }
    }
}

function update() {
    move();
}

function move() {
    snake.forEach((part, index) => {
        let turnPoints = part.side === 'left' ? leftHeart : rightHeart;
        followTurnPoints(part, index, turnPoints);
    });
}

function followTurnPoints(part, index, turns) {
    for (let i = 0; i < turns.length; i++) {
        let turn = turns[i];
        let turnX = (turn.x * 32) + 16;
        let turnY = ((turn.y + 1) * 32) + 16;

        if (Phaser.Math.Distance.Between(part.body.x, part.body.y, turnX, turnY) < speed) {
            if (index === 0) {
                part.body.setFrame(turn.direction);
            }
            part.direction = turn.direction;

            loopAnimation(part, i, turns);
        }
    }
    addSpeed(part, speed);
}

function loopAnimation(part, turnIndex, turns) {
    part.index = turnIndex;
    if (part.side === 'left' && turnIndex >= turns.length - 1) {
        part.side = 'right';
        part.index = 0;
    } else if (part.side === 'right' && turnIndex >= turns.length - 1) {
        part.side = 'left';
        part.index = 0;
    }
}