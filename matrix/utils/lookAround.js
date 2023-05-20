/**
 * @param matrix
 * @param m
 * @param n
 * @return Array || {boolean}
 */
const lookAround = (matrix, { m , n }) => {

    let directions = [];

    // UP
        if ( matrix[m-1] && matrix[m-1][n] && matrix[m-1][n] !== "" ) {
            directions.push("UP");
        }

    // DOWN
        if ( matrix[m+1] && matrix[m+1][n] && matrix[m+1][n] !== "" ) {
            directions.push("DOWN");
        }

    // LEFT
        if ( matrix[m][n-1] && matrix[m][n-1] !== "" ) {
            directions.push("LEFT");
        }

    // RIGHT
        if ( matrix[m][n+1] && matrix[m][n+1] !== "" ) {
            directions.push("RIGHT");
        }

    return directions;
};

module.exports = lookAround;
