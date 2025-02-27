// import Phaser from 'phaser';
// import { getDirection } from "./game.js";
// import { move } from "./snake.js";
// import { createSnake } from "./snake.js";
// import cursors from "./game.js";
// import posX from "./game.js";
// import posY from "./game.js";
// import head from "./snake.js";
//
// let config = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 800,
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//     }
// };
//
// let game = new Phaser.Game(config);
//
// function preload() {
//     // this.load.image('food', './assets/images/food.png');
//     this.load.spritesheet('head', './assets/images/head.png', {frameWidth: 75, frameHeight: 75});
//     this.load.spritesheet('body', './assets/images/body.png', {frameWidth: 32, frameHeight: 32});
// }
//
// function create() {
//     for (let x = 0; x < 25; x++) {
//         for (let y = 0; y < 25; y++) {
//             this.add.rectangle(x * 32, y * 32, 32, 32, 0xADD8E6)
//                 .setOrigin(0)
//                 .setStrokeStyle(1, 0xA9A9A9);
//         }
//     }
//
//     head = this.add.sprite(posX, posY, 'head', 1);
//     createSnake();
//     cursors = this.input.keyboard.createCursorKeys();
// }
//
// function update() {
//     getDirection()
//     move();
// }

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