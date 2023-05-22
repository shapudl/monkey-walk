const findCharacter = require('../utils/findCharacter');
const getSurroundingDirections = require('../utils/getSurroundingDirections');
const preprocessMatrix = require('../utils/preprocessMatrix');
const getNewPosition = require('../utils/getNewPosition');
const validators = require('../validators/characterValidators');

const horizontalOrientation = ["RIGHT", "LEFT"];
const verticalOrientation = ["UP", "DOWN"];

class PathFinder {
    findStart(){
        return findCharacter(this.matrix, "@");
    }

    constructor(matrix) {
        this.matrix = matrix;
        this.letters = "";
        this.path = "@";

        const {
            startCharacterCount,
            endCharacterCount,
        } = preprocessMatrix(matrix);

        this.startCharacterCount = startCharacterCount;
        this.endCharacterCount = endCharacterCount;

        this.start = this.findStart(matrix);
        this.currPosition = this.start;
        this.currCharacter = "@";
        this.direction = null;
        this.surroundingDirections = null;
        this.intersection = false;
        this.insideLoop = false;
    }

    updateSurroundingDirections(){
        this.surroundingDirections = getSurroundingDirections(this.matrix, this.currPosition);
    }

    setInitialDirection(){
        this.updateSurroundingDirections();

        if (this.surroundingDirections.length > 1) throw new Error("Error: Multiple starting paths");

        this.direction = this.surroundingDirections[0];

        return true;
    }

    isEndOfPath(){
        return this.currCharacter === "x";
    }

    isStartOfPath(){
        return this.currCharacter === "@";
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
            throw new Error("Error: Invalid character");
        }
    }

    updateLetters(){
        /** Letters on intersections should be recorded only once */
        if (validators.isUppercaseLetter(this.currCharacter)
            && !this.isEndOfPath())
        {
            if (this.insideLoop || (!this.insideLoop && !this.intersection)) {
                this.letters += this.currCharacter;
            }
        }
    }

    updateIntersection() {
        this.intersection = this.surroundingDirections.length === 4;
        /** toggle insideLoop when encountering an intersection */
        this.insideLoop = this.intersection ? !this.insideLoop : this.insideLoop;
    }

    checkFork(){
        const currentOrientation = horizontalOrientation.includes(this.direction) ? horizontalOrientation : verticalOrientation;
        const oppositeOrientation = currentOrientation === horizontalOrientation ? verticalOrientation : horizontalOrientation;

        /** If both turning directions are available it's a fork in path */
        if (oppositeOrientation.every(dir => this.surroundingDirections.includes(dir))){
            throw new Error("Error: Fork in path");
        }
    }

    checkFakeTurn(){
        const currentOrientation = horizontalOrientation.includes(this.direction) ? horizontalOrientation : verticalOrientation;
        const oppositeOrientation = currentOrientation === horizontalOrientation ? verticalOrientation : horizontalOrientation;

        /** If none of the turning directions are available it's a fake turn */
        if (!oppositeOrientation.some(dir => this.surroundingDirections.includes(dir))){
            throw new Error("Error: Fake turn");
        }
    }

    updateDirection() {
        this.updateSurroundingDirections();
        this.updateIntersection();

        if (this.surroundingDirections.length === 1 && !this.isEndOfPath() && !this.isStartOfPath()) {
            throw new Error("Error: Broken path");
        }

        if (this.currCharacter === "+") {
            this.checkFork();
            this.checkFakeTurn();
        }

        if (this.shouldChangeDirection()) {
            this.turn();
        }
    }

    shouldChangeDirection() {
        return (
            (!this.surroundingDirections.includes(this.direction) && validators.isValidTurn(this.currCharacter)) ||
            (this.insideLoop && this.currCharacter === "+")
        );
    }

    turn() {
        const isHorizontal = horizontalOrientation.includes(this.direction);

        if (isHorizontal) {
            this.direction = this.surroundingDirections.includes("UP") ? "UP" : "DOWN";
        } else {
            this.direction = this.surroundingDirections.includes("LEFT") ? "LEFT" : "RIGHT";
        }
    }

    initPath(){
        if (this.startCharacterCount === 0) {
            throw new Error("Error: Missing start character");
        }

        if (this.endCharacterCount === 0) {
            throw new Error("Error: Missing end character");
        }

        if (this.endCharacterCount > 1) {
            throw new Error("Error: Multiple ends");
        }

        if (this.startCharacterCount > 1) {
            throw new Error("Error: Multiple starts");
        }
    }

    findPath() {
        this.initPath();
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