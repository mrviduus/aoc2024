const fs = require("fs");
const path = require("path");

const INPUT_FILE = path.join(__dirname, "../input.txt");

fs.readFile(INPUT_FILE, "utf-8", (err, input) => {
  if(err){
    console.log("Error reading file");
    process.exit(1);
  }
 // split the input lines into an array
// Normalize line endings and split lines properly
  const lines = input.trim().split(/\r?\n/);

  // Check the lines for debugging
  console.log("Parsed Lines:", lines);

  // Extract register values from lines explicitly
  let A = parseInt(lines[0].split(":")[1].trim(), 10);
  let B = parseInt(lines[1].split(":")[1].trim(), 10);
  let C = parseInt(lines[2].split(":")[1].trim(), 10); 
  console.log(A);
  console.log(B);
  console.log(C);
  
});
