/**
 * @param matrix  2-dim jagged array
 * @returns {{path: *, letters: *}}
 */
const findStart = (matrix) => {

    let start = {
        m: null, n: null
    };

    console.log(matrix.length);

    for (let m = 0; m < matrix.length; m++) {
        for (let n=0; n < matrix[m].length; n++) {

            if (matrix[m][n] === '@') {
                start = {
                    m: m,
                    n: n
                }
            }

        }
    }


    return start;
};

module.exports = findStart;
