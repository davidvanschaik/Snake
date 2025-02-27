let cursors;
export default cursors;

let speed;
let posX = 48;
let posY = 496;
let direction = 1;
let targetDirection = -1;

function addSpeed() {
    if (direction % 2 === 0) {
        posX += (direction === 0 ? -speed : +speed);
    } else {
        posY += (direction === 1 ? -speed : +speed);
    }
    head.y = posY;
    head.x = posX;
}
export { addSpeed };

function getDirection() {
    if (direction % 2 !== 0) {
        if (cursors.left.isDown) {
            targetDirection = 0;
        }
        if (cursors.right.isDown) {
            targetDirection = 2;
        }
    }

    if (direction % 2 === 0) {
        if (cursors.up.isDown) {
            targetDirection = 1;
        } else if (cursors.down.isDown) {
            targetDirection = 3;
        }
    }
}
export { getDirection };

function randomPosition() {

}