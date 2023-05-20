const { isValidCharacter } = require("../../matrix/validators/characterValidators");

describe("Return true for valid map characters:  ",()  => {

    test("Start character @", () => {
        expect(isValidCharacter("@")).toBe(true);
    });

    test("End character x", () => {
        expect(isValidCharacter("x")).toBe(true);
    });

    test("Turn character +", () => {
        expect(isValidCharacter("+")).toBe(true);
    });

    test("Path character |", () => {
        expect(isValidCharacter("|")).toBe(true);
    });

    test("Path character -", () => {
        expect(isValidCharacter("-")).toBe(true);
    });

    test("Uppercase letter A", () => {
        expect(isValidCharacter("A")).toBe(true);
    });

    test("Lowercase letter g", () => {
        expect(isValidCharacter("g")).toBe(true);
    });

});

describe("Return false for invalid map characters:",()  =>{

    test("!", ()=>{
        expect(isValidCharacter("!")).toBe(false);
    });

    test("Space", ()=>{
        expect(isValidCharacter(" ")).toBe(false);
    });

    test("}", ()=>{
        expect(isValidCharacter("}")).toBe(false);
    });

    test("5", ()=>{
        expect(isValidCharacter("5")).toBe(false);
    });

    test("#", ()=>{
        expect(isValidCharacter("#")).toBe(false);
    });

    test("no character", () => {
        expect(isValidCharacter("")).toBe(false);
    });

    test("gA", () => {
        expect(isValidCharacter("gA")).toBe(false);
    });

});