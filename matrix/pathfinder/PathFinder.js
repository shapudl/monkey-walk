const findCharacter = require('../utils/findCharacter');
const getSurroundingDirections = require('../utils/getSurroundingDirections');
const preprocessMatrix = require('../utils/preprocessMatrix');
const getNewPosition = require('../utils/getNewPosition');
const validators = require('../validators/characterValidators');

const HORIZONTAL_ORIENTATION = ["RIGHT", "LEFT"];
const VERTICAL_ORIENTATION = ["UP", "DOWN"];
const START = "@";
const END = "x";
const TURN = "+";

class PathFinder {

    constructor(matrix) {
        this.matrix = matrix;
        this.letters = "";
        this.path = START;

        const {
            startCharacterCount,
            endCharacterCount,
        } = preprocessMatrix(matrix);

        this.startCharacterCount = startCharacterCount;
        this.endCharacterCount = endCharacterCount;

        this.start = findCharacter(this.matrix, START);
        this.currPosition = this.start;
        this.currCharacter = START;
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
        return this.currCharacter === END;
    }

    isStartOfPath(){
        return this.currCharacter === START;
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
        const currentOrientation = HORIZONTAL_ORIENTATION.includes(this.direction) ? HORIZONTAL_ORIENTATION : VERTICAL_ORIENTATION;
        const oppositeOrientation = currentOrientation === HORIZONTAL_ORIENTATION ? VERTICAL_ORIENTATION : HORIZONTAL_ORIENTATION;

        /** If both turning directions are available it's a fork in the path */
        if (oppositeOrientation.every(dir => this.surroundingDirections.includes(dir))){
            throw new Error("Error: Fork in path");
        }
    }

    checkFakeTurn(){
        const currentOrientation = HORIZONTAL_ORIENTATION.includes(this.direction) ? HORIZONTAL_ORIENTATION : VERTICAL_ORIENTATION;
        const oppositeOrientation = currentOrientation === HORIZONTAL_ORIENTATION ? VERTICAL_ORIENTATION : HORIZONTAL_ORIENTATION;

        /** If none of the turning directions are available it's a fake turn */
        if (!oppositeOrientation.some(dir => this.surroundingDirections.includes(dir))){
            throw new Error("Error: Fake turn");
        }
    }

    adjustDirection() {
        this.updateSurroundingDirections();
        this.updateIntersection();

        if (this.surroundingDirections.length === 1 && !this.isEndOfPath() && !this.isStartOfPath()) {
            throw new Error("Error: Broken path");
        }

        if (this.currCharacter === TURN) {
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
            (this.insideLoop && this.currCharacter === TURN)
        );
    }

    turn() {
        const isHorizontal = HORIZONTAL_ORIENTATION.includes(this.direction);

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
            this.adjustDirection();
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