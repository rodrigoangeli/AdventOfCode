const { input } = require("../../input");

const data = input.map((e) => e.split(""));
let allGears = [];
let allNumbers = [];
let finalNumbers = [];

const directions = {
  TOP: {
    x: -1,
    y: 0,
  },
  TOP_RIGHT: {
    x: -1,
    y: +1,
  },
  RIGHT: {
    x: 0,
    y: +1,
  },
  BOTTOM_RIGHT: {
    x: +1,
    y: +1,
  },
  BOTTOM: {
    x: +1,
    y: 0,
  },
  BOTTOM_LEFT: {
    x: +1,
    y: -1,
  },
  LEFT: {
    x: 0,
    y: -1,
  },
  TOP_LEFT: {
    x: -1,
    y: -1,
  },
};

const checkIfPartOfNumber = (currObj, x, y, isPrevious) => {
  if (
    !allNumbers.find(
      (element) => element.x === currObj.x && element.y === currObj.y
    )
  ) {
    if (!isPrevious) {
      allNumbers.push({ ...currObj, num: data[currObj.x][currObj.y] });
    } else {
      allNumbers.unshift({ ...currObj, num: data[currObj.x][currObj.y] });
    }
  }
  if (
    !isNaN(data[x][y + 1]) &&
    !allNumbers.find((i) => i.x === x && i.y === y + 1)
  ) {
    return checkIfPartOfNumber({ x, y: y + 1 }, x, y + 1);
  }
  if (!isNaN(data[x][y - 1])) {
    return checkIfPartOfNumber({ x, y: y - 1 }, x, y - 1, true);
  }
  return allNumbers;
};

const checkAroundGear = (x, y, currPosX, currPosY, currGear) => {
  //check if its a valid position
  if (data[x + currPosX] && data[y + currPosY]) {
    //check if its a number
    if (!isNaN(data[x + currPosX][y + currPosY])) {
      allNumbers = [];
      let exists = allGears.some((obj) =>
        obj[currGear]?.some((subArray) =>
          subArray.find(
            (element) =>
              element.x === x + currPosX && element.y === y + currPosY
          )
        )
      );
      if (!exists) {
        const fullObj = checkIfPartOfNumber(
          { x: x + currPosX, y: y + currPosY },
          x + currPosX,
          y + currPosY
        );
        allGears = allGears.map((e) => {
          if (e[currGear]) {
            return {
              [currGear]: [...e[currGear], ...[fullObj]],
            };
          }
          return e;
        });
      }
    }
  }
};

for (var x = 0; x < data.length; x++) {
  for (var y = 0; y < data[x].length; y++) {
    if (data[x][y] === "*") {
      allGears.push({
        [`x${x}y${y}`]: [],
      });
      for (var i = 0; i < Object.keys(directions).length; i++) {
        let currPos = directions[Object.keys(directions)[i]];
        checkAroundGear(x, y, currPos.x, currPos.y, `x${x}y${y}`);
      }
    }
  }
}

for (let obj of allGears) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key].length > 1) {
        var gearRatio = obj[key]
          .map((e) => e.map(({ num }) => num).join(""))
          .reduce((prev, curr) => parseInt(prev) * parseInt(curr));
        finalNumbers.push(gearRatio);
      }
    }
  }
}

console.log(finalNumbers.reduce((prev, curr) => prev + curr));
