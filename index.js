/**
 * @param matrix  2-dim jagged array
 * @returns {{path: *, letters: *}}
 */
const findPath = (matrix) => {

    if (!matrix || matrix.length === 0) return false;
    let letters, path;

    return {
        letters: letters,
        path: path
    };
};

module.exports = findPath;
