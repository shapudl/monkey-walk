const getNewPosition = ({m, n}, direction) => {
    let newPosition;

    if (direction === "UP") {
        newPosition = {
            m: m-1,
            n: n
        }
    } else if ( direction === "DOWN") {
        newPosition = {
            m: m+1,
            n: n
        }
    } else if ( direction === "RIGHT") {
        newPosition = {
            m: m,
            n: n+1
        }
    } else if ( direction === "LEFT") {
        newPosition = {
            m: m,
            n: n-1
        }
    } else {
        throw new Error("Invalid direction: " + direction);
    }

    return newPosition
};

module.exports = getNewPosition;