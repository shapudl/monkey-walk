const findStart = require("./findStart");

const map = require("../test-maps/valid/map-01");


describe("Find start returns @ coordinates ",()  =>{
    test("", ()=>{
        expect(findStart(map)).toEqual({
            m: 0,
            n: 0
        });
    });

});