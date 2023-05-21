# PathFinder

PathFinder is a JavaScript module that helps navigate through a matrix of characters by following a specific path. It identifies the starting point, follows and records the path, and records the letters encountered along the way.

## Installation

### Environment 

Node: 16.17.1
npm: 8.15.0

You can install it via npm from the root directory:

```bash
npm install 
```

##Usage
To use PathFinder, follow these steps:

```javascript
const PathFinder = require("./matrix/pathfinder/PathFinder");
```
Create an instance of the PathFinder class with the matrix you want to navigate:

```javascript
const matrix = [
  ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
  ['', '', '', '', '', '', '', '', '|'],
  ['x', '-', 'B', '-', '+', '', '', '', 'C'],
  ['', '', '', '', '|', '', '', '', '|'],
  ['', '', '', '', '+', '-', '-', '-', '+']
];

const pathFinder = new PathFinder(matrix);
```
Find the path:

```javascript
const path = pathFinder.findPath();
```

The findPath method returns an object containing the letters encountered (letters) and the complete path followed (path).

Working example can be found in index.js in the root directory

####Access the results:

```javascript
console.log('Letters:', path.letters);
console.log('Path:', path.path);
```
The letters and path will be displayed in the console.

## Testing

Code can be tested using the Jest testing framework.

To run all tests:  

```bash
npm run test
```