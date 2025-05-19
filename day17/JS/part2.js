const fs = require("fs");
const path = require("path");

const INPUT_FILE = path.join(__dirname, "../input.txt");

fs.readFile(INPUT_FILE, "utf-8", (err, input) => {
  if (err) {
    console.error("Error reading file:", err);
    process.exit(1);
  }

  const lines = input
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const programLine = lines.find((line) => line.startsWith("Program:"));
  const prog = programLine
    .split(":")[1]
    .trim()
    .split(",")
    .map(Number);

  function run(initialA) {
    let a = initialA, b = 0, c = 0, ip = 0;

    const combo = (arg) =>
      arg < 4 ? arg : arg === 4 ? a : arg === 5 ? b : arg === 6 ? c : null;

    let out = [];

    while (ip < prog.length) {
      const ins = prog[ip], arg = prog[++ip];
      ++ip;

      if (ins === 0) a = Math.floor(a / (2 ** combo(arg)));
      else if (ins === 1) b ^= arg;
      else if (ins === 2) b = combo(arg) & 7;
      else if (ins === 3) {
        if (a !== 0) ip = arg;
      } else if (ins === 4) b ^= c;
      else if (ins === 5) out.push(combo(arg) & 7);
      else if (ins === 6) b = Math.floor(a / (2 ** combo(arg)));
      else if (ins === 7) c = Math.floor(a / (2 ** combo(arg)));
    }

    return out;
  }

  const eq = (arra, arrb) =>
    arra.length === arrb.length && arra.every((v, i) => v === arrb[i]);

  let q = [[prog.length - 1, 0]];
  let sols = [];

  while (q.length) {
    const [cnt, v] = q.pop();

    for (let h = 0; h < 8; ++h) {
      let a = v * 8 + h;
      if (eq(run(a), prog.slice(cnt))) {
        if (cnt === 0) sols.push(a);
        else q.push([cnt - 1, a]);
      }
    }
  }

  const minimalA = Math.min(...sols);
  console.log(" Minimal initial value for A (Part 2):", minimalA);
});

