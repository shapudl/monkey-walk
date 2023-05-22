const preprocessMatrix = (matrix) => {
    let startCharacterCount = 0;
    let endCharacterCount = 0;
    let startPosition;

    if (!matrix || !matrix.length) throw new Error("Error: Invalid input");

    for (let m = 0; m < matrix.length; m++) {
        for (let n = 0; n < matrix[m].length; n++) {
            const character = matrix[m][n];

            if (character === '@') {
                startPosition = {
                    m: m,
                    n: n
                };
                startCharacterCount++;
            } else if (character === 'x') {
                endCharacterCount++;
            }
        }
    }

    return {
        startCharacterCount,
        endCharacterCount,
        startPosition,
    };
};

module.exports = preprocessMatrix;