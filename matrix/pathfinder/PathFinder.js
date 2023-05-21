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
        this.intersection = false;
        this.insideLoop = false;
    }

    canStart(){
        return this.start;
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

    advancePosition() {
        this.updateCurrentPosition();
        this.updateCurrentCharacter();
    }

    updateCurrentPosition(){
        this.currPosition = getNewPosition(this.currPosition, this.direction);
    }

    updateCurrentCharacter(){
        this.currCharacter = this.matrix[this.currPosition.m][this.currPosition.n];
    }

    updatePath(){
        if (validators.isValidCharacter(this.currCharacter)) {
            this.path += this.currCharacter;
        } else {
            return false;
        }
    }

    updateLetters(){
        /** Letters on intersections should be recorded only once */
        if (validators.isLetter(this.currCharacter)
            && !this.isEndOfPath())
        {
            if (this.insideLoop || (!this.insideLoop && !this.intersection)) {
                this.letters += this.currCharacter;
            }
        }
    }

    updateIntersection(directions) {
        if (directions.length === 4) {

            this.insideLoop = !this.insideLoop;
            this.intersection = true;

        } else {
            this.intersection = false;
        }
    }

    updateDirection() {
        let directions = getSurroundingDirections(this.matrix, this.currPosition);

        this.updateIntersection(directions);

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
        if (!this.canStart()) {
            return false;
        }

        this.setInitialDirection();

        while (!this.isEndOfPath()) {
            this.advancePosition();
            this.updateDirection();

            this.updatePath();
            this.updateLetters();
        }

        return {
            letters: this.letters,
            path: this.path
        };
    }
}

module.exports = PathFinder;