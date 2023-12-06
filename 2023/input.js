const fs = require("fs");
const path = require("path");

const filePath = process.argv.slice(1)[0].split("\\");

const input = fs
  .readFileSync(
    path.join(__dirname, filePath[filePath.length - 1], "input.in"),
    "utf8"
  )
  .trim()
  .split("\n");

module.exports = {
  input,
};
