const findStart = require("../../matrix/utils/findStart");

const map1 = require("../inputs/valid/map-01");
const map4 = require("../inputs/valid/map-04");
const map5 = require("../inputs/valid/map-05");


describe("Find start returns @ coordinates",()  =>{
    test("for map 1", ()=>{
        expect(findStart(map1)).toEqual({
            m: 0,
            n: 0
        });
    });

    test("for map 4", ()=>{
        expect(findStart(map4)).toEqual({
            m: 3,
            n: 0
        });
    });

    test("for map 5", ()=>{
        expect(findStart(map5)).toEqual({
            m: 2,
            n: 0
        });
    });
});