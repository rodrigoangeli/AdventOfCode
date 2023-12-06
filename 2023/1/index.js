const { input } = require("../input");

const sumOfNumbers = (arr) =>
  arr
    .map((line) => {
      const numbers = line.split("").filter((v) => /\d/.test(v));
      const firstNum = numbers[0];
      const lastNum = numbers[numbers.length - 1];
      return parseInt(`${firstNum}${lastNum}`, 10);
    })
    .reduce((prev, curr) => prev + curr);

const part1 = sumOfNumbers(input);
console.log(part1);

const numberMapping = {
  one: "o1e",
  two: "t2o",
  three: "t3e",
  four: "f4r",
  five: "f5e",
  six: "s6x",
  seven: "s7n",
  eight: "e8t",
  nine: "n9e",
};

const newInput = input.map((line) => {
  let newLine = line;

  Object.keys(numberMapping).forEach((val) => {
    if (newLine.includes(val)) {
      newLine = newLine.replaceAll(val, numberMapping[val]);
    }
  });
  return newLine;
});

const part2 = sumOfNumbers(newInput);

console.log(part2);
