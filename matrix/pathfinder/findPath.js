const findStart = require('../utils/findStart');
const lookAround = require('../utils/lookAround');
const getNewPosition = require('../utils/getNewPosition');
const validators = require('../validators/characterValidators');


/**
 * @param matrix  2-dim jagged array
 * @returns {{path: *, letters: *}}
 */
const findPath = (matrix) => {

    if (!matrix || matrix.length === 0) return false;
    let letters, path = "@";

    // FIND START
    const start = findStart(matrix);
    if (!start) return false;

    // INIT PATH
    let currPosition = start;
    let currCharacter = "@";
    let direction = null;
    let insideLoop = false;


    // LOOK AROUND
    let directions = lookAround(matrix, start);

    // is not valid start - exit
    if (directions.length !== 1) {
        return false
    }

    direction = directions[0];

    // while tile ! == 'x'
    // white last char in path is != x
    /// TAKE STEP
    while (currCharacter !== "x")
    {

        // MOVE AND UPDATE PATH
        currPosition = getNewPosition(currPosition, direction);
        currCharacter = matrix[currPosition.m][currPosition.n];

        if (validators.isValidCharacter(currCharacter)) {
            path += currCharacter;

            if (validators.isLetter(currCharacter)){
                letters += currCharacter;
            }
        } else {
            return false;
        }


        // DETERMINE NEW DIRECTION
        directions = lookAround(matrix, currPosition);

        // ENTER LOOP
        // if isIntersection
        if (directions.length === 4) {
            insideLoop = !insideLoop;
        }

        // TURN
        // if keeping direction is not possible and char is a valid turn
        // or if inside a loop and char is a hard turn (EXIT LOOP)
        if ((!directions.includes(direction) && validators.isValidTurn(currCharacter))
        || (insideLoop && currCharacter==="+")
        ) {

            if ( ["RIGHT", "LEFT"].includes(direction)) {
                direction = directions.includes("UP") ? "UP" : "DOWN"
            } else {
                direction = directions.includes("LEFT") ? "LEFT" : "RIGHT"
            }
        }
    }

    return path;

};

module.exports = findPath;
