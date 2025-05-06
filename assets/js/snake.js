import {
    apple,
    scene,
    speed,
    cursors,
    spawnApple,
    getDistance,
    addSpeed,
    addScore,
    setSpeed
} from './game.js';

export let targetDirection = -1;

export let turnPoints = [];
let appleIsActive = true;

export let snake = [
    { body: '', direction: 1, frozen: false, index: 0, side: 'left'  }
];

export function createSnake() {
    snake[0].body = scene.add.sprite(48, 496, 'head', 1);
    snake[0].body.setScale(0.425);

    for (let i = 1; i < 3; i++) {
        createBody(snake[0], snake[0].body.x, snake[0].body.y + (i * 32), false);
    }
}

export function createBody(body, bodyX, bodyY, frozen) {
    let newBody = {
        body: scene.add.sprite(bodyX, bodyY, 'body', 1),
        direction: body.direction,
        frozen: frozen,
        index: 0,
        side: ''

    };
    newBody.body.setScale(0.40);
    snake.push(newBody);
}

export function getDirection() {
    if (snake[0].direction % 2 !== 0) {
        if (cursors.left.isDown) {
            targetDirection = 0;
        }
        if (cursors.right.isDown) {
            targetDirection = 2;
        }
    } else {
        if (cursors.up.isDown) {
            targetDirection = 1;
        } else if (cursors.down.isDown) {
            targetDirection = 3;
        }
    }
}

export function move() {
    snake.forEach((part, index) => {
        if (index === 0) {
            turnHead(part);
        } else {
            if (part.frozen) {
                moveNewBody(part, index);
            }
            followTurnPoints(part, index);
        }
        if (! part.frozen) {
            addSpeed(part);
        }
    });
    setSpeed();
}

function turnHead(part) {
    let alignX = (part.body.x + 16) % 32;
    let alignY = (part.body.y + 16) % 32;

    if (targetDirection !== -1 && targetDirection !== part.direction) {
        if (alignX === 0 && alignY === 0) {
            makeTurn(part);
        } else {
            if (targetDirection % 2 !== 0 && alignX < speed && alignY === 0) {
                part.body.x -= alignX;
                makeTurn(part);
            }
            if (targetDirection % 2 === 0 && alignX === 0 && alignY < speed) {
                part.body.y -= alignY;
                makeTurn(part);
            }
        }
    }
}

function makeTurn(part) {
    turnPoints.push({
        x: part.body.x,
        y: part.body.y,
        direction: targetDirection
    });
    part.direction = targetDirection;
    part.body.setFrame(targetDirection);
}

function moveNewBody(part, index) {
    let prevPart = snake[index -1];
    let distance = getDistance(part.body, prevPart.body);

    if (distance > 23 && part.direction !== prevPart.direction) {
        part.frozen = false;
    } else if (distance > 32) {
        part.frozen = false;
    }
    centerGrid(part);
}

export function centerGrid(part) {
    if (part.direction % 2 === 0) {
        part.body.x = Math.round(part.body.x / 16) * 16;
    } else {
        part.body.y = Math.round(part.body.y / 16) * 16;
    }
}

function followTurnPoints(part, index) {
    for (let i = 0; i < turnPoints.length; i++) {
        let turn = turnPoints[i];

        if (getDistance(part.body, turn) < speed) {
            part.body.x = turn.x;
            part.body.y = turn.y;
            part.direction = turn.direction;

            if (index === snake.length - 1) {
                turnPoints.splice(i, 1);
                targetDirection = -1;
            }
        }
    }
}

export function eatApple() {
    let distance = getDistance(snake[0].body, apple);
    let lastBody = snake[snake.length -1];

    if (distance < 32 && appleIsActive) {
        createBody(lastBody, lastBody.body.x, lastBody.body.y, true);
        appleIsActive = false;
    }
    if (distance < 16 && ! appleIsActive) {
        apple.destroy();
        addScore();
        spawnApple();
        appleIsActive = true;
    }
}