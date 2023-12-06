const { input } = require("../../input");

const part1 = input
  .map((line) => {
    const numbers = line.split("").filter((v) => /\d/.test(v));
    const firstNum = numbers[0];
    const lastNum = numbers[numbers.length - 1];
    return parseInt(`${firstNum}${lastNum}`, 10);
  })
  .reduce((prev, curr) => prev + curr);

console.log(part1);
