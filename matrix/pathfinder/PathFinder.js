const findCharacter = require('../utils/findCharacter');
const getSurroundingDirections = require('../utils/getSurroundingDirections');
const preprocessMatrix = require('../utils/preprocessMatrix');
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

    canStart(){
        return this.start;
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

    updateDirection() {

        this.updateSurroundingDirections();
        this.updateIntersection();


        if (this.surroundingDirections.length === 1 && !this.isEndOfPath() && !this.isStartOfPath()) {
            throw new Error("Error: Broken path");
        }

        if (this.currCharacter === "+") {

            if (["RIGHT", "LEFT"].includes(this.direction)) {
                if (this.surroundingDirections.includes("UP") &&  this.surroundingDirections.includes("DOWN")) {
                    throw new Error("Error: Fork in path");
                }

                if (!this.surroundingDirections.includes("UP") &&  !this.surroundingDirections.includes("DOWN")) {
                    throw new Error("Error: Fake turn");
                }

            } else {
                if (this.surroundingDirections.includes("LEFT") &&  this.surroundingDirections.includes("RIGHT")) {
                    throw new Error("Error: Fork in path");
                }

                if (!this.surroundingDirections.includes("LEFT") &&  !this.surroundingDirections.includes("RIGHT")) {
                    throw new Error("Error: Fake turn");
                }
            }
        }

        if (this.shouldChangeDirection()) {
            this.turn();
        }
    }


    shouldChangeDirection(){
        return (
            (!this.surroundingDirections.includes(this.direction) && validators.isValidTurn(this.currCharacter)) ||
            (this.insideLoop && this.currCharacter === "+")
        )
    }

    turn() {
        if (["RIGHT", "LEFT"].includes(this.direction)) {
            this.direction = this.surroundingDirections.includes("UP") ? "UP" : "DOWN";
        } else {
            this.direction = this.surroundingDirections.includes("LEFT") ? "LEFT" : "RIGHT";
        }
    }

    findPath() {
        if (!this.canStart()) {
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