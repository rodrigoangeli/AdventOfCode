const fs = require("fs");
const path = require("path");

const filePath = process.argv.slice(1)[0].split("\\");

const raw = fs.readFileSync(
  path.join(__dirname, filePath[filePath.length - 2], "input.in"),
  "utf8"
);

const input = raw.trim().split("\r\n");

module.exports = {
  input,
  raw,
};
