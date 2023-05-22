/**
 * @param matrix
 * @param character
 * @return {boolean|{m: number, n: number}}
 */

const findCharacter = (matrix, character) => {
    if (!matrix || !matrix.length) throw new Error("Error: Invalid input");

    for (let m = 0; m < matrix.length; m++) {
        for (let n=0; n < matrix[m].length; n++) {

            if (matrix[m][n] === character) {
                return  {
                    m: m,
                    n: n
                }
            }
        }
    }

    return false;
};

module.exports = findCharacter;
