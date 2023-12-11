const { input } = require("../../input");

const data = input.map((e) => e.split(""));
const regex = /^\d*\.?\d*$/;
const allNumbersWithSymbol = [];

const checkIfPartOfNumber = (currNum, x, y) => {
  let fullNum = currNum;
  if (!isNaN(data[x][y + 1])) {
    fullNum += data[x][y + 1];
    return checkIfPartOfNumber(fullNum, x, y + 1);
  }
  return {
    num: fullNum,
    lastCoord: {
      x,
      y,
    },
  };
};

const checkAroundNumber = (charLength, lastCoord) => {
  if (data[lastCoord.x - 1] && data[lastCoord.y + 1]) {
    if (!regex.test(data[lastCoord.x - 1][lastCoord.y + 1])) return true;
  }
  if (data[lastCoord.x] && data[lastCoord.y + 1]) {
    if (!regex.test(data[lastCoord.x][lastCoord.y + 1])) return true;
  }
  if (data[lastCoord.x + 1] && data[lastCoord.y + 1]) {
    if (!regex.test(data[lastCoord.x + 1][lastCoord.y + 1])) return true;
  }
  for (var i = 0; i < charLength + 1; i++) {
    if (data[lastCoord.x + 1] && data[lastCoord.y - i]) {
      if (!regex.test(data[lastCoord.x + 1][lastCoord.y - i])) return true;
    }
    if (data[lastCoord.x - 1] && data[[lastCoord.y - i]]) {
      if (!regex.test(data[lastCoord.x - 1][lastCoord.y - i])) return true;
    }
  }
  if (data[lastCoord.x] && data[lastCoord.y - charLength]) {
    if (!regex.test(data[lastCoord.x][lastCoord.y - charLength])) return true;
  }
};

for (var x = 0; x < data.length; x++) {
  for (var y = 0; y < data[x].length; y++) {
    if (!isNaN(data[x][y]) && isNaN(data[x][y - 1])) {
      const complete = checkIfPartOfNumber(data[x][y], x, y);
      if (checkAroundNumber(complete.num.length, complete.lastCoord)) {
        allNumbersWithSymbol.push(complete.num);
      }
    }
  }
}
console.log(
  allNumbersWithSymbol.reduce((prev, curr) => parseInt(prev) + parseInt(curr))
);
