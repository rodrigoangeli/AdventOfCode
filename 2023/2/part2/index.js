const { input } = require("../../input");

const convertCube = (cube, color) => parseInt(cube.replace(color, "").trim());

const part2 = input
  .map((line) => {
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

    let hR = 0,
      hG = 0,
      hB = 0;
    for (var i = 0; i < arr.length; i++) {
      const color = Object.keys(arr[i])[0];
      const val = Object.values(arr[i])[0];
      if (color === "r" && val > hR) {
        hR = val;
      } else if (color === "g" && val > hG) {
        hG = val;
      } else if (color === "b" && val > hB) {
        hB = val;
      }
    }

    return hR * hG * hB;
  })
  .reduce((prev, curr) => prev + curr);

console.log(part2);
