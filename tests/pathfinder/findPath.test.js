const findPath = require("../../matrix/pathfinder/findPath");

const map1 = require("../inputs/valid/map-01");
const map2 = require("../inputs/valid/map-02");
const map3 = require("../inputs/valid/map-03");
const map4 = require("../inputs/valid/map-04");
const map5 = require("../inputs/valid/map-05");
const map6 = require("../inputs/valid/map-06");


describe("Find path returns false for invalid map input - ",()  =>{
    test("no input", ()=>{
        expect(findPath()).toBe(false);
    });

    test("empty array", ()=>{
        expect(findPath([])).toBe(false);
    });
});


describe("Find path returns path for valid map",()  =>{
    test("basic example", ()=>{
        expect(findPath(map1)).toEqual("@---A---+|C|+---+|+-B-x");
    });

    test("with intersections", ()=>{
        expect(findPath(map2)).toEqual("@|A+---B--+|+--C-+|-||+---D--+|x");
    });

    test("with letters on turns", ()=>{
        expect(findPath(map3)).toEqual("@---A---+|||C---+|+-B-x");
    });

    test("with letters on intersections", ()=>{
        expect(findPath(map4)).toEqual("@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x");
    });

    test("with compact space", ()=>{
        expect(findPath(map5)).toEqual("@B+++B|+-L-+A+++A-+Hx");
    });

    test("with stuff after x", ()=>{
        expect(findPath(map6)).toEqual("@-A--+|+-B--x");
    });
});