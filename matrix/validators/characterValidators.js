const isValidCharacter = (character) => {
    const validPattern = /^[A-Z+|\-@x]$/;
    return validPattern.test(character);
};

const isValidTurn = (character) => {
    const validPattern = /^[A-Z+]$/;
    return validPattern.test(character);
};

const isUppercaseLetter = (character) =>  {
    return /^[A-Z]$/.test(character);
};

module.exports = {
    isValidTurn,
    isValidCharacter,
    isUppercaseLetter
};
