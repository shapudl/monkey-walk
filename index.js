const PathFinder = require('./matrix/pathfinder/PathFinder');
const matrix = require('./tests/inputs/valid/map-04');

// Create an instance of PathFinder and use its methods
const pathFinder = new PathFinder(matrix);
pathFinder.findPath();