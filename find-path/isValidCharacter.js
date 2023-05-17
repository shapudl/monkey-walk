const isValidCharacter = (character) => {
    const validPattern = /^[A-Za-z+|\-@x]$/;

    return validPattern.test(character);
};

module.exports = isValidCharacter;