// https://adventofcode.com/2024/day/16
const fs = require("fs");
const { get } = require("http");
const path = require("path");


const INPUT_FILE = path.join(__dirname, "../input.txt");

fs.readFile(INPUT_FILE, "utf-8", (err, input)=>{
  if(err){
      console.log(`Error reading dile from path {INPUT_FILE}`, err);
      process.exit(1);
  } 
  const grid = input.trim().split("\n").map((line) => line.split(""));
  const height = grid.length;
  const width = grid[0].length;

  let pos = {x: 0, y: 0};
  // look for S
  for(let y = 0; y < height; y++){
    for(let x = 0; x < width; x++){
      if(grid[y][x] === "S"){
        pos = {x, y};
        break;
      }
    }
  }

  // look for E
  let goal = { x: 0, y: 0};
  for(let y = 0; y < height; y++){
    for(let x = 0; x < width; x++){
      if(grid[y][x] === "E"){
        goal = {x, y};
        break;
      }
    }
  }

  /**
  * Get the location of all neighbors that meet a certain condition
  * X is COL #, Y is ROW #
  * @param {number} x
  * @param {number} y
  * @param {(x, y, value) => bool} condition - function that returns true if the cell meets the condition
  */
function getNeighborsLocationWithCondition(x, y, condition){
  var neighbors = [
    x > 0 ? [x - 1, y] : null,
    x < grid[0].length - 1 ? [x + 1, y] : null,
    y > 0 ? [x, y - 1] : null,
    y < grid.length - 1 ? [x, y + 1] : null,
  ];
  return neighbors.filter(
    (k) => k !== null && condition(k[0], k[1], grid[k[1]][k[0]])
  );
}

const directions = [
  [0, 1], //right
  [1, 0], //down
  [0, -1], //left
  [-1, 0], //up
];

// copy the grid to give title values
let gridCopy = grid.map((row)=> 
  row.map((_) => Array.from({ length: 4}, () => Infinity))
);

// dfs
let stack = [[pos, 1, 0]];
let visited = new Set();

let processed = 0;
while (stack.length > 0) {
  processed++;
  let [position, direction, score] = stack.pop();
  //console.log(position, direction, score);
  if (processed % 1000 === 0) {
    console.log(processed, stack.length);
  }

  if (visited.has(`${position.x},${position.y},${direction}`)) {
    const currentLowest = gridCopy[position.y][position.x][direction];

    if (score > currentLowest) {
      //console.log("SKIP", gridCopy[position.y][position.x], score);
      continue;
    }
  }
  gridCopy[position.y][position.x][direction] = score;
  visited.add(`${position.x},${position.y},${direction}`);

  //console.log("NEIGHBORS");
  const neighbors = getNeighborsLocationWithCondition(
    position.x,
    position.y,
    (x, y, value) => value !== "#"
  );

  for (let neighbor of neighbors) {
    let [x, y] = neighbor;
    let neighborScore = score + 1;

    //figure out displacement of the neighbor
    let dx = x - position.x;
    let dy = y - position.y;

    //index of the direction
    let index = directions.findIndex((d) => d[0] === dx && d[1] === dy);

    //how many times we have to turn (mod 4)
    let turnRight = (index - direction + 4) % 4;
    let turnLeft = (direction - index + 4) % 4;

    let turn = Math.min(turnRight, turnLeft);

    neighborScore += turn * 1000;

    stack.push([{ x, y }, index, neighborScore]);
    //console.log([{ x, y }, index, neighborScore]);
  }
}

//look at the minimum score of the goal
let minScore = Infinity;
for (let i = 0; i < 4; i++) {
  minScore = Math.min(minScore, gridCopy[goal.y][goal.x][i]);
}
console.log(minScore);
});

