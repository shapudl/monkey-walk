const findCharacter = require("../../matrix/utils/findCharacter");

const map1 = require("../inputs/valid/map-01");
const map4 = require("../inputs/valid/map-04");
const map5 = require("../inputs/valid/map-05");


describe("Find character",()  =>{
    test("@ when it's first in array", ()=>{
        expect(findCharacter(map1, "@")).toEqual({
            m: 0,
            n: 0
        });
    });

    test("@ when it's not first in array", ()=>{
        expect(findCharacter(map4, "@")).toEqual({
            m: 3,
            n: 0
        });
    });
});