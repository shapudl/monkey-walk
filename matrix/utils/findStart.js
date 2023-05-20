/**
 * @param matrix  2-dim jagged array
 *
 * @return { m : int, n : int } || false
 */
const findStart = (matrix) => {

    for (let m = 0; m < matrix.length; m++) {
        for (let n=0; n < matrix[m].length; n++) {

            if (matrix[m][n] === '@') {
                return  {
                    m: m,
                    n: n
                }
            }
        }
    }

    return false;
};

module.exports = findStart;
