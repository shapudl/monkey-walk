const isValidTurn = (character) => {

    const validPattern = /^[A-Za-z+]$/;

    return validPattern.test(character);
};

module.exports = isValidTurn;