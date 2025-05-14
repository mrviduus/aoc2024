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

  let programm =   lines[3]
    .split(":")[1].trim().split(",")
    .map(Number);
  //Array to collect outputs from 'out' instruction
  let outputs = [];
  //instruction pointer to go throw programm
  let ip = 0;

  //Main loop to run instructions
  while(ip < programm.length){
    let opcode = programm[ip];
    if(ip + 1>= programm.length) break; //safety check
    let operand = programm[ip + 1];

    //Execute instructions based on opcode
    switch (opcode){
      case 0: { // adv
        const val = operand <= 3 ? operand : [A, B, C][operand - 4];
        A = Math.floor(A / (2 ** val));
        break;
      }
      case 1: { //bxl
        B = B ^ operand;
        break;
      }
      case 2:{ //bst
        const val = operand <= 3 ? operand: [A,B,C][operand -4];
        B = val % 8;
        break;
      }
      case 3:{ //jnz
        if(A !== 0){
          ip = operand;
          continue; //jump  derectly
        }
        break;
      }
      case 4:{
        B = B ^ C;
        break;
      }
      case 5:{ //out
        const val = operand <= 3 ? operand : [A,B,C][operand -4];
        outputs.push(val % 8);
        break;
      }
      case 6:{//bdv
        const val = operand <= 3 ? operand : [A,B,C][operand -4];
        B = Math.floor(A / (2**val));
        break;
      }
      case 7:{//cdv
        const val = operand <= 3 ? operand : [A,B,C][operand -4];
        C = Math.floor(A / (2**val));
        break;
      }
      default:
        console.log("Unknown code", opcode);
        process.exit(1);
    }
    ip+=2;
  }

  const finalOutput = otputs.join(",");
  console.log("Final output: ", finalOutput);
  
});
