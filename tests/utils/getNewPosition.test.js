const getNewPosition = require("../../matrix/utils/getNewPosition");

describe("Find new position when going",()  =>{
    test("right", ()=>{
        expect(getNewPosition({m:0, n:0}, "RIGHT")).toEqual(
            {
                m: 0,
                n: 1
            }
        );
    });

    test("down", ()=>{
        expect(getNewPosition({m:2, n:2}, "DOWN")).toEqual(
            {
                m: 3,
                n: 2
            }
        );
    });

    test("up", ()=>{
        expect(getNewPosition({m:3, n:2}, "UP")).toEqual(
            {
                m: 2,
                n: 2
            }
        );
    });

    test("left", ()=>{
        expect(getNewPosition({m:1, n:4}, "LEFT")).toEqual(
            {
                m: 1,
                n: 3
            }
        );
    });
    
});

describe("Throws error for", () => {
    test("invalid direction", () => {
        expect(() => {
            getNewPosition({ m: 0, n: 0 }, "INVALID_DIRECTION");
        }).toThrow("Invalid direction: INVALID_DIRECTION");
    });

    test("going UP when in first row", ()=>{
        expect(() => {
            getNewPosition({ m: 0, n: 5 }, "UP");
        }).toThrow("Going over the edge");
    });

    test("going LEFT when in first column", ()=>{
        expect(() => {
            getNewPosition({ m: 2, n: 0 }, "LEFT");
        }).toThrow("Going over the edge");
    });
});
