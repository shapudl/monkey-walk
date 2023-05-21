const findCharacter = require('../utils/findCharacter');
const getSurroundingDirections = require('../utils/getSurroundingDirections');
const getNewPosition = require('../utils/getNewPosition');
const validators = require('../validators/characterValidators');


class PathFinder {

    findStart(){
        return findCharacter(this.matrix, "@");
    }

    constructor(matrix) {
        this.matrix = matrix;

        this.letters = "";
        this.path = "@";

        this.start = this.findStart(matrix);
        this.currPosition = this.start;
        this.currCharacter = "@";
        this.direction = null;
        this.insideLoop = false;
    }

    canStart(){

        if (!this.start) return false;
        return true;
    }

    setInitialDirection(){

        let directions = getSurroundingDirections(this.matrix, this.start);

        if (directions.length !== 1) return false;

        this.direction = directions[0];

        return true;

    }

    isEndOfPath(){
        return this.currCharacter === "x";
    }


    takeStep() {
        // walking
        this.updateCurrentPosition();
        this.updateCurrentCharacter();

        // saving path and letters
        this.updatePath();
        this.updateLetters();

    }

    updateCurrentPosition(){

        this.currPosition = getNewPosition(this.currPosition, this.direction);

    }

    updateCurrentCharacter(){

        this.currCharacter = this.matrix[this.currPosition.m][this.currPosition.n];

    }

    updatePath(){
        // update path
        if (validators.isValidCharacter(this.currCharacter)) {
            this.path += this.currCharacter;

        } else {
            return false;
        }
    }

    updateLetters(){
        /** @todo handle loop */
        if (validators.isLetter(this.currCharacter) && !this.isEndOfPath()) {
            this.letters += this.currCharacter;
        }
    }

    determineDirection() {

        let directions = getSurroundingDirections(this.matrix, this.currPosition);

        if (directions.length === 4) {
            this.insideLoop = !this.insideLoop;
        }

        if (
            (!directions.includes(this.direction) && validators.isValidTurn(this.currCharacter)) ||
            (this.insideLoop && this.currCharacter === "+")
        ) {
            this.turn();
        }
    }

    turn() {
        if (["RIGHT", "LEFT"].includes(this.direction)) {
            this.direction = getSurroundingDirections(this.matrix, this.currPosition).includes("UP") ? "UP" : "DOWN";
        } else {
            this.direction = getSurroundingDirections(this.matrix, this.currPosition).includes("LEFT") ? "LEFT" : "RIGHT";
        }
    }

    findPath() {

        if (this.canStart()) {
            this.setInitialDirection();
        } else {
            return false;
        }

        while (!this.isEndOfPath()) {

            this.takeStep();
            this.determineDirection();
        }

        return this.path;

        return {
            letters: this.letters,
            path: this.path
        };
    }

}

module.exports = PathFinder;