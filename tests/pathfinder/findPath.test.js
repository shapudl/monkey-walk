const PathFinder = require('../../matrix/pathfinder/PathFinder');

const map1 = require("../inputs/valid/map-01");
const map2 = require("../inputs/valid/map-02");
const map3 = require("../inputs/valid/map-03");
const map4 = require("../inputs/valid/map-04");
const map5 = require("../inputs/valid/map-05");
const map6 = require("../inputs/valid/map-06");
const map7 = require("../inputs/valid/map-07");

const invalidMap1 = require("../inputs/invalid/map-01");
const invalidMap2 = require("../inputs/invalid/map-02");
const invalidMap3 = require("../inputs/invalid/map-03");
const invalidMap4 = require("../inputs/invalid/map-04");
// const invalidMap5 = require("../inputs/invalid/map-05");
const invalidMap6 = require("../inputs/invalid/map-06");
const invalidMap7 = require("../inputs/invalid/map-07");
const invalidMap8 = require("../inputs/invalid/map-08");
const invalidMap9 = require("../inputs/invalid/map-09");

describe("Find path returns false for invalid map input - ",()  =>{
    test("no input", ()=>{
        const pathFinder = new PathFinder();
        expect(pathFinder.findPath()).toBe(false);

    });

    test("empty array", ()=>{
        const pathFinder = new PathFinder([]);
        expect(pathFinder.findPath([])).toBe(false);
    });
});

describe("Find path returns path for valid map",()  =>{
    test("basic example", ()=>{
        const pathFinder = new PathFinder(map1);

        expect(pathFinder.findPath()).toEqual(
            {
                letters: "ACB",
                path: "@---A---+|C|+---+|+-B-x"
            });
    });

    test("with intersections", ()=>{
        const pathFinder = new PathFinder(map2);
        expect(pathFinder.findPath()).toEqual({
            letters: "ABCD",
            path: "@|A+---B--+|+--C-+|-||+---D--+|x"
        });
    });

    test("with letters on turns", ()=>{
        const pathFinder = new PathFinder(map3);
        expect(pathFinder.findPath()).toEqual({
            letters: "ACB",
            path: "@---A---+|||C---+|+-B-x"
        });
    });

    test("with letters on intersections", ()=>{
        const pathFinder = new PathFinder(map4);
        expect(pathFinder.findPath()).toEqual(
            {
                letters: "GOONIES",
                path: "@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x"
            });
    });

    test("with letters on intersections and inside a loop", ()=>{
        const pathFinder = new PathFinder(map7);
        expect(pathFinder.findPath()).toEqual(
            {
                letters: "GOyONIES",
                path: "@-G-O-+|+-+yO||+-O-N-+|I|+-+|+-I-+|ES|x"
            });
    });

    test("with compact space", ()=>{
        const pathFinder = new PathFinder(map5);
        expect(pathFinder.findPath()).toEqual(
            {
                letters: "BLAH",
                path: "@B+++B|+-L-+A+++A-+Hx"
            });
    });

    test("with stuff after x", ()=>{
        const pathFinder = new PathFinder(map6);
        expect(pathFinder.findPath()).toEqual(
            {
                letters: "AB",
                path: "@-A--+|+-B--x"
            });
    });
});

describe("Find path throws error for",()  =>{
    test("missing start character", ()=>{
        const pathFinder = new PathFinder(invalidMap1);
        expect(pathFinder.findPath()).toThrow("Error");
    });

    test("missing end character", ()=>{
        const pathFinder = new PathFinder(invalidMap2);
        expect(pathFinder.findPath()).toThrow("Error");
    });

    test("multiple starts", ()=>{
        const pathFinder = new PathFinder(invalidMap3);
        expect(pathFinder.findPath()).toThrow("Error");
    });

    test("multiple starts", ()=>{
        const pathFinder = new PathFinder(invalidMap4);
        expect(pathFinder.findPath()).toThrow("Error");
    });

    // test("multiple starts", ()=>{
    //     const pathFinder = new PathFinder(invalidMap5);
    //     expect(pathFinder.findPath()).toThrow("Error");
    // });

    test("fork in path", ()=>{
        const pathFinder = new PathFinder(invalidMap6);
        expect(pathFinder.findPath()).toThrow("Error");
    });

    test("broken path", ()=>{
        const pathFinder = new PathFinder(invalidMap7);
        expect(pathFinder.findPath()).toThrow("Error");
    });

    test("multiple starting paths", ()=>{
        const pathFinder = new PathFinder(invalidMap8);
        expect(pathFinder.findPath()).toThrow("Error");
    });

    test("fake turn", ()=>{
        const pathFinder = new PathFinder(invalidMap9);
        expect(pathFinder.findPath()).toThrow("Error");
    });

    test("path that is a loop", ()=>{

    });

    test("impossible compact intersection", ()=>{

    });
});