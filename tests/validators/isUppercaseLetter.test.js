const { isUppercaseLetter } = require("../../matrix/validators/characterValidators");

describe("Return true for",()  =>{
    test("uppercase letter A", ()=>{
        expect(isUppercaseLetter("A")).toBe(true);
    });

});

describe("Return false for",()  => {
    test("no character", () => {
        expect(isUppercaseLetter("")).toBe(false);
    });

    test("space", ()=>{
        expect(isUppercaseLetter(" ")).toBe(false);
    });

    test("lowercase letter g", ()=>{
        expect(isUppercaseLetter("g")).toBe(false);
    });

    test("|", ()=>{
        expect(isUppercaseLetter("|")).toBe(false);
    });

    test("-", ()=>{
        expect(isUppercaseLetter("-")).toBe(false);
    });

    test("!", ()=>{
        expect(isUppercaseLetter("!")).toBe(false);
    });

    test("}", ()=>{
        expect(isUppercaseLetter("}")).toBe(false);
    });

    test("5", ()=>{
        expect(isUppercaseLetter("5")).toBe(false);
    });
});