const findPath = require("./index");


describe("Find path returns false for invalid map input - ",()  =>{
    test("no input", ()=>{
        expect(findPath()).toBe(false);
    });

    test("empty array", ()=>{
        expect(findPath([])).toBe(false);
    });
});