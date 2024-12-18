const fs = require("fs");
const path = require("path");

const INPUT_FILE = path.join(__dirname, "../input.txt");

fs.readFile(INPUT_FILE, "utf-8", (err, input) => {
  if (err) {
    console.error(`Error reading file from path ${INPUT_FILE}:`, err);
    process.exit(1);
  }

  let stones = input.split(" ").reduce((acc, curr) => {
    acc[curr] = 1;
    return acc;
  }, {});

  for(let i = 0; i < 75; i++){
    const newStones = {};

    for(const [stone, count] of Object.entries(stones)){
      const num = parseInt(stone);
      if(num === 0){
          newStones[1] = (newStones[1] || 0) + count;
        }else if(num.toString().length % 2 === 0){
            const str = num.toString();
            const midPoint = str.length / 2;
            const left = parseInt(str.slice(0, midPoint), 10);
            const right = parseInt(str.slice(midPoint), 10);

            newStones[left] = (newStones[left] || 0) + count;
            newStones[right] = (newStones[right] || 0) + count;
        }else {
          const newStone = num * 2024;
          newStones[newStone] = (newStones[newStone] || 0) + count;
        }
    };

    stones = newStones;
  }

  const result = Object.values(stones).reduce((acc, curr) => acc + curr, 0);

  console.log(result);
});