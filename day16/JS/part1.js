const fs = require("fs");
const path = require("path");


const INPUT_FILE = path.join(__dirname, "../input.txt");

fs.readFile(INPUT_FILE, "utf-8", (err, input)=>{
  if(err){
      console.log(`Error reading dile from path {INPUT_FILE}`, err);
      process.exit(1);
  }
  

})
