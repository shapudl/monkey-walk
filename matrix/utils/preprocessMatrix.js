const validators = require("../validators/characterValidators");

const preprocessMatrix = (matrix) => {
    let totalCharacterCount = 0;
    let startCharacterCount = 0;
    let endCharacterCount = 0;
    let invalidCharacterCount = 0;

    if (!matrix || !matrix.length) return false;

    for (let m = 0; m < matrix.length; m++) {
        for (let n = 0; n < matrix[m].length; n++) {
            const character = matrix[m][n];
            totalCharacterCount++;

            if (character === '@') {
                startCharacterCount++;
            } else if (character === 'x') {
                endCharacterCount++;
            } else if (!validators.isValidCharacter(character)) {
                invalidCharacterCount++;
            }
        }
    }

    return {
        totalCharacterCount,
        startCharacterCount,
        endCharacterCount,
        invalidCharacterCount,
    };
};

module.exports = preprocessMatrix;