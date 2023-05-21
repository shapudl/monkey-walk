const { isLetter } = require("../../matrix/validators/characterValidators");

describe("Return true for",()  =>{

    test("uppercase letter A", ()=>{
        expect(isLetter("A")).toBe(true);
    });

    test("lowercase letter g", ()=>{
        expect(isLetter("g")).toBe(true);
    });

});

describe("Return false for",()  => {
    test("no character", () => {
        expect(isLetter("")).toBe(false);
    });

    test("space", ()=>{
        expect(isLetter(" ")).toBe(false);
    });

    test("|", ()=>{
        expect(isLetter("|")).toBe(false);
    });

    test("-", ()=>{
        expect(isLetter("-")).toBe(false);
    });

    test("!", ()=>{
        expect(isLetter("!")).toBe(false);
    });

    test("}", ()=>{
        expect(isLetter("}")).toBe(false);
    });

    test("5", ()=>{
        expect(isLetter("5")).toBe(false);
    });
});