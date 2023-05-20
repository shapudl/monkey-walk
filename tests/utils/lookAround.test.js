const lookAround = require("../../matrix/utils/lookAround");

const map1 = require("../inputs/valid/map-01");
const map4 = require("../inputs/valid/map-04");
const map5 = require("../inputs/valid/map-05");


describe("Available directions relative to current position are ",()  =>{


    test("for map 1", ()=>{
        expect(lookAround(map1, {m:0, n:0})).toEqual(
            ["RIGHT"]
            );
    });

    test("for map 4", ()=>{
        expect(lookAround(map4, {m:3, n:0})).toEqual(
            ["RIGHT"]
        );
    });

    test("for map 5", ()=>{
        expect(lookAround(map5, {m:2, n:1})).toEqual(
            ["UP","DOWN","LEFT","RIGHT"]
        );
    });

    test("for map 5 - start ", ()=>{
        expect(lookAround(map5, {m:2, n:0})).toEqual(
            ["RIGHT"]
        );
    });

});