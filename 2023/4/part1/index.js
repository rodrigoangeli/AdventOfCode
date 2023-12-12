const { input } = require("../../input");

let results = [];

const part1 = input.map((cards) => {
  const arr = cards
    .replace(/Card.*: /, "")
    .split("|")
    .map((e) => e.split(" ").filter((v) => v));
  const numbersMatching = arr[0].filter((val) => arr[1].includes(val));
  if (numbersMatching.length > 0) {
    results.push(1 << (numbersMatching.length - 1));
  }
});

console.log(results.reduce((prev, curr) => prev + curr));
