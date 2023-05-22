const { isValidTurn } = require("../../matrix/validators/characterValidators");

describe("Return true for valid turn character: ",()  =>{

    test("+", ()=>{
        expect(isValidTurn("+")).toBe(true);
    });

    test("uppercase letter A", ()=>{
        expect(isValidTurn("A")).toBe(true);
    });
});

describe("Return false for invalid turn character: ",()  => {
    test("no character", () => {
        expect(isValidTurn("")).toBe(false);
    });

    test("space", ()=>{
        expect(isValidTurn(" ")).toBe(false);
    });

    test("lowercase letter g", ()=>{
        expect(isValidTurn("g")).toBe(false);
    });

    test("|", ()=>{
        expect(isValidTurn("|")).toBe(false);
    });

    test("-", ()=>{
        expect(isValidTurn("-")).toBe(false);
    });

    test("!", ()=>{
        expect(isValidTurn("!")).toBe(false);
    });

    test("}", ()=>{
        expect(isValidTurn("}")).toBe(false);
    });

    test("5", ()=>{
        expect(isValidTurn("5")).toBe(false);
    });
});