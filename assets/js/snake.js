// let snake = [
//     { head: '', posX: 16, posY: 496, direction: 1, targetDirection: -1 },
//     { body: '', posX: 16, posY: 528, direction: 1, targetDirection: -1 },
//     { body: '', posX: 16, posY: 560, direction: 1, targetDirection: -1 },
// ];
import { addSpeed } from "./game.js";

import direction from "./game.js";
import targetDirection from "./game.js";
import posY from "./game.js";
import posX from "./game.js";

let head;
export default {head};

let body1;
let body2;

function move() {
    if (direction !== targetDirection && targetDirection !== -1) {
        if (
            (direction % 2 === 0 && (head.x + 16) % 32 === 0) ||
            (direction % 2 !== 0 && (head.y + 16) % 32 === 0)
        ) {
            direction = targetDirection;
            targetDirection = -1;
            turn(direction);
        }
    }
    addSpeed();
}
export {move};

function turn(dir) {
    console.log(head.x);
    head.setFrame(dir);
}

function createSnake() {
    body1 = createBody(1);
    body2 = createBody(2);

    scale(head);
    scale(body1);
    scale(body2);
}
export {createSnake};

function createBody(bodyNumber) {
    posX += 32 * bodyNumber;
    posY += 32 * bodyNumber;

    return this.add.sprite(posX, posY, 'body', 1);
}

function scale(element) {
    element.setScale(0.45);
}