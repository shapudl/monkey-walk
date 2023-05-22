const preprocessMatrix = require("../../matrix/utils/preprocessMatrix");

const map1 = require("../inputs/valid/map-01");
const map4 = require("../inputs/valid/map-04");
const invalidMap1 = require("../inputs/invalid/map-01");
const invalidMap3 = require("../inputs/invalid/map-03");
const invalidMap5 = require("../inputs/invalid/map-05");


describe("Preprocess matrix",()  =>{
    test("when @ is the first in array", ()=>{
        expect(preprocessMatrix(map1, "@")).toEqual(
            {
                startCharacterCount: 1,
                endCharacterCount: 1,
                startPosition: {
                    m: 0,
                    n: 0
                }
            });
    });

    test("when @ it not the first in array", ()=>{
        expect(preprocessMatrix(map4)).toEqual({
            startCharacterCount: 1,
            endCharacterCount: 1,
            startPosition: {
                m: 3,
                n: 0
            }
        });
    });

    test("with multiple start characters", ()=>{
        expect(preprocessMatrix(invalidMap3)).toEqual({
            startCharacterCount: 2,
            endCharacterCount: 1,
            startPosition: {
                m: 0,
                n: 6
            }
        });
    });

    test("with multiple x characters", ()=>{
        expect(preprocessMatrix(invalidMap5)).toEqual({
            startCharacterCount: 1,
            endCharacterCount: 2,
            startPosition: {
                m: 0,
                n: 0
            }
        });
    });

    test("with no start character", ()=>{
        expect(preprocessMatrix(invalidMap1)).toEqual({
            startCharacterCount: 0,
            endCharacterCount: 1,
            startPosition: undefined
        });
    });
});