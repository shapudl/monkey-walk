const PathFinder = require('../../matrix/pathfinder/PathFinder');

const map1 = require("../inputs/valid/map-01");
const map2 = require("../inputs/valid/map-02");
const map3 = require("../inputs/valid/map-03");
const map4 = require("../inputs/valid/map-04");
const map5 = require("../inputs/valid/map-05");
const map6 = require("../inputs/valid/map-06");
const map7 = require("../inputs/valid/map-07");
const map8 = require("../inputs/valid/map-08");

const invalidMap1 = require("../inputs/invalid/map-01");
const invalidMap2 = require("../inputs/invalid/map-02");
const invalidMap3 = require("../inputs/invalid/map-03");
const invalidMap4 = require("../inputs/invalid/map-04");
const invalidMap5 = require("../inputs/invalid/map-05");
const invalidMap6 = require("../inputs/invalid/map-06");
const invalidMap7 = require("../inputs/invalid/map-07");
const invalidMap8 = require("../inputs/invalid/map-08");
const invalidMap9 = require("../inputs/invalid/map-09");
const invalidMap10 = require("../inputs/invalid/map-10");

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
                letters: "GOYONIES",
                path: "@-G-O-+|+-+YO||+-O-N-+|I|+-+|+-I-+|ES|x"
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

    test("Loop inside a loop", ()=>{
        const pathFinder = new PathFinder(map8);
        expect(pathFinder.findPath()).toEqual(
            {
                letters: "XYZBCD",
                path: "@||||X+Y+Z+-|-+|||+BC---+|||D|+---|---+|x"
            });
    });
});

describe("Find path throws error for",()  =>{
    test("missing start character", ()=>{
        const pathFinder = new PathFinder(invalidMap1);
        expect(() => {
            pathFinder.findPath()
        }).toThrow("Error: Missing start character");
    });

    test("missing end character", ()=>{
        const pathFinder = new PathFinder(invalidMap2);
        expect(() => {
            pathFinder.findPath()
        }).toThrow("Error: Missing end character");
    });

    test("multiple starts", ()=>{
        const pathFinder = new PathFinder(invalidMap3);
        expect(() => {
            pathFinder.findPath()
        }).toThrow("Error: Multiple starts");
    });

    test("multiple starts v2", ()=>{
        const pathFinder = new PathFinder(invalidMap4);
        expect(() => {
            pathFinder.findPath()
        }).toThrow("Error: Multiple starts");
    });

    test("multiple ends", ()=>{
        const pathFinder = new PathFinder(invalidMap5);
        expect(() => {
            pathFinder.findPath()
        }).toThrow("Error: Multiple ends");
    });

    test("fork in path", ()=>{
        const pathFinder = new PathFinder(invalidMap6);
        expect(() => {
            pathFinder.findPath()
        }).toThrow("Error: Fork in path");
    });

    test("broken path", ()=>{
        const pathFinder = new PathFinder(invalidMap7);
        expect(() => {
            pathFinder.findPath()
        }).toThrow("Error: Broken path");
    });

    test("multiple starting paths", ()=>{
        const pathFinder = new PathFinder(invalidMap8);
        expect(() => {
            pathFinder.findPath()
        }).toThrow("Error: Multiple starting paths");
    });

    test("fake turn", ()=>{
        const pathFinder = new PathFinder(invalidMap9);
        expect(() => {
            pathFinder.findPath()
        }).toThrow("Error: Fake turn");
    });

    test("invalid character along the path", ()=>{
        const pathFinder = new PathFinder(invalidMap10);
        expect(() => {
            pathFinder.findPath()
        }).toThrow("Error: Invalid character");
    });
});