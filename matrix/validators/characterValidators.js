const isValidCharacter = (character) => {
    const validPattern = /^[A-Za-z+|\-@x]$/;
    return validPattern.test(character);
};

const isValidTurn = (character) => {

    const validPattern = /^[A-Za-z+]$/;

    return validPattern.test(character);
};

const isLetter = (character) =>  {
    return /^[A-Za-z+|\-@x]$/.test(character);
};

module.exports = {
    isValidTurn,
    isValidCharacter,
    isLetter
};
