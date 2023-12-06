const { input } = require("../../input");

const convertCube = (cube, color) => parseInt(cube.replace(color, "").trim());

const COLOR_LIMIT = {
  r: 12,
  g: 13,
  b: 14,
};

const part1 = input
  .map((line) => {
    const id = line.match(new RegExp("Game " + "(.*)" + ":"))[1];
    const arr = line
      .replace(/Game.*:/, "")
      .replaceAll(";", ",")
      .split(",")
      .map((cube) => {
        if (cube.includes("red")) {
          return {
            r: convertCube(cube, "red"),
          };
        } else if (cube.includes("green")) {
          return {
            g: convertCube(cube, "green"),
          };
        } else if (cube.includes("blue")) {
          return {
            b: convertCube(cube, "blue"),
          };
        }
      });
    const filtered = arr.map((e) => {
      if (COLOR_LIMIT[Object.keys(e)[0]] < Object.values(e)[0]) {
        return { invalid: true };
      }
      return e;
    });
    if (!filtered.some((e) => e.invalid)) {
      return id;
    }
  })
  .filter((exists) => exists)
  .reduce((prev, curr) => parseInt(prev) + parseInt(curr));

console.log(part1);
