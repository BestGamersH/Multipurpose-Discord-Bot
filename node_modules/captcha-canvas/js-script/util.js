"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomCoordinate = exports.randomText = exports.getRandom = void 0;
const crypto_1 = require("crypto");
function getRandom(start = 0, end = 0) {
    return Math.round(Math.random() * Math.abs(end - start)) + Math.min(start, end);
}
exports.getRandom = getRandom;
function randomText(characters) {
    return (0, crypto_1.randomBytes)(characters).toString('hex').toUpperCase().substr(0, characters);
}
exports.randomText = randomText;
function getRandomCoordinate(height, width, size) {
    let coordinates = [];
    for (let i = 0; i < size; i++) {
        const widthGap = Math.floor(width / size);
        const coordinate = [];
        const randomWidth = widthGap * (i + 0.2);
        coordinate.push(randomWidth);
        const randomHeight = getRandom(30, height - 30);
        coordinate.push(randomHeight);
        coordinates.push(coordinate);
    }
    coordinates = coordinates.sort((a, b) => a[0] - b[0]);
    return coordinates;
}
exports.getRandomCoordinate = getRandomCoordinate;
