
const takeStep = ({m, n}, direction) => {

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
    }

    return newPosition;

};


module.exports = takeStep;