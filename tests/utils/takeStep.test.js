const takeStep = require("../../matrix/utils/takeStep");

describe("Find new position when going",()  =>{


    test("right", ()=>{
        expect(takeStep({m:0, n:0}, "RIGHT")).toEqual(
            {
                m: 0,
                n: 1
            }
        );
    });

    test("down", ()=>{
        expect(takeStep({m:2, n:2}, "DOWN")).toEqual(
            {
                m: 3,
                n: 2
            }
        );
    });

    test("up", ()=>{
        expect(takeStep({m:3, n:2}, "UP")).toEqual(
            {
                m: 2,
                n: 2
            }
        );
    });

    test("left", ()=>{
        expect(takeStep({m:1, n:4}, "LEFT")).toEqual(
            {
                m: 1,
                n: 3
            }
        );
    });

});